import React from 'react'
import NavBar from '../../components/NavBar'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import PaymentImage from '../../assets/images/payment.png'
import { useNavigate } from 'react-router-dom'

const Dashboard = ({ user }) => {

    const nav = useNavigate()

    const handleAuth = (e) => {
        e.preventDefault()
        nav('/auth')
    }

    return (
        <>
            <NavBar user={user} />
            <Container className='my-5'>
                <Row className='d-flex align-items-center gap-4'>
                    <Col sm>
                        <Image src={PaymentImage} thumbnail />
                    </Col>
                    <Col sm>
                        <Form>
                            {/* <hr /> */}
                            <div className='text-center my-5'>
                                <h1>Payment Details</h1>
                            </div>
                            {/* <hr /> */}
                            <Row>
                                <Col sm>
                                    <Form.Group className="mb-3" controlId="formFirstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="First Name"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm>
                                    <Form.Group className="mb-3" controlId="formLastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Last Name"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                />
                                <Form.Text className="text-muted">
                                    Password must be at least 8 characters long.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                />
                                <Form.Text className="text-muted">
                                    Must match the password above.
                                </Form.Text>
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="submit"
                                className='d-flex align-items-center gap-2 justify-content-center w-100 mb-3'
                                onClick={handleAuth}
                            >
                                <span>
                                    Authenticate
                                </span>
                                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.552 9.72a.6.6 0 0 1 .6.6v.93c0 1.434-.224 2.859-.663 4.224l-1.597 4.968a.6.6 0 0 1-1.142-.366l1.596-4.97c.4-1.245.604-2.546.604-3.855v-.931a.6.6 0 0 1 .6-.6h.002Z"></path>
                                    <path d="M10.152 10.32a2.4 2.4 0 0 1 4.8 0 .6.6 0 0 1-1.2 0 1.2 1.2 0 0 0-2.4 0v.398c0 .491-.027.98-.08 1.466a.6.6 0 0 1-1.192-.128c.048-.444.072-.89.072-1.338v-.398Zm4.21 1.2a.598.598 0 0 1 .585.616 13.8 13.8 0 0 1-.705 4.006l-1.519 4.56a.6.6 0 1 1-1.139-.38l1.52-4.56c.394-1.18.61-2.413.643-3.658a.603.603 0 0 1 .615-.584Zm-4.027 2.538a.598.598 0 0 1 .396.751l-1.563 5.038a.6.6 0 1 1-1.146-.356l1.563-5.038a.6.6 0 0 1 .75-.395Z"></path>
                                    <path d="M8.59 8.92a4.201 4.201 0 0 1 8.16 1.4.6.6 0 1 1-1.2 0 3 3 0 0 0-5.828-1 .6.6 0 0 1-1.131-.4Zm.36 2.004a.6.6 0 0 1 .54.655 12.864 12.864 0 0 1-.48 2.437l-1.467 4.887a.6.6 0 1 1-1.15-.345l1.467-4.886c.216-.721.362-1.461.435-2.21a.6.6 0 0 1 .656-.538Zm7.2.776a.6.6 0 0 1 .6.6c0 1.536-.255 3.063-.758 4.515l-1.308 3.774a.6.6 0 0 1-1.133-.393l1.307-3.774c.459-1.326.694-2.719.694-4.122a.6.6 0 0 1 .6-.6h-.001Z"></path>
                                    <path d="M7.562 6.987a5.995 5.995 0 0 1 6.243-2.536.6.6 0 1 1-.25 1.175 4.795 4.795 0 0 0-4.996 2.028.6.6 0 0 1-.997-.667Zm8.064-1.146a.6.6 0 0 1 .846-.063 5.99 5.99 0 0 1 2.078 4.542v1.8a.6.6 0 1 1-1.2 0v-1.8a4.79 4.79 0 0 0-1.663-3.633.6.6 0 0 1-.06-.846Zm-8.33 3.09a.6.6 0 0 1 .506.681 4.75 4.75 0 0 0-.053.708c0 .852-.12 1.7-.357 2.52l-1.368 4.708a.6.6 0 1 1-1.152-.335l1.368-4.707c.205-.71.31-1.446.31-2.186 0-.3.022-.595.064-.883a.6.6 0 0 1 .682-.506Zm10.658 4.392a.6.6 0 0 1 .547.648c-.1 1.2-.357 2.383-.768 3.52l-.893 2.482a.6.6 0 0 1-1.129-.405l.894-2.484a12.61 12.61 0 0 0 .701-3.214.6.6 0 0 1 .648-.547Z"></path>
                                    <path d="M8.652 3.565a7.8 7.8 0 0 1 11.7 6.756.6.6 0 0 1-1.2 0 6.6 6.6 0 0 0-9.9-5.718.6.6 0 0 1-.6-1.038ZM7.584 5.073a.6.6 0 0 1 .048.847 6.574 6.574 0 0 0-1.68 4.4.6.6 0 0 1-1.2 0 7.77 7.77 0 0 1 1.986-5.2.6.6 0 0 1 .846-.047Zm-2.406 6.472a.6.6 0 0 1 .415.739l-.935 3.32a.6.6 0 1 1-1.154-.324l.934-3.32a.599.599 0 0 1 .74-.415Zm14.58.577a.6.6 0 0 1 .588.612c-.036 1.799-.193 3.63-.872 5.44l-.084.224a.6.6 0 0 1-1.124-.421l.084-.225c.608-1.62.761-3.288.796-5.042a.6.6 0 0 1 .612-.588Z"></path>
                                </svg>
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Dashboard
