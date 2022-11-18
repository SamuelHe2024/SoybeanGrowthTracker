import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/esm/Container';
import Badge from 'react-bootstrap/Badge'
import React, {Component} from 'react';

class Description extends Component {
    render(){
        return(
            <Container>
                <div class = "jumbotron jumbotron-fluid">
                    <h1 class = "display-4">Soybean Predictor</h1>
                    <p class="lead">By Samuel He and Mary Hughes</p>
                    <hr class = "my-4"/>
                    <div id="accordion">
                        <div class="card">
                            <div class="card-header" id="headingOne">
                                <h5 class="mb-0">
                                    <button class="btn" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    <Badge bg="secondary">About the Project</Badge>
                                    </button>
                                </h5>
                            </div>

                            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                <div class="card-body">
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