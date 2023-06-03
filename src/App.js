import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import LoginComponent from './components/loginComponent';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  const [userName,setName]=useState('');
  const [password,setPassword]=useState('');

  return (
    <div className="App container mt-5">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginComponent userName={userName} password={password} setName={setName} setPassword={setPassword}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
