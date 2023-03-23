import {React, useState} from 'react'
import {FormControl,InputLabel, Input, Select, MenuItem, Button, Grid} from '@mui/material';

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

    const [parameters, setParameters] = useState({'Calcium' : "",
    'Magnesium' : "",
    'Sodium' : "",
    'Potassium' : "",
    'Boron' : "",
    'CO_3' : "",
    'HCO_3' : "",
    'SO_4' : "",
    'Chlorine' : "",
    'NO3_n' : "",
    'Phosphorus' : "",
    'pH' : "",
    'Conductivity' : "",
    'SAR' : "",
    'Iron' : "",
    'Zinc' : "",
    'Copper' : "",
    'Manganese' : "",
    'Arsenic' : "",
    'Barium' : "",
    'Nickel' : "",
    'Cadmium' : "",
    'Lead' : "",
    'Chromium' : "",
    'Fluorine' : "",
    'Cb' : ""})

    const [solution, setSolution] = useState("")

    const handleSolutionEvent = event => {
        setSolution(event.target.value)
    }
    const handleParameterEvent = event => {
        const {name, value} = event.target
        setParameters(prevState => ({...prevState, [name] : value}))
    }

    const handleSubmit = () => {
        const data = new FormData();
        data.append("solution", solution)
        for(let parameter in parameters){
            data.append(parameter, parameters[parameter])
        }
        fetch("http://localhost:5000/db/solution_data", {
                    method: "POST", 
                    body: data
                }).then(res => console.log(res))
    }

    return(
        <>
            <Grid>
                <FormControl sx={{ m: 1, minWidth: 320 }}>
                        <InputLabel htmlFor="solution-dd">Select a Solution</InputLabel>
                        <Select id="solution-dd" aria-describedby="my-helper-text" label = "Solution" onChange={handleSolutionEvent} value = {solution}>
                            {solutions.map(el => <MenuItem value = {el}>{el}</MenuItem>)}
                        </Select>
                </FormControl>
            </Grid>
            {fields.map(el => <FormControl > 
                                <InputLabel htmlFor="my-input" >{el}</InputLabel> 
                                <Input name = {el} sx={{ m: 1, maxWidth: 150 }} onChange = {handleParameterEvent} aria-describedby="my-helper-text" />
                              </FormControl>
            )}
            <Grid>
                <Button variant = "contained" sx={{ m: 1, minWidth: 150 }} onClick = {handleSubmit}>Submit</Button>
            </Grid>
        </>
    );
}
export default SolutionForm