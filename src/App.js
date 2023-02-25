import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import PredictionPage from "./components/pages/PredictionPage";
import DryWeight from "./components/pages/DryWeight"
import SolutionData from "./components/pages/SolutionData"
import Navbar from './components/NavBar';
import './App.css'
import WaterUptake from "./components/pages/WaterUptake";

function App() {
  return (
    <>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PredictionPage/>}/>
          <Route path="/dry_weight" element={<DryWeight/>}/>
          <Route path="/solution_data" element={<SolutionData/>}/>
          <Route path="/water_uptake" element={<WaterUptake/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
