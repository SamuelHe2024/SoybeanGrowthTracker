//REACT COMPONENT FOR DRY WEIGHT DATA TABLE
import {React, useState} from 'react'

import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
const DryWeight =()=>{
    const [rowData] = useState([
        {solution: "d", 'dry weight': 200}
    ])

    const [columnDefs] = useState([
        {field: 'solution'},
        {field: 'dry weight'}
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
export default DryWeight;