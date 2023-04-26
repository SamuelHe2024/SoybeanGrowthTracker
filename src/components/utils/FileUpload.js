import React, {useState} from 'react'
import '../../App.css'
import { green } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { maxHeight, maxWidth } from '@mui/system';
import { Button, Grid, CircularProgress, Box, Alert} from '@mui/material'


function generateUID() { 
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const MAX_COUNT = 10;
function getExtension(filename){
    return filename.split('.').pop();
}
const FileUpload = () => {
    const [predictExist, setPredictExist] = useState(false);
    const [success, setSuccess] = useState(false);
    const [limitExceeded, setLimitExceeded] = useState(false);
    const [invalidFiles, setInvalidFiles] = useState([]);
    const [hasInvalidFiles, setHasInvalidFiles] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [pictures, setPictures] = useState([]);
    const [hasFile, setHasFile] = useState(uploadedFiles.length > 0);
    const [fileLimit, setFileLimit] = useState(false);
    const [predictions, setPredictions] = useState([]);
    const [requestFailed, setRequestFailed] = useState(false);

    const handleUploadFiles = files => {
        const uploaded = [];
        let limitExceeded = false;
        files.some((file) => {
            if (uploaded.findIndex((f)=>f['file'].name === file['file'].name) === -1){
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
        if (!limitExceeded && !hasInvalidFiles){ 
            setUploadedFiles(uploaded)
            setHasFile(true)
        }
    }


    const uploadFiles = () => {
        const data = new FormData();
        for(let file in uploadedFiles){
            data.append('files[]',uploadedFiles[file]['file'],file.filename);
        }
        data.append('predictions', JSON.stringify(predictions));
        fetch('https://soy-api2.herokuapp.com/upload',{
        // fetch('http://localhost:5000/upload',{
            method: 'POST',
            body: data,
            redirect: 'follow'
        }).catch(error => setRequestFailed(true));
    }

    const predict = async () => {
        setLoading(true);
        let p = [...predictions];
        for(let file in uploadedFiles){
            const data = new FormData();
            data.append('image',uploadedFiles[file].file);
            data.append('uid',uploadedFiles[file].id);

            const response = await fetch('https://soy-api.herokuapp.com/predict',{
                method: 'POST',
                body: data,
                redirect: 'follow'
            }).catch((error)=> {
                setPredictExist(false);
                setRequestFailed(true);
                console.log(error);
            }).then(setPredictExist(true));
            const json = await response.json();
            p[file] = json;
        }
        setPredictions(p)
        setSuccess(true);
        setLoading(false);
        await delay(5000);
        setSuccess(false);
    }

    const handleFileEvent = (e) =>{
        setRequestFailed(false);
        setSuccess(false);
        setLimitExceeded(false);
        setInvalidFiles([])
        setHasInvalidFiles(false);
        setPredictions([]);
        setHasFile(false);
        setPictures([]);
        
        const chosenFiles = Array.prototype.slice.call(e.target.files);
        const pictureArray = [];
        const predictionArray = [];
        const fileArray = [];

        let hasInvalid = false;
        let invalid = [];

        if(chosenFiles.length > MAX_COUNT){
            setLimitExceeded(true);
            return;
        }
        for(let i = 0; i < chosenFiles.length; i++){
                let uid = generateUID()
                if((getExtension(chosenFiles[i].name) === "png") || (getExtension(chosenFiles[i].name) === "jpg")){
                    pictureArray.push({"id": uid,"name":chosenFiles[i].name,"img":URL.createObjectURL(chosenFiles[i])})
                    predictionArray.push({"id": uid,"prediction" : "", "accuracy" : "", "filename" : chosenFiles[i].name})
                    fileArray.push({"id":uid, "file":chosenFiles[i]})
                }
                else{
                    invalid.push(chosenFiles[i].name);
                    hasInvalid = true;
                    setHasInvalidFiles(true);
                }
            }
        
        if(!hasInvalid){
                setPredictions(predictionArray);
                setPictures(pictureArray);
                handleUploadFiles(fileArray);
                return;
        }
        setInvalidFiles(invalid);
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
            "prediction": predictions.find(prediction => prediction.id === picture.id)
        }
    })

    const cards = picturesWithPrediction.map(data =>
        <Grid item>
            <Item style = {{ width: 200,  height: 220}}>
                <div style = {{ width: 200,  height: 150}}>
                    <img src = {data.img} style = {{ maxHeight: 150,  maxWidth: 150}}></img>
                </div>
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
                {cards}
            </Grid>
            <Box sx={{ m: 1, position: 'relative' }}>
                <Button variant = "contained" component = "label" disabled = {fileLimit}>
                    Select Files
                    <input id='fileUpload' type='file' multiple
                    hidden
                    onChange={handleFileEvent}
                    disabled={fileLimit}
                />
                </Button>
                <Button variant = "contained" color = "success" disabled = {!hasFile || loading || hasInvalidFiles || limitExceeded} onClick = {predict}>
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
                <Button variant = "contained" color = "success" disabled = {!hasFile || loading || hasInvalidFiles || limitExceeded || !predictExist} onClick = {uploadFiles}>
                    Upload Predictions
                </Button>
                {invalidFiles.map(eq => (<Alert key = {eq} severity = "error" hidden = {!hasInvalidFiles}>Invalid File Type for {eq}: Must use .jpg or .png filetype</Alert>))}
                <Alert severity = "error" hidden = {!limitExceeded} >You cannot upload more than {MAX_COUNT} files!</Alert>
                <Alert severity = "error" hidden = {!requestFailed} >[INTERNAL ERROR] Request failed to connect to server</Alert>
                <Alert severity = "success" hidden = {!success}>Successfully uploaded!</Alert>
            </Box>
        </div>
    );
}

export default FileUpload;