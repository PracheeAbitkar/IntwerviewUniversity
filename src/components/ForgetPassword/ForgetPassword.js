
import { useState } from "react";
import { Button, Card, Col, Form, Image, Row, Container, CardDeck } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../../redux/authSlice";
// import Logo from "../../assets/Images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import blue from '../../assets/images/blue.svg'
import ellipse from '../../assets/images/ellipse.png'
import loginside from '../../assets/images/loginside.png'
import logo from '../../assets/images/logo.svg'
import './ForgetPassword.css';
const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState("");
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const response = useSelector((state) => state);
    

    useEffect(() => {
        if (response.user.msg === "password reset link send. Please check your email response from forget") {
            toast.success('Email Sent Sucessfully!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
                hideProgressBar: true,
            });
        }
    }, [])

    const handleEmailChange = (event) => {
        const inputEmail = event.target.value;

        setEmail(inputEmail);

        // Clear the error for email field if it becomes valid

        if (errors.email && isEmailValid(inputEmail)) {
            const updatedErrors = { ...errors };

            delete updatedErrors.email;

            setErrors(updatedErrors);
        }
    };
    const isEmailValid = (inputEmail) => {
        // Basic email validation using regular expression

        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
        const emailRegex =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return emailRegex.test(inputEmail);
    };
    const body = {
        email: email,
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(forgetPassword(body))
        const validationErrors = {}

        if (!isEmailValid(email)) {
            validationErrors.email = "Please enter a valid email address.";
        }
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)

            return
        }
        setErrors({});
    };


    const backgroundImageStyle = {
        position: 'absolute',
        top: 110,
        right: 0,
        bottom: 240,
        left: 155,
        backgroundImage: `url(${ellipse})`,
        backgroundRepeat: 'no-repeat',
    };

    const backgroundImageStyle1 = {
        position: 'absolute',
        top: 300,
        right: 0,
        bottom: 250,
        left: 986,
        backgroundImage: `url(${blue})`,
        backgroundRepeat: 'no-repeat',
    };
    return (
        <Container fluid className="d-flex justify-content-center align-items-center py-5 login" >
            <div style={{ width: '10px', height: '10px' }}>
                <div style={backgroundImageStyle}></div></div>
            <div style={{ width: '10px', height: '10px' }}>
                <div style={backgroundImageStyle1}></div></div>
            <span className='loginrow'>
                <Row className="no-gutters mx-1 " >
                    <Col className="d-flex" xl={6}>
                        <Card className="flex-fill no-margin loginImage box-shadow">
                            <Card.Body>
                                <div className='logocss loginmargin1'>
                                </div>
                                <div className='logocss d-none d-lg-block'>
                                    <Image variant="top" className="img-fluid custom-img" src={loginside} />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="d-flex" xl={6}>
                        <Card className="flex-fill no-margin box-shadow">
                            <Card.Body className="margintop">
                                <div className="text-center p-2" >
                                    <Card.Title className='logintitle'>Forgot Password</Card.Title>
                                </div>
                                <ToastContainer />

                                <Form  onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="text-start labelcss">
                                        Email Address<span class="required">*</span>
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            className='inputcss'
                                            value={email}
                                            onChange={handleEmailChange}
                                            isInvalid={!!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button
                                        type="submit"
                                        className='btncss'
                                    >
                                        Reset Password
                                    </Button>
                                    <p className="text-center mt-2 ">
                                    <Link to="/login" state={{}} className="my-2 text-center backbtn">
                                        
                                           Back to Login
                                    </Link></p>
                                </Form>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </span>
        </Container>
    );
};

export default ForgetPassword;
