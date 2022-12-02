import React, {Component} from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.css';
import Results from './Results'
import '../App.css'

class FileUpload extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
        isLoading: false, //is the prediction loading
        hasImage: false,  //is an image uploaded
        imageUrl: '',     //URL of the image
        fileUrl: '',      //URL of the file
        file:null,        //file values
        result: "",      //output of the prediction
        showAlert: false
        };
      }
    

    handlePredictClick = (event) => {
        if(this.state.file){
            const file = this.state.file;
            var formdata = new FormData();
            formdata.append("image", file);
            this.setState({isLoading: true});

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            fetch("https://soy-api2.herokuapp.com/predict", requestOptions)
            .then(response => response.text())
            .then(res => {this.setState({isLoading: false, result: JSON.parse(res)});
                            console.log(res)
                            })
            .catch(error => console.log('error', error));         
        }
    }

    getExtension(filename) {
        return filename.split('.').pop()
    }
      
    handleChange = (event) => {
        const value = event.target.value;
        var extension = this.getExtension(value);
        if(extension === 'jpg'){
            var hasImage = this.state.hasImage;
            hasImage = value !== '';
            this.setState({
                hasImage,
                imageUrl: event.target.value,
                fileUrl: URL.createObjectURL(event.target.files[0]),
                file:event.target.files[0],
            })
        } else{
            this.setState({showAlert: true})
        }
    }

    render(){
        const imageUrl = this.state.imageUrl;
        return(
            <>
            <style type = "text/css">
                {`
                    .btn-analyze {
                        color: white;
                        outline-style: solid;
                    }
                    .btn-analyze:hover {
                        background-color: #CBDDD1;
                          color: black;
                          outline-style: solid;
                          outline-color: #CBDDD1;
                    }
                `}
            </style>
                <Container classname = "image-upload">
                    <div className="content">
                        <Row className = "prediction-container">
                            <Col className = "col1">
                                <Form>
                                        <Form.Group className = "upload" controlId = "formGroup">
                                            <Form.Label style = {{}}>Upload an image:</Form.Label>
                                            <Form.Control 
                                                type="file"
                                                name="image"
                                                value = {imageUrl}
                                                onChange = {this.handleChange}
                                                >
                                            </Form.Control>
                                        </Form.Group>
                                        <Row>
                                            <Col>
                                                <Button
                                                    variant = "analyze"
                                                    onClick = {this.handlePredictClick}>
                                                    Analyze
                                                </Button>
                                            </Col>
                                        </Row>
                                </Form>
                            </Col>
                            <Col className = "col2">
                                {this.state.isLoading ? <div className="spinner-container">
                                                            <div className="loading-spinner">
                                                            </div>
                                                        </div>:

                                                        (this.state.result !== "" ?
                                                        <div>
                                                            <p> {this.state.result.message} </p>
                                                            <Results accuracy = {Math.round(this.state.result.accuracy * 100,2)} />
                                                        </div> : null)}
                            </Col>
                        </Row>
                        
                    </div>
                    <br>
                    </br>
                    
                </Container>
            </>
        );
    }
}

export default FileUpload;