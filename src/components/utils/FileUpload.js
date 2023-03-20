import React, {useState} from 'react'
import '../../App.css'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Button, ListItemText, Typography, Grid} from '@mui/material'

const MAX_COUNT = 10;
function getExtension(filename){
    return filename.split('.').pop();
}
const FileUpload = () => {

    const [uploadedFiles, setUploadedFiles] = useState([])
    const [pictures, setPictures] = useState([])
    const [hasFile, setHasFile] = useState(uploadedFiles.length > 0)
    const [fileLimit, setFileLimit] = useState(false);
    const [predictions, setPredictions] = useState([]);
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
        fetch('https://soy-api2.herokuapp.com/upload',{
            method: 'POST',
            body: data,
            redirect: 'follow'
        }).catch(error => console.log('error', error));
        fetch('http://localhost:5000/predict',{
            method: 'POST',
            body: data,
            redirect: 'follow'
        }).then(response=>response.json())
        .then(response=>{setPredictions(response)})
        .catch(error => console.log('error', error));
    }

    const handleFileEvent = (e) =>{
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        const pictureArray = []
        for(let i = 0; i < chosenFiles.length; i++){
            console.log(chosenFiles[i])
            pictureArray.push({"name":chosenFiles[i].name,"img":URL.createObjectURL(chosenFiles[i])})
        }
        setPictures(pictureArray)
        handleUploadFiles(chosenFiles)
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    const handleClick = () =>{
        console.log(predictions)
    }

    const arrayPredictions = predictions.map(course => 
        <Grid key={course.id}>
          <Item></Item>
          <Item><strong>{course.filename}</strong>: prediction: {course.prediction}</Item>
          <Item>Confidence: {Math.round(course.accuracy*1000,3)/10}%</Item>
        </Grid>
    )

    return(
        <div>
            <Grid className='uploaded-files-list' container spacing={2}>
                {pictures.map(function(file,i){
                    return <Grid item><Item key={i}><img src = {file.img} width = "300"></img>{file.name}</Item></Grid>
                })}
            </Grid>
            <Grid>{arrayPredictions}</Grid>
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
                Predict
            </Button>
            
            

            {/* <Grid container spacing={2}>
                <Button onClick = {handleClick}>
                    bazinga
                </Button>
            </Grid> */}

        </div>
    );
}

export default FileUpload;