import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button, Card, Col, Form, Image, Row, Container, CardDeck } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/authSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import blue from '../../assets/images/blue.svg'
import ellipse from '../../assets/images/ellipse.png'
import loginside from '../../assets/images/loginside.png'
import logo from '../../assets/images/logo.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const ResetPass = () => {
  // let { token } = useParams();
  const currentURL = window.location.href;
  const urlSearchParams = new URLSearchParams(new URL(currentURL).search);

  // Get the 'token' parameter from the URL
  const token = urlSearchParams.get('token');
  const dispatch = useDispatch()
  const [tokenKey, setTokenKey] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")
  const [errors, setErrors] = useState("");
  const response = useSelector(state => state?.user?.detail)
  const [showEyePass, setShowEyePass] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordPass, setShowPasswordPass] = useState(false);

  const handleTogglePasswordVisibilityPassword = () => {
    setShowPasswordPass((prevShowPassword) => !prevShowPassword);
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  useEffect(() => {
    // console.log(token.split("-")[2],"uid")
    // console.log(token.split("-")[0] + "-" + token.split("-")[1],"key")
    // console.log(token,"token")

    setTokenId(token.split("-")[2])
    setTokenKey(token.split("-")[0] + "-" + token.split("-")[1])
  }, [])
  const body = {
    new_password1: password,
    new_password2: rePassword,
    uid: tokenId,
    token: tokenKey
  }
  const handlePasswordChange = (event) => {
    if (event.target.value.length > 0) {
      setShowEyePass(true);
    } else {
      setShowEyePass(false);
    }
    const inputPassword = event.target.value;

    setPassword(inputPassword);
    // Clear the error for password field if it becomes non-empty

    if (errors.password && inputPassword.trim().length > 8) {
      const updatedErrors = { ...errors };

      delete updatedErrors.password;

      setErrors(updatedErrors);
    }
  };
  const handleConfirmPasswordChange = (event) => {
    if (event.target.value.length > 0) {
      setShowEye(true);
    } else {
      setShowEye(false);
    }
    const inputPassword = event.target.value;

    setRePassword(inputPassword);

    // Clear the error for password field if it becomes non-empty

    if (errors.confirm_password && inputPassword.trim().length > 8) {
      const updatedErrors = { ...errors };
      delete updatedErrors.confirm_password_matches;
      delete updatedErrors.confirm_password;

      setErrors(updatedErrors);
    }
    if (errors.confirm_password_matches && inputPassword === password) {
      const updatedErrors = { ...errors };
      delete updatedErrors.confirm_password_matches;
      delete updatedErrors.confirm_password;

      setErrors(updatedErrors);
    }

    
  };
  const handleSubmit = (e) => {
    e.preventDefault()
  
    const validationErrors = {};
    // if (!isPasswordValid(password)) {
    //   validationErrors.password = "Please enter a valid password";
    // }

    if (!isPasswordValid(password)) {
      if (!/[A-Z]/.test(password)) {
          validationErrors.password = "Password must contain at least one uppercase letter.";
      }

      if (!/[@$!%*?&]/.test(password)) {
          validationErrors.password = "Password must contain at least one special character.";
      }
      if (!/[a-z]/.test(password)) {
          validationErrors.password = "Password must contain at least one lowercase letter.";
      }
      if (!/[0-9]/.test(password)) {
          validationErrors.password = "Password must contain at least one numeric number.";
      }
     
      if (!/[A-Z]/.test(password) && !/[@$!%*?&]/.test(password)) {
          validationErrors.password = "Password must contain at least one uppercase letter and one special character.";
      }

      if (!/[A-Z]/.test(password) && !/[a-z]/.test(password)) {
          validationErrors.password = "Password must contain at least one uppercase letter and one lowercase letter.";
      }

      if (!/[A-Z]/.test(password) && !/[0-9]/.test(password)) {
          validationErrors.password = "Password must contain at least one uppercase letter and one numeric number.";
      }
      //////////////////
      if (!/[@$!%*?&]/.test(password) && !/[a-z]/.test(password)) {
          validationErrors.password = "Password must contain at least one special character and one lowercase letter.";
      }

      if (!/[@$!%*?&]/.test(password) && !/[0-9]/.test(password)) {
          validationErrors.password = "Password must contain at least one special character and one numeric number.";
      }

      /////////////////////      
      if (!/[a-z]/.test(password) && !/[0-9]/.test(password)) {
          validationErrors.password = "Password must contain at least one lowercase letter and one numeric number.";
      }

      ////////////////
      if (!/[A-Z]/.test(password) && !/[@$!%*?&]/.test(password) && !/[a-z]/.test(password)) {
          validationErrors.password = "Password must contain at least one uppercase letter and one special character and one lowercase letter.";
      }

      //////////////

      if (!/[A-Z]/.test(password) && !/[@$!%*?&]/.test(password) && !/[0-9]/.test(password)) {
          validationErrors.password = "Password must contain at least one uppercase letter and one special character and one numeric number.";
      }

      ///////////

      if (!/[A-Z]/.test(password) && !/[a-z]/.test(password) && !/[0-9]/.test(password)) {
          validationErrors.password = "Password must contain at least one uppercase letter and one lowercase letter and one numeric number.";
      }

      /////////
      if (!/[@$!%*?&]/.test(password) && !/[a-z]/.test(password) && !/[0-9]/.test(password)) {
          validationErrors.password = "Password must contain at least one special character and one lowercase letter and one numeric number.";
      }

      //////////
      if (!/[A-Z]/.test(password) && !/[@$!%*?&]/.test(password) && !/[a-z]/.test(password) && !/[0-9]/.test(password)) {
          validationErrors.password = "Password must contain at least one uppercase letter and one special character and one lowercase letter and one numeric number .";
      }


      
      if(password.length < 8){
          validationErrors.password = "password length should be 8 character long";
      }
     
  }
    if (!isConfirmPasswordValid(rePassword)) {
      validationErrors.confirm_password = "Please enter a valid re password";
    }
    if (!isPasswordMatches(rePassword)) {
      validationErrors.confirm_password_matches = "Password and Confirm does not match";
    }
    if (Object.keys(validationErrors).length === 0) {
      setPassword("")
      setRePassword("")
      dispatch(resetPassword(body))

    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      return;
    }
    setErrors({});
  }
  const isPasswordValid = (inputPassword) => {
    // Implement your own password validation logic
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}/;
    return regex.test(inputPassword);
    // return inputPassword.trim().length > 8;
  };
  const isConfirmPasswordValid = (inputPassword) => {
    // Implement your own password validation logic

    return inputPassword.trim().length > 8
  };
  const isPasswordMatches = (inputPassword) => {
    return inputPassword === password
  }

  const backgroundImageStyle = {
    position: 'absolute',
    top: 82,
    right: 0,
    bottom: 0,
    left: 155,
    backgroundImage: `url(${ellipse})`,
    backgroundRepeat: 'no-repeat',
  };

  const backgroundImageStyle1 = {
    position: 'absolute',
    top: 300,
    right: 0,
    bottom: 0,
    left: 986,
    backgroundImage: `url(${blue})`,
    backgroundRepeat: 'no-repeat',
  };
  return (
    <>
      <div>
        <Container fluid className="d-flex justify-content-center align-items-center py-5 login">
          <div style={{ width: '10px', height: '10px' }}>
            <div style={backgroundImageStyle}></div></div>
          <div style={{ width: '10px', height: '10px' }}>
            <div style={backgroundImageStyle1}></div></div>
          <span className='loginrow'>
            <Row className="no-gutters mx-1 " >
              <Col  className="d-flex d-none d-lg-block" xl={6}>
                <Card className="flex-fill no-margin loginImage">
                  <Card.Body>
                    <div className='logocss loginmargin1'>
                      {/* <Image variant="top" className="img-fluid" src={logo} /> */}
                    </div>
                    <div className='logocss d-none d-lg-block'>
                      <Image variant="top" className="img-fluid custom-img" src={loginside} />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="d-flex" xl={6}>
                <Card className="flex-fill no-margin">
                  <Card.Body className="margintop">
                    <div className="text-center p-2  " >
                      <Card.Title className='logintitle mb-3'>Reset Password</Card.Title>
                    </div>
                    <ToastContainer />
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-start labelcss">Enter Password<span class="required">*</span></Form.Label>
                        <div className='position-relative'>
                          <Form.Control
                            type={showPasswordPass ? "text" : "password"}
                            className='inputcss'
                            value={password}
                            onChange={handlePasswordChange}
                            isInvalid={!!errors.password} />
                          {showEyePass && (
                            <FontAwesomeIcon
                              className="eyeiconcp"
                              icon={showPasswordPass ? faEye : faEyeSlash}
                              onClick={handleTogglePasswordVisibilityPassword}
                            />
                          )}
                           <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                        </div>
                       
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-start labelcss">Enter Re-Password<span class="required">*</span></Form.Label>
                        <div className='position-relative'>
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            className='inputcss'
                            value={rePassword}
                            onChange={handleConfirmPasswordChange}
                            isInvalid={!!errors.confirm_password || !!errors.confirm_password_matches}
                          />
                          {showEye && (
                            <FontAwesomeIcon
                              className="eyeiconp"
                              icon={showPassword ? faEye : faEyeSlash}
                              onClick={handleTogglePasswordVisibility}
                            />
                          )}
                           <Form.Control.Feedback type="invalid">
                          {errors.confirm_password_matches || errors.confirm_password}
                        </Form.Control.Feedback>
                        </div>
                       
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
      </div>
      {/* <div>Token-{tokenKey} </div>
      <div>Uid -{tokenId} </div>
      <div>Password -{password} </div>
      <div>Re-Password -{rePassword} </div> */}
    </>
  );
};

export default ResetPass;
