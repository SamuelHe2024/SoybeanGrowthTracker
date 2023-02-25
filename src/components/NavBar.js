import { Navbar, Container, Nav} from "react-bootstrap"
import React, {Component} from 'react'
import Beanify from '../assets/img/Beanify.png'

class NavBar extends Component{

    render(){
        return (
            <>
                <style type = "text/css">
                    {`
                        .dropbtn {
                            background: black;
                            color: grey;
                        }
                        .dropdown-content{
                            display: none;
                            position: absolute;
                            background: black;
                        }
                        .dropdown:hover .dropdown-content {
                            display: block;
                        }
                    `}
                </style>
                <Navbar expand="lg" className = "color-nav" variant = "dark" sticky = "top">
                    <Container fluid>
                        <Navbar.Brand>
                            <Nav.Link href = "/"><img src = {Beanify} alt="Beanify"/> Home </Nav.Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-Navbar-nav"/>
                        <Navbar.Collapse id="basic-Navbar-nav">
                            <Nav className="ms-auto">
                                <span class="dropdown">
                                    <button class = "dropbtn">Data
                                    </button>
                                    
                                    <div class="dropdown-content">
                                        <Nav.Link href = "/dry_weight">Dry Weight Data</Nav.Link>
                                        <Nav.Link href = "/solution_data">Solution Data</Nav.Link>
                                        <Nav.Link href = "/water_uptake">Water Uptake</Nav.Link>
                                    </div>
                                </span>
                                <Nav.Link href = "/image_data">Image Predictions</Nav.Link>
                            </Nav> 
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        )
    }
}

export default NavBar