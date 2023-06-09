import React, { useEffect, useState } from 'react'
import BackNav from '../../components/BackNav'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import { getDownloadURL, ref as refStorage, uploadBytes } from 'firebase/storage'
import Avatar from 'react-avatar';
import { v4 } from 'uuid'
import { db, storage } from '../../firebase/config';
import { toast } from 'react-toastify';
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';

const Profile = ({ user }) => {
    const [image, setImage] = useState(null)
    const [urlList, setUrlList] = useState([])
    const [imageList, setImageList] = useState()

    const handleImage = async (e) => {
        e.preventDefault()
        if (image) {
            const imageRef = refStorage(storage, `labeled_images/${user.displayName}/${image.name + v4()}`)
            const userDoc = doc(db, "users", user.id)
            await uploadBytes(imageRef, image)
                .then(() => {
                    getDownloadURL(imageRef).then((url) => {
                        setUrlList([...urlList, url])
                        updateDoc(userDoc, {
                            image: [...urlList, url],
                        })
                    })
                    setImage(null)
                    toast.success('Image added successfully!')
                })
                .catch(error => {
                    toast.error(error.message)
                })
        } else {
            toast.error('Please select an image!')
        }
    }

    useEffect(() => {
        onSnapshot(collection(db, "users"), (snapshot) => {
            snapshot.forEach((doc) => {
                if (doc.data().email === user?.email) {
                    setImageList(doc.data().image)
                }
            })
        })
    }, [user?.email])


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
            <Container className='py-5'>
                <Row>
                    <div className='text-center my-5'>
                        <h1>
                            Your Images
                        </h1>
                    </div>
                </Row>
                <Row>
                    <Col sm>
                        {
                            imageList?.length > 0 ? (
                                imageList?.map((image, index) => (
                                    <Image
                                        width={300}
                                        key={index}
                                        src={image}
                                        thumbnail />
                                ))
                            ) : (
                                <div className='text-center my-5'>
                                    <h6>
                                        You have not added any images yet!
                                    </h6>
                                </div>
                            )
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Profile
