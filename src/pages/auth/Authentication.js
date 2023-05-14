import React, { useEffect, useRef, useState } from 'react'
import BackNav from '../../components/BackNav'
import { Button, Container, Row } from 'react-bootstrap';
import * as faceapi from '@vladmandic/face-api'
import { toast } from 'react-toastify';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

const Authentication = ({ user }) => {
    const videoRef = useRef();
    const canvasRef = useRef();

    const videoHeight = 480;
    const videoWidth = 640;

    const [label, setLabel] = useState()
    const [labeledImages, setLabeledImages] = useState([])
    const [descriptions, setDescriptions] = useState([])

    const faceRecog = async () => {
        try {
            let descriptions = []
            for (let i in labeledImages) {
                let desc = []
                let refArray = labeledImages[i]
                for (let j in refArray) {
                    const img = await faceapi.fetchImage(refArray[j])
                    const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                    desc.push(detections.descriptor)
                }
                refArray = []
                descriptions.push(desc)
            }
            setDescriptions(descriptions)
            console.log(descriptions)
            if (descriptions) {
                toast.success('Face recognition started successfully!')
            }
        } catch (error) {
            toast.error("Error in face recognition!")
        }
    }

    const triggerVideo = () => {
        if (videoRef.current.paused) {
            playVideo()
        } else {
            videoRef.current.pause()
            toast.warning('Video Paused!')
        }
    }

    const quitVideo = () => {
        window.location.reload()
        toast.warning('Video Stopped!')
    }

    const playVideo = async () => {
        const video = videoRef.current
        await navigator.mediaDevices.getUserMedia(
            {
                video: {
                    facingMode: 'user'
                }
            }
        )
            .then(stream => {
                video.srcObject = stream
                video.play()
                // handleVideo()
                toast.success('Camera started successfully!')
            })
    }

    useEffect(() => {
        const loadModels = async () => {
            Promise.all([
                await faceapi.nets.ssdMobilenetv1.load('/models'),
                await faceapi.nets.ageGenderNet.load('/models'),
                await faceapi.nets.faceLandmark68Net.load('/models'),
                await faceapi.nets.faceRecognitionNet.load('/models'),
                await faceapi.nets.faceExpressionNet.load('/models')
            ])
                .then(() => {
                    getImages()
                    toast.success('Models loaded successfully!')
                })
                .catch((error) => {
                    toast.error("Error loading models!")
                })
        }
        loadModels()

        const getImages = async () => {
            const imageRef = collection(db, 'users')
            const data = await getDocs(imageRef)
            data.forEach((doc) => {
                if (doc.data().email === user?.email) {
                    setLabel(doc.data().name)
                    setLabeledImages(doc.data().image)
                }
            })
        }
    }, [user?.email])


    return (
        <>
            <BackNav
                link={'/dashboard'}
            />
            <Container className='my-5'>
                <Row>
                    <video
                        ref={videoRef}
                        height={videoHeight}
                        width={videoWidth}
                    />
                    <canvas
                        ref={canvasRef}
                        height={videoHeight}
                        width={videoWidth}
                    />
                </Row>
                <div className='d-flex justify-content-evenly'>
                    <Button
                        variant="warning"
                    // onClick={faceRecog}
                    >
                        Load Dataset
                    </Button>
                    <Button
                        variant="primary"
                        onClick={triggerVideo}
                    >
                        Start/Stop
                    </Button>
                    <Button
                        variant="success"
                    // onClick={handleAuth}
                    >
                        Authorize
                    </Button>
                    <Button
                        variant="danger"
                        onClick={quitVideo}
                    >
                        Quit
                    </Button>
                </div>
            </Container>
        </>
    )
}

export default Authentication
