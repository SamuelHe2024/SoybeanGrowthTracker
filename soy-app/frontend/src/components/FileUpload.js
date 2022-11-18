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
        result: ""        //output of the prediction
        };
      }

    handlePredictClick = (event) => {
        const file = this.state.file;
        const data = new FormData();
        data.append('file', file);
        this.setState({isLoading: true});
        console.log(file)
        console.log(data)

        // THIS SEGMENT IS THE API CALL THAT NEEDS TO BE MODIFIED
        //
        // fetch('http://127.0.0.1:5000/prediction/', 
        //     {
        //         method: 'POST',
        //         body: data
        //     })
        //     .then(response => response.json())
        //     .then(response => {
        //         console.log(response)
        //         this.setState({
        //         result: response.result,
        //         isLoading: false
        //         });
        //     });
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        console.log(event.target.files[0])
        console.log(value + " AND " + name);
        var hasImage = this.state.hasImage;
        hasImage = value !== '';
        this.setState({
            hasImage,
            fileUrl: URL.createObjectURL(event.target.files[0]),
            file:event.target.files[0],
        })
        
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
            </Container>
        );
    }
}

export default FileUpload;