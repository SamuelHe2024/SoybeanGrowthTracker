//REACT COMPONENT THAT INCLUDES IMAGES AND THEIR PREDICTED DAY OF GROWTH
//REACT COMPONENT FOR DRY WEIGHT DATA TABLE
import {React, useState, useCallback, useEffect} from 'react'

import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import ModalPopup from '../../utils/Modal'

const ImageTable = () => {
    const [rowData, setRowData] = useState()
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState({
        "raw_data":[{"id":null},
                    {"image_name":null},
                    {"day_prediction":null},
                    {"image_url":null},
                    {"segmented_image_url":null},
                    {"accuracy":null}]
    })
    const [columnDefs] = useState([
        {field: 'image_name', maxWidth: 150},
        {field: 'day_prediction'},
        {field: 'accuracy'}
    ])

    const gridOptions = {
        defaultColDef: {
            resizable: true,
            maxWidth: 200
        }
    }

    const handleOpen = () => {
        setModalOpen(true);
    }

    const handleClose = () => {
        setModalOpen(false);
    }

    const cellClickedListener = useCallback( event => {
        fetch('https://soy-api2.herokuapp.com/db/image_data/' + event.data.id)
        .then(response => response.json())
        .then(data => setModalData(data))
        .then(handleOpen)
    }, []);

    useEffect(() => {
        fetch('https://soy-api2.herokuapp.com/db/image_data')
        .then(result => result.json())
        .then(rowData => setRowData(rowData['row_data']))
      }, []);

    const clickButton = () => {
        console.log(modalData['raw_data'])
    }

    return(
        <>
            <div className='ag-theme-alpine' style={{height: '100vh'}}>
                <AgGridReact
                    gridOptions={gridOptions}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    pagination={true}
                    onRowDoubleClicked={cellClickedListener}>
                </AgGridReact>
            </div>
            <button onClick={clickButton}>
                Press me
            </button>
            <ModalPopup
                data = {modalData}
                open = {modalOpen}
                onClose = {handleClose}>
            </ModalPopup>
        </>
    );
}
export default ImageTable;