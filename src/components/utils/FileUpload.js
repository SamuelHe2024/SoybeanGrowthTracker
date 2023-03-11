import React, {useState} from 'react'
import '../../App.css'
import { Button, Typography } from '@mui/material'

const MAX_COUNT = 10;

const FileUpload = () => {

    const [uploadedFiles, setUploadedFiles] = useState([])
    const [hasFile, setHasFile] = useState(uploadedFiles.length > 0)
    const [fileLimit, setFileLimit] = useState(false);

    const handleUploadFiles = files => {
        const uploaded = [...uploadedFiles];
        let limitExceeded = false;
        files.some((file) => {
            if (uploaded.findIndex((f)=>f.name === file.name) === -1){
                uploaded.push(file);
                if(uploaded.length === MAX_COUNT) setFileLimit(true);
                if(uploaded.length > MAX_COUNT){
                    alert(`You can only add a maximum of ${MAX_COUNT} files`);
                    setFileLimit(false);
                    limitExceeded = true;
                    return true;
                }
            }
        })
        if (!limitExceeded) setUploadedFiles(uploaded)
        setHasFile(true)
    }

    const uploadFiles = () => {
        const data = new FormData();
        for(const file of uploadedFiles){
            data.append('files[]', file, file.name);
        }
        console.log(data.getAll('files[]'))
        // fetch('https://soy-api2.herokuapp.com/upload',{
        //     method: 'POST',
        //     body: data,
        //     redirect: 'follow'
        // }).catch(error => console.log('error', error));
        fetch('http://localhost:5000/predict',{
            method: 'POST',
            body: data,
            redirect: 'follow'
        }).then(response=>response.text())
        .then(res=>{console.log(res)})
        .catch(error => console.log('error', error));
    }

    const handleFileEvent = (e) =>{
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFiles)
    }

    return(
        <div>
            <Button variant = "contained" component = "label" disabled = {fileLimit}>
                Select Files
                <input id='fileUpload' type='file' multiple
                hidden
                onChange={handleFileEvent}
                disabled={fileLimit}
            />
            </Button>
            <br></br>
            <Button variant = "contained" color = "success" disabled = {!hasFile} onClick = {uploadFiles}>
                Upload
            </Button>
            <div className='uploaded-files-list'>
                {uploadedFiles.map(function(file,i){
                    return <div key={i}>{file.name}</div>
                })}
            </div>
        </div>
    );
}

export default FileUpload;