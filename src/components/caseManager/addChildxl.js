import React, { useState } from "react";
import * as XLSX from "xlsx";
import { db, database } from "../../firebase";
import { Accordion,AccordionItem, Form, FormGroup,AccordionHeader,AccordionBody,Col,Input,Label,Button } from "reactstrap";

const AddchildXL = () => {
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
              database
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
    <Form className="container mt-4" onSubmit={(event) => handleUpload(event)}>
          <div className="row m-2 text-3xl font-bold">Insert Excel Sheet
          </div>
          <div className="row m-1">
            <div className="col-12 col-sm-8 col-lg-6">
						<Input id="excelsheet" name="excelsheet" type="file" accept=".xlsx" onChange={handleFileChange}/>
            </div>
          </div>
			<FormGroup row>
				<div className="col-2 m-2">
					<Button type="submit" className="!bg-color3 !border-none !text-textcolor" onClick={handleUpload}>
						Submit
					</Button>
				</div>
			</FormGroup>
		</Form>
  );
};

export default AddchildXL;
