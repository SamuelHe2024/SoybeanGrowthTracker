//REACT COMPONENT THAT INCLUDES DATA TABLE FOR WATER UPTAKE//REACT COMPONENT THAT INCLUDES IMAGES AND THEIR PREDICTED DAY OF GROWTH
import {React, useState} from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
const WaterUptake = () =>{
    const [rowData] = useState([
        {solution: "d", uptake_amount: 200, uptake_date: "2/20/2023"}
    ])

    const [columnDefs] = useState([
        {field: 'solution'},
        {field: 'uptake_amount'},
        {field: 'uptake_date'}
    ])

    return(
        <div className='ag-theme-alpine-dark' style={{height: '100vh'}}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}>
            </AgGridReact>
        </div>
    );
}
export default WaterUptake;