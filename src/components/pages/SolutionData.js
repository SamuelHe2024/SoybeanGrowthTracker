//REACT COMPONENT THAT INCLUDES IMAGES AND THEIR PREDICTED DAY OF GROWTH
//REACT COMPONENT FOR DRY WEIGHT DATA TABLE
import {React, useState} from 'react'

import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

const SolutionData = () =>{
    const [rowData] = useState([
        {solution: "d", concentration: 200, calcium: 0.2}
    ])

    const [columnDefs] = useState([
        {field: 'solution'},
        {field: 'concentration'},
        {field: 'calcium'}
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
export default SolutionData;