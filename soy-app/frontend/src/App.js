import FileUpload from './components/FileUpload';
import Description from './components/Description'
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Navbar from 'react-bootstrap/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar expand = "lg" bg = "success">
        <Container fluid>
          <Navbar.Brand className = "text-light">Soybean Predictor</Navbar.Brand>
        </Container>
      </Navbar>
      <Description/>
      <FileUpload/>
    </div>
  );
}

export default App;
