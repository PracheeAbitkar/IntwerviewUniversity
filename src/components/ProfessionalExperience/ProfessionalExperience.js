import React, { useState, useEffect } from "react";
import Sidebar from './../Account/Sidebar';
import { Row, Container, Col, Form, Button, Modal, Image } from "react-bootstrap";
import './ProfessionalExperience.css'
import { InitiationQuestions, getInitiationQuestions, getPasteResume, getResume, updateExperience, updateProfile } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import uploadicon from '../../assets/images/uploadicon.png'
import axios from "axios";
import right from '../../assets/images/right.png'
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ProfessionalExperience() {
    const navigate = useNavigate()
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({});
    const [resume, setResume] = useState('');
    const [upload, setupload] = useState(false)
    const [pasteresume, setPasteResume] = useState('')
    const [newInterview, setnewInterview] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [hideOnUpload, sethideOnUpload] = useState(true);
    const uploadClose = () => setupload(false)
    const [experience, setExperience] = useState('');
    const [remote, setRemote] = useState(false)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        desired_job_role: '',
        preferred_industry: '',
        experience: '',
        job_location: '',
        career_goal: '',
        remote_option: '',
        full_name: '',
        phone_number: '',
        email: ''
    });

    const [proExperience, setProExperience] = useState([])

    useEffect(() => {
        dispatch(getInitiationQuestions())
            .then((result) => {
                console.log(result.payload[0], "result?.payload[0]")
                const data = result.payload[0]
                formData.desired_job_role = data.desired_job_role
                formData.experience = data.experience
                formData.job_location = data.job_location
                formData.career_goal = data.career_goal
                formData.remote_option = data.remote_option
                formData.preferred_industry = data.preferred_industry
                formData.full_name = data.full_name
                formData.phone_number = data.phone_number
                formData.email = data.email
                console.log(result.payload.length, "result.payload")
                setProExperience(result.payload)
                setRemote(data.remote_option);


            })
            .catch((error) => {
                console.log(error)
            });


        dispatch(getResume())
            .then((result) => {

                console.log(result, "getresume")
              
                setResume(result?.payload?.file_name)



            })
            .catch((error) => {
                console.log(error)
            })

        dispatch(getPasteResume())
            .then((result) => {
                console.log(result.payload, "pasteresume")
                const decodedText = decodeURI(result?.payload?.content);
                setPasteResume(decodedText)

            })
            .catch((error) => {
                console.log(error)
            });


    }, []);

    const handleTextAreaChange = (event) => {
        setPasteResume(event.target.value);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
   
    const handleFormSubmit = (event) => {
        event.preventDefault();

        const validationErrors = {};


        // const form = event.currentTarget;
        // if (form.checkValidity()) {
            // Perform form submission or other actions here
            if (experience != '') {
                formData.experience = experience
            }
            // desired_job_role: '',
            // preferred_industry: '',
            // experience: '',
            // job_location: '',
            // career_goal: '',
            // remote_option: '',
          
            formData.remote_option = remote
            console.log(formData, "formData")

            dispatch(updateExperience(formData))
            .then((result) => {
                console.log(result,"result")
                if(result?.payload?.error){
                    toast.error(result?.payload?.error, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000,
                        hideProgressBar: true,
                    });
                }else{
                    toast.success('Data saved successfully', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000,
                        hideProgressBar: true,
                    });
                }
               
        
              })
              .catch((error) => {
                console.log(error)
              });
        
          
        // } else {
        //     event.stopPropagation();
        // }
        // setValidated(true);

        // if (Object.keys(validationErrors).length > 0) {
        //     setErrors(validationErrors);
        //     return;
        // }
    }


    //////////file upload

    const allowedFileTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 50 * 1024 * 1024; // 50MB in bytes

    const handleDrop = (event) => {
        event.preventDefault();

        const file = event.dataTransfer.files[0];
        handleFile(file);

        var formdata1 = new FormData();
        setupload(false)
        console.log("setupload(false)")
        formdata1.append("file", file);
        formdata1.append("bucket", "interview-universit-43333");
        formdata1.append("file_name", file.name);


        handleFile(file);
        sethideOnUpload(false)
        if (file) {


            let config = {
                method: 'PUT',
                url: 'https://round-unit-43333.botics.co/resumeservice/replace/',
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
                    dispatch(getResume())
                        .then((result) => {

                            console.log(result, "getresume")

                            setResume(result?.payload?.file_name)



                        })
                        .catch((error) => {
                            console.log(error)
                        })
                    // setSelectedImage(response.data.avatar);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            //setSelectedImage(null);
        }

    };

    const handleDragOver = (event) => {
        event.preventDefault();
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

    const handleImageUpload = (event) => {
        console.log(event.target.files[0].name, "data")
        const file = event.target.files[0];
        var formdata1 = new FormData();
        setupload(false)
        console.log("setupload(false)")
        formdata1.append("file", file);
        formdata1.append("bucket", "interview-universit-43333");
        formdata1.append("file_name", file.name);


        handleFile(file);
        sethideOnUpload(false)
        if (file) {


            let config = {
                method: 'PUT',
                url: 'https://round-unit-43333.botics.co/resumeservice/replace/',
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
                    dispatch(getResume())
                        .then((result) => {

                            console.log(result, "getresume")

                            setResume(result?.payload?.file_name)



                        })
                        .catch((error) => {
                            console.log(error)
                        })
                    // setSelectedImage(response.data.avatar);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            //setSelectedImage(null);
        }
    };

    // /initiation_questions/update_job_applicants/
    const handleShow = () => setupload(true);
    const handleSelect = (event) => {

        setExperience(event.target.value)
    };

    const handleOptionChecked = () => {
        setRemote(!remote);
    }


    return (
        <>

            <ToastContainer />
            {/* <Container fluid>
                <Row>
                    <Col lg={4} className="d-none d-lg-block">
                        <Sidebar />
                    </Col> */}
            <Col xl={12} className='d-lg-none d-xl-none d-xl-block d-lg-block  d-flex justify-content-center'><Button className='myprofile' >Professional Experience</Button></Col>
            {/* <Col lg={8} className="mt-3 "> */}
            {proExperience.length > 0 ? <>
                {proExperience?.map((item) => (
                    <Form className="me-lg-5"  onSubmit={handleFormSubmit}>
                        <div className="row mb-3" >
                            <div className="col-sm">
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Label className="text-start labelcss">Desired Job Role</Form.Label>
                                    <Form.Control
                                        type='text'
                                        defaultValue={item.desired_job_role}
                                        name='desired_job_role'
                                        onChange={handleChange}
                                        
                                    />
                                    <Form.Control.Feedback type="invalid">Please desired Job Role</Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-sm">
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Label className="text-start labelcss">Preferred Industry</Form.Label>
                                    <Form.Control
                                        type='text'
                                        defaultValue={item.preferred_industry}
                                        name='preferred_industry'
                                        onChange={handleChange}
                                        
                                    />
                                    <Form.Control.Feedback type="invalid">Please enter preferred industry</Form.Control.Feedback>
                                </Form.Group>
                            </div>

                        </div>

                        <div className="row mb-3">
                            <div className="col-sm">
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Label className="text-start labelcss">Experience</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="experience"
                                        onChange={handleSelect}
                                        defaultValue={item.experience}
                                    >
                                        <option value=""></option>
                                        <option value="entry-level">Entry Level</option>
                                        <option value="mid-career">Mid Career</option>
                                        <option value="senior">Senior</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">Please enter experience</Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-sm">
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Label className="text-start labelcss">Job Location</Form.Label>
                                    <Form.Control
                                        type='text'
                                        defaultValue={item.job_location}
                                        name='job_location'
                                        onChange={handleChange}
                                        
                                    />
                                    <Form.Control.Feedback type="invalid">Please enter Job Location</Form.Control.Feedback>
                                </Form.Group>
                            </div>

                        </div>
                        <div className="row mb-2 account-row">
                            <div className="col-sm-6"></div>

                            <div className="col-sm-3" style={{ paddingTop: 5 }}>
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Check
                                        type="checkbox"
                                        className='labelcss1'
                                        name="remote_option"
                                        label="Remote"
                                        checked={remote}
                                        onChange={handleOptionChecked}
                                    />
                                </Form.Group>
                            </div></div>

                        <div className="row mb-3" >
                            <Form.Label className="text-start labelcss">  Career Goals</Form.Label>
                            <Form.Group controlId="exampleForm.ControlTextarea1">

                                <Form.Control as="textarea"  name='career_goal'
                                    defaultValue={item.career_goal} onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">Please enter  Career Goals</Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className="col-sm-6 mb-3" style={{ paddingTop: 5 }}>
                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label className="text-start labelcss" style={{ display: 'flex', justifyContent: 'space-between' }}><span>Resume</span>
                                    <span style={{ color: '#FF7F50', cursor: 'pointer' }} onClick={() => handleShow()}>Replace</span></Form.Label>
                                <Form.Control
                                    type='text'
                                    className='textcontainer'
                                    value={resume}
                                    name='resume'
                                    onChange={handleChange}

                                />
                                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className="row pasteresume mb-3">
                            <Form.Label className="text-start labelcss">Paste your Resume</Form.Label>
                            <Form.Group controlId="exampleForm.ControlTextarea1">

                                <Form.Control as="textarea" onChange={handleTextAreaChange}
                                    value={pasteresume}
                                />
                                <Form.Control.Feedback type="invalid">Please enter terms</Form.Control.Feedback>
                            </Form.Group>

                        </div>

                        <span className='d-flex ms-auto  justify-content-end pb-3'>

                            <Button className='savebtn' type="submit"  >Save</Button>
                            <Button className='cancelbtn ms-2 ' onClick={() => navigate("/interview")}>Cancel</Button>

                        </span>
                    </Form>

                ))}</> :
                <Form className="me-lg-5" noValidate validated={validated} onSubmit={handleFormSubmit}>
                    <div className="row">
                        <div className="col-sm">
                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label className="text-start labelcss">Desired Job Role</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='desired_job_role'
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">Please desired Job Role</Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className="col-sm">
                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label className="text-start labelcss">Preferred Industry</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='industry'
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">Please enter preferred industry</Form.Control.Feedback>
                            </Form.Group>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-sm">
                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label className="text-start labelcss">Experience</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='experience'
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">Please enter experience</Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className="col-sm">
                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label className="text-start labelcss">Job Location</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='location'
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">Please enter Job Location</Form.Control.Feedback>
                            </Form.Group>
                        </div>

                    </div>

                    <div className="row" >
                        <Form.Label className="text-start labelcss">  Career Goals</Form.Label>
                        <Form.Group controlId="exampleForm.ControlTextarea1">

                            <Form.Control as="textarea" rows={5}  onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">Please enter  Career Goals</Form.Control.Feedback>
                        </Form.Group>
                    </div>

                    <div className="col-sm-6" style={{ paddingTop: 5 }}>
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Label className="text-start labelcss" style={{ display: 'flex', justifyContent: 'space-between' }}><span>Resume</span>
                                <span style={{ color: '#FF7F50', cursor: 'pointer' }} onClick={() => handleShow()}>Replace</span></Form.Label>
                            <Form.Control
                                type='text'
                                className='textcontainer'
                                value={resume}
                                name='resume'
                                onChange={handleChange}

                            />
                            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                        </Form.Group>
                    </div>

                    <div className="row pasteresume">
                        <Form.Label className="text-start labelcss">Paste your Resume</Form.Label>
                        <Form.Group controlId="exampleForm.ControlTextarea1">

                            <Form.Control as="textarea"
                                value={pasteresume}
                                rows={4} 
                            />
                            <Form.Control.Feedback type="invalid">Please enter terms</Form.Control.Feedback>
                        </Form.Group>

                    </div>

                    <span className='d-flex ms-auto  justify-content-end pb-3'>

                        <Button className='savebtn' type="submit" >Save</Button>
                        <Button className='cancelbtn ms-2 ' onClick={() => navigate("/interview")}  >Cancel</Button>

                    </span>
                </Form>
            }

            <Modal show={upload} onHide={uploadClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered className="interviewprep2"
            >

                <Modal.Body >
                    <div className='wlecomeContainer'>
                        <span className="welcomelable">Upload your latest Resume
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

                        </div>
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                    </div>
                </Modal.Body>


            </Modal>



        </>

    )

}


