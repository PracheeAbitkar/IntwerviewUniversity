import React, { useState } from "react";
import { Button, Modal, Row, Col, Image, Card, Container, Form, Carousel } from "react-bootstrap";
import './InterviewPrep.css'

import welcomeimg from '../../assets/images/welcome.png'
import uploadimg from '../../assets/images/upload.png'
import uploadActive from '../../assets/images/uploadActive.png'
import paste from '../../assets/images/paste.png'
import pasteActive from '../../assets/images/pasteActive.png'
import uploadicon from '../../assets/images/uploadicon.png'
import right from '../../assets/images/right.png'
import view from '../../assets/images/view.png'
import interview from '../../assets/images/interview.png'
import arrow from '../../assets/images/arrow.png'
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";
import WelcomePage from './WelcomePage';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
export default function InterviewPrep() {

    const [selectedOption, setSelectedOption] = useState(null);
    const [options] = useState([
        { value: 'user', label: 'user' },
    ]);

    const handleChange = (selectedOption) => {

        setSelectedOption(selectedOption);
        console.log('Selected Option:', selectedOption.value);
    };

    const [welcome, setWelcome] = useState(true)
    const [welcome1, setWelcome1] = useState(false)
    const handleClose = () => setWelcome(false)
    const handleClose1 = () => setWelcome1(false)
    const navigate = useNavigate()
    const [role, setRole] = useState('');
    const [content, setContent] = useState('');

    const [upload, setupload] = useState(false)
    const [newInterview, setnewInterview] = useState(false)

    const uploadClose = () => setupload(false)

    const newInterviewClose = () => setnewInterview(false)
    const showUpload = () => {
        setupload(true)
        setWelcome(false)
    }


    //file upload

    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [hideOnUpload, sethideOnUpload] = useState(true);


    const allowedFileTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 50 * 1024 * 1024; // 50MB in bytes

    const handleDrop = (event) => {
        event.preventDefault();

        const file = event.dataTransfer.files[0];
        handleFile(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        handleFile(file);
        sethideOnUpload(false)
    };

    const handleFile = (file) => {
        if (file) {
            // Check file type
            if (!allowedFileTypes.includes(file.type)) {
                setErrorMessage('Invalid file type. Please select a PDF or DOCX file.');
                return;
            }

            // Check file size
            if (file.size > maxSize) {
                setErrorMessage('File size exceeds the maximum limit of 50MB.');
                return;
            }

            // Reset error message and set selected file
            setErrorMessage('');
            setSelectedFile(file);
        }
    };
    const [activeMenuItem, setActiveMenuItem] = useState('upload');

    const [isActive, setisActive] = useState('saved');

    const [showdiv, setShowdiv] = useState(true)
    const [showPasteDiv, setshowPasteDiv] = useState(false)

    // Function to handle menu item clicks
    const handleMenuItemClick = (menuItem) => {
        setActiveMenuItem(menuItem);

        if (menuItem === 'upload') {
            setshowPasteDiv(false)
            setShowdiv(true)
        }

        if (menuItem === 'paste') {
            setshowPasteDiv(true)
            setShowdiv(false)
        }

    };

    const [showSaved, setshowSaved] = useState(true)
    const [showFav, setshowFav] = useState(false)


    const menuCLick = (menu) => {
        setisActive(menu);

        if (menu === 'saved') {
            setshowSaved(true)
            setshowFav(false)
        }

        if (menu === 'fav') {
            setshowFav(true)
            setshowSaved(false)
        }

    }



    const [formData, setFormData] = useState({
        role: '',
        content: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(selectedOption, "selectedOption")
        formData.role = selectedOption.value;
        // Assuming you want to redirect to '/display' and pass the form data
        console.log(formData, "formDataaaaaaaaaa")
        console.log("data")
        navigate('/question', { state: { userData: formData } });
    };


    const handleImageUpload = (event) => {

        const file = event.target.files[0];
        var formdata1 = new FormData();

        formdata1.append("file", file);
        formdata1.append("bucket", "interview-universit-43333");
        formdata1.append("user_id", "3");


        handleFile(file);
        sethideOnUpload(false)
        if (file) {

            // setSelectedImage(URL.createObjectURL(file));
            // formData1.append("avatar", file)

            // var requestOptions = {
            //     method: 'POST',
            //     body: formdata
            //   };

            let config = {
                method: 'post',
                url: 'https://round-unit-43333.botics.co/modules/s3-file-uploader/service/file/upload/',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `token ${localStorage.getItem('token')}`,
                },
                data: formdata1
            };
            for (const value of formdata1.values()) {
                console.log(value);
            }

            axios.request(config)
                .then((response) => {
                    // setSelectedImage(response.data.avatar);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            //setSelectedImage(null);
        }
    };
    return (
        <>

            <Container fluid style={{ height: '90vh' }}>
                <Row className="smallscreen">

                    <Col className="prepText mt-lg-4 ms-lg-5 cursor" >Interview Preparation</Col>
                    <Col className="d-flex justify-content-end  mt-lg-2 me-lg-5 mx-auto"> <Button className='inteviewbtncss ' type="submit" onClick={() => setnewInterview(true)}>New Interview Preparation <Image src={arrow} className="arrimg" /></Button></Col>
                </Row>


                <div className="tabItem d-flex justify-content-start mx-lg-5 interviewprep1 mt-4">
                    <span className={`${(isActive == 'saved') ? 'active' : 'inactive'} cursor py-lg-2 tabText me-4`} onClick={() => menuCLick('saved')}>Saved Interviews</span>
                    <span className={`${(isActive == 'fav') ? 'active' : 'inactive'} cursor ms-lg-3 py-lg-2 tabText favanstab`} onClick={() => menuCLick('fav')}>Favorite Answers</span>
                </div>


                {showSaved && <Row>
                    <Col xl={3} className="ms-lg-5  my-lg-4 interviewcard">
                        <Card className="ps-1 cardBody pb-2" >
                            <Card.Body className="">
                                <div className="d-flex justify-content-between " >
                                    <span className="spanText">Role</span>
                                    <span className="spanText">08/11/2023</span>
                                </div>
                                <div className="d-flex justify-content-between pt-2">
                                    <span className="savedText">Product Manager</span>
                                    <span><Image src={view} className="viewImage" /></span>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={3} className="ms-lg-5  my-lg-4">
                        <Card className=" ps-1 cardBody pb-2" >
                            <Card.Body >
                                <div className="d-flex justify-content-between">
                                    <span className="spanText">Role</span>
                                    <span className="spanText">08/11/2023</span>
                                </div>
                                <div className="d-flex justify-content-between pt-2">
                                    <span className="savedText">Product Manager</span>
                                    <span><Image src={view} className="viewImage" /></span>
                                </div>
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>}

                {showFav &&
                    <Row>
                        <Col xl={3} className="ms-lg-5  my-lg-4 interviewcard me-lg-5">
                            <Card className=" ps-1 cardBody" >
                                <Card.Body >
                                    <div className="d-flex justify-content-between">
                                        <span className="spanText">Role</span>
                                        <span className="spanText">08/11/2023</span>
                                    </div>
                                    <div className="d-flex justify-content-between pt-2">
                                        <span className="savedText">Product Manager</span>

                                    </div>
                                    <span className="questionText d-flex pt-1">Question</span>
                                    <span className="cardText d-flex pt-1">How do you approach understanding customer needs and pain points?</span>

                                    <span className="d-flex justify-content-end pt-2"><Image src={view} className="viewImage" /></span>
                                </Card.Body>
                            </Card></Col>
                        <Col xl={3} className="ms-lg-2  my-lg-4">
                            <Card className=" ps-1 cardBodyfav" >
                                <Card.Body >
                                    <div className="d-flex justify-content-between">
                                        <span className="spanText">Role</span>
                                        <span className="spanText">08/11/2023</span>
                                    </div>
                                    <div className="d-flex justify-content-between pt-2">
                                        <span className="savedText">Product Manager</span>

                                    </div>
                                    <span className="questionText d-flex pt-1">Question</span>
                                    <span className="cardText d-flex pt-1">How do you approach understanding customer needs and pain points?</span>

                                    <span className="d-flex justify-content-end pt-2"><Image src={view} className="viewImage" /></span>
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>}
            </Container>

            <Modal show={welcome} onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered className="interviewprep"
            >
                <Modal.Header closeButton >
                </Modal.Header>
                <Modal.Body >
                    <div className='wlecomeContainer'>
                        <Image variant="top" className='socialImg' src={welcomeimg} />
                        <span className="welcomelable">Welcome to our app
                        </span>
                        <span className="welcomeText">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.</span>
                        <span>
                            <Button className='letsGo' type="submit" onClick={showUpload}>Let’s Go!</Button>
                        </span>
                    </div>
                </Modal.Body>
            </Modal>


            <Modal show={upload} onHide={uploadClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered className="interviewprep2"
            >
                <Modal.Header closeButton >
                    <span className={`${(activeMenuItem == "upload") ? 'active' : ''} p-2 cursor `}
                        onClick={() => handleMenuItemClick('upload')}
                    >
                        <Image variant="top" className='uploadimg pe-2' src={`${(activeMenuItem == "upload") ? uploadActive : uploadimg}`} />
                        Upload</span>
                    <span className={`${(activeMenuItem == "paste") ? 'active' : ''} p-2 cursor`}
                        onClick={() => handleMenuItemClick('paste')}
                    >
                        <Image variant="top" className='pasteimg pe-2' src={`${(activeMenuItem == "paste") ? pasteActive : paste}`} />Paste Resume
                    </span>

                </Modal.Header>
                {showdiv && <Modal.Body >
                    <div className='wlecomeContainer'>
                        {hideOnUpload && <> <span className="welcomelable">Upload your latest Resume
                        </span>
                            <div className="row ">
                                <div
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    className="fileUploadContainer"
                                >
                                    <Image variant="top" src={uploadicon} style={{ height: 45 }} />

                                    <p className="fileuploadtxt">Drag and drop to upload file</p>
                                    <input
                                        type="file"
                                        id="fileInput"
                                        style={{ display: 'none' }}
                                        onChange={handleImageUpload}
                                        accept=".pdf, .docx"
                                    />
                                    <Button className='letsGo cursor' type="submit" htmlFor="fileInput">

                                        <label htmlFor="fileInput" className="cursor"> Browse file
                                        </label></Button>
                                    <p className="support">Supports: docx, pdf</p>

                                </div>

                            </div></>}
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        {selectedFile && (<>
                            <div

                                className="fileUploadContainer"
                            >
                                <Image variant="top" src={right} style={{ height: 35, marginBottom: 10 }} />

                                <p className="fileuploadtext">
                                    {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)

                                </p>

                                <input
                                    type="file"
                                    id="fileInput"
                                    style={{ display: 'none' }}
                                    onChange={handleFileSelect}
                                    accept=".pdf, .docx"
                                />
                                {/* <span htmlFor="fileInput" className="cursor logincss" >Replace</span> */}
                                <Button className='letsGo cursor' type="submit" htmlFor="fileInput">

                                    <label htmlFor="fileInput" className="cursor"> Replace
                                    </label></Button>
                            </div>
                        </>)}
                    </div>
                </Modal.Body>}

                {showPasteDiv && <Modal.Body >
                    <div >
                        <span className="fileuploadtext ms-3">Paste your latest Resume
                        </span>
                        <div className="row wlecomeContainer1">
                            <div
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                className="filePasteContainer"
                            >

                            </div>
                        </div>
                        <span className="d-flex justify-content-end me-2">
                            <Button className='submitbtncss' type="submit" >Submit</Button>
                        </span>
                    </div>
                </Modal.Body>}
            </Modal>

            <Modal show={welcome1} onHide={handleClose1}
                aria-labelledby="contained-modal-title-vcenter"
                centered className="interviewprep"
            >
                <Modal.Header onHide={handleClose1} className="d-flex justify-content-end">
                    <span style={{ color: '#FF7F50', cursor: 'pointer' }} onClick={() => handleClose1()}>Skip</span>
                </Modal.Header>
                <Modal.Body >
                    <div className='wlecomeContainer'>
                        <Image variant="top" className='socialImg' src={welcomeimg} />
                        <span className="welcomelable">Welcome to our app
                        </span>
                        <WelcomePage />
                        {/* <span className="welcomeText">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.</span>
                        <span>
                            <Button className='letsGo' type="submit" onClick={showUpload}>Let’s Go!</Button>
                        </span> */}
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={newInterview} onHide={newInterviewClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered className="newInterview interviewContainer"
            >
                <Modal.Body className="newModal">
                    <Form onSubmit={handleSubmit}>
                        <div className="col-sm-6 pb-3" >
                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label className="text-start labelcss">Choose Role</Form.Label>

                                <Select
                                    value={selectedOption}
                                    onChange={handleChange}
                                    options={options}
                                    isClearable
                                    placeholder="Type to search..."
                                />
                                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className="row jobescription">

                            <Form.Label className="text-start labelcss" style={{ display: 'flex', justifyContent: 'space-between' }}><span>Job Description</span>  <span style={{ color: '#FF7F50', cursor: 'pointer' }} >Upload</span></Form.Label>
                            <Form.Group controlId="exampleForm.ControlTextarea1">

                                <Form.Control as="textarea" required
                                    name="content"
                                    onChange={handleInputChange}
                                    className='cardBody'
                                />
                                <Form.Control.Feedback type="invalid">Please enter terms</Form.Control.Feedback>
                            </Form.Group>

                        </div>

                        <span className="d-flex ms-xs-3 justify-content-end ms-auto">
                            <Button className='savebtn' type="submit" >Submit</Button>
                        </span>
                    </Form>
                </Modal.Body>

            </Modal>




        </>
    );


}


const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};