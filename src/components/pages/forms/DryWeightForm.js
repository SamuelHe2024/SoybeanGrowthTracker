import {React, useState} from 'react'
import {Input, Select, MenuItem, Button, Grid, Alert} from '@mui/material';
import { wait } from '@testing-library/user-event/dist/utils';

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

const DryWeightForm = () =>{
    const [cannotDelete, setCannotDelete] = useState(false);
    const [inputFields, setInputFields] = useState([
        {solution: '', dryWeight: ''}
    ])

    const handleSubmit = async () => {
        const data = new FormData();
        for(let index in inputFields){
            if(isNaN(parseFloat(inputFields[index].dryWeight))){
                console.log('NOT A VALID ENTRY')
                return;
            }
        }
        data.append('inputFields', JSON.stringify(inputFields));
        let response =  await fetch('https://soy-api2.herokuapp.com/db/dry_weight',{
            method: 'POST',
            body: data,
            redirect: 'follow'
        })
        .catch(error => console.log('error', error))
        const json = await response.json();
        console.log(json);
    }

    const addFields = () => {
        setCannotDelete(false);
        setInputFields([...inputFields, {dryWeight: '', solution: ''}])
    }
    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
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
                        <Button onClick = {(index) => {
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
                    <Button sx={{ m: 1, minWidth: 200 }} variant = "contained" onClick = {addFields}>Add more data</Button>
                </Grid>
                <Button sx={{ m: 1, minWidth: 200 }} variant = "contained" onClick = {handleSubmit}>Submit</Button>
            </Grid>
            <Alert severity = "error" hidden = {!cannotDelete} >Cannot delete anymore cells!</Alert>
        </>
    )
}
export default DryWeightForm