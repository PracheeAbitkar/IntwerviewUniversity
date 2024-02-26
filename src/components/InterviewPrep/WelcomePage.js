import React, { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './WelcomePage.css';
import { Button, Modal, Row, Col, Image, Card, Container, Form } from "react-bootstrap";
import { InitiationQuestions, getInitiationQuestions, getUserProfile, updateProfile } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

const steps = [
  { name: 'User Profile' },
  { name: 'Job Preferences' },
  { name: 'Experience Level' },
  { name: 'Career Goals' },
]; // Define your steps with names and emails

export default function WelcomePage({ closeModal }) {
  // const [currentStep, setCurrentStep] = useState(0);
  const [experience, setExperience] = useState('');
  const dispatch = useDispatch()

  // const [errors, setErrors] = useState({});
  // const handleNext = () => {
  //   setCurrentStep((prevStep) => (prevStep < steps.length - 1 ? prevStep + 1 : prevStep));
  // };

  // const [formData, setFormData] = useState({
  //   full_name: '',
  //   email: '',
  //   phone_number: '',
  //   linkedin: '',
  //   desired_job_role: '',
  //   preferred_industry: '',
  //   job_location: "",
  //   experience: "",
  //   career_goal: "",
  //   remote_option: ""
  // });




  ///////////validation

  const [currentStep, setCurrentStep] = useState(0);

  var [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    linkedin: '',
    desired_job_role: '',
    preferred_industry: '',
    job_location: "",
    experience: "",
    career_goal: "",
    remote_option: false
  });
  const [errors, setErrors] = useState({
    fullNameError: '',
    phoneNumberError: '',
    linkedinError: '',
    jobRoleError: '',
    industryError: '',
    locationError: '',
    experienceError: '',
    goalError: ''

    // Add more fields for each step as needed
  });

  // Validation logic for each step
  const validateStep1 = () => {
    let isValid = true;

    const linkedinRegex = /(https?)?:?(\/\/)?(([w]{3}||\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    const onlyAlphabet = /^[a-zA-Z\s]*$/;
    const onlyNumber = /^[0-9]{10}$/;
    const url = formData.linkedin;
    const fullName = formData.full_name;
    // const phoneNumber = formData.phone_number



    // if (!formData.linkedin.trim()) {
    //   setErrors({ ...errors, linkedinError: 'linkedin url is required' });
    //   isValid = false;
    // }
    if (url && !linkedinRegex.test(url)) {
      setErrors({ ...errors, linkedinError: 'Please enter a valid LinkedIn URL' });
      isValid = false;
    }

    // if (!formData.phone_number.trim()) {
    //   setErrors({ ...errors, phoneNumberError: 'Phone Number is required' });
    //   isValid = false;
    // }
    // else if (!onlyNumber.test(phoneNumber)) {
    //   setErrors({ ...errors, phoneNumberError: 'Number format is wrong' });
    //   isValid = false;
    // }
    if (!formData.full_name.trim()) {
      setErrors({ ...errors, fullNameError: 'Full Name is required' });
      isValid = false;
    }
    else if (!onlyAlphabet.test(fullName)) {
      setErrors({ ...errors, fullNameError: 'Only Alphabet is Allowed' });
      isValid = false;
    }


    return isValid;
  };

  const validateStep2 = () => {
    if (!formData.desired_job_role.trim()) {
      setErrors({ ...errors, jobRoleError: 'Job role is required' });
      return false;
    }
    if (!formData.preferred_industry.trim()) {
      setErrors({ ...errors, industryError: 'Industry is required' });
      return false;
    }
    if (!formData.job_location.trim()) {
      setErrors({ ...errors, locationError: 'Location is required' });
      return false;
    }


    return true;
  };

  const handleOptionChecked = () => {
    setFormData({ ...formData, remote_option: !formData.remote_option });
  }
  const validateStep3 = () => {
    if (!formData.experience) {
      setErrors({ ...errors, experienceError: 'Experience Level is required' });
      return false;
    }
    return true;
  };

  const validateStep4 = () => {
    if (!formData.career_goal.trim()) {
      setErrors({ ...errors, goalError: ' Career Goals are required' });
      return false;
    }
    return true;
  };

  // Function to handle "Next" button click
  const handleNextClick = () => {
    let isValid = true;
    switch (currentStep) {
      case 0:
        isValid = validateStep1();
        break;
      // case 1:
      //   isValid = validateStep2();
      //   break;
      // case 2:
      //   isValid = validateStep3();
      //   break;
      // Add cases for additional steps as needed
      default:
        break;
    }

    if (isValid) {
      // Proceed to the next step
      setCurrentStep(currentStep + 1);
    }
  };
  const handleDotClick = (index) => {
    setCurrentStep(index);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'career_goal') {
      if (e.target.value.length <= 1000) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
     
      setFormData({ ...formData, [name]: value });
    }
    if (name === 'full_name' && errors.fullNameError) {
      setErrors({ ...errors, fullNameError: '' });
    }
    // if (name === 'phone_number' && errors.phoneNumberError) {
    //   setErrors({ ...errors, phoneNumberError: '' });
    // }
    if (name === 'linkedin' && errors.linkedinError) {
      setErrors({ ...errors, linkedinError: '' });
    }

    if (name === 'desired_job_role' && errors.jobRoleError) {
      setErrors({ ...errors, jobRoleError: '' });
    }
    if (name === 'preferred_industry' && errors.industryError) {
      setErrors({ ...errors, industryError: '' });
    }
    if (name === 'job_location' && errors.locationError) {
      setErrors({ ...errors, locationError: '' });
    }

    if (name === 'experience' && errors.experienceError) {
      setErrors({ ...errors, experienceError: '' });
    }
    if (name === 'career_goal' && errors.goalError) {
      setErrors({ ...errors, goalError: '' });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const saveData = () => {
    // closeModal()
    // formData.experience = experience
    // formData.remote_option = tnc
    // console.log(formData, "formData")
    // localStorage.setItem('username', formData.full_name)
    // dispatch(InitiationQuestions(formData))
    // dispatch(updateProfile(formData))
    // toast.success('Data saved successfully', {
    //   position: toast.POSITION.TOP_RIGHT,
    //   autoClose: 2000,
    //   hideProgressBar: true,
    // });

    // if (validateStep4()) {

    closeModal()
    const formDataToSubmit = { ...formData };
    dispatch(InitiationQuestions(formDataToSubmit))
      .then((result) => {
        console.log(result, "result")

        dispatch(updateProfile(formDataToSubmit))
        toast.success('Data saved successfully', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          hideProgressBar: true,
        });
      })
      .catch((errordata) => {

      });

    // }
  }
  useEffect(() => {

    dispatch(getInitiationQuestions())
      .then((result) => {
        console.log(result, "question")
        // formData.full_name=result.payload.full_name

      })
      .catch((error) => {
        console.log(error)
      });

    dispatch(getUserProfile())
      .then((result) => {

        const data = result.payload;
        console.log(data.email, "data.email")

        setFormData({ ...formData, email: data.email })

        // formData.email = data.email;
      })

  }, []);

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="progress-dots">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="dot-container">
              <span
                className={`dot ${currentStep === index ? 'active' : currentStep > index ? 'completed' : ''}`}
              // onClick={() => handleDotClick(index)}
              >
                <span className='dotdot'></span>
                {/* {index + 1} */}
              </span>
              <div className="dot-label">{step.name}</div>
            </div>
            {index < steps.length - 1 && <span className="line" />}
          </React.Fragment>
        ))}
      </div>

      {currentStep === 0 && (
        <Container className='mt-5 ps-5 pe-5'>
          <Row>
            <Col lg={12}>
              <div className="row mb-2">
                <div className="col-sm">
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label className="d-flex labelcss">Full Name<span class="required">*</span></Form.Label>
                    <Form.Control
                      type='text'
                      name='full_name'
                      value={formData.full_name}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.fullNameError && <p className='step-error'>{errors.fullNameError}</p>}


                  </Form.Group>

                </div>
              </div>

              <div className="row mb-2 account-row">
                <div className="col-sm">
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label className="d-flex labelcss">Email Address<span class="required">*</span></Form.Label>
                    <Form.Control
                      type='text'
                      className='textcontainer'
                      defaultValue={formData.email}
                      name='email'
                      onChange={handleChange}
                      disabled
                      required
                    />
                    <Form.Control.Feedback type="invalid">Please Enter Email</Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>
              {/* <div className="row mb-2 account-row">

                <div className="col-sm" style={{ paddingTop: 5 }}>
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label className="d-flex labelcss">Phone Number<span class="required">*</span></Form.Label>
                    <Form.Control
                      type='text'
                      className='textcontainer'
                      name='phone_number'
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.phoneNumberError && <p className='step-error'>{errors.phoneNumberError}</p>}


                  </Form.Group>
                </div>
              </div> */}

              <div className="row mb-2 account-row">
                <div className="col-sm" style={{ paddingTop: 5 }}>
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label className="d-flex labelcss">Linkedin Url (Optional)</Form.Label>
                    <Form.Control
                      type='text'
                      className='textcontainer'
                      name='linkedin'
                      required
                      value={formData.linkedin}
                      onChange={handleInputChange}

                    />
                    {errors.linkedinError && <p className='step-error'>{errors.linkedinError}</p>}
                  </Form.Group>
                </div>
              </div>

            </Col>
          </Row>
        </Container>
      )}


      {currentStep === 1 && (
        <Container className='mt-5 ps-5 pe-5'>
          <Row>
            <Col lg={12}>
              <div className="row mb-2">
                <div className="col-sm">
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label className="d-flex labelcss">Desired Job Role</Form.Label>
                    <Form.Control
                      type='text'
                      value={formData.desired_job_role}
                      onChange={handleInputChange}
                      name='desired_job_role'
                    />
                    {errors.jobRoleError && <p className='step-error'>{errors.jobRoleError}</p>}
                  </Form.Group>

                </div>
              </div>

              <div className="row mb-2 account-row">
                <div className="col-sm">
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label className="d-flex labelcss">Preferred Industry</Form.Label>
                    <Form.Control
                      type='text'
                      className='textcontainer'
                      name='preferred_industry'
                      value={formData.preferred_industry}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.industryError && <p className='step-error'>{errors.industryError}</p>}
                  </Form.Group>
                </div>
              </div>
              <div className="row mb-2 account-row">

                <div className="col-sm" style={{ paddingTop: 5 }}>
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label className="d-flex labelcss">Job Location</Form.Label>
                    <Form.Control
                      type='text'
                      className='textcontainer'
                      name='job_location'
                      value={formData.job_location}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.locationError && <p className='step-error'>{errors.locationError}</p>}
                  </Form.Group>
                </div>
              </div>
              <div className="row mb-2 account-row">

                <div className="col-sm-3" style={{ paddingTop: 5 }}>
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Check
                      type="checkbox"
                      className='labelcss1'
                      name="remote_option"
                      label="Remote"
                      onChange={handleOptionChecked}
                      checked={formData.remote_option}
                    />
                  </Form.Group>
                </div></div>
              {errors.step2Error && <p className='step-error'>{errors.step2Error}</p>}
            </Col>
          </Row>
        </Container>
      )}

      {currentStep === 2 && (
        <Container className='mt-5 ps-5 pe-5'>
          <Row>
            <Col lg={12}>
              <div className="row mb-2">
                <div className="col-sm">
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label className="d-flex labelcss">Experience Level</Form.Label>
                    <Form.Control
                      as="select"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                    >
                      <option value=""></option>
                      <option value="entry-level">Entry Level</option>
                      <option value="mid-career">Mid Career</option>
                      <option value="senior">Senior</option>
                    </Form.Control>
                    {errors.experienceError && <p className='step-error'>{errors.experienceError}</p>}


                  </Form.Group>

                </div>
              </div>


            </Col>
          </Row>
        </Container>
      )}

      {currentStep === 3 && (
        <Container className='mt-5 ps-5 pe-5'>
          <Row>
            <Col lg={12}>
              <div className="row mb-2">
                <div className="col-sm">
                  <Form.Label className="d-flex labelcss">  Career Goals</Form.Label>
                  <Form.Group controlId="exampleForm.ControlTextarea1">

                    <Form.Control as="textarea" name="career_goal" required style={{ minHeight: '10rem' }}
                      value={formData.career_goal}
                      maxLength={1000}
                      onChange={handleInputChange}
                    />
                    {errors.goalError && <p className='step-error'>{errors.goalError}</p>}

                    <Form.Control.Feedback type="invalid">Please enter terms</Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>


            </Col>
          </Row>
        </Container>
      )}



      {currentStep !== 3 && <div >
        <Button className='nextbtn' onClick={handleNextClick} disabled={currentStep === steps.length - 1}>
          Next
        </Button>
      </div>}

      {currentStep === 3 && <div >
        <Button className='nextbtn' onClick={saveData} >
          Submit
        </Button>
      </div>}
    </div>
  );
};
