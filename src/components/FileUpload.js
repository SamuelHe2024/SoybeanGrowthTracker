import React, {Component} from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.css';


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
        const file = this.state.file;
        console.log(file)
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
        .then(res => this.setState({isLoading: false, result: res}))
        .catch(error => console.log('error', error));
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
            <Container>
                <div className="content">
                    <Form>
                        <Form.Group controlId = "formGroup">
                            <Form.Label>Upload Image:</Form.Label>
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
                                    variant = "success"
                                    onClick = {this.handlePredictClick}>
                                    Analyze
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <p>{this.state.result}</p>
            </Container>
        );
    }
}

export default FileUpload;