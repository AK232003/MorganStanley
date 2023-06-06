import React, { useState } from "react";
import * as XLSX from "xlsx";
import { db, rdb } from "../firebase";

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(selectedFile);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        data.forEach((element) => {
          // Write the child profile document to Firestore
          const id = element["Case Number"].split("/").join("");
          db.collection("children")
            .doc(id)
            .set(element)
            .then(() => {
              console.log("Document successfully written with ID: ", id);
              // Create an entry in the Realtime Database for the child profile
              rdb
                .ref("childProfile/" + id)
                .set(db.collection("children").doc(id).id);
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        });
      };
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Dashboard;
