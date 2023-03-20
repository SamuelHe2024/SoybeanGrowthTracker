//REACT COMPONENT THAT INCLUDES IMAGES AND THEIR PREDICTED DAY OF GROWTH
//REACT COMPONENT FOR DRY WEIGHT DATA TABLE
import {React, useState, useMemo, useCallback, useEffect} from 'react'

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
                    {"solution":null},
                    {"accuracy":null}]
    })
    const [columnDefs, setColumnDefs] = useState([
        {field: 'id'},
        {field: 'image_name'},
        {field: 'day_prediction'},
        {field: 'image_url'},
        {field: 'segmented_image_url'},
        {field: 'solution'},
        {field: 'accuracy'}
    ])

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
        // fetch('http://localhost:5000/db/image_data')
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