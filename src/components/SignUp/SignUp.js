
import React, { useState } from 'react'
import { Button, Card, Col, Form, Image, Row, Container, CardDeck } from "react-bootstrap";
import google from '../../assets/images/google.svg'
import apple from '../../assets/images/apple.svg'
import './SignUp.css';
import mainlogo from '../../assets/images/mainlogo.png'
import { addAuthenticator, facebookLogin, getUserProfile, signinuser } from '../../redux/authSlice';
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import AppleLogin from 'react-apple-login'
import loginside from '../../assets/images/loginside.png'
import blue from '../../assets/images/blue.svg'
import ellipse from '../../assets/images/ellipse.png'
import { signUpUser } from "../../redux/authSlice";
import FacebookLoginButton from '../LogIn/FacebookLoginButton';
export default function SignUp() {
    const dispatch = useDispatch()
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showEye, setShowEye] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirm_password] = useState("");
    const navigate = useNavigate();
    const [showPasswordPass, setShowPasswordPass] = useState(false);
    const [showEyePass, setShowEyePass] = useState(false);
    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleTermsNConditionsChange = () => {
        setTnc(!tnc);
        if (errors.tnc) {
            const updatedErrors = { ...errors };

            delete updatedErrors.tnc;

            setErrors(updatedErrors);
        }
    };
    const [tnc, setTnc] = useState(false);
    const handleTogglePasswordVisibilityPassword = () => {
        setShowPasswordPass((prevShowPassword) => !prevShowPassword);
    };

    const isNameValid = (inputName) => {
        // Basic email validation using regular expression

        const nameRegex = /^([a-zA-Z'-.]+(?: [a-zA-Z'-.]+)?)$/;

        // made a change in the name regex

        return nameRegex.test(inputName);
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

    const handlePasswordChange = (event) => {
        if (event.target.value.length > 0) {
            setShowEyePass(true)
        } else {
            setShowEyePass(false)
        }

        const inputPassword = event.target.value;
        setPassword(inputPassword);
        // const validationErrors = {};
        // if (!isPasswordValid(inputPassword)) {
        //     console.log("inputPassword.length",inputPassword.length)
        //     if (!isNameValid(name)) {
        //         validationErrors.name = "Please enter a valid user name.";
        //     }
        //     if (!isEmailValid(email)) {
        //         validationErrors.email = "Please enter a valid email address.";
        //     }
        //     if(!/[A-Z]/.test(inputPassword)){
        //         validationErrors.password = "Password must contain at least one uppercase letter.";
        //     }
        //     if(!/[@$!%*?&]/.test(inputPassword)){
        //         validationErrors.password = "Password must contain at least one special character.";
        //     }
        //     if(!/[a-z]/.test(inputPassword)){
        //         validationErrors.password = "Password must contain at least one lowercase letter.";
        //     }
        //     if(!/[0-9]/.test(inputPassword)){
        //         validationErrors.password = "Password must contain at least one numeric number.";
        //     }
        //     if(inputPassword.length < 8){
        //         validationErrors.password = "Password must be at least 8 characters long.";
        //     }
        //     if (!isConfirmPasswordValid(confirm_password)) {
        //         validationErrors.confirm_password = "Please enter a valid password";
        //     }
        //     // if (!isPasswordMatches(confirm_password)) {
        //     //     validationErrors.confirm_password_matches = "Password and Confirm does not match";
        //     // }
        //     if (Object.keys(validationErrors).length > 0) {
        //         setErrors(validationErrors);
        //         return;
        //     }
            
        // }else
        
        if (errors.password && inputPassword.trim().length > 8 && isPasswordValid(inputPassword)) {
            const updatedErrors = { ...errors };
            delete updatedErrors.password;
            setErrors(updatedErrors);
        }
    };

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
        if (errors.rememberMe) {
            const updatedErrors = { ...errors };
            delete updatedErrors.rememberMe;
            setErrors(updatedErrors);
        }
    };
    const isConfirmPasswordValid = (inputPassword) => {
        // Implement your own password validation logic

        // return inputPassword.trim().length > 8
        const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
        return regex.test(inputPassword);
    };
    const isPasswordMatches = (inputPassword) => {
        return inputPassword === password
    }


    const body = {
        name: name,
        email: email,
        password: password,
        confirm_password: confirm_password
    }
    const handleFormSubmit = (event) => {
        event.preventDefault();


        const validationErrors = {};
        if (!isNameValid(name)) {
            validationErrors.name = "Please enter a valid user name.";
        }
        if (!isEmailValid(email)) {
            validationErrors.email = "Please enter a valid email address.";
        }
        // if(password.length < 8){
        //     validationErrors.password = "password length should be 8 character long";
        // }
        if (!isPasswordValid(password)) {
            if(!/[A-Z]/.test(password)){
                validationErrors.password = "Password must contain at least one uppercase letter.";
            }
            if(!/[@$!%*?&]/.test(password)){
                validationErrors.password = "Password must contain at least one special character.";
            }
            if(!/[a-z]/.test(password)){
                validationErrors.password = "Password must contain at least one lowercase letter.";
            }
            if(!/[0-9]/.test(password)){
                validationErrors.password = "Password must contain at least one numeric number.";
            }
            if(password.length < 8){
                validationErrors.password = "Password must be at least 8 characters long.";
            }
        }

        if (!confirm_password) {
            validationErrors.confirm_password = "Please enter a valid password";
        }
        if (confirm_password && !isPasswordMatches(confirm_password)) {
            validationErrors.confirm_password_matches = "Password and Confirm Password does not match";
        }
        if (!tnc) {
            validationErrors.tnc = "Please accept the terms & conditions";
        }
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        if (Object.keys(validationErrors).length === 0) {
            setEmail("");
            setName("")
            setPassword("");
            setConfirm_password("");
            setTnc(false);
            dispatch(signUpUser(body))
                .then((result) => {
                    if (result.payload.key) {
                        toast.success('Sign-up Successful!', {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 2000,
                            hideProgressBar: true,
                        });
                        navigate('/')
                    } else {
                        const error = result.payload.email[0];
                        toast.error(error, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 2000,
                            hideProgressBar: true,
                        });
                    }
                })

        }
        setErrors({});
    };

    const isEmailValid = (inputEmail) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(inputEmail);
    };
    const isPasswordValid = (inputPassword) => {
        // return inputPassword.trim().length > 8;
        // const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
        const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}/;
        return regex.test(inputPassword);
    };

    const responseFacebook = (accessToken) => {

        if (accessToken) {
            const body = {
                access_token: accessToken
            }

            let data = JSON.stringify(body)
            dispatch(facebookLogin(data))
                .then((result) => {

                    if (result.payload.key) {
                        dispatch(getUserProfile())
                            .then((result) => {
                                localStorage.setItem('role', result.payload.role)
                                localStorage.setItem('username', result.payload.username)
                                localStorage.setItem('userId', result.payload.id)
                                if (result.payload.role == 'supplier') {
                                    navigate('/quotationDashboard')
                                } else if (result.payload.role == 'contractor') {
                                    navigate('/contractorDashboard')
                                } else if (result.payload.role == 'trucking') {
                                    navigate('/truckingdashboard')
                                } else {
                                    navigate('/profileinformation')
                                }

                            })
                            .catch((errordata) => {

                            });
                    }
                })
                .catch((error) => {
                    console.log(error)
                });

        } else {

        }

    }

    const clientId = '215908869528-ilajam71misjhg5cnak7bj1ar1rfvrhb.apps.googleusercontent.com'
    const handleGoogleSignInAPI = async dispatch => {
        try {
            const client = window.google.accounts.oauth2.initTokenClient({
                client_id: clientId,
                scope: "https://www.googleapis.com/auth/userinfo.email",
                callback: res => {

                    if (res?.access_token) {

                        const body = {
                            access_token: res.access_token
                        }
                        let data = JSON.stringify(body)
                        let config = {
                            method: "post",
                            url: 'https://round-unit-43333.botics.co/modules/social-auth/google/login/',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            data: data
                        }

                        axios
                            .request(config)
                            .then(response => {
                                localStorage.setItem("token", response.data.key)
                                googlelogin(response.data.key)
                            })
                            .catch(error => {
                                window.scrollTo(0, 0)
                                if (error?.response?.status === 400) {
                                    console.log(error, "error")
                                    toast.error(error.response.data.non_field_errors[0], {
                                        position: toast.POSITION.TOP_RIGHT,
                                        autoClose: 2000,
                                        hideProgressBar: true,
                                    });
                                }
                            })
                    } else {
                        window.scrollTo(0, 0)
                        toast.error("No access token", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 2000,
                            hideProgressBar: true,
                        });
                    }
                },
                error_callback: err => {
                    window.scrollTo(0, 0)
                    toast.error("No access token", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000,
                        hideProgressBar: true,
                    });
                }
            })
            console.log(await client.requestAccessToken())
        } catch (err) {
        }
    }


    const googlelogin = (response) => {
        dispatch(addAuthenticator(response))
        navigate('/interview')
        localStorage.setItem('initialquestpopup', true)
        localStorage.setItem('passworddisable', true)
        dispatch(getUserProfile())
            .then((result) => {
                // localStorage.setItem('role', result.payload.role)
                // localStorage.setItem('username', result.payload.username)
                // localStorage.setItem('userId', result.payload.id)
                localStorage.setItem('role', result.payload.role)
                localStorage.setItem('username', result.payload.full_name)
                localStorage.setItem('email', result.payload.email)
                localStorage.setItem('userId', result.payload.id)
               


            })
            .catch((errordata) => {

            });


    }

    const signInWithApple = response => {
        console.log(response, "res")
        if (response?.authorization?.id_token) {
            const { authorization } = response || {}
            const { id_token, code } = authorization || {}

            const body = {
                id_token: id_token,
                access_token: code
            }
            let data = JSON.stringify(body)
            let config = {
                method: "post",
                url: 'https://round-unit-43333.botics.co/modules/social-auth/apple/login/',
                headers: {
                    "Content-Type": "application/json"
                },
                data: data
            }
            axios
                .request(config)
                .then(appleResponse => {
                    console.log(appleResponse, "appleResponse")
                    window.scrollTo(0, 0)
                    if (appleResponse?.status === 200 || appleResponse?.status === 201) {
                        console.log(appleResponse, "appleResponse")
                        toast.success("login success", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 5000,
                            hideProgressBar: true,
                        });

                        if (appleResponse.data.key) {
                            localStorage.setItem('token', appleResponse.data.key)
                            localStorage.setItem('isAuthenticated', true)
                            navigate('/interview')
                            toast.success('Login Successful!', {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 2000,
                                hideProgressBar: true,
                            });
                            localStorage.setItem('passworddisable', true)
                            localStorage.setItem('initialquestpopup', true)
                            dispatch(getUserProfile())
                                .then((result) => {
                                    localStorage.setItem('role', result.payload.role)
                                    localStorage.setItem('username', result.payload.full_name)
                                    localStorage.setItem('email', result.payload.email)
                                    localStorage.setItem('userId', result.payload.id)
                                   
                                })
                                .catch((errordata) => {

                                });
                        } else {

                        }


                    } else if (appleResponse?.status === 400) {
                        console.log(appleResponse, "appleResponse")
                        toast.error("Error", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 2000,
                            hideProgressBar: true,
                        });
                    }
                })
                .catch(error => {
                    window.scrollTo(0, 0)
                    if (error?.response?.status === 400) {
                        toast.error("Error", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 2000,
                            hideProgressBar: true,
                        });
                    }
                })
        } else {
            console.log('error')
        }
    }

    const backgroundImageStyle = {
        position: 'absolute',
        top: 110,
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
    const handleNameChange = (event) => {
        const inputName = event.target.value;

        setName(inputName);

        // Clear the error for email field if it becomes valid

        if (errors.name && isNameValid(inputName)) {
            const updatedErrors = { ...errors };

            delete updatedErrors.name;

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

        setConfirm_password(inputPassword);

        if (!inputPassword) {
            const updatedErrors = { ...errors };
      
            updatedErrors.confirm_password = "Please enter Confirm Password"
      
            setErrors(updatedErrors);
          }
      
          if (inputPassword != password) {
            const updatedErrors = { ...errors };
      
            updatedErrors.confirm_password = "Create Password and Confirm Password does not match"
      
            setErrors(updatedErrors);
          }

        // Clear the error for password field if it becomes non-empty
        // const validationErrors = {};
        // if (!isConfirmPasswordValid(inputPassword)) {
        //     console.log("test")
        //     if (!isNameValid(name)) {
        //         validationErrors.name = "Please enter a valid user name.";
        //     }
        //     if (!isEmailValid(email)) {
        //         validationErrors.email = "Please enter a valid email address.";
        //     }
        //     if(inputPassword.length < 8){
        //         validationErrors.confirm_password = "Password must be at least 8 characters long.";
        //     }
        //     if (!isPasswordValid(password)) {
        //         validationErrors.password = "Please enter a valid password";
        //     }
        //     if (!isPasswordMatches(confirm_password)) {
        //         validationErrors.confirm_password_matches = "Password and Confirm Password does not match";
        //     }
        //     if (Object.keys(validationErrors).length > 0) {
        //         setErrors(validationErrors);
        //         return;
        //     }
            
        // }else 
        
        if (errors.confirm_password && inputPassword.trim().length > 8 && isConfirmPasswordValid(inputPassword)) {
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

    return (
        <div>
            <Container fluid className="d-flex justify-content-center align-items-center py-5 login">
                <div style={{ width: '10px', height: '10px' }}>
                    <div style={backgroundImageStyle}></div></div>
                <div style={{ width: '10px', height: '10px' }}>
                    <div style={backgroundImageStyle1}></div></div>
                <span className='loginrow'>
                    <Row className="no-gutters mx-1 " >
                        <Col className="d-flex d-none d-lg-block " xl={6} >
                            <Card className="flex-fill no-margin loginImage imgcontainer box-shadow">
                                <Card.Body>
                                    <div className='logocss loginmargin1'>
                                        {/* <Image variant="top" className="img-fluid" style={{ height: 48 }} src={mainlogo} /> */}
                                    </div>
                                    <div className='logocss d-none d-lg-block'>
                                        <Image variant="top" className="img-fluid custom-img" style={{ height: 500 }} src={loginside} />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="d-flex" xl={6}>
                            <Card className="flex-fill no-margin box-shadow">
                                <Card.Body>
                                    <div className="text-center p-2 loginmargin" >
                                        <Card.Title className='logintitle'>Sign up</Card.Title>
                                    </div>


                                    <div className='lgimageflex'>

                                        <AppleLogin
                                            clientId={"com.flat_star_41744.serviceId"}
                                            redirectURI={"https://flat-star-41744.botics.co/"}
                                            usePopup={true}
                                            callback={signInWithApple}
                                            scope="email name"
                                            responseMode="query"
                                            render={renderProps => (
                                                <button
                                                    onClick={() => {
                                                        renderProps.onClick()
                                                    }}
                                                    className='applebtn'
                                                >
                                                    <Image src={apple} className='socialapple' />

                                                </button>
                                            )}
                                        />
                                        {/* <FacebookLoginButton onFacebookLogin={responseFacebook} /> */}

                                        <Image src={google} alt="Image" className='socialgoogle' onClick={() => {
                                            handleGoogleSignInAPI()
                                        }} />
                                    </div>
                                    <div className='bordercss mt-4 mb-3'></div>
                                    <ToastContainer />

                                    <Form onSubmit={handleFormSubmit}>
                                        <Form.Group className='formgr' controlId="formBasicName">
                                            <Form.Label className="text-start labelcss">Enter Name<span class="required">*</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                className='inputcss'
                                                value={name}
                                                onChange={handleNameChange}
                                                isInvalid={!!errors.name}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.name}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className='formgr' controlId="formBasicEmail">
                                            <Form.Label className="text-start labelcss">
                                                Enter Email address<span class="required">*</span>
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
                                        <Form.Group className='formgr' controlId="formBasicPassword">
                                            <Form.Label className="text-start labelcss">Create Password<span class="required">*</span></Form.Label>
                                            <div className='position-relative'>
                                                <Form.Control
                                                    type={showPasswordPass ? "text" : "password"}
                                                    className='inputcss passcss'
                                                    value={password}
                                                    onChange={handlePasswordChange}
                                                    isInvalid={!!errors.password}
                                                />
                                                {showEyePass && (
                                                    <FontAwesomeIcon
                                                        className="eyeiconcp"
                                                        icon={showPasswordPass ? faEye : faEyeSlash}
                                                        onClick={handleTogglePasswordVisibilityPassword}
                                                    />
                                                )}
                                            </div>
                                            <div style={{ color: "#DD5B51", marginTop:"3px", fontSize:"14px" }}>{errors.password}</div>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.password}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group
                                            className='formgr'
                                            controlId="formBasicConfirmPassword"
                                        >
                                            <Form.Label className="text-start labelcss">Confirm Password<span class="required">*</span></Form.Label>
                                            <div className='position-relative'>
                                                <Form.Control
                                                    type={showPassword ? "text" : "password"}
                                                    className='inputcss passcss'
                                                    value={confirm_password}
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
                                            </div>
                                            <div style={{ color: "#DD5B51", marginTop:"3px", fontSize:"14px" }}>{errors.confirm_password_matches || errors.confirm_password}</div>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.confirm_password_matches || errors.confirm_password}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className='formgr' controlId="formBasicCheckbox">
                                            <Form.Check
                                                type="checkbox"
                                                label="I have read the Terms and Conditions and Privacy Policy"
                                                checked={tnc}
                                                onChange={handleTermsNConditionsChange}
                                                isInvalid={!!errors.tnc}
                                                className='labelcss1'
                                            />

                                            <div style={{ color: "rgb(220,53,69)", fontSize: "15px" }}>{errors.tnc}</div>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.tnc}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Button
                                            type="submit"
                                            className='btncss'
                                        >
                                            Sign Up
                                        </Button>
                                    </Form>
                                </Card.Body>
                                <p className="text-center signupBottom">By Signing up, you agree to  Interview University’s

                  <span 
                    onClick={()=> navigate('/terms')}
                    className='logincss1 ms-1 cursor'>
                    Terms and conditions
                  </span>
                </p>
                            </Card>
                        </Col>
                    </Row>
                </span>
            </Container>
        </div>
    )
}
