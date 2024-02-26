import { useState, useEffect } from "react";
import { Row, Button, Form, Col, Container } from "react-bootstrap";
import './Account.css';
import Sidebar from './Sidebar';
import { feedbackuser } from "../../redux/feedBack";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Feedback = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState("");

    const isEmailValid = (inputEmail) => {
        // Basic email validation using regular expression

        const emailRegex = /^([\w\-]+\.?){0,2}[\w\-]+@[\w.\-]+$/;

        return emailRegex.test(inputEmail);
    };
    const isMessageValid = (message) => {
        // Implement your own password validation logic

        return message.trim().length > 8;
    };
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
    const handleMessageChange = (event) => {
        const inputMessage = event.target.value;

        setMessage(inputMessage);

        // Clear the error for email field if it becomes valid

        if (errors.message && isMessageValid(message)) {
            const updatedErrors = { ...errors };

            delete updatedErrors.message;

            setErrors(updatedErrors);
        }
    };
    const body = {
        email: email,
        feedback: message
    }
    const handleFormSubmit = (event) => {
        event.preventDefault();
        

        // Perform validation

        const validationErrors = {};

        if (!isEmailValid(email)) {
            validationErrors.email = "Please enter a valid subject.";
        }
        if (!isMessageValid(message)) {
            validationErrors.message = "Please enter a valid feedback Message of length greater than 8.";
        }
        //Set validation errors if any

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);

            return;
        }
        if (Object.keys(validationErrors).length === 0) {
            dispatch(feedbackuser(body))
                .then((result) => {
                    toast.success("Feedback email sent successfully.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        hideProgressBar: true,
                    });
                });

            setEmail("");
            setMessage("");
        }


        setErrors({});
    };


    return (
        <div >
            {/* <Container fluid>
                <Row>
                    <Col lg={4} className='d-none d-lg-block'>
                        <Sidebar />
                    </Col> */}
            <Col xl={12} className='d-lg-none d-xl-none d-xl-block d-lg-block  d-flex justify-content-center mx-4 mb-3'><Button className='myprofile' >Support/ Send Feedback</Button></Col>
            {/* <Col lg={8} className='mt-5'> */}

            <ToastContainer />

            <div className="mb-5 mx-4">
                <Row>
                    <Col lg={8}>
                        <Form onSubmit={handleFormSubmit} style={{ height: "420px" }}>
                            <Form.Group className="mb-3 mx-4" controlId="formBasicEmail">
                                <Form.Label className="text-start labelcss">
                                    Email<span class="required">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="m-3 mx-4" controlId="formBasicName">
                                <Form.Label className="text-start labelcss">
                                    Feedback<span class="required">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    value={message}
                                    as="textarea"
                                    rows={3}
                                    onChange={handleMessageChange}
                                    isInvalid={!!errors.message}
                                    // maxLength={100}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <span className="d-flex ms-xs-3 justify-content-end ms-auto">
                                <Button className='savebtn' type="submit"  >Submit</Button>
                            </span>

                        </Form>
                    </Col>
                </Row>
            </div>
            {/* </Col >
                </Row >
            </Container > */}
        </div >
    );
};

export default Feedback;
