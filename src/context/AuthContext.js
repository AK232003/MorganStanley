import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { database } from "../firebase";
import { getAuth, deleteUser } from "firebase/auth";
import { arrayUnion } from "@firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password, userType, id, phoneno, name,imageUrl) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        database.ref(`Users/` + user.uid).update({
          userType: userType,
          userID: id,
          Active: true,
        }
        )
        if(userType==="Admin"){ 
          var docRef = db.collection("Users").doc("admin");
          // if(docRef.exists()) return;
          return db.collection('Users').doc("admin")
          .set({
            userType: userType,
            Name: name,
            Phone: phoneno,
            UserID: id,
            PhoneNo: phoneno,
            CasesList: ["start"],
            WorkersList: ["start"],
            ManagerList: ["start"],
            TotalCasesCompleted: 0,
            TotalCasesStep1: 0,
            TotalCasesStep2: 0,
            TotalCasesStep3: 0,
            TotalCasesStep4: 0,
            Image: imageUrl,
            Active: true
          })
          .then(() => {
            console.log("Signup successful!");
            return true;
          })
          .catch((error) => {
            console.error("Error creating user node:", error);
            return false;
          });
        }
        else if(userType==="CaseManager"){
          return db.collection('Users').doc(id)
          .set({
            userType: userType,
            Name: name,
            Phone: phoneno,
            UserID: id,
            PhoneNo: phoneno,
            CasesList: ["start"],
            WorkersList: ["start"],
            TotalCasesCompleted: 0,
            TotalCasesStep1: 0,
            TotalCasesStep2: 0,
            TotalCasesStep3: 0,
            TotalCasesStep4: 0,
            Image: imageUrl,
            Active: true
          })
          .then(() => {
            console.log("Signup successful!");
            db.collection("Users")
              .doc("admin")
              .update({
                ManagerList: arrayUnion(id),
              });
            return true;
          })
          .catch((error) => {
            console.error("Error creating user node:", error);
            return false;
          });

          
        }
        else if(userType==="GroundWorker"){
          return db.collection('Users').doc(id)
          .set({
            userType: userType,
            Name: name,
            Phone: phoneno,
            UserID: id,
            PhoneNo: phoneno,
            CasesList: ["start"],
            TotalCasesCompleted: 0,
            TotalCasesStep1: 0,
            TotalCasesStep2: 0,
            TotalCasesStep3: 0,
            TotalCasesStep4: 0,
            Image: imageUrl,
            Active: true
          })
          .then(() => {
            console.log("Signup successful!");
            db.collection("Users")
              .doc("admin")
              .update({
                WorkersList: arrayUnion(id),
              });
            return true;
          })
          .catch((error) => {
            console.error("Error creating user node:", error);
            return false;
          });
        }
        })
        .catch((error) => {
          console.error("Error Signing up:", error);
        });
  }

  function login(email, password) {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        const user = auth.currentUser;
        const userId = user.uid;
        // Get the user type from the Realtime Database
        return database
          .ref(`Users/${userId}/userType`)
          .once("value")
          .then((snapshot) => {
            const userType = snapshot.val();
            console.log(`User ${userId} is of type ${userType}`);
            return [userId,userType];
          })
          .catch((error) => {
            console.error("Error getting user node:", error);
            return false;
          });
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        return false;
      });
  }
  
   function deleteUser(uid) {
      db.collection("Users").doc(uid).update({
        Active: false,
      })
      database.ref(`Users/` + uid).update({
        Active: false,
      })
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    deleteUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
