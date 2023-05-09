import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

const BackNav = ({ link }) => {
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link href={link}
                        className='d-flex align-items-center gap-2'
                    >
                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M19.92 12.48a.6.6 0 0 0-.6-.6H5.17l3.776-3.775a.601.601 0 0 0-.85-.85l-4.8 4.8a.6.6 0 0 0 0 .85l4.8 4.8a.602.602 0 0 0 .98-.655.6.6 0 0 0-.13-.195L5.169 13.08H19.32a.6.6 0 0 0 .6-.6Z" clip-rule="evenodd"></path>
                        </svg>
                        <span>
                            Back
                        </span>
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default BackNav
