import FileUpload from './components/FileUpload';
import Description from './components/Description'
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import Navbar from './components/NavBar';
import Button from 'react-bootstrap/Button'
import { useRef } from 'react';
import './App.css'

function App() {
  const ref = useRef(null);

  const handleClick = () => {
      ref.current?.scrollIntoView({behavior: 'smooth', block: 'center'});
  }

  return (
    <>
      <style type = "text/css">
                  {`
                      .btn-start {
                          color: white;
                          outline-style: solid;
                      }
                      .btn-start:hover {
                          background-color: #CBDDD1;
                          color: black;
                          outline-style: solid;
                          outline-color: #CBDDD1;
                      }
                  `}
      </style>
      <div className="App">
        <Navbar/>
        <div className = "home-text">
            <div className = "home-text-2">
              <h1>Beanify</h1>
              <h3>A Soybean Classifier</h3>
              <br></br>
              <Button variant='start' onClick = {handleClick}>Get Started</Button>
            </div>
        </div>
        <div className = "function" ref = {ref}>
          <FileUpload/>
        </div>
        <div className = "description">
          <Description/>
        </div>
      </div>
    </>
  );
}

export default App;
