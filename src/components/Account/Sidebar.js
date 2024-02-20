import React, { useState, useEffect } from 'react'
import './Account.css';
import { Nav, Modal, Button, Card, Row, Col, Container,Image } from 'react-bootstrap';
import ChangePassword from './ChangePassword';
import { logout } from '../../redux/authSlice';
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom';
import Account from './Account';
import ProfessionalExperience from '../ProfessionalExperience/ProfessionalExperience';
import Feedback from './Feedback';
import axios from "axios";
import ep_back from '../../assets/images/ep_back.png'

export default function Sidebar() {
    const dispatch = useDispatch()

    const [showLogout, setshowLogout] = useState(false);
    const [deleteacc, setdeleteacc] = useState(false);
    const [showProfile, setShowProfile] = useState(true);
    const [showExperience, setshowExperience] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);

    const navigate = useNavigate()
    const handleClose1 = () => setshowLogout(false);
    const handleClose2 = () => setdeleteacc(false);

    const [selectedItem, setSelectedItem] = useState(1);
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    useEffect(() => {

    }, [isAuthenticated])
    const handleItemClick = (item) => {
        setSelectedItem(item);


        if (item === 1) {
            //navigate('/account')
            setShowFeedback(false)
            setshowExperience(false)
            setShowProfile(true)
        }


        if (item === 2) {
            // navigate('/experience')
            setShowFeedback(false)
            setShowProfile(false)
            setshowExperience(true)
        }

        if (item === 3) {
            setShowFeedback(true)
            setShowProfile(false)
            setshowExperience(false)
            //navigate('/feedback')
        }

        if (item === 4) {
            setdeleteacc(true)
        }

        if (item === 5) {
            setshowLogout(true)
        }



    };

    const items = [
        { id: 1, name: 'My Profile' },
        { id: 2, name: 'Professional Experience' },
        { id: 3, name: 'Support/ Send Feedback' },
        { id: 4, name: 'Delete Account' },
        { id: 5, name: 'Log out' },
    ];

    const onLogout = () => {

        //dispatch(logout())
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('role')
        localStorage.removeItem('userId')
        localStorage.removeItem('isAuthenticated')
        localStorage.setItem('isAuthenticated', false)
        localStorage.clear();
        // console.log(isAuthenticated,"isAuthenticated")
        // if (!isAuthenticated) 
        navigate('/')


    }

    const deleteAccount = () => {
        let config = {
            method: 'DELETE',
            url: 'https://round-unit-43333.botics.co/deleteuser',
            headers: {
                'X-CSRFTOKEN': `rN3gD7X9fMWNBXec7Y4naOPY4jvc8yvzOAZvMblW4pChKVH0pKZegdontyYtuN1c`,
                'Authorization': `token ${localStorage.getItem('token')}`
            }
        };

        axios.request(config)
            .then((response) => {
                localStorage.removeItem('token')
                localStorage.removeItem('username')
                localStorage.removeItem('role')
                localStorage.removeItem('userId')
                localStorage.removeItem('isAuthenticated')
                localStorage.setItem('isAuthenticated', false)
                localStorage.clear();
                navigate('/')
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <div style={{paddingBottom:"40px"}}>
            <Row className="smallscreenque seesionHeader  mb-2 ms-2">

                <Col className="mt-lg-4 ms-lg-5  backsmall" ><span className='cursor' onClick={() => navigate('/interview')}><Image src={ep_back} height={20} /><span  className='ms-1 backcss'>Back</span></span></Col>
                
            </Row>
            <Container fluid>
                <Row>
                    <Col lg={4} className='d-none d-lg-block'>
                        <Card className="flex-column cardbackground ms-5 me-2 mt-2 mb-2" style={{ height: '855px' }} >
                            <Nav className="flex-column">
                                {items.map((item) => (
                                    <Nav.Item key={item.id} onClick={() => handleItemClick(item.id)}
                                        className={`${selectedItem === item.id ? 'selected-line' : 'navcss'}`}
                                    >
                                        <Nav.Link href="#section1" className={`navText ${selectedItem === item.id ? 'activetext' : 'notactive'}`} >{item.name}</Nav.Link>
                                    </Nav.Item>

                                ))}
                            </Nav>
                        </Card>
                    </Col>
                    <Col lg={8} className='mt-3'>
                        {showProfile ? <Account /> : ''}
                        {showExperience ? <ProfessionalExperience /> : ''}
                        {showFeedback ? <Feedback /> : ''}

                    </Col>
                </Row>
            </Container>

            <Modal show={showLogout} onHide={handleClose1}

                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className='modaltitle'>
                    <Modal.Title className='modaltitle1'>Log out</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='logout'>
                        <span className="logoutlabel">Are you sure you want to Log out?
                        </span>
                        <span>
                            <Button className='savebtn' type="submit" onClick={() => onLogout()}>Yes</Button>
                            <Button className='cancelbtn' style={{ marginLeft: 5 }} onClick={handleClose1}  >No</Button>
                        </span>
                    </div>
                </Modal.Body>

            </Modal>

            <Modal show={deleteacc} onHide={handleClose2}

                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className='modaltitle'>
                    <Modal.Title className='modaltitle1'>Delete Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='logout'>
                        <span className="logoutlabel">Are you sure you want to delete the account?
                        </span>
                        <span>
                            <Button className='savebtn' type="submit" onClick={deleteAccount}>Yes</Button>
                            <Button className='cancelbtn' style={{ marginLeft: 5 }} onClick={() => handleClose2()}  >No</Button>
                        </span>
                    </div>
                </Modal.Body>

            </Modal>
        </div>
    )
}
