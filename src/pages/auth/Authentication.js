import React, { useRef } from 'react'
import BackNav from '../../components/BackNav'
import { Button, Container, Row } from 'react-bootstrap';

const Authentication = () => {
    const videoRef = useRef();
    const canvasRef = useRef();

    const videoHeight = 480;
    const videoWidth = 640;
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
                    <Button variant="warning">
                        Load Dataset
                    </Button>
                    <Button variant="primary">
                        Start/Stop
                    </Button>
                    <Button variant="success">
                        Authorize
                    </Button>
                    <Button variant="danger">
                        Quit
                    </Button>
                </div>
            </Container>
        </>
    )
}

export default Authentication
