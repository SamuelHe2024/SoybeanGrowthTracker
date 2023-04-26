//REACT COMPONENT THAT INCLUDES IMAGES AND THEIR PREDICTED DAY OF GROWTH
//REACT COMPONENT FOR DRY WEIGHT DATA TABLE
import {React, useState, useMemo, useCallback, useEffect} from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { Button, Grid, Box } from '@mui/material'

const SolutionTable = () =>{
    const [rowData, setRowData] = useState()
    const [mgImg, setMgImg] = useState()
    const [kImg, setKImg] = useState()
    const [nImg, setNImg] = useState()
    const [mgHidden, setMgHidden] = useState(true);
    const [nHidden, setnHidden] = useState(true);
    const [kHidden, setkHidden] = useState(true);
    const [genDisable, setGenDisable] = useState(false);

    const [columnDefs, setColumnDefs] = useState([
        {field: 'solution'},
        {field: 'calcium'},
        {field: 'magnesium'},
        {field: 'sodium'},
        {field: 'potassium'},
        {field: 'boron'},
        {field: 'co_3'},
        {field: 'hco_3'},
        {field: 'so_4'},
        {field: 'chlorine'},
        {field: 'no3_n'},
        {field: 'phosphorus'},
        {field: 'ph'},
        {field: 'conductivity'},
        {field: 'hardness_caco3'}, 
        {field: 'hardness_ppm'}, 
        {field: 'alkalinity'}, 
        {field: 'tds'}, 
        {field: 'sar'},
        {field: 'iron'},
        {field: 'zinc'},
        {field: 'copper'},
        {field: 'manganese'},
        {field: 'cb'},
        {field: 'day_of_growth'}
    ])
    useEffect(() => {
        fetch('https://soy-api2.herokuapp.com/db/solution_data')
        .then(result => result.json())
        .then(rowData => setRowData(rowData['row_data']));
      }, []);

    const fetchMgImage = async () => {
        const res = await fetch("https://soy-api2.herokuapp.com/db/interpolated_solution_data/Magnesium")
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setGenDisable(false);
        setMgImg(imageObjectURL);
    }  
    const fetchNImage = async () => {
        const res = await fetch("https://soy-api2.herokuapp.com/db/interpolated_solution_data/Nitrogen")
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setGenDisable(false);
        setNImg(imageObjectURL);
    }  
    const fetchKImage = async () => {
        const res = await fetch("https://soy-api2.herokuapp.com/db/interpolated_solution_data/Potassium")
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setGenDisable(false);
        setKImg(imageObjectURL);
    }  
    const gridOptions = {
        defaultColDef: {
            resizable: true,
        }
    }

    const genMgMap = async () =>{
        setGenDisable(true);
        setnHidden(true);
        setkHidden(true);
        fetchMgImage();
        setMgHidden(false);
    }
    const genNMap = async () =>{
        setGenDisable(true);
        setMgHidden(true);
        setkHidden(true);
        fetchNImage();
        setnHidden(false);
    }
    const genKMap = async () =>{
        setGenDisable(true);
        setMgHidden(true);
        setnHidden(true);
        fetchKImage();
        setkHidden(false);
    }
    return(
        <Grid>
            <Grid>
                <Box 
                    component = "img" 
                    src = {mgImg}
                    sx={{
                        width: '100vw',
                    }}
                    hidden = {mgHidden}
                />
                <Box 
                    component = "img" 
                    src = {nImg}
                    sx={{
                        width: '100vw',
                    }}
                    hidden = {nHidden}
                />
                <Box 
                    component = "img" 
                    src = {kImg}
                    sx={{
                        width: '100vw',
                    }}
                    hidden = {kHidden}
                />
            </Grid>
            <Grid>
                <Button onClick = {genMgMap} variant = 'contained' disabled = {genDisable}>
                    Magnesium Heat Map
                </Button>
                <Button onClick = {genKMap} variant = 'contained' disabled = {genDisable}>
                    Potassium Heat Map
                </Button>
                <Button onClick = {genNMap} variant = 'contained' disabled = {genDisable}>
                    Nitrogen Heat Map
                </Button>
            </Grid>
            <div className='ag-theme-alpine' style={{height: '100vh'}}>
                <AgGridReact
                    gridOptions={gridOptions}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    pagination={true}
                    >
                </AgGridReact>
            </div>
        </Grid>
    );
}
export default SolutionTable;