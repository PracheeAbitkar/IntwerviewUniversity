import React from 'react';
import { Container, Row, Col, Nav, Image } from 'react-bootstrap';
import footerlogo from '../../assets/images/footerlogo.png'
import Instagram from '../../assets/images/Instagram.svg'
import Twitter from '../../assets/images/Twitter.svg'
import YouTube from '../../assets/images/YouTube.svg'
import facebook from '../../assets/images/facebook1.svg'
import './Footer.css'
import { useNavigate } from 'react-router-dom';
const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="text-light py-3 px-3 px-3 px-sm-4 px-md-5 px-lg-5 px-xl-5" style={{ backgroundColor: '#0073B3', color: '#FFFFFF', marginTop: 'auto' }}>
      {/* <Container> */}

      <Row >
        <Col xl={6} className='footerContainer'>
          <span className='me-3 footertext cursor' onClick={() => navigate('/home')}>Home</span>
          <span className='me-3 footertext cursor' onClick={() => navigate('/about')}>About</span>
          <span className='footertext cursor' onClick={() => navigate('/contact')}>Contact</span>
        </Col>

        <Col className='social' xl={6}>
          <Image variant="top" className='socialimg' src={facebook} />
          <Image variant="top" className='socialimg' src={Twitter} />
          <Image variant="top" className='socialimg' src={Instagram} />
          <Image variant="top" className='socialimg' src={YouTube} />
        </Col>
      </Row>

      <hr className="bg-light" />
      <span className='footerrow'>
        <Row xl={12} >
          <Col className='footertext1 order' xs={12} lg={4} md={4}>
            <span>© 2023 Zunamu. All rights reserved.</span>
          </Col>
          <Col className='footerText' xs={12} lg={4} md={4}>
            <Image variant="top" className='footerimg' src={footerlogo} />
          </Col>
          <Col className='footertxt2' xs={12} lg={4} md={4}>
            <span className='me-2 cursor' onClick={() => navigate('/terms')}>Terms of Service</span>
            <span className='cursor' onClick={() => navigate('/privacy')}>Privacy Policy</span>
          </Col>
        </Row>
      </span>

      <Row className='mt-3 footertext p-0'>
        <Col>
          Lorem ipsum dolor sit amet consectetur. Erat aliquet adipiscing orci id diam. Sed malesuada semper pellentesque etiam habitant sollicitudin. Habitasse tristique varius at faucibus senectulacus
          sed cras feugiat. Orci scelerisque orci vel dictumst elementum. Leo faucibus nulla lectus leo tempus sapien. Quam sed nunc quis nulla. Massa suspendisse nisl et netus neque vitae. Dui augue
          scelerisque ac auctor. Diam pellentesque elit odio elementum est vel bibendum at curabitur. Morbi et ipsum ante quis sapien sed.
        </Col>
      </Row>
      {/* </Container> */}
    </footer>
  );
};

export default Footer;
