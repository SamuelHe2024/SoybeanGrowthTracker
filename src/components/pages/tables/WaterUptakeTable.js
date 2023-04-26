//REACT COMPONENT THAT INCLUDES DATA TABLE FOR WATER UPTAKE//REACT COMPONENT THAT INCLUDES IMAGES AND THEIR PREDICTED DAY OF GROWTH
import {React, useState, useMemo, useCallback, useEffect} from 'react'
import { AgGridReact } from 'ag-grid-react'
import { green } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { Button, Box, Grid} from '@mui/material'
const WaterUptakeTable = () =>{
    const [rowData, setRowData] = useState()
    const [maxUptake, setMaxUptake] = useState()
    const [maxSol, setMaxSol] = useState()
    const [columnDefs, setColumnDefs] = useState([
        {field: 'solution'},
        {field: 'uptake amount'},
        {field: 'day_of_growth'}
    ])

    const defaultColDef = useMemo(()=> ({
        sortable:true
    }))

    // Example of consuming Grid Event
    const cellClickedListener = useCallback( event => {
        console.log('cellClicked', event);
    }, []);

    useEffect(() => {
        fetch('https://soy-api2.herokuapp.com/db/water_uptake')
        // fetch('http://localhost:5000/db/water_uptake')
        .then(result => result.json())
        .then(rowData => setRowData(rowData['row_data']))
      }, []);
    
    const findMaxUptake = async () => {
        const res = await fetch("https://soy-api2.herokuapp.com/db/interpolated_water_uptake")
        const json = await res.json();
        console.log(json)
        setMaxSol(json.solution)
        setMaxUptake(json.maxVal)
    }
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
    return(
        <div>
            <Grid item>
                <Item style = {{ width: 300}}>
                    Maximum Water Uptake: {maxUptake}
                </Item>
                <Item style = {{ width: 300}}>
                    Corresponding Solution: {maxSol}
                </Item>
            </Grid>
            <Button style = {{ width: 300}} variant = "contained" onClick = {findMaxUptake}>
                Find Maximum Water Uptake
            </Button>
            <div className='ag-theme-alpine' style={{height: '100vh'}}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    pagination={true}>
                </AgGridReact>
            </div>
        </div>
    );
}
export default WaterUptakeTable;