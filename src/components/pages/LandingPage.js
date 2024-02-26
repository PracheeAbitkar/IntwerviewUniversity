import React from 'react'
import robot from '../../assets/images/robot.svg'
import { Col, Container, Row, Image, Button } from 'react-bootstrap'
import startimg from '../../assets/images/startimg.png'
import startimage from '../../assets/images/startimage.png'
import productimg from '../../assets/images/productimg.png'
import intro from '../../assets/images/intro.png'
import arrow1 from '../../assets/images/arrow1.png'
import rectangle from '../../assets/images/rectangle.png'
import success from '../../assets/images/success.png'
import benefit from '../../assets/images/benefit.png'
import footerimg from '../../assets/images/footerimg.png'
import mask from '../../assets/images/mask.png'
import feature from '../../assets/images/feature.png'
import offers from '../../assets/images/offers.png'
import img from '../../assets/images/img.png'
import articulation from '../../assets/images/articulation.png'
import Icon from '../../assets/images/Icon.png'
import './landing.css'
import offer from '../../assets/images/offer.png'
import phone from '../../assets/images/phone.png'
import pinkbg from '../../assets/images/pinkbg.png'
export default function LandingPage() {

    const backgroundImageStyle = {
        position: 'absolute',
        top: 170,
        right: 0,
        bottom: 0,
        left: 50,
        backgroundImage: `url(${pinkbg})`,
        backgroundRepeat: 'no-repeat',
    };
    return (
        <div className='m-3'>

            <Container fluid className="ms-lg-3 me-lg-3 landing-text">
                <div style={{ width: '10px', height: '10px' }}>
                    <div style={backgroundImageStyle}></div>
                </div>
                <Row className="no-gutters">
                    <Col xs={12} lg={7} className="image-col">
                        {/* <Image variant="top" fluid src={startimage} /> */}
                        <h1 className="banner-header  mt-lg-5 me-lg-5 pe-lg-4">
                            <span className="">Avoid the $300K Single-Offer Mistake! </span>
                        </h1>
                        <p className="banner-desc gray-text  pe-lg-5 me-lg-3">
                            Stop Losing $300K Throughout Your Career - Embrace Personalized Interview Coaching and Custom Questions Tailored Just for You.
                        </p>
                        <div className='d-flex d-md-block d-xl-block d-lg-block  justify-content-center'>
                            <Button className='startbtn'>Get Started  <Image src={arrow1} variant="top" /></Button>
                            {/* <Image src={startimg}  variant="top" /> */}
                        </div>
                    </Col>
                    <Col xs={12} lg={5} className="text-col">

                        <div className="image-container">
                            <div className="background first-background"></div>
                            <div className="background second-background"></div>

                            <div className="content">
                                {/* <Image src={mask} alt="Main" className="main-image" /> */}
                                {/* <Image src={AI} alt="Main" className="another-image" /> */}
                            </div>

                        </div>

                    </Col>
                </Row>

            </Container>
            <Container fluid className='ms-lg-3 me-lg-3 landing-text'>
                <Row className="no-gutters ms-lg-2">
                    <Col xs={12} lg={7} className="image-col ">
                        <Image variant="top" fluid src={productimg} />

                    </Col>
                    <Col xs={12} lg={5} className="text-col">
                    <span className='d-flex d-md-block d-xl-block d-lg-block  justify-content-center'> <Image  variant="top" src={rectangle} /></span>
                        <span className='featuretxt d-flex d-md-block d-xl-block d-lg-block  justify-content-center'>
                        Multiple offers yield increased negotiating leverage, don’t leave $1000’s on the table</span>

                    </Col>
                </Row>

            </Container>

            <Container fluid className='ms-lg-3 me-lg-3 landing-text pb-0'>
                <Row className="no-gutters ms-lg-2">
                    <Col xs={12} lg={5} className="text-col ">
                       <span className='d-flex d-md-block d-xl-block d-lg-block  justify-content-center'> <Image  variant="top" src={rectangle} /></span>
                        <span className='featuretxt d-flex d-md-block d-xl-block d-lg-block  justify-content-center'>How it Works</span>
                        <p>
                            <h6 className='customtxt1'>Personalized AI Interview Coaching:</h6>
                            <p className='customtxt'>Upload your resume and job description — Zunamu's AI Interview preparation does the rest, curating interview questions precisely, so they are handpicked for your goals.</p>
                            <h6 className='customtxt1'>Craft Your Work Story:</h6>
                            <p className='customtxt'>We unfold the chapters of your career story, spotlighting your strengths to weave a compelling narrative that resonates in any interview setting.</p>
                            <h6 className='customtxt1'>Experience-Based Prep:</h6>
                            <p className='customtxt'> Employ your actual work history to outshine generic interview responses. Get customized answer advice where you're stuck based on your own resume.</p>

                        </p>

                    </Col>
                    <Col xs={12} lg={7} className="image-col d-flex d-none d-lg-block">
                        <Image variant="top"  src={success} className='success-img' />

                    </Col>
                    <Col xs={12} lg={7} className="image-col d-flex d-block d-lg-none">
                        <Image variant="top" fluid src={img} />

                    </Col>

                </Row>

            </Container>
            <Container fluid className='ms-lg-3 me-lg-3 landing-text  '>
                <Row className="no-gutters ms-lg-2 ">

                    <Col xs={12} lg={6} className="image-col ">
                    <span className='d-flex d-md-block d-xl-block d-lg-block  justify-content-center'> <Image  variant="top" src={rectangle} /></span>

                        <span className='featuretxt d-flex d-md-block d-xl-block d-lg-block  justify-content-center'>Features</span>
                    </Col>
                    <Col xs={12} lg={6} className="text-col">

                    </Col>
                </Row>

            </Container>
            <Container fluid className='ms-lg-3 me-lg-3 landing-text pb-0 '>
                <Row className="no-gutters ms-lg-2">
                    <Col xs={12} lg={2} className="image-col  d-flex d-md-block d-xl-block d-lg-block  justify-content-center">
                        <Image variant="top" fluid src={feature} />
                    </Col>
                    <Col xs={12} lg={4} className="image-col ">

                        <span className='customheader'>Custom AI Questions</span>
                        <p className='customtxt'>Generic is out, specificity is in. Your interviews deserve more than one-size-fits-all.</p>
                    </Col>
                    <Col xs={12} lg={2} className="image-col  d-flex d-md-block d-xl-block d-lg-block justify-content-center">
                        <Image variant="top" fluid src={offer} />
                    </Col>
                    <Col xs={12} lg={4} className="image-col mt-xl-0 mt-lg-0 mt-3">

                        <span className='customheader'>Narrative Crafting</span>
                        <p className='customtxt'>You're not just answering questions; you're telling your story, chapter by impressive chapter.</p>
                    </Col>
                </Row>
            </Container>

            <Container fluid className='ms-lg-3 me-lg-3 landing-text pb-0'>
                <Row className="no-gutters ms-lg-2">
                    <Col xs={12} lg={2} className="image-col  d-flex d-md-block d-xl-block d-lg-block justify-content-center">
                        <Image variant="top" fluid src={phone} />
                    </Col>
                    <Col xs={12} lg={4} className="image-col ">

                        <span className='customheader'>Foundational Experiences</span>
                        <p className='customtxt'>We highlight your professional milestones, ensuring they shine in the spotlight.</p>
                    </Col>
                    <Col xs={12} lg={2} className="image-col  d-flex d-md-block d-xl-block d-lg-block justify-content-center">
                        <Image variant="top" fluid src={phone} />
                    </Col>
                    <Col xs={12} lg={4} className="image-col ">

                        <span className='customheader'>Interactive Help</span>
                        <p className='customtxt'>Stuck on a tough question? Zunamu's AI provides the nudge you need to leap forward.</p>
                    </Col>
                </Row>
            </Container>

            <Container fluid className='landing-text'>
                <Row className='landingtxt'>
                    <Col lg={12} className='footercss mt-5 mb-3'>
                        {/* <Image variant="top" fluid src={footerimg} /> */}
                        <div className="container">
                            <div className="text-box">
                                <p className='bottomtxt'>Zunamu is leveraging advanced AI technology to redefine interview preparation!</p>
                                <p className='bottomtxt1'>Join the revolution and open doors to new job opportunities.</p>

                                <div class="custom-input">
                                    <input type="email" className="email-input" placeholder="Enter your email address" />
                                    <Image src={Icon} alt="icon" />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

            </Container>


        </div>
    )
}
