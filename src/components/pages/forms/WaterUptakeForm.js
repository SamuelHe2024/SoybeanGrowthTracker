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

var fields = ["Uptake Amount"]
const WaterUptakeForm =()=>{

    const [solution, setSolution] = useState("")
    const [recordDate, setRecordDate] = useState()
    const [uptakeAmount, setUptakeAmount] = useState("")

    const handleSubmit = () => {
        if (!isNaN(uptakeAmount) && !isNaN(parseFloat(uptakeAmount))){
            const data = new FormData();
            var submitLabel = ["solution", "recordDate", "uptakeAmount"]
            var temp = new Date()
            temp = recordDate['$d']
            temp = temp.toLocaleDateString("en-US")
            var submitObj = [solution, temp, uptakeAmount]
            for(let i = 0; i < submitLabel.length; i++){
                data.append(submitLabel[i], submitObj[i])
            }
            fetch("http://localhost:5000/db/water_uptake", {
                    method: "POST", 
                    body: data
                }).then(res => console.log(res))
        }
        else{
            console.log("not valid number!")
        }
        
    }

    const handleSolutionEvent = event => {
        setSolution(event.target.value)
    }

    const handleUptakeEvent = event => {
        setUptakeAmount(event.target.value)
    }

    return(
        <>
            <Grid>
                <FormControl sx={{m:1, minWidth: 200 }}>
                        <InputLabel htmlFor="solution-dd">Select a Solution</InputLabel>
                        <Select id="solution-dd" aria-describedby="my-helper-text" label = "Solution" onChange={handleSolutionEvent} value = {solution}>
                            {solutions.map(el => <MenuItem value = {el}>{el}</MenuItem>)}
                        </Select>
                </FormControl>
            </Grid>
            <Grid>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            label="Date of Record" 
                            sx={{ m: 1, maxWidth: 200 }} 
                            onChange = {setRecordDate} 
                            value = {recordDate}/>
                    </DemoContainer>
                </LocalizationProvider>
            </Grid>
            <Grid>
                <FormControl > 
                    <InputLabel htmlFor="my-input">Uptake Amount</InputLabel> 
                    <Input sx={{ m: 1, minWidth: 200 }} onChange={handleUptakeEvent} value={uptakeAmount} id="my-input" aria-describedby="my-helper-text" />
                </FormControl>
            </Grid>
            <Grid>
                <Button variant = "contained" sx={{ m: 1, minWidth: 200 }} onClick = {handleSubmit}>Submit</Button>
            </Grid>
        </>
    );
}
export default WaterUptakeForm