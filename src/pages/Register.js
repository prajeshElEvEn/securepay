import React, { useState } from 'react'
import BackNav from '../components/BackNav'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import RegisterImage from '../assets/images/register.png'
import { useDispatch } from 'react-redux'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '../firebase/config'
import { login } from '../features/user/userSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection, onSnapshot, serverTimestamp } from 'firebase/firestore'

const Register = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPrassword, setConfirmPrassword] = useState('')
    const [userId, setUserId] = useState()

    const dispatch = useDispatch()
    const nav = useNavigate()

    const handleSignUp = (e) => {
        e.preventDefault()
        if (password !== confirmPrassword) {
            toast.error('Passwords do not match!')
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user
                    updateProfile(user, {
                        displayName: firstName + ' ' + lastName,
                    })
                        .then(() => {
                            addDoc(collection(db, "users"), {
                                name: firstName + ' ' + lastName,
                                email: userCredential.user.email,
                                uid: userCredential.user.uid,
                                image: [],
                                timestamp: serverTimestamp()
                            })
                            onSnapshot(collection(db, "users"), (snapshot) => {
                                snapshot.forEach((doc) => {
                                    if (doc.data().email === userCredential.user.email) {
                                        setUserId(doc.id)
                                    }
                                })
                            })
                            dispatch(login({
                                email: userCredential.user.email,
                                uid: userCredential.user.uid,
                                displayName: firstName + ' ' + lastName,
                                id: userId
                            }))
                        })
                    toast.success('Account created successfully!')
                    nav('/dashboard')
                })
                .catch((error) => {
                    toast.error(error.message)
                })
        }
    }

    return (
        <>
            <BackNav
                link={'/'}
            />
            <Container className='my-5'>
                <Row className='d-flex align-items-center gap-4'>
                    <Col sm>
                        <Image src={RegisterImage} thumbnail />
                    </Col>
                    <Col sm>
                        <Form>
                            <div className='text-center my-5'>
                                <h1>User Registration</h1>
                            </div>
                            <Button
                                variant="primary"
                                className='d-flex align-items-center gap-2 justify-content-center w-100 mb-3'
                            >
                                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.431 10.197c.117.671.175 1.352.174 2.033 0 3.042-1.088 5.615-2.98 7.356h.003C16.973 21.115 14.698 22 12 22a10 10 0 1 1 0-20 9.611 9.611 0 0 1 6.69 2.602l-2.855 2.855A5.434 5.434 0 0 0 12 5.957c-2.609 0-4.825 1.76-5.615 4.13a5.99 5.99 0 0 0 0 3.829h.004c.793 2.366 3.006 4.126 5.615 4.126 1.347 0 2.505-.345 3.402-.955h-.004a4.628 4.628 0 0 0 2-3.038H12v-3.85h9.431v-.002Z"></path>
                                </svg>
                                <span>
                                    Sign Up with Google
                                </span>
                            </Button>
                            <hr />
                            <div className='text-center mb-3'>
                                or Sign up with Email
                            </div>
                            <hr />
                            <Row>
                                <Col sm>
                                    <Form.Group className="mb-3" controlId="formFirstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="First Name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm>
                                    <Form.Group className="mb-3" controlId="formLastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Last Name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                                    value={confirmPrassword}
                                    onChange={(e) => setConfirmPrassword(e.target.value)}
                                />
                                <Form.Text className="text-muted">
                                    Must match the password above.
                                </Form.Text>
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="submit"
                                className='d-flex align-items-center gap-2 justify-content-center w-100 mb-3'
                                onClick={handleSignUp}
                            >
                                <span>
                                    Sign Up
                                </span>
                                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8.76 6.6a.6.6 0 0 1 .6-.6h9.6a.6.6 0 0 1 .6.6v10.8a.6.6 0 0 1-.6.6h-9.6a.6.6 0 0 1-.6-.6V15a.6.6 0 1 0-1.2 0v2.4a1.8 1.8 0 0 0 1.8 1.8h9.6a1.8 1.8 0 0 0 1.8-1.8V6.6a1.8 1.8 0 0 0-1.8-1.8h-9.6a1.8 1.8 0 0 0-1.8 1.8V9a.6.6 0 0 0 1.2 0V6.6Z" clip-rule="evenodd"></path>
                                    <path fill-rule="evenodd" d="M15.785 12.424a.6.6 0 0 0 0-.85l-3.6-3.6a.602.602 0 0 0-.85.85l2.576 2.576H3.36a.6.6 0 1 0 0 1.2h10.55l-2.576 2.575a.6.6 0 1 0 .85.85l3.6-3.6Z" clip-rule="evenodd"></path>
                                </svg>
                            </Button>
                            <div className=''>
                                Already have an account? <a href='/login'>Login</a>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Register
