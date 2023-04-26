import {React, useState} from 'react'
import {FormControl,InputLabel, Input, Select, MenuItem, Alert, Button, Grid, Accordion} from '@mui/material';
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
    'hardness_caco3',
    'hardness_ppm',
    'alkalinity',
    'tds',
    'SAR',
    'Iron',
    'Zinc',
    'Copper',
    'Manganese',
    'Cb',
    'day_of_growth'
]

var solutions = ["Control", 
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

const SolutionForm = () =>{
    const [cannotDelete, setCannotDelete] = useState(false);
    const [requestFailed, setRequestFailed] = useState(false);
    const [dayError, setDayError] = useState(false);
    const [hasNull, setHasNull] = useState(true);
    const [success, setSuccess] = useState(false);
    const [inputFields, setInputFields] = useState([
        {
            'solution':"",
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
            'hardness_caco3':"",
            'hardness_ppm':"",
            'alkalinity':"",
            'tds':"",
            'SAR':"",
            'Iron':"",
            'Zinc':"",
            'Copper':"",
            'Manganese':"",
            'Cb':"",
            "day_of_growth":""
        }
    ])
    const addFields = () => {
        setCannotDelete(false);
        let newFields = {
            'solution':"",
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
            'hardness_caco3':"",
            'hardness_ppm':"",
            'alkalinity':"",
            'tds':"",
            'SAR':"",
            'Iron':"",
            'Zinc':"",
            'Copper':"",
            'Manganese':"",
            'Cb':"",
            "day_of_growth":""
        };
        console.log(inputFields)
        setInputFields([...inputFields, newFields]);
    }

    const handleFormChange = (event,index) => {
        setRequestFailed(false);
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        if(event.target.name === 'day_of_growth'){
            setDayError(false);
            if(data[index][event.target.name] > 29 || data[index][event.target.name] < 0){
                setDayError(true);
                return;
            }
        }
        setInputFields(data);
        for(let i in inputFields){
            for(let j in fields){
                if(inputFields[i][fields[j]] == ""){
                    setHasNull(true);
                    return;
                }
            }
        setHasNull(false);
        }
    }

    const handleSubmit = async () => {
        const data = new FormData();
        data.append('inputFields', JSON.stringify(inputFields));
        let response = await fetch('https://soy-api2.herokuapp.com/db/solution_data',{
            method: 'POST',
            body: data,
            redirect: 'follow'
        }).catch(error=>{setRequestFailed(true);})
        const json = await response.json();
        console.log(json);
        setSuccess(true);
        delay(5000);
        setSuccess(false);
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
                    <Button variant = "contained" onClick = {() => {
                            let newFormVal = [...inputFields];
                            if(newFormVal.length > 1){
                                newFormVal.splice(index,1);
                                setInputFields(newFormVal);
                            } else{
                                setCannotDelete(true);
                            }
                    }}>Remove</Button>
                </Accordion>
            )})}
            <Grid>
                <Button variant = "contained" sx={{ m: 1, minWidth: 200 }} onClick = {addFields}>Add Data</Button>
            </Grid>
            <Grid>
                <Button variant = "contained" sx={{ m: 1, minWidth: 200 }} onClick = {handleSubmit} disabled = {hasNull || dayError}>Submit</Button>
            </Grid>
            <Alert severity = "error" hidden = {!cannotDelete}> Cannot delete anymore cells!</Alert>
            <Alert severity = "success" hidden = {!success}>Successfully uploaded!</Alert>
            <Alert severity = "error" hidden = {!dayError}> Day of Growth must be between 0 and 29!</Alert>
            <Alert severity = "error" hidden = {!requestFailed} >[INTERNAL ERROR] Request failed to connect to server</Alert>
        </>
    );
}
export default SolutionForm