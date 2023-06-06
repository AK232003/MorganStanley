import logo from './logo.svg';
import './App.css';
import * as XLSX from 'xlsx';
import { db } from './firebase';

function App() {
  const readExcel = (file) =>{
    const promise = new Promise((resolve, reject) =>{
      const filereader = new FileReader();
      filereader.readAsArrayBuffer(file)

      filereader.onload = (e) => {
        const bufferArray = e.target.result;
        
        const wb = XLSX.read(bufferArray, {type: 'buffer'});
        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      filereader.onerror = ((e) => {
        reject(e);
      })
    })

    promise.then((d) => {
      d.forEach((element) => {
        // console.log(element['Case Number']);
        db.collection("children").doc(element['Age']).set(element)
        .then(() => {console.log("Document Successfully written")})
        .catch((e) => {console.log("Error: ", e)})

      });
    })
  }

  

  return (
    <div>
      <input type='file' 
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      
      />
    </div>
  );
}

export default App;
