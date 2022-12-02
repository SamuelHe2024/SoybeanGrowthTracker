import { Navbar, Container, Nav} from "react-bootstrap"
import React, {Component} from 'react'
import Beanify from '../assets/img/Beanify.png'

class NavBar extends Component{

    render(){
        return (
            <Navbar expand="lg" className = "color-nav" variant = "dark">
                <Container fluid>
                    <Navbar.Brand>
                        <img src = {Beanify} alt="Beanify"/>
                    </Navbar.Brand>
                    {/* <Navbar.Toggle aria-controls="basic-Navbar-nav"/>
                    <Navbar.Collapse id="basic-Navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href = "/project">Project Info</Nav.Link>
                            <Nav.Link href = "/team">Team Info</Nav.Link>
                        </Nav> 
                    </Navbar.Collapse>*/}
                </Container>
            </Navbar>
        )
    }
}

export default NavBar