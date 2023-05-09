import React from 'react'
import { Button, Container, Nav, Navbar, Offcanvas } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
    const nav = useNavigate()
    return (
        <Navbar key='md' bg="light" expand='md' className="mb-3">
            <Container>
                <Navbar.Brand href="/">Secure Pay</Navbar.Brand>
                <Navbar.Toggle aria-controls={'offcanvasNavbar-expand-md'} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-md`}
                    aria-labelledby='offcanvasNavbarLabel-expand-md'
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id='offcanvasNavbarLabel-expand-md'>
                            Secure Pay
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link href="/about">Know More</Nav.Link>
                            <Nav.Link href="/contact">Contact Us</Nav.Link>
                            <div className='d-flex gap-3'>
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
                            </div>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}

export default NavBar
