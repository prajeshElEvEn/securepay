import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
    const nav = useNavigate()
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/">Secure Pay</Navbar.Brand>
                <Nav
                    className="gap-4 d-flex align-items-center"
                >
                    <Nav.Link href="/about">Know More</Nav.Link>
                    <Nav.Link href="/contact">Contact Us</Nav.Link>
                    <Button
                        variant="outline-primary"
                        onClick={() => nav('/login')}
                    >
                        Login
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => nav('/register')}
                    >
                        Register
                    </Button>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar
