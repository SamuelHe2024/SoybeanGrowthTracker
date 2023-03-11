import { Navbar, Container, Nav} from "react-bootstrap"
import React, {Component} from 'react'
import Beanify from '../../assets/img/Beanify.png'

class NavBar extends Component{

    render(){
        return (
            <>
                <Navbar expand="lg" className = "color-nav" variant = "dark" sticky = "top">
                    <Container fluid>
                        <Navbar.Brand>
                            <Nav.Link href = "/"><img src = {Beanify} alt="Beanify"/> Home </Nav.Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-Navbar-nav"/>
                        <Navbar.Collapse id="basic-Navbar-nav">
                            <Nav className="ms-auto">
                                <Nav.Link href = "/">Home</Nav.Link>
                                <Nav.Link href = "/insert_data">Insert Data</Nav.Link>
                                <Nav.Link href = "/view_data">View Data</Nav.Link>
                            </Nav> 
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        )
    }
}

export default NavBar