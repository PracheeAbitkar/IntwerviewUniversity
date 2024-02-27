import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Container, Image, Modal, Button, Card, Form } from 'react-bootstrap';
import mainlogo from '../../assets/images/mainlogo.png'
import notification from '../../assets/images/notification.png'
import user from '../../assets/images/user.png'
import user1 from '../../assets/images/user1.jpg'
import setting from '../../assets/images/setting.png'
import logout from '../../assets/images/logout.png'
import cross from '../../assets/images/cross.png'
import signin from '../../assets/images/signin.svg'
import signup from '../../assets/images/signup.svg'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';
import axios from "axios";
export default function Header() {
  // const userName = localStorage.getItem('username')
  const userEmail = localStorage.getItem('email')
  const [userName, setUserName] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [show, setShow] = useState(false);
  const [isloggedIn, setIsloggedIn] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') ||localStorage.getItem('isAuthenticated');
  const photo = localStorage.getItem('photo');

  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Update component or state here

      setCount(prevCount => prevCount + 1);
    }, 100); // 5000 milliseconds = 5 seconds


    return () => clearInterval(intervalId); // Cleanup function to clear interval on component unmount
  }, []);
  useEffect(() => {

    dispatch(getUserProfile())
      .then((result) => {

        const data = result.payload;
        const full_name = data.full_name;
        setUserName(full_name)
        setSelectedImage(data.avatar_signed_url);
      })
      .catch((error) => {
        console.log(error)
      });

  }, [isAuthenticated])

  useEffect(() => {
    setSelectedImage('')
    dispatch(getUserProfile())
      .then((result) => {
        setSelectedImage('')
        console.log(result, "resultdata")

        const data = result.payload;
        const full_name = data.full_name;
        setUserName(full_name)
        setSelectedImage(data.avatar_signed_url);
      })
      .catch((error) => {
        console.log(error)
      });

  }, [photo])

  const [menuDisplay, setMenuDisplay] = useState(false);
  const modalClose = () => setShow(false);
  const modalShow = () => setShow(true);
  const navigate = useNavigate()



  const [showLogout, setshowLogout] = useState(false);
  const [deleteacc, setdeleteacc] = useState(false);

  const handleClose1 = () => {
    setShow(false)
    setshowLogout(false)
  };
  const handleClose2 = () => setdeleteacc(false);

  const [selectedItem, setSelectedItem] = useState('');

  const delAccount = () => {
    setdeleteacc(true)
    setMenuDisplay(false)
  }

  const logoutAcc = () => {
    setshowLogout(true)
    setMenuDisplay(false)
  }

  const homenav =() =>{
    navigate('/home')
    setMenuDisplay(false)
  }

  const faqnav =() =>{
    navigate('/faq')
    setMenuDisplay(false)
  }

  const aboutnav=() =>{
    navigate('/about')
    setMenuDisplay(false)
  }
  const contactnav=() =>{
    navigate('/contact')
    setMenuDisplay(false)
  }

  const signupnav=()=>{
    navigate('/signup')
    setMenuDisplay(false)
  }

  const loginnav=()=>{
    navigate('/login')
    setMenuDisplay(false)
  }
  

  const profileClick = () => {
    navigate('/account')
    setMenuDisplay(false)
  }

  const interviewClick=()=>{
    navigate('/interview')
    setMenuDisplay(false)
  }

  const experience = () => {
    navigate('/experience')
    setMenuDisplay(false)
  }

  const feedbackClick = () => {
    navigate('/feedback')
    setMenuDisplay(false)
  }


  const items = [
    { id: 1, name: 'My Profile' },
    { id: 2, name: 'Professional Experience' },
    { id: 3, name: 'Support/ Send Feedback' },
    { id: 4, name: 'Delete Account' },
    { id: 5, name: 'Log out' },
  ];

  const onSetting = () => {
    navigate("/sidebar")
    setShow(false)

  }

  const onLogout = () => {
    setShow(false)
    setshowLogout(false)
    //dispatch(logout())
    localStorage.removeItem('token')
    sessionStorage.removeItem("isAuthenticated");
    localStorage.removeItem('username')
    localStorage.removeItem('role')
    localStorage.removeItem('userId')
    localStorage.removeItem('isAuthenticated')
    localStorage.setItem('isAuthenticated', false)
    sessionStorage.setItem("isAuthenticated", false);
    localStorage.clear();
    sessionStorage.clear();
    // console.log(isAuthenticated,"isAuthenticated")
    // if (!isAuthenticated) 
    navigate('/')


  }

  const deleteAccount = () => {
    let config = {
        method: 'DELETE',
        url: 'https://round-unit-43333.botics.co/deleteuser',
        headers: {
            'X-CSRFTOKEN': `rN3gD7X9fMWNBXec7Y4naOPY4jvc8yvzOAZvMblW4pChKVH0pKZegdontyYtuN1c`,
            'Authorization': `token ${localStorage.getItem('token')}`
        }
    };
    setdeleteacc(false)
    axios.request(config)
        .then((response) => {
          
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            localStorage.removeItem('role')
            localStorage.removeItem('userId')
            localStorage.removeItem('isAuthenticated')
            localStorage.setItem('isAuthenticated', false)
            sessionStorage.setItem('isAuthenticated', false)
            sessionStorage.removeItem("isAuthenticated");
          
            sessionStorage.clear();
            localStorage.clear();
            navigate('/')
        })
        .catch((error) => {
            console.log(error);
        });
}
  return (
    <div>
      <Navbar expand="xl" className='headercss px-3 px-sm-4 px-md-5 px-lg-5 px-xl-5'>

        {isAuthenticated ? (
          < >
            <Navbar.Brand  className='d-lg-none d-block'>
              <Image variant="top" className='img' src={mainlogo} onClick={() => navigate('/interview')}/>
            </Navbar.Brand>
            <Navbar.Brand  className='d-lg-block d-none'>
              <Image variant="top" className='img' src={mainlogo} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setMenuDisplay(!menuDisplay)} />
            <Navbar.Collapse id="basic-navbar-nav" className='d-none d-lg-block'>
              <Nav className="mx-auto">
                <Nav.Link className='interviewprep'>Interview Preparation</Nav.Link>

              </Nav>
              <Nav className='headerimage'>
                <Image variant="top" className='notification cursor' style={{marginRight:"20px"}} src={notification} />
                {!selectedImage && <Image variant="top" className='userimg cursor' style={{marginRight:"5px"}} onClick={() => setShow(true)} src={user1} />}
                {selectedImage && <Image src={selectedImage} roundedCircle style={{ width: '45px', height: '45px', cursor: 'pointer', marginRight:"5px"}} onClick={() => setShow(true)} />}
                <span className='headercss1 ms-2'>
                  {userName}
                  {/* Greesky Schweirald */}
                </span>
              </Nav>
            </Navbar.Collapse>
          </>

        ) : (
          <>
            {/* fluid className="mainContainer mx-5 px-5" */}

            <Navbar.Brand >
              <Image variant="top" className='img' src={mainlogo} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setMenuDisplay(!menuDisplay)} />
            <Navbar.Collapse id="basic-navbar-nav" className='d-none d-lg-block'>
              <Nav className="mx-auto">
                <Nav.Link className='headercss1' onClick={() => navigate("/home")}>Home</Nav.Link>
                <Nav.Link className='headercss1' onClick={() => navigate("/faq")}>FAQ</Nav.Link>
                <Nav.Link className='headercss1' onClick={() => navigate("/about")}>About us</Nav.Link>
                <Nav.Link className='headercss1' onClick={() => navigate("/contact")}>Contact Us</Nav.Link>
              </Nav>
              <Nav className='headerimage'>
                <Image variant="top" className='socialImg cursor' onClick={() => navigate("/signup")} src={signup} />
                <Image variant="top" className='socialImg cursor' onClick={() => navigate("/login")} src={signin} />

              </Nav>
            </Navbar.Collapse>
          </>

        )}

        {menuDisplay && (
          <div className='displayMenu'>

            <div className='d-flex justify-content-between mx-4 my-5'>
              <span className='menuText'>Menu</span>
              <Image variant="top" onClick={() => setMenuDisplay(false)} src={cross} />
            </div>
            {isAuthenticated ? (
              <>
                <div  >
                  <Image src={user} alt="User Photo" roundedCircle className='d-flex  mx-auto' />

                  <Nav.Link className='modaltext mt-2 text-center'>Greesky Schweirald</Nav.Link></div>

                <div className='text-center mt-5'>
                  <Nav.Link className='navHeader mb-2 mt-5'  onClick={interviewClick}>Interview Preparation</Nav.Link><hr />
                  <Nav.Link className='navHeader my-2' onClick={profileClick}>My Profile</Nav.Link><hr />
                  <Nav.Link className='navHeader my-2' onClick={experience}>Professional Experience</Nav.Link><hr />
                  <Nav.Link className='navHeader my-2' onClick={feedbackClick}>Support/ Send Feedback</Nav.Link><hr />
                  <Nav.Link className='navHeader my-2' onClick={delAccount}>Delete Account</Nav.Link><hr />
                  <Nav.Link className='navHeader my-2' onClick={logoutAcc}>Log out</Nav.Link>
                </div>
              </>
            ) :
              (
                <>
                  <div className='text-center '>
                    <span className='navHeader my-2' onClick={homenav}>Home</span><hr />
                    <span className='navHeader my-2' onClick={faqnav}>FAQ</span><hr />
                    <span className='navHeader my-2' onClick={aboutnav}>About us</span><hr />
                    <span className='navHeader my-2' onClick={contactnav}>Contact Us</span><hr />
                    <span className='navHeader my-2' onClick={signupnav}>Signup</span><hr/>
                   
                <Image variant="top" className='socialImg cursor' onClick={loginnav} src={signin} />

                  </div>

                </>

              )}

          </div>
        )}



        <Modal show={show} onHide={modalClose} className="modalnotification">

          <Modal.Body style={{ padding: 0 }} className="modalcss">
            <div className='header-modal mt-3' style={{ borderBottom: '1px solid rgba(255, 255, 255, 1)', paddingBottom: '10px' }}>
              {!selectedImage && <Image src={user1} alt="User Photo" roundedCircle />}
              {selectedImage && <Image src={selectedImage} roundedCircle style={{ width: '45px', height: '45px', cursor: 'pointer' }} onClick={() => setShow(true)} />}

              <Nav.Link className='modaltext mt-2'>{userName}</Nav.Link>
              <Nav.Link className='modaltext1'> {userEmail}</Nav.Link></div>

            <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 1)' }} className='pb-2 pt-2'>
              <span className='setting'>
                <Image src={setting} alt="User Photo" roundedCircle />
                <Nav.Link className='modaltext2 ms-2' onClick={() => onSetting()}>Account Settings</Nav.Link>
              </span></div>
            <span className='setting pb-2 pt-2'>
              <Image src={logout} alt="User Photo" roundedCircle />
              <Nav.Link className='modaltext2 ms-2' onClick={() => setshowLogout(true)}>Logout</Nav.Link>
            </span>
          </Modal.Body>

        </Modal>



        <Modal show={showLogout} onHide={handleClose1}

          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton className='modaltitle'>
            <Modal.Title className='modaltitle1'>Log out</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='logout'>
              <span className="logoutlabel">Are you sure you want to Log out?
              </span>
              <span>
                <Button className='savebtn' type="submit" onClick={() => onLogout()}>Yes</Button>
                <Button className='cancelbtn' style={{ marginLeft: 5 }} type="submit" onClick={handleClose1} >No</Button>
              </span>
            </div>
          </Modal.Body>

        </Modal>

        <Modal show={deleteacc} onHide={handleClose2}

          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton className='modaltitle'>
            <Modal.Title className='modaltitle1'>Delete Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='logout'>
              <span className="logoutlabel">Are you sure you want to delete the account?
              </span>
              <span>
                <Button className='savebtn' type="submit me-3"  onClick={deleteAccount}>Yes</Button>
                <Button className='cancelbtn' type="submit" style={{ marginLeft: 5 }} onClick={handleClose2} >No</Button>
              </span>
            </div>
          </Modal.Body>

        </Modal>
      </Navbar>
    </div>
  )
}

