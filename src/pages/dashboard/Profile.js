import React, { useState } from 'react'
import BackNav from '../../components/BackNav'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Avatar from 'react-avatar';

const Profile = ({ user }) => {
    const [image, setImage] = useState()
    const [urlList, setUrlList] = useState()

    const handleImage = (e) => {
        e.preventDefault()

    }
    return (
        <>
            <BackNav link={'/dashboard'} />
            <Container className='my-5'>
                <Row className='d-flex align-items-center gap-4'>
                    <Col sm>
                        <div className='text-center my-5'>
                            <h1>Personal Information</h1>
                        </div>
                        <div className='text-center mb-2'>
                            <Avatar
                                name={user?.displayName}
                                round={true}
                                color='#0B5ED7'
                            />
                        </div>
                        <div className='text-center mb-2'>
                            <h3>
                                {
                                    user?.displayName
                                }
                            </h3>
                        </div>
                        <div className='text-center mb-2 '>
                            <h4>
                                {
                                    user?.email
                                }
                            </h4>
                        </div>
                    </Col>
                    <Col sm>
                        <Form>
                            {/* <hr /> */}
                            <div className='text-center my-5'>
                                <h1>Add Images</h1>
                            </div>
                            {/* <hr /> */}
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Add upto (5-6) Images</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={(e) => {
                                        setImage(e.target.files[0])
                                    }}
                                />
                                <Form.Text className="text-muted">
                                    Add images one by one.
                                </Form.Text>
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="submit"
                                className='d-flex align-items-center gap-2 justify-content-center w-100 mb-3'
                                onClick={handleImage}
                            >
                                <span>
                                    Add
                                </span>
                                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Zm-9.375-4.375a.625.625 0 1 0-1.25 0v3.75h-3.75a.625.625 0 1 0 0 1.25h3.75v3.75a.624.624 0 1 0 1.25 0v-3.75h3.75a.624.624 0 1 0 0-1.25h-3.75v-3.75Z"></path>
                                </svg>
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Profile
