import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

const Dashboard = () => {
  // const [ImageUpload, setImageUpload] = useState(null);
  // const [ImageList, setImageList] = useState([]);

  // const imageListRef = ref(storage, "images/");
  // const uploadImage = () => {
  //   // const username = "Rakshit";
  //   if (ImageUpload == null) return;
  //   const imageRef = ref(storage, `images/${imageRef.name}`);
  //   uploadBytes(imageRef, ImageUpload)
  //     .then(() => {
  //       alert("Image Uploaded Succesfully!");
  //     })
  //     .catch((error) => {
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //     });
  // };
  // useEffect(() => {
  //   listAll(imageListRef).then((response) => {
  //     // console.log(response);
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImageList((prev) => [...prev, url]);
  //       });
  //     });
  //   });
  // }, []);
  // return (
  //   <div>
  //     <h1>DashBoard!</h1>
  //     <input
  //       type="file"
  //       onChange={(event) => {
  //         setImageUpload(event.target.files[0]);
  //       }}
  //     />
  //     <button
  //       className="btn btn-primary btn-lg btn-block"
  //       onClick={uploadImage}
  //     >
  //       Upload
  //     </button>
  //     {/* {ImageList.map((url)=>{
  //       return <img src={url}/>;
  //     })} */}
  //   </div>
  // );
};
export default Dashboard;
