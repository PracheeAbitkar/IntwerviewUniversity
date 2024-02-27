import React, { useState, useEffect } from 'react'
import { Button, Card, Col, Form, Image, Row, Container, CardDeck } from "react-bootstrap";
import google from '../../assets/images/google.svg'
import apple from '../../assets/images/apple.svg'
import './login.css';
import mainlogo from '../../assets/images/mainlogo.png'
import { addAuthenticator, facebookLogin, getUserProfile, signinuser } from '../../redux/authSlice';
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import FacebookLoginButton from './FacebookLoginButton';
import AppleLogin from 'react-apple-login'
import loginside from '../../assets/images/loginside.png'
import blue from '../../assets/images/blue.svg'
import ellipse from '../../assets/images/ellipse.png'
const LogIn = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showEye, setShowEye] = useState(false);

  const navigate = useNavigate();

  const isAuthenticated = () => {
    return sessionStorage.getItem('isAuthenticated') || localStorage.getItem('isAuthenticated') !== null ? true : false
  }

  useEffect(()=>{
    if(isAuthenticated()) navigate("/interview")
  },[])

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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
      setShowEye(true)
    } else {
      setShowEye(false)
    }

    const inputPassword = event.target.value;
    setPassword(inputPassword);

    if (errors.password && inputPassword.trim().length > 8) {
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

  const handleFormSubmit = (event) => {

    event.preventDefault();

    // form validation
    const validationErrors = {};
    if (!isEmailValid(email)) {
      validationErrors.email = 'Please enter a valid email address.';
    }


    if (!isPasswordValid(password)) {
      validationErrors.password = 'Please enter a valid password';
    }

    //Set validation errors if any
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Form is valid, perform login logic here

    // Reset form fields and errors
    setEmail('');
    setPassword('');
    //setRememberMe(false);
    setErrors({});
    const body = {
      email: email?.toLowerCase(),
      password: password
    }

    dispatch(signinuser(body))
      .then((result) => {
        //console.log(result,"result")
        if (result.payload.key) {
          navigate('/interview')
          localStorage.setItem('initialquestpopup', true)


          if (rememberMe) {
            // Store token in session storage if "Remember me" is checked
           console.log("sess")
           localStorage.setItem('isAuthenticated',true)
            
          } else {
            console.log("local")
            // Store token in local storage if "Remember me" is not checked
            sessionStorage.setItem('isAuthenticated',true)
          }

        
        
          dispatch(getUserProfile())
            .then((result) => {
              // console.log(result,"result")

              localStorage.setItem('role', result.payload.role)
              localStorage.setItem('username', result.payload.full_name)
              localStorage.setItem('email', result.payload.email)
              localStorage.setItem('userId', result.payload.id)



            })
            .catch((errordata) => {

            });
        } else {

        }
      })
      .catch((error) => {
        console.log(error)
      });

  };

  const isEmailValid = (inputEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputEmail);
  };
  const isPasswordValid = (inputPassword) => {
    return inputPassword.trim().length > 0;
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
                // localStorage.setItem("oauth",true)
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
    top: 80,
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
    left: 1000,
    backgroundImage: `url(${blue})`,
    backgroundRepeat: 'no-repeat',
  };

  return (

    <Container fluid className="d-flex justify-content-center align-items-center py-5 login">
      <div style={{ width: '10px', height: '10px' }}>
        <div style={backgroundImageStyle}></div>
        </div>
      <div style={{ width: '10px', height: '10px' }}>
        <div style={backgroundImageStyle1}></div></div>
      <span className='loginrow'>


        <Row className="no-gutters mx-1 " >
          <Col className="d-flex d-none d-lg-block" xl={6}>
            <Card className="flex-fill no-margin loginImage loginimgcontainer box-shadow">
              <Card.Body>
                <div className='logocss loginmargin1 '>
                  {/* <Image variant="top" className="img-fluid" style={{height:48}} src={mainlogo} /> */}
                </div>
                <div className='logocss d-none d-lg-block' >
                  <Image variant="top" className="img-fluid custom-img" src={loginside} />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex" xl={6}>
            <Card className="flex-fill no-margin box-shadow">
              <Card.Body>

                <div className="text-center p-2 loginmargin" >
                  <Card.Title className='logintitle'>Login</Card.Title>
                </div>
                <div className='loginContainer'>
                  <div className='lgimageflex'>

                    <AppleLogin
                      // clientId={"com.round-unit-43333.serviceId"}
                      clientId={"com.round-unit-43333.serviceId"}
                      redirectURI={"https://round-unit-43333.botics.co/"}
                      usePopup={true}
                      callback={signInWithApple}
                      scope="email name"
                      className='cursor'
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

                    <Image src={google} alt="Image" className='socialgoogle cursor' onClick={() => {
                      handleGoogleSignInAPI()
                    }} />
                  </div>
                  <div className='bordercss mt-4 mb-3'></div>
                  <ToastContainer />

                  <Form onSubmit={handleFormSubmit}>
                    <Form.Group className='formgr' controlId="formEmail">
                      <Form.Label className="text-start labelcss">Enter Email Address<span class="required">*</span></Form.Label>
                      <Form.Control
                        type="email"
                        className='inputcss'
                        value={email}
                        onChange={handleEmailChange}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid" className='text-start errorcss'>{errors.email}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className='formgr' controlId="formPassword">

                      <Form.Label className="text-start labelcss">Enter Password<span class="required">*</span>

                      </Form.Label>
                      <div className='position-relative'>
                        <Form.Control
                          type={showPassword ? 'text' : 'password'}
                          className='inputcss passcss'
                          value={password}
                          onChange={handlePasswordChange}
                          isInvalid={!!errors.password}
                        />

                        {showEye &&

                          <FontAwesomeIcon
                            className='eyeicon1'
                            icon={showPassword ? faEye : faEyeSlash}
                            onClick={handleTogglePasswordVisibility}
                          />}
                           <Form.Control.Feedback type="invalid" className='text-start errorcss'>{errors.password}</Form.Control.Feedback>
                      </div>
                     

                      <Row className='mt-2 mx-1'>

                        <Col>
                          <Form.Check
                            type="checkbox"
                            label="Remember me"
                            checked={rememberMe}
                            onChange={handleRememberMeChange}
                            isInvalid={!!errors.rememberMe}
                            className='labelcss1'
                          />
                          <Form.Control.Feedback type="invalid" className='text-start errorcss'>{errors.rememberMe}</Form.Control.Feedback>
                        </Col>
                        <Col>
                          <div className="labelforget"
                            onClick={() => navigate("/forgetpassword")}>Forgot Password?</div>
                        </Col>
                      </Row>
                    </Form.Group>
                    <Button
                      className='btncss'
                      type="submit"
                    >
                      Login
                    </Button>

                  </Form>

                </div>
                <p className="text-center labelcss bottomcss">Not registered yet?
                  <Link to="/signup" state={{}}>
                    <span
                      className='signupcss ms-1'>
                      Sign up
                    </span>
                  </Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </span>
    </Container>

  )
}

export default LogIn
