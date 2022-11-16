import axios from 'axios'
import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

class FileUpload extends Component {
    state = {
        selectedFile: null
    }

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] })
    }

    onFileUpload = () => {
        const formData = new FormData();

        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        console.log(this.state.selectedFile);
        axios.post("api/uplaodfile", formData);
    };

    fileData = () => {
        if(this.state.selectedFile) {
            return (
                <div>
                    <h2 class = "file-details">File Details: </h2>
                    <p class = "file-details"> File Name: {this.state.selectedFile.name} </p>
                    <p class = "file-details"> File Type: {this.state.selectedFile.type} </p>

                    <p class = "last-modified">
                        Last Modified: {" "}
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4 class = "choose-warning">Choose before Pressing the Upload button</h4>
                </div>
            )
        }
    };

    render() {
        return (
            <Form>
                <Form.Group controlId="formFile">
                    <Form.Control type="file" onChange={this.onFileChange} />
                    <Button 
                        className = "text-capitalize"
                        onClick = {this.onFileUpload}>
                        Upload
                    </Button>
                    <Form.Label>
                        {this.fileData()}
                    </Form.Label>
                </Form.Group>
            </Form>
        );
    }
}

export default FileUpload;