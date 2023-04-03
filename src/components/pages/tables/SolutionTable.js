//REACT COMPONENT THAT INCLUDES IMAGES AND THEIR PREDICTED DAY OF GROWTH
//REACT COMPONENT FOR DRY WEIGHT DATA TABLE
import {React, useState, useMemo, useCallback, useEffect} from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

const SolutionTable = () =>{
    const [rowData, setRowData] = useState()

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
        {field: 'sar'},
        {field: 'iron'},
        {field: 'zinc'},
        {field: 'copper'},
        {field: 'manganese'},
        {field: 'arsenic'},
        {field: 'barium'},
        {field: 'nickel'},
        {field: 'cadmium'},
        {field: 'lead'},
        {field: 'chromium'},
        {field: 'fluorine'},
        {field: 'cb'}
    ])
    useEffect(() => {
        fetch('http://localhost:5000/db/solution_data')
        .then(result => result.json())
        .then(rowData => setRowData(rowData['row_data']))
      }, []);

    const gridOptions = {
        defaultColDef: {
            resizable: true,
        }
    }

    return(
        <div className='ag-theme-alpine' style={{height: '100vh'}}>
            <AgGridReact
                gridOptions={gridOptions}
                rowData={rowData}
                columnDefs={columnDefs}
                pagination={true}
                >
            </AgGridReact>
        </div>
    );
}
export default SolutionTable;