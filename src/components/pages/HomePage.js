import React from 'react'
import { Button } from '@mui/material';
import { useRef } from 'react';
import Description from '../Description';
import Typography from '@mui/material/Typography';
import 'bootstrap/dist/css/bootstrap.css';


const HomePage = () => {
    return(
            <>
                <div className="App">
                            <div className = "home-text">
                                <Typography variant="h2" className = "home-text-2">
                                    DL Hydroponics
                                </Typography>
                                <Button className="gettingStarted" variant='contained' href="/insert_data">Get Started</Button>
                            </div>
                            <div className = "description">
                                <Description/>
                            </div>
                </div>
            </>
        );
    
};
export default HomePage;