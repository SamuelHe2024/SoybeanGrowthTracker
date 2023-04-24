import {React, useState} from 'react'
import {FormControl,InputLabel, Input, FormHelperText, Select, MenuItem, Button, Grid, Menu} from '@mui/material';

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
    const [inputFields, setInputFields] = useState([
        {solution: '', dryWeight: ''}
    ])

    const handleSubmit = () => {
        const data = new FormData();
        let val = 0;
        for(let index in inputFields){
            if(isNaN(parseFloat(inputFields[index].dryWeight))){
            }
            data.append(val.toString(), inputFields[index])
            val += 1;
        }
        console.log(data.getAll("0"))
    }

    const addFields = () => {
        let newfield = {dryWeight: '', solution: ''}
        setInputFields([...inputFields, newfield])
    }
    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value
        setInputFields(data);
    }
    return(
        <>
            {inputFields.map((input,index) => {
                return(
                    <div key={index}>
                        <Select
                            sx = {{m: 1, minWidth: 200}}
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
                            sx = {{m: 1, minWidth: 200}}
                            name='dryWeight'
                            placeholder='Enter Dry Weight'
                            value={input.dryWeight}
                            onChange={event => handleFormChange(index, event)}
                        />
                    </div>
                )
            })}
            <Grid>
                <Grid>
                    <Button sx={{ m: 1, minWidth: 200 }} variant = "contained" onClick = {addFields}>Add more data</Button>
                </Grid>
                <Button sx={{ m: 1, minWidth: 200 }} variant = "contained" onClick = {handleSubmit}>Submit</Button>
            </Grid>
        </>
    )
}
export default DryWeightForm