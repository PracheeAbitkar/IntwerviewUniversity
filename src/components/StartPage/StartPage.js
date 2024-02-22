

import React, { useState } from 'react'
import { Button, Card, Col, Form, Image, Row, Container, CardDeck } from "react-bootstrap";
import google from '../../assets/images/google.svg'
import apple from '../../assets/images/apple.svg'
import '../LogIn/login.css';
import mainlogo from '../../assets/images/mainlogo.png'
import { addAuthenticator, facebookLogin, getUserProfile, signinuser } from '../../redux/authSlice';
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import AppleLogin from 'react-apple-login'
import loginside from '../../assets/images/loginside.png'
import blue from '../../assets/images/blue.svg'
import ellipse from '../../assets/images/ellipse.png'
import FacebookLoginButton from './../LogIn/FacebookLoginButton';
import './StartPage.css'
const StartPage = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate();



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
    localStorage.setItem('passworddisable', true)
    localStorage.setItem('initialquestpopup', true)

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
              localStorage.setItem('isAuthenticated',true)
              localStorage.setItem('passworddisable', true)
              localStorage.setItem('initialquestpopup', true)
              navigate('/interview')
              toast.success('Login Successful!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
                hideProgressBar: true,
              });
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
    left: 105,
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
 
      <Container fluid className="d-flex justify-content-center align-items-center py-5 login">
        <div style={{ width: '10px', height: '10px' }}>
          <div style={backgroundImageStyle}></div></div>
        <div style={{ width: '10px', height: '10px' }}>
          <div style={backgroundImageStyle1}></div></div>
        <span className='loginrow'>

          <Row className="no-gutters mx-1 " >
            <Col className="d-flex d-none d-lg-block" xl={6}>
              <Card className="flex-fill no-margin loginImage box-shadow">
                <Card.Body>
                  <div className='logocss loginmargin1'>
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
                    <Card.Title className='logintitle'>Sign up</Card.Title>
                  </div>
                  <div className='loginContainer'>
                    <div className='lgimageflex'>

                      <AppleLogin
                        clientId={"com.round-unit-43333.serviceId"}
                        redirectURI={"https://round-unit-43333.botics.co/"}
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

                  </div>

                  <div className="box-with-border">
                    <p  onClick={()=> navigate('/signup')} className='cursor'>Sign up with your email and password </p>
                  </div>
                  <p className="text-center labelcss bottomcss">I have an account already.

                    <span 
                     onClick={()=> navigate('/login')}
                      className='logincss ms-1 cursor'>
                      Login
                    </span>
                  </p>
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

  )
}

export default StartPage

