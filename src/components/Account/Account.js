import React, { useState, useRef, useEffect } from 'react'
import './Account.css';
import user1 from '../../assets/images/user1.svg'
import Sidebar from './Sidebar';
import Camera from '../../assets/images/Camera.svg'
import Upload_icon from '../../assets/images/Upload_icon.svg'
import { useSelector, useDispatch } from "react-redux"
import { getUserProfile, updateProfile, uploadPhoto } from '../../redux/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Card, Nav, Container, Row, Col, Form, Button, Image, Modal } from 'react-bootstrap';
import axios from 'axios';
import ChangePassword from './ChangePassword';

export default function Account() {
    const dispatch = useDispatch()

    const location = useLocation();
    const userdata = useSelector((state) => state.user.userdata);
    const navigate = useNavigate()

    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const [validated, setValidated] = useState(false);
    const updateddata = useSelector((state) => state.user.updateddata);
    const [gender, setgender] = useState('');
    const [errors, setErrors] = useState({});
    // const [phoneError, setPhoneError] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
    const [userData, setuserData] = useState([]);
    const passworddisable = localStorage.getItem('passworddisable');
    const [otherGender, setOtherGender] = useState(false);
    const [genderOther, setGenderOther] = useState('');
    const [savedisable, setsavedisable] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        full_name: '',
        last_name: '',
        gender: '',
        gender_other: '',
        phone_number: "",
        password: "",
        linkedin: ""
    });


    console.log(passworddisable, "passworddisable")
    useEffect(() => {


    }, [passworddisable]);
    useEffect(() => {
        dispatch(getUserProfile())
            .then((result) => {
                console.log(result.payload, "result")
                const data = result.payload;
                setuserData(data)

                formData.email = data.email;
                formData.full_name = data.full_name;
                formData.gender = data.gender;
                formData.phone_number = data.phone_number;
                formData.password = data.password;
                formData.linkedin = data.linkedin;
                formData.gender_other = data.gender_other;
                setGenderOther(data.gender_other)
                setgender(data.gender)
                if (data.gender === 'Others') {
                    setOtherGender(true)

                }
                setSelectedImage(data.avatar_signed_url);

            })
            .catch((error) => {
                console.log(error)
            });

    }, []);
    const handleSelect = (event) => {
        setsavedisable(true)
        if (event.target.value === "Others") {
            setOtherGender(true)
            setgender(event.target.value)
        }
        else {
            setOtherGender(false)
            setgender(event.target.value)
        }
    };

    const handleImageUpload = (event) => {
        const formData1 = new FormData()
        const file = event.target.files[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                toast.error("Image size should be less than 10MB", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    hideProgressBar: true,
                });
                event.target.value = null
                // return;
            } else {
                setSelectedImage(URL.createObjectURL(file));
                formData1.append("avatar", file)

                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'https://round-unit-43333.botics.co/api/v1/uploadpicture/',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `token ${localStorage.getItem('token')}`,
                    },
                    data: formData1
                };
                localStorage.removeItem('photo')
                axios.request(config)
                    .then((response) => {
                        //window.location.reload();

                        dispatch(getUserProfile())
                            .then((result) => {
                                const data = result.payload;
                                setSelectedImage(data.avatar_signed_url);
                                localStorage.setItem('photo', true)
                                toast.success("Image uploaded successfully", {
                                    position: toast.POSITION.CENTER,
                                    autoClose: 5000,
                                    hideProgressBar: true,
                                });
                            })
                            .catch((error) => {
                                console.log(error)
                            });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        } else {
            setSelectedImage(null);
        }
    };
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    var moment = require('moment');
    const [phoneNumberError, setphoneNumberError] = useState('');

    const genderChange = (e) => {
        setGenderOther(e.target.value)
        setsavedisable(true)
    }
    const handleFormSubmit = (event) => {

        event.preventDefault();

        const validationErrors = {};

        const form = event.currentTarget;
        if (form.checkValidity()) {
            formData.gender = gender;
            if (otherGender != '') {
                formData.gender_other = genderOther
            }

            if (gender === 'Male' || gender === 'Female') {
                console.log("gender", gender)
                formData.gender_other = '';
            }

            const data = formData;

            dispatch(updateProfile(data))
                .then((result) => {
                    window.scrollTo(0, 0)
                    toast.success("Profile updated successfully", {
                        position: toast.POSITION.CENTER,
                        autoClose: 5000,
                        hideProgressBar: true,
                    });

                    dispatch(getUserProfile())
                        .then((result) => {
                            console.log("result here", result.payload)
                            const data = result.payload;

                            formData.email = data.email;
                            formData.full_name = data.full_name;
                            formData.gender = data.gender;
                            //formData.phone_number = data.phone_number;
                            formData.password = data.password;
                            formData.linkedin = data.linkedin;
                            formData.gender_other = data.gender_other;
                            setGenderOther(data.gender_other)
                            setgender(data.gender)
                            setSelectedImage(data.avatar_signed_url);
                        })
                        .catch((error) => {
                            console.log(error)
                        });

                })
                .catch((error) => {
                    console.log(error)
                });

            window.scrollTo(0, 0);

        } else {
            event.stopPropagation();
        }
        setValidated(true);


        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
    };

    const handleChange = (event) => {
        setsavedisable(true)

        const { name, value } = event.target;
        console.log(event.target.value, "event.target")


        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

    };



    return (
        <div>
            {/* <Container fluid>
                <Row>
                    <Col lg={4} className='d-none d-lg-block'>
                        <Sidebar />
                    </Col> */}
            <Col xl={12} className='d-lg-none d-xl-none d-xl-block d-lg-block  d-flex justify-content-center px-4 py-2 mb-3'><Button className='myprofile' >My Profile</Button></Col>
            {/* <Col lg={8} className='mt-5'> */}
            <div className="px-4">
                <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                    <ToastContainer />
                    <Row>
                        <Col lg={3}>
                            <div className='header-profile'>
                                <div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        accept="image/png, image/jpeg"
                                        style={{ display: 'none' }}
                                        onChange={handleImageUpload}
                                    />
                                    {/* {!selectedImage && <Image src={Upload_icon} alt="Image" style={{ width: '145px', height: '145px', cursor: 'pointer' }} onClick={handleButtonClick} />} */}

                                    <span className='ms-3'>
                                        {selectedImage ? <Image src={selectedImage} alt="User Photo" roundedCircle style={{ width: '145px', height: '145px', cursor: 'pointer' }} />
                                            : <Image src={user1} alt="User Photo" roundedCircle style={{ width: '145px', height: '145px', cursor: 'pointer' }} />}
                                    </span>
                                    {/* {selectedImage && <span className="e-badge e-badge-info e-badge-notification e-badge-overlap cameraimage" ><Image src={Camera} alt="Image" style={{ width: '26px', height: '30px', cursor: 'pointer' }} onClick={handleButtonClick} /></span>} */}
                                    <span className='profiletextcss'>{formData.username}</span>
                                </div>
                            </div>
                            <span className='flexAccount'>
                                <Button className='quotebtncss ' type="button" onClick={handleButtonClick} >Upload Picture</Button>
                                <p className="accountphoto">max-size: 10mb</p>
                            </span>
                        </Col>
                        <Col lg={8}>
                            <div className="row mb-2 account-row">
                                <div className="col-sm" style={{ paddingTop: 5 }}>
                                    <Form.Group controlId="exampleForm.SelectCustom">
                                        <Form.Label className="text-start labelcss">Full Name<span class="required">*</span></Form.Label>
                                        <Form.Control
                                            type='text'
                                            value={formData?.full_name}
                                            name='full_name'
                                            onChange={handleChange}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">Please enter full name</Form.Control.Feedback>
                                    </Form.Group>

                                </div>
                                <div className="col-sm" style={{ paddingTop: 5 }}>
                                    <Form.Group controlId="exampleForm.SelectCustom">
                                        <Form.Label className="text-start labelcss">Linkedin Url</Form.Label>
                                        <Form.Control
                                            type='text'
                                            className='textcontainer'
                                            value={formData?.linkedin}
                                            name='linkedin'
                                            onChange={handleChange}

                                        />

                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row mb-2 account-row">
                                <div className="col-sm">
                                    <Form.Group controlId="exampleForm.SelectCustom">
                                        <Form.Label className="text-start labelcss">Email Address<span class="required">*</span></Form.Label>
                                        <Form.Control
                                            type='text'
                                            className='textcontainer'
                                            disabled
                                            defaultValue={formData?.email}
                                            name='email'
                                            onChange={handleChange}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">Please Enter Email</Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                                <div className="col-sm" style={{ paddingTop: 5 }}>
                                    <Form.Group controlId="exampleForm.SelectCustom">
                                        <Form.Label className="text-start labelcss" style={{ display: 'flex', justifyContent: 'space-between' }}><span>Password<span class="required">*</span></span>
                                            <span className={passworddisable ? 'disabled-span' : 'changecss'} onClick={() => handleShow()}>change</span>
                                        </Form.Label>
                                        <Form.Control
                                            type='password'
                                            className='textcontainer'
                                            value={"formData?."}
                                            name='password'
                                            disabled={passworddisable}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row mb-2 account-row">
                                <div className="col-sm">

                                    <Form.Group controlId="exampleForm.SelectCustom">
                                        <Form.Label className="text-start labelcss">Gender</Form.Label>

                                        <Form.Control
                                            as="select"
                                            name='gender'
                                            value={gender}
                                            onChange={handleSelect}
                                        >
                                            <option value="">{otherGender ? "Other Gender" : "Select Gender"}</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Others">Other</option>
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            Please select an gender
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    {otherGender &&
                                        <Form.Group controlId="exampleForm.SelectCustom" className='otherGender'>
                                            <Form.Label className="text-start labelcss">Other Gender</Form.Label>
                                            <Form.Control
                                                type='text'
                                                //   className='textcontainer'
                                                name='gender'
                                                value={genderOther}
                                                onChange={genderChange}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">Please enter gender</Form.Control.Feedback>
                                        </Form.Group>}
                                </div>
                                <div className="col-sm" ></div>
                                {/* <div className="col-sm" style={{ paddingTop: 5 }}>
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Label className="text-start labelcss">Phone Number<span class="required">*</span></Form.Label>
                                    <Form.Control
                                        type="tel"
                                        name='phone_number'
                                        defaultValue={formData?.phone_number}
                                        onChange={handleChange}
                                        minLength={10}
                                        pattern="[0-9]{10}"
                                        required
                                    />
                                    {errors.phoneNumberError && <p className='step-error'>{errors.phoneNumberError}</p>}
                                    <Form.Control.Feedback type="invalid">Please enter valid number</Form.Control.Feedback>
                                </Form.Group>
                            </div> */}
                            </div>
                        </Col>
                    </Row>

                    <span className='d-flex ms-auto me-lg-5 justify-content-end pb-3'>

                        <Button className='savebtn' type="submit" disabled={!savedisable}>Save</Button>
                        <Button className='cancelbtn ms-2 me-lg-4' onClick={() => navigate("/interview")}>Cancel</Button>

                    </span>

                </Form></div>
            {/* </Col> */}
            {/* </Row>
            </Container> */}

            <Modal show={showModal} onHide={handleClose}

                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className='modaltitle'>
                    <Modal.Title className='modaltitle1'>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ChangePassword />
                </Modal.Body>

            </Modal>


        </div>
    )
}
