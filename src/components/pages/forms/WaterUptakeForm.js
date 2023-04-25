import {React, useState} from 'react'
import {FormControl,InputLabel, Input, Grid, Select, MenuItem, Button} from '@mui/material';
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
                 "Magnesium 100ppm",
                 "Magnesium 175ppm",
                 "Magnesium 250ppm",
                ]

const delay = ms => new Promise(res => setTimeout(res, ms));

const WaterUptakeForm =()=>{
    const [cannotDelete, setCannotDelete] = useState(false);
    const [inputFields, setInputFields] = useState([{
        "solution": "", "recordDate": "", "uptakeAmount": ""
    }])

    const handleSubmit = async () => {
        const data = new FormData();
        let modifiedInput = inputFields;
        for(let i in modifiedInput){
            modifiedInput[i]['recordDate'] = String(modifiedInput[i]['recordDate'].$M + 1) + "/" + 
                                             String(modifiedInput[i]['recordDate'].$D) + "/" + 
                                             String(modifiedInput[i]['recordDate'].$y);
        }
        console.log(modifiedInput);
        data.append("inputFields", JSON.stringify(modifiedInput));
        let response = await fetch("https://soy-api2.herokuapp.com/db/water_uptake", {
                method: "POST", 
                body: data
        })
        .catch(error => console.log('error', error))
        const json = await response.json;
        console.log(json);
    }
    const addFields = () => {
        let newFields = {"solution": "", "recordDate": "", "uptakeAmount": ""};
        setInputFields([...inputFields, newFields]);
    }

    const handleFormChange = (event,index) => {
        let data = [...inputFields];
        console.log(event);
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }
    const handleDateChange = (event,index) => {
        let data = [...inputFields];
        data[index]["recordDate"] = event;
        console.log(String(data[index]["recordDate"].$d))
        setInputFields(data);
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
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        name="recordDate"
                                        sx={{ m: 1, maxWidth: 200 }} 
                                        onChange = {event => handleDateChange(event,index)} 
                                        value = {input.recordDate}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
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
                            <Button onClick = {(index) => {
                            let newFormVal = [...inputFields];
                            if(newFormVal.length > 1){
                                newFormVal.splice(index,1);
                                setInputFields(newFormVal);
                            } else{
                                setCannotDelete(true);
                            }
                        }}>Remove</Button>
                    </Grid>
                )
            })}
            <Grid>
                <Button variant = "contained" sx={{ m: 1, minWidth: 200 }} onClick = {handleSubmit}>Submit</Button>
            </Grid>
            <Grid>
                <Button variant = "contained" sx={{ m: 1, minWidth: 200 }} onClick = {addFields}>Add Data</Button>
            </Grid>
        </>
    );
}
export default WaterUptakeForm