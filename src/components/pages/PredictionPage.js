import React from 'react'
import Button from 'react-bootstrap/Button'
import FileUpload from '../FileUpload';
import { useRef } from 'react';
import Description from '../Description';
import 'bootstrap/dist/css/bootstrap.css';


const PredictionPage = () => {
    const ref = useRef(null);
    const handleClick = () => {
        ref.current?.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
    return(
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
    
};
export default PredictionPage;