import React  from 'react';

import Home from './components/Home/Home';
import {Routes,Route,Navigate} from "react-router-dom"
import './App.css';
function App() {

  return (
    
    <div className="App">

 
       <Routes>
    <Route path='/' element={<Navigate to={"home"}/>}/>
    <Route path='home' element={<Home/>}/>
   </Routes>
   
    </div>
  );
}

export default App;
