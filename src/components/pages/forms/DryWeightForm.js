import {React, useState} from 'react'
import {FormControl,InputLabel, Input, FormHelperText, Select, MenuItem, Button, Grid} from '@mui/material';

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
    const [dryWeight, setDryWeight] = useState("")
    const [solution, setSolution] = useState("")

    const handleDWEvent = event => {
        setDryWeight(event.target.value)
    }

    const handleSolutionEvent = event => {
        setSolution(event.target.value)
    }

    const handleSubmit = () => {
        if (!isNaN(dryWeight) && !isNaN(parseFloat(dryWeight))){
            const data = new FormData();
            var submitLabel = ["dryWeight", "solution"]
            var submitObj = [dryWeight, solution]
            for(let i = 0; i < submitLabel.length; i++){
                data.append(submitLabel[i], submitObj[i])
            }
            fetch("http://localhost:5000/db/dry_weight", {
                    method: "POST", 
                    body: data
                }).then(res => console.log(res))
        }
        else{
            console.log("not valid number!")
        }
        
    }

    return(
        <>
            <Grid>
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel htmlFor="solution-dd">Select a Solution</InputLabel>
                        <Select id="solution-dd" aria-describedby="my-helper-text" label = "Solution" onChange={handleSolutionEvent} value = {solution}>
                            {solutions.map(el => <MenuItem value = {el}>{el}</MenuItem>)}
                        </Select>
                </FormControl>
            </Grid>
            <Grid>
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel htmlFor="my-input">Enter Dry Weight</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" onChange = {handleDWEvent} value = {dryWeight}/>
                </FormControl>
            </Grid>
            <Grid>
                <Button sx={{ m: 1, minWidth: 200 }} variant = "contained" onClick = {handleSubmit}>Submit</Button>
            </Grid>
        </>
    )
}
export default DryWeightForm