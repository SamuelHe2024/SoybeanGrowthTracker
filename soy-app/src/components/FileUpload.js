import axios from 'axios'
import React, {Component} from 'react'

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
            <div>
                <div>
                    <input type="file" onChange={this.onFileChange} />
                    <button onClick = {this.onFileUpload}>
                        Upload
                    </button>
                </div>
                {this.fileData()}
            </div>
        );
    }
}

export default FileUpload;