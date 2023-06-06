import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { database } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password, userType) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;

        return database
          .ref(`Users/` + user.uid)
          .set({
            userType: userType,
          })
          .then(() => {
            console.log("Signup successful!");
            return true;
          })
          .catch((error) => {
            console.error("Error creating user node:", error);
            return false;
          });
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
            return userType;
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
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
