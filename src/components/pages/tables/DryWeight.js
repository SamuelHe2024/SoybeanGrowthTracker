//REACT COMPONENT FOR DRY WEIGHT DATA TABLE
import {React, useState, useMemo, useCallback, useEffect} from 'react'

import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
const DryWeight =()=>{
    const [rowData, setRowData] = useState()

    const [columnDefs, setColumnDefs] = useState([
        {field: 'id'},
        {field: 'solution'},
        {field: 'dry weight'}
    ])

    const defaultColDef = useMemo(()=> ({
        sortable:true
    }))

    // Example of consuming Grid Event
    const cellClickedListener = useCallback( event => {
        console.log('cellClicked', event);
    }, []);

    useEffect(() => {
        fetch('https://soy-api2.herokuapp.com/db/dry_weight')
        .then(result => result.json())
        .then(rowData => setRowData(rowData['row_data']))
      }, []);

    return(
        <div className='ag-theme-alpine' style={{height: '100vh'}}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                pagination={true}>
            </AgGridReact>
        </div>
    );
}
export default DryWeight;