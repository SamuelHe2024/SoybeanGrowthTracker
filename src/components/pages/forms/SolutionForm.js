import {React, useState} from 'react'
import {FormControl,InputLabel, Input, Select, MenuItem, Button, Grid, Accordion} from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMore from '@mui/icons-material/ExpandMore'

var fields = [
    'Calcium',
    'Magnesium',
    'Sodium',
    'Potassium',
    'Boron',
    'CO_3',
    'HCO_3',
    'SO_4',
    'Chlorine',
    'NO3_n',
    'Phosphorus',
    'pH',
    'Conductivity',
    'SAR',
    'Iron',
    'Zinc',
    'Copper',
    'Manganese',
    'Arsenic',
    'Barium',
    'Nickel',
    'Cadmium',
    'Lead',
    'Chromium',
    'Fluorine',
    'Cb'
]
var fieldObject = {
    'Calcium': "",
    'Magnesium': "",
    'Sodium': "",
    'Potassium':"",
    'Boron':"",
    'CO_3':"",
    'HCO_3':"",
    'SO_4':"",
    'Chlorine':"",
    'NO3_n':"",
    'Phosphorus':"",
    'pH':"",
    'Conductivity':"",
    'SAR':"",
    'Iron':"",
    'Zinc':"",
    'Copper':"",
    'Manganese':"",
    'Arsenic':"",
    'Barium':"",
    'Nickel':"",
    'Cadmium':"",
    'Lead':"",
    'Chromium':"",
    'Fluorine':"",
    'Cb':""
}


var solutions = ["Control", 
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

const SolutionForm = () =>{
    const [inputFields, setInputFields] = useState([
        fieldObject
    ])
    const [solution, setSolution] = useState("")
    const addFields = () => {
        let newFields = fieldObject;
        setInputFields([...inputFields, newFields]);
    }

    const handleFormChange = (event,index) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        console.log(data);
        setInputFields(data);
    }

    const handleSubmit = async () => {
        const data = new FormData();
        data.append('inputFields', JSON.stringify(inputFields));
        let response = await fetch('https://soy-api2.herokuapp.com/db/solution_data',{
            method: 'POST',
            body: data,
            redirect: 'follow'
        }).catch(error=>console.log('error', error))
        const json = await response.json();
        console.log(json);
    }

    return(
        <>
            {inputFields.map((input,index) => {
            return(
                <Accordion key = {index}>
                    <AccordionSummary
                    expandIcon={<ExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography>Solution Data {index + 1}</Typography>
                    </AccordionSummary>
                    <Grid>
                        <FormControl sx={{ m: 1, minWidth: 320 }}>
                                <InputLabel htmlFor="solution-dd">Select a Solution</InputLabel>
                                <Select 
                                    id="solution-dd" 
                                    name = "solution" 
                                    onChange={event=>handleFormChange(event,index)} 
                                    value = {input.solution}>
                                    {solutions.map(el => <MenuItem value = {el}>{el}</MenuItem>)}
                                </Select>
                        </FormControl>
                    </Grid>
                    {fields.map(el => <FormControl > 
                                        <InputLabel htmlFor="my-input" >{el}</InputLabel> 
                                        <Input
                                            type = 'number'
                                            sx={{ m: 1, maxWidth: 150 }}
                                            name = {el}
                                            value = {input.el} 
                                            onChange = {event => handleFormChange(event, index)}/>
                                    </FormControl>
                    )}
                </Accordion>
            )})}
            <Grid>
                <Button variant = "contained" sx={{ m: 1, minWidth: 150 }} onClick = {handleSubmit}>Submit</Button>
            </Grid>
            <Grid>
                <Button variant = "contained" sx={{ m: 1, minWidth: 150 }} onClick = {addFields}>Add More Data</Button>
            </Grid>
        </>
    );
}
export default SolutionForm