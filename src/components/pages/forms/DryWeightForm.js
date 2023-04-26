import {React, useState} from 'react'
import { green } from '@mui/material/colors';
import {Input, Select, MenuItem, Button, Grid, Alert,CircularProgress} from '@mui/material';

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

const DryWeightForm = () =>{
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [dayError, setDayError] = useState(false);
    const [hasNull, setHasNull] = useState(true);
    const [cannotDelete, setCannotDelete] = useState(false);
    const [requestFailed, setRequestFailed] = useState(false);
    const [inputFields, setInputFields] = useState([
        {solution: '', dryWeight: '', rawWeight: '', percentBiomass: 0}
    ])

    const handleSubmit = async () => {
        const data = new FormData();
        for(let index in inputFields){
            let percentBiomass = (parseFloat(inputFields[index].rawWeight) - parseFloat(inputFields[index].dryWeight))/parseFloat(inputFields[index].rawWeight)*100
            if(isNaN(parseFloat(inputFields[index].dryWeight))){
                console.log('NOT A VALID ENTRY')
                return;
            }
            inputFields[index].percentBiomass = percentBiomass;
        }
        console.log(inputFields)
        data.append('inputFields', JSON.stringify(inputFields));
        let response =  await 
        fetch('https://soy-api2.herokuapp.com/db/dry_weight',{
        // fetch('http://localhost:5000/db/dry_weight',{ 
            method: 'POST',
            body: data,
            redirect: 'follow'
        })
        .catch(error => {setRequestFailed(true);})
        const json = await response.json();
        setSuccess(true);
        setLoading(false);
        await delay(5000);
        setSuccess(false);
    }

    const addFields = () => {
        setCannotDelete(false);
        setInputFields([...inputFields, {dryWeight: '', solution: '', rawWeight: ''}])
    }
    const handleFormChange = (index, event) => {
        setRequestFailed(false);
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
        for(let i in inputFields){
            if(inputFields[i]['solution'] == "" || inputFields[i]['rawWeight'] == "" || inputFields[i]['dryWeight'] == "" ){
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
                    <div key={index}>
                        <Select
                            sx = {{m: 1, width: 200}}
                            name='solution'
                            placeholder='Solution'
                            value={input.solution}
                            onChange={event => handleFormChange(index, event)}
                        >
                            {solutions.map((el)=>{
                                return(
                                    <MenuItem value = {el}>
                                        {el}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                        <Input
                            sx = {{m: 1, width: 200}}
                            name='dryWeight'
                            placeholder='Enter Dry Weight'
                            value={input.dryWeight}
                            onChange={event => handleFormChange(index, event)}
                            type = 'number'
                        />
                        <Input
                            sx = {{m: 1, width: 200}}
                            name='rawWeight'
                            placeholder='Enter Raw Weight'
                            value={input.rawWeight}
                            onChange={event => handleFormChange(index, event)}
                            type = 'number'
                        />
                        <Button variant = "contained" onClick = {() => {
                            let newFormVal = [...inputFields];
                            if(newFormVal.length > 1){
                                newFormVal.splice(index,1);
                                setInputFields(newFormVal);
                            } else{
                                setCannotDelete(true);
                            }
                        }}>Remove</Button>
                    </div>
                )
            })}
            <Grid>
                <Grid>
                    <Button sx={{ m: 1, minWidth: 200 }} variant = "contained" onClick = {addFields}>Add data</Button>
                </Grid>
                <Grid>
                    <Button color = "success" variant = "contained" sx={{ m: 1, minWidth: 200 }} onClick = {handleSubmit} disabled = {hasNull || dayError || loading}>Submit</Button>
                    {loading && (<CircularProgress
                    size = {24}
                    sx={{
                        color: green[500],
                        position: 'absolute',
                        top: '50%',
                        marginTop: '-12px',
                        marginLeft: '-60px',
                      }}
                />)}
                </Grid>            
            </Grid>
            <Alert severity = "error" hidden = {!cannotDelete} >Cannot delete anymore cells!</Alert>
            <Alert severity = "success" hidden = {!success}>Successfully uploaded!</Alert>
            <Alert severity = "error" hidden = {!requestFailed} >[INTERNAL ERROR] Request failed to connect to server</Alert>
        </>
    )
}
export default DryWeightForm