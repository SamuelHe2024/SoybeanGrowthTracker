//REACT COMPONENT THAT INCLUDES DATA TABLE FOR WATER UPTAKE//REACT COMPONENT THAT INCLUDES IMAGES AND THEIR PREDICTED DAY OF GROWTH
import {React, useState, useMemo, useCallback, useEffect} from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
const WaterUptake = () =>{
    const [rowData, setRowData] = useState()

    const [columnDefs, setColumnDefs] = useState([
        {field: 'id'},
        {field: 'solution'},
        {field: 'uptake amount'},
        {field: 'uptake date'}
    ])

    const defaultColDef = useMemo(()=> ({
        sortable:true
    }))

    // Example of consuming Grid Event
    const cellClickedListener = useCallback( event => {
        console.log('cellClicked', event);
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/db/water_uptake')
        .then(result => result.json())
        .then(rowData => setRowData(rowData['row_data']))
      }, []);

    return(
        <div className='ag-theme-alpine-dark' style={{height: '100vh'}}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                pagination={true}>
            </AgGridReact>
        </div>
    );
}
export default WaterUptake;