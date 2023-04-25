import {React} from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

const ModalPopup = ({data, open, onClose}) => {
    console.log(data);
    return(
        <Modal
        open = {open}
        onClose = {onClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description">
            <Box sx = {{ ...style, width: 400 }}>
                <div><strong>Image Name: </strong>{data['raw_data'][1]['image_name']}</div>
                <div><strong>Solution: </strong>{data['raw_data'][2]['day_prediction']}</div>
                <div><strong>Confidence: </strong>{data['raw_data'][5]['accuracy']}</div>
                <img src = {data['raw_data'][3]['image_url']} width = "350"></img>
            </Box>
        </Modal>
    )
}
export default ModalPopup;