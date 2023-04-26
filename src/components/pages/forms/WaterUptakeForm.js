import {React, useState} from 'react'
import {FormControl,InputLabel, Alert, Input, Grid, Select, MenuItem, Button} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers';
var solutions = ["Hoagland Solution Only", 
                 "Plasma Treated Water", 
                 "Potassium 100ppm",
                 "Potassium 200ppm",
                 "Potassium 300ppm",
                 "Magnesium 30ppm",
                 "Magnesium 50ppm",
                 "Magnesium 70ppm",
                 "Nitrogen 100ppm",
                 "Nitrogen 175ppm",
                 "Nitrogen 250ppm",
                ]

const delay = ms => new Promise(res => setTimeout(res, ms));

const WaterUptakeForm =()=>{
    const [dayError, setDayError] = useState(false);
    const [requestFailed, setRequestFailed] = useState(false);
    const [success, setSuccess] = useState(false);
    const [hasNull, setHasNull] = useState(true);
    const [cannotDelete, setCannotDelete] = useState(false);
    const [inputFields, setInputFields] = useState([{
        "solution": "", "recordDate": "", "uptakeAmount": ""
    }])

    const handleSubmit = async () => {
        const data = new FormData();
        data.append("inputFields", JSON.stringify(inputFields));
        let response = await 
                        fetch("https://soy-api2.herokuapp.com/db/water_uptake", {
                        // fetch("http://localhost:5000/db/water_uptake", {
                method: "POST", 
                body: data
        })
        .catch(error => setRequestFailed(true))
        const json = await response.json;
        setSuccess(true);
        delay(5000);
        setSuccess(false);
    }
    const addFields = () => {
        setCannotDelete(false);
        let newFields = {"solution": "", "recordDate": "", "uptakeAmount": ""};
        setInputFields([...inputFields, newFields]);
    }

    const handleFormChange = (event,index) => {
        setRequestFailed(false);
        let data = [...inputFields];
        console.log(event.target.name);
        data[index][event.target.name] = event.target.value;
        if(event.target.name === 'recordDate'){
            console.log(event.target.value);
            setDayError(false);
            if(data[index][event.target.name] > 29 || data[index][event.target.name] < 0){
                setDayError(true);
                return;
            }
        }
        setInputFields(data);
        for(let i in inputFields){
            if(inputFields[i]['solution'] == "" || inputFields[i]['recordDate'] == "" || inputFields[i]['uptakeAmount'] == "" ){
                setHasNull(true);
                return;
            }
        }
        setHasNull(false);
    }
    return(
        <>
            {inputFields.map((input,index) => {
                return(
                    <Grid key = {index}>
                            <FormControl sx={{m:1, minWidth: 200 }}>
                                    <InputLabel htmlFor="solution-dd">Select a Solution</InputLabel>
                                    <Select 
                                        name = "solution" 
                                        onChange={event=>handleFormChange(event,index)} 
                                        type = 'number'
                                        value = {input.solution}>
                                        {solutions.map(el => <MenuItem value = {el}>{el}</MenuItem>)}
                                    </Select>
                            </FormControl>
                            <FormControl > 
                                <InputLabel htmlFor="my-input">Day of Growth</InputLabel> 
                                <Input 
                                    sx={{ m: 1, minWidth: 200 }} 
                                    name="recordDate"
                                    type = 'number'
                                    onChange={event => handleFormChange(event,index)} 
                                    value={input.recordDate} 
                                />
                            </FormControl>
                            <FormControl > 
                                <InputLabel htmlFor="my-input">Uptake Amount</InputLabel> 
                                <Input 
                                    sx={{ m: 1, minWidth: 200 }} 
                                    name="uptakeAmount"
                                    type = 'number'
                                    onChange={event => handleFormChange(event,index)} 
                                    value={input.uptakeAmount} 
                                />
                            </FormControl>
                            <Button onClick = {() => {
                            let newFormVal = [...inputFields];
                            if(newFormVal.length > 1){
                                newFormVal.splice(index,1);
                                console.log(newFormVal);
                                console.log(index);
                                setInputFields(newFormVal);
                            } else{
                                setCannotDelete(true);
                            }
                        }}>Remove</Button>
                    </Grid>
                )
            })}
            <Grid>
                <Button variant = "contained" sx={{ m: 1, minWidth: 200 }} onClick = {addFields}>Add Data</Button>
            </Grid>
            <Grid>
                <Button variant = "contained" sx={{ m: 1, minWidth: 200 }} onClick = {handleSubmit} disabled = {hasNull || dayError}>Submit</Button>
            </Grid>
            <Alert severity = "error" hidden = {!cannotDelete}> Cannot delete anymore cells!</Alert>
            <Alert severity = "error" hidden = {!dayError}> Day of Growth must be between 0 and 29!</Alert>
            <Alert severity = "success" hidden = {!success}>Successfully uploaded!</Alert>
            <Alert severity = "error" hidden = {!requestFailed} >[INTERNAL ERROR] Request failed to connect to server</Alert>
        </>
    );
}
export default WaterUptakeForm