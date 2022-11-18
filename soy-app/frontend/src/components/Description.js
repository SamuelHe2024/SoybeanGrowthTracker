import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/esm/Container';
import Badge from 'react-bootstrap/Badge'
import './Description.css'
import React, {Component} from 'react';

class Description extends Component {
    render(){
        return(
            <Container>
                <div className = "jumbotron jumbotron-fluid">
                    <h1 className = "display-4">Soybean Predictor</h1>
                    <p className="lead">By Samuel He and Mary Hughes</p>
                    <hr className = "my-4"/>
                    <div id="accordion">
                        <div className="card">
                            <div className="card-header" id="headingOne">
                                <h5 className="mb-0">
                                    <button className="btn" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    <Badge bg="secondary">About the Project</Badge>
                                    </button>
                                </h5>
                            </div>

                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                <div className="card-body">
                                    test content                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
            </Container>
        );
    }
}

export default Description