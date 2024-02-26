
import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import './Contact.css';
import { contactus } from "../../redux/feedBack";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
export default function Contact() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState("");
  const dispatch = useDispatch()
  const isEmailValid = (inputEmail) => {
   
    const emailRegex = /^([\w\-]+\.?){0,2}[\w\-]+@[\w.\-]+$/;

    return emailRegex.test(inputEmail);
  };
  const isMessageValid = (message) => {

    return message.trim().length > 8;
  };
  const handleEmailChange = (event) => {
    const inputEmail = event.target.value;

    setEmail(inputEmail);

    if (errors.email && isEmailValid(inputEmail)) {
      const updatedErrors = { ...errors };

      delete updatedErrors.email;

      setErrors(updatedErrors);
    }
  };
  const handleMessageChange = (event) => {
    const inputMessage = event.target.value;

    setMessage(inputMessage);

    if (errors.message && isMessageValid(message)) {
      const updatedErrors = { ...errors };

      delete updatedErrors.message;

      setErrors(updatedErrors);
    }
  };

  const handleNameChange = (event) => {
    const name = event.target.value;

    setName(name);

    if (errors.name) {
      const updatedErrors = { ...errors };

      delete updatedErrors.name;

      setErrors(updatedErrors);
    }
  };
  const handleSubjectChange = (event) => {
    const subject = event.target.value;

    setSubject(subject);

    if (errors.subject) {
      const updatedErrors = { ...errors };

      delete updatedErrors.subject;

      setErrors(updatedErrors);
    }
  };
  const body = {
    name: name,
    email: email,
    subject:subject,
    message:message
}
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const validationErrors = {};

    if (!isEmailValid(email)) {
      validationErrors.email = "Please enter a valid email address.";
    }
    if (!isMessageValid(message)) {
      validationErrors.message =
        "Please enter a valid feedback Message of length greater than 8.";
    }
    if (!subject) {
      validationErrors.subject =
        "Please enter a subject";
    }

    if (!name) {
      validationErrors.name =
        "Please enter a name";
    }
    //Set validation errors if any

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      return;
    }
    if (Object.keys(validationErrors).length === 0) {
      setEmail("");
      setMessage("");
      setName("");
      setSubject("");
      dispatch(contactus(body))
      .then((result) => {
          toast.success("Thank you for contacting us!", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 5000,
              hideProgressBar: true,
          });
       });
    }

    setErrors({});
  };

  const cancelContact =()=>{
    setEmail("");
      setMessage("");
      setName("");
      setSubject("");
  }

  return (
    <div className="p-5">
       <ToastContainer />
      <h3>Contact Us for Zunamu.com</h3>
      <br></br>
      <p>Thank you for wanting to reach out to Zunamu. Please complete the following form and simply
        let us know why you&#39;re contacting us and we’ll get back to you as soon as possible.</p>

      <Row xl={12}>

        <Col lg={6}>

          <Form onSubmit={handleFormSubmit}>
            <Form.Group
              className="mb-3  name-contact"
              controlId="formBasicFname"
            >
              <Form.Label className="text-start m-0 p-0">
                Name <span style={{ color: "rgba(255, 0, 0, 1)" }}>*</span>
              </Form.Label>
              <Form.Control
                className="contact-us-fields m-0 p-0"
                type="text"
                // placeholder="First Name"
                value={name}
                onChange={handleNameChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3  mt-4" controlId="formBasicEmail">
              <Form.Label className="text-start m-0 p-0">
                Email Address <span style={{ color: "rgba(255, 0, 0, 1)" }}>*</span>
              </Form.Label>
              <Form.Control
                className="contact-us-fields m-0 p-0"
                type="email"
                //   placeholder="Email Address"
                value={email}
                onChange={handleEmailChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3  mt-4" controlId="formBasicEmail">
              <Form.Label className="text-start m-0 p-0">
                Subject <span style={{ color: "rgba(255, 0, 0, 1)" }}>*</span>
              </Form.Label>
              <Form.Control
                className="contact-us-fields m-0 p-0"
                type="text"
                //   placeholder="Email Address"
                value={subject}
                onChange={handleSubjectChange}
                isInvalid={!!errors.subject}
              />
              <Form.Control.Feedback type="invalid">
                {errors.subject}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className=" mt-5 mb-3"
              controlId="formBasicName"
            >
              <Form.Label className="text-start mb-3">
                Message<span style={{ color: "rgba(255, 0, 0, 1)" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your message"
                value={message}
                as="textarea"
                rows={4}
                onChange={handleMessageChange}
                isInvalid={!!errors.message}
              />
              <Form.Control.Feedback type="invalid">
                {errors.message}
              </Form.Control.Feedback>
            </Form.Group>


            <Row>
              <Col>
                <Button
                  type="submit"
                  className='contactbtncss'
                 
                >
                  Send
                </Button></Col>
              <Col><Button className='contactcancelbtn'    onClick={cancelContact} >Cancel</Button></Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  )
}
