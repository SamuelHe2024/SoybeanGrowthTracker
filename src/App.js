import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import HomePage from "./components/pages/HomePage";
import Navbar from './components/utils/NavBar';
import './App.css'
import InsertData from "./components/pages/InsertData";
import ViewData from "./components/pages/ViewData";

function App() {
  return (
    <>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/view_data" element={<ViewData/>}/>
          <Route path="/insert_data" element={<InsertData/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
