import React, {useState} from 'react'
import '../../App.css'
import { green } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Button, ListItemText, Typography, Grid, CircularProgress, Box} from '@mui/material'

const MAX_COUNT = 10;
function getExtension(filename){
    return filename.split('.').pop();
}
const FileUpload = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [pictures, setPictures] = useState([]);
    const [hasFile, setHasFile] = useState(uploadedFiles.length > 0);
    const [fileLimit, setFileLimit] = useState(false);
    const [predictions, setPredictions] = useState([]);
    const handleUploadFiles = files => {
        const uploaded = [];
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
        setLoading(true);
        for(const file of uploadedFiles){
            data.append('files[]', file, file.name);
        }
        // fetch('https://soy-api2.herokuapp.com/upload',{
        //     method: 'POST',
        //     body: data,
        //     redirect: 'follow'
        // }).catch(error => console.log('error', error));
        fetch('http://localhost:5000/predict',{
            method: 'POST',
            body: data,
            redirect: 'follow'
        }).then(response=>response.json())
        .then(response=>{setPredictions(response)})
        .then(response=>{console.log(response);
                         setLoading(false)})
        .catch(error => console.log('error', error));
    }

    const handleFileEvent = (e) =>{
        setPredictions([])
        setPictures([])
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        const pictureArray = []
        const predictionArray = []
        for(let i = 0; i < chosenFiles.length; i++){
            pictureArray.push({"name":chosenFiles[i].name,"img":URL.createObjectURL(chosenFiles[i])})
            predictionArray.push({"id": i,"prediction" : "", "accuracy" : "", "filename" : chosenFiles[i].name})
        }
        setPredictions(predictionArray)
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

    const picturesWithPrediction = pictures.map(picture =>{
        return {
            ...picture,
            "prediction": predictions.find(prediction => prediction.filename == picture.name)
        }
    })

    const cards = picturesWithPrediction.map(data =>
        <Grid item>
            <Item height = "200" width = "200">
                <img src = {data.img} height = "200px" width = "200px"></img>
                    <div>
                    <strong>Image Name: </strong>{data.name}
                    </div>
                    <div>
                        <strong>Day Range: </strong> {data.prediction.prediction}<br/>
                        <strong>Confidence: </strong> {Math.round(data.prediction.accuracy*1000,3)/10}%
                    </div>
                </Item>
        </Grid>
    )

    return(
        <div>
            <Grid sx={{ m: 1, position: 'relative' }} className='uploaded-files-list' container spacing={2}>
                <Grid>{cards}</Grid>
            </Grid>
            <Button sx={{ m: 1, position: 'relative' }} variant = "contained" component = "label" disabled = {fileLimit}>
                Select Files
                <input id='fileUpload' type='file' multiple
                hidden
                onChange={handleFileEvent}
                disabled={fileLimit}
            />
            </Button>
            <br></br>
            <Box sx={{ m: 1, position: 'relative' }}>
                <Button variant = "contained" color = "success" disabled = {!hasFile || loading} onClick = {uploadFiles}>
                    Predict
                </Button>
                {loading && (<CircularProgress
                    size = {24}
                    sx={{
                        color: green[500],
                        position: 'absolute',
                        top: '50%',
                        marginTop: '-12px',
                        marginLeft: '-60px',
                      }}
                />)}
            </Box>
        </div>
    );
}

export default FileUpload;