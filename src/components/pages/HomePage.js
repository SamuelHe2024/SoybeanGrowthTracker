import React from 'react'
import { Button, Grid } from '@mui/material';
import { useRef } from 'react';
import Description from '../Description';
import Typography from '@mui/material/Typography';
import 'bootstrap/dist/css/bootstrap.css';


const HomePage = () => {
    return(
            <>
                <div className="App">
                    <Grid height = "100vh" container alignItems={"center"} className = "home-text">
                        <Grid container justifyContent={"flex"}>
                            <Typography container variant="h2">
                                DL Hydroponics
                            </Typography>
                            <Grid container justifyContent={"flex"}>
                                <Button variant='contained' href="/insert_data">Get Started</Button>
                            </Grid>
                        </Grid>
                        
                    </Grid>
                    <div className = "description">
                            <Description/>
                    </div>
                </div>
            </>
        );
    
};
export default HomePage;