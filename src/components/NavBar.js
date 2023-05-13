import { signOut } from 'firebase/auth'
import React from 'react'
import { Button, Container, Nav, NavDropdown, Navbar, Offcanvas } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/config'
import { useDispatch } from 'react-redux'
import { logout } from '../features/user/userSlice'

const NavBar = ({ user }) => {
    const dispatch = useDispatch()
    const nav = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        signOut(auth)
        nav('/')
    }

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
                        <Nav className="justify-content-end flex-grow-1 pe-3 gap-3">
                            <Nav.Link href="/about">Know More</Nav.Link>
                            <Nav.Link href="/contact">Contact Us</Nav.Link>
                            <div className='d-flex gap-3'>
                                {
                                    user ? (
                                        <>
                                            <NavDropdown title={user.displayName} id="collasible-nav-dropdown">
                                                <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
                                                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                                                <NavDropdown.Item href="/history">History</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item
                                                    onClick={handleLogout}
                                                >
                                                    Logout
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </>
                                    ) : (
                                        <>
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
                                        </>
                                    )
                                }
                            </div>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container >
        </Navbar >
    )
}

export default NavBar
