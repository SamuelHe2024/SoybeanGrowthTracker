import {React} from 'react'
import {FormControl,InputLabel, Input, FormHelperText} from '@mui/material';
const DryWeightForm =()=>{
    return(
        <>
            <FormControl>
                <InputLabel htmlFor="my-input">Dry Weight</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl >
                    <InputLabel htmlFor="my-input">Solution Type</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
        </>
    )
}
export default DryWeightForm