import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Row,
  Col,
  Image,
  Card,
  Container,
  Form,
} from "react-bootstrap";
import "./InterviewPrep.css";
import welcomeimg from "../../assets/images/welcome.png";
import uploadimg from "../../assets/images/upload.png";
import uploadActive from "../../assets/images/uploadActive.png";
import paste from "../../assets/images/paste.png";
import pasteActive from "../../assets/images/pasteActive.png";
import uploadicon from "../../assets/images/uploadicon.png";
import right from "../../assets/images/right.png";
import view from "../../assets/images/view.png";
import arrow from "../../assets/images/arrow.png";
import axios from "axios";
import WelcomePage from "./WelcomePage";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getFavoriteAnswer,
  getFavoriteAnswerbyId,
  getInitiationQuestions,
  getInterviewSession,
  getPasteResume,
  getResume,
  getUserProfile,
  pasteResume,
} from "../../redux/authSlice";
import { toast, ToastContainer } from "react-toastify";
import Loader from './../../Loader';
export default function InterviewPrep() {
  const dispatch = useDispatch();
  const [userrole, setUserRole] = useState("");
  const [userRole, setuserRole] = useState("");
  const [favData, setFavData] = useState([]);
  const [savedInterview, setSavedInterview] = useState([]);
  const [welcome, setWelcome] = useState(false);
  const [welcome1, setWelcome1] = useState(false);
  const [extractData, setextractData] = useState("");
  const [validated, setValidated] = useState(false);
  const getinitpopval = localStorage.getItem('initialquestpopup')
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [upload, setupload] = useState(false);
  const [newInterview, setnewInterview] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [hideOnUpload, sethideOnUpload] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState("upload");
  const [isActive, setisActive] = useState("saved");
  const [showdiv, setShowdiv] = useState(true);
  const [showPasteDiv, setshowPasteDiv] = useState(false);
console.log(localStorage.getItem('remember'),"remember")
  const handleClose = () => {
    setWelcome(false);
    localStorage.setItem('initialquestpopup', false)
  }

  const handleClose1 = () => {
    setWelcome1(false);
    localStorage.setItem('initialquestpopup', false)
  };

  const uploadClose = () => {
    setupload(false);
    localStorage.setItem('initialquestpopup', false)
  }

  useEffect(() => {

    if (getinitpopval == "true") {
      dispatch(getResume())
        .then((result) => {
          console.log(result, "getresume");
          if (result?.payload?.file_name) {
            setWelcome(false);

            dispatch(getInitiationQuestions())
              .then((result) => {
                console.log(result.payload, "favdata");
                const data = result?.payload;
                if (data.length > 0) {
                  setWelcome1(false);
                } else {
                  setWelcome1(true);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            dispatch(getPasteResume())
              .then((result) => {
                console.log(result.payload, "pasteresume");
                if (result?.payload?.content != "") {
                  setWelcome(false);
                  dispatch(getInitiationQuestions())
                    .then((result) => {
                      console.log(result.payload, "favdata");
                      const data = result?.payload;
                      if (data.length > 0) {
                        setWelcome1(false);
                      } else {
                        setWelcome1(true);
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                } else {
                  setWelcome1(false);
                  setWelcome(true);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    dispatch(getFavoriteAnswer())
      .then((result) => {
        console.log(result.payload, "favdata");
        setFavData(result.payload);
      })
      .catch((error) => {
        console.log(error);
      });

    // const userData1 = [
    //     {
    //         "created_at": "2024-01-31",
    //         "role": "Product Manager"
    //     },
    //     {
    //         "created_at": "2024-01-31",
    //         "role": "Product Manager"
    //     }
    // ]
    // setSavedInterview(userData1)
    dispatch(getInterviewSession())
      .then((result) => {
        console.log(result, "result");
        setSavedInterview(result.payload);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange1 = (event) => {
    setuserRole(event.target.value);
    setUserRole(event.target.value);
  };



  const newInterviewClose = () => setnewInterview(false);
  const showUpload = () => {
    setupload(true);
    setWelcome(false);
  };

  //file upload

  const allowedFileTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const maxSize = 50 * 1024 * 1024; // 50MB in bytes

  const handleDrop = (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    handleFile(file);

    var formdata1 = new FormData();
    setupload(false);
    console.log("setupload(false)");
    formdata1.append("file", file);
    formdata1.append("bucket", "interview-universit-43333");
    formdata1.append("file_name", file.name);

    handleFile(file);
    sethideOnUpload(false);
    if (file) {
      let config = {
        method: "post",
        url: "https://round-unit-43333.botics.co/resumeupload/",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `token ${localStorage.getItem("token")}`,
        },
        data: formdata1,
      };
      for (const value of formdata1.values()) {
        console.log(value);
      }
      
      axios
        .request(config)
        .then((response) => {
          localStorage.setItem('initialquestpopup', false)
          // setLoading(true)
          // dispatch(getInitiationQuestions())
          // .then((result) => {
          //   setLoading(false)
          //   console.log(result.payload, "favdata");
          //   const data = result?.payload;
          //   if (data.length > 0) {
          //     setWelcome1(false);
          //   } else {
          //     setWelcome1(true);
          //   }
          // })
          // .catch((error) => {
          //   console.log(error);
          // });
          // setSelectedImage(response.data.avatar);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      //setSelectedImage(null);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFile = (file) => {
    if (file) {
      // Check file type
      if (!allowedFileTypes.includes(file.type)) {
        setErrorMessage("Invalid file type. Please select a PDF or DOCX file.");
        return;
      }

      // Check file size
      if (file.size > maxSize) {
        setErrorMessage("File size exceeds the maximum limit of 50MB.");
        return;
      }

      // Reset error message and set selected file
      setErrorMessage("");
      setSelectedFile(file);
    }
  };

  // Function to handle menu item clicks
  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);

    if (menuItem === "upload") {
      setshowPasteDiv(false);
      setShowdiv(true);
    }

    if (menuItem === "paste") {
      setshowPasteDiv(true);
      setShowdiv(false);
    }
  };

  const [showSaved, setshowSaved] = useState(true);
  const [showFav, setshowFav] = useState(false);

  const menuCLick = (menu) => {
    setisActive(menu);

    if (menu === "saved") {
      setshowSaved(true);
      setshowFav(false);
    }

    if (menu === "fav") {
      setshowFav(true);
      setshowSaved(false);
    }
  };

  const [formData, setFormData] = useState({
    role: "",
    content: "",
  });

  const [contentData, setcontentData] = useState("");
  const [errors, setErrors] = useState({});
  const handleInputChange = (e) => {
    const contentData1 = e.target.value;
    setcontentData(contentData1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();


    const validationErrors = {};

    const form = event.currentTarget;
    if (form.checkValidity()) {
      formData.role = userRole;
      if (extractData != "") {
        // <role> as a role with  <job description> job desricption can you give me 5 questions
        const userrole = `${userRole} ${"as a role,"}`; //userRole.concat('as a role with');
        const newString = "please give 5 questions on these skills?";
        const resultString = `${extractData} ${newString}`; //extractData.concat(newString);
        const finalestr = `${resultString}`; //userrole.concat(resultString);
        formData.content = finalestr;
      } else if (contentData != "") {
        const userrole = `${userRole} ${"as a role,"}`; //userRole.concat('as a role with');
        const newString = "please give 5 questions on these skills?";
        const resultString = `${contentData} ${newString}`; //extractData.concat(newString);
        const finalestr = `${resultString}`; //userrole.concat(resultString);
        formData.content = finalestr;
      }

      navigate("/question", { state: { userData: formData } });
    } else {
      event.stopPropagation();
    }
    setValidated(true);


    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  };

  const [formData1, setFormData1] = useState({
    description: "",
  });
  const handleImageUpload1 = (event) => {
    const file = event.target.files[0];
    const formdata = new FormData();

    formdata.append("file", file);
    console.log(file, "file");

    if (file) {

      let config = {
        method: 'POST',
        url: 'https://round-unit-43333.botics.co/readfile/',
        headers: {
          'X-CSRFTOKEN': `rN3gD7X9fMWNBXec7Y4naOPY4jvc8yvzOAZvMblW4pChKVH0pKZegdontyYtuN1c`,
        },
        data: formdata
      };
      for (const value of formdata.values()) {
        console.log(value, "resume");
      }
      console.log(config, "config")
      setcontentData('')
      setextractData('')
      axios.request(config)
        .then((response) => {

          console.log(response, "reponse")
          let data = response.data.content;
          // console.log(data.join(', '), "data")
          setextractData(data)
          // formData1.description = data.join(', ')
          // setSelectedImage(response.data.avatar);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      //setSelectedImage(null);
    }
  }


  const handleImageUpload = (event) => {
    console.log(event.target.files[0].name, "data");
    const file = event.target.files[0];
    var formdata1 = new FormData();
    setupload(false);
    console.log("setupload(false)");
    formdata1.append("file", file);
    formdata1.append("bucket", "interview-universit-43333");
    formdata1.append("file_name", file.name);

    handleFile(file);
    sethideOnUpload(false);
    if (file) {
      let config = {
        method: "POST",
        url: "https://round-unit-43333.botics.co/resumeupload/",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `token ${localStorage.getItem("token")}`,
        },
        data: formdata1,
      };
      for (const value of formdata1.values()) {
        console.log(value);
      }

      axios
        .request(config)
        .then((response) => {
          localStorage.setItem('initialquestpopup', false)
         // setLoading(true)

          // dispatch(getInitiationQuestions())
          // .then((result) => {
          //   setLoading(false)
          //   console.log(result.payload, "favdata");
          //   const data = result?.payload;
          //   if (data.length > 0) {
          //     setWelcome1(false);
          //   } else {
          //     setWelcome1(true);
          //   }
          // })
          // .catch((error) => {
          //   console.log(error);
          // });
          
          toast.success("Resume saved successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: true,
          });
          // setSelectedImage(response.data.avatar);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      //setSelectedImage(null);
    }
  };

  const [text, setText] = useState("");

  const handleTextAreaChange = (event) => {

    setText(event.target.value);
  };

  const body1 = {
    content: text,
  };

  const PasteResume = () => {


    const encodedText = encodeURIComponent(text);
    const sizeInBytes = encodedText.length;
    if (sizeInBytes > 10 * 1024 * 1024) {
      toast.error("file size should be less than 10MB", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: true,
      });
      //event.target.value = null
      // return;
    } else {
      const formData = new FormData();
      formData.append('content', encodeURIComponent(text));

      let config = {
        method: "POST",
        url: "https://round-unit-43333.botics.co/paste_resume/paste_form/",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `token ${localStorage.getItem("token")}`,
        },
        data: formData,
      };
      for (const value of formData.values()) {
        console.log(value);
      }

      axios
        .request(config)
        .then((response) => {
          localStorage.setItem('initialquestpopup', false)
          toast.success("Resume saved successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: true,
          });
          setupload(false);
          // setLoading(true)
          // dispatch(getInitiationQuestions())
          // .then((result) => {
          //   setLoading(false)
          //   console.log(result.payload, "favdata");
          //   const data = result?.payload;
          //   if (data.length > 0) {
          //     setWelcome1(false);
          //   } else {
          //     setWelcome1(true);
          //   }
          // })
          // .catch((error) => {
          //   console.log(error);
          // });
          
          // setSelectedImage(response.data.avatar);
        })
        .catch((error) => { });
    }
    // dispatch(pasteResume(formdata))
    //     .then((result) => {
    //         setupload(false)

    //         toast.success("Resume saved successfully", {
    //             position: toast.POSITION.TOP_RIGHT,
    //             autoClose: 5000,
    //             hideProgressBar: true,
    //         });

    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     });
  };

  const viewSavedAnswer = (id) => {
    navigate(`/favorite/:${id}`);

    // dispatch(getFavoriteAnswerbyId(1))
    // .then((result) => {

    // })
    // .catch((error) => {
    //     console.log(error)
    // });
  };

  const viewSavedInterview = (id,role) => {

    navigate(`/viewsavedsession/:${id}/:${role}`);

  }

  const newInterviewPrep = () => {
    setcontentData('')
    setextractData('')
    setnewInterview(true)
  }


  return (
    <>

      <Container fluid style={{ height: '90vh', overflow: 'auto' }}>
      {loading ? (
                    <Loader />
                ) : (
                    <div>

                    </div>
                )}
        <ToastContainer />
        <Row className="smallscreen">

          <Col className="prepText mt-lg-4 ms-lg-5" >Interview Preparation</Col>
          <Col className="d-flex justify-content-end  mt-lg-2 me-lg-5 mx-auto"> <Button className='inteviewbtncss ' type="submit" onClick={newInterviewPrep}>New Interview Preparation <Image src={arrow} className="arrimg" /></Button></Col>
        </Row>


        <div className="tabItem d-flex justify-content-start mx-lg-5 interviewprep1 mt-4">
          <span
            className={`${isActive == "saved" ? "active" : "inactive"
              } cursor py-lg-2 tabText me-4`}
            onClick={() => menuCLick("saved")}
          >
            Saved Interviews
          </span>
          <span
            className={`${isActive == "fav" ? "active" : "inactive"
              } cursor ms-lg-3 py-lg-2 tabText favanstab`}
            onClick={() => menuCLick("fav")}
          >
            Favorite Answers
          </span>
        </div>

        {showSaved && (
          
          <Row className="ps-lg-5 ps-xl-5">
            {savedInterview?.map((item) => (
              <Col xl={3} lg={3} sm={12} className="my-3">
                <div className="savedcard">
                  <Card className="ps-1 cardBody pb-2">
                    <Card.Body className="">
                      <div className="d-flex justify-content-between ">
                        <span className="spanText">Role</span>
                        <span className="spanText">
                          {item.created_at.slice(0, 10)}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between pt-2">
                        <span className="savedText">{item.role}</span>
                        <span className="cursor">
                          <Image
                            onClick={() => viewSavedInterview(item.id,item.role)}
                            src={view}
                            className="viewImage"
                          />
                        </span>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            ))}
          </Row>
        )}

        {showFav && (
          <Row className="ps-lg-5 ps-xl-5">
            {favData?.map((item) => (
              <Col xl={3} lg={3} sm={12} className="my-3">
                <div className="interviewcard">
                  <Card className="cardBody">
                    <Card.Body>
                      <div className="d-flex justify-content-between">
                        <span className="spanText">Role</span>
                        <span className="spanText">
                          {item.created_at.slice(0, 10)}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between pt-2">
                        <span className="savedText">{item.role}</span>
                      </div>
                      <span className="questionText d-flex pt-1">Question</span>
                      <span className="cardText d-flex pt-1">
                        {item.question}
                      </span>

                      <span className="d-flex justify-content-end pt-2 cursor">
                        <Image
                          src={view}
                          className="viewImage"
                          onClick={() => viewSavedAnswer(item.id)}
                        />
                      </span>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      <Modal
        show={welcome}
        // onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="interviewprep"
      >
        <Modal.Header onClick={handleClose} closeButton></Modal.Header>
        <Modal.Body>
          <div className="wlecomeContainer">
            <Image variant="top" className="socialImg" src={welcomeimg} />
            <span className="welcomelable">Welcome to Zunamu!</span>
            <span className="welcomeText mt-3 p-3">To get started all we need is a copy of your resume and a job description.
We’ll make some custom questions for you and even help generate answers if you get stuck
based on your resume.</span>
            <span>
              <Button className="letsGo" type="submit" onClick={showUpload}>
                Let’s Go!
              </Button>
            </span>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={upload}
        onHide={uploadClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="interviewprep2"

      >
        <Modal.Header
          // onClick={uploadClose}
          closeButton>
          <span
            className={`${activeMenuItem == "upload" ? "active" : ""
              } p-2 cursor `}
            onClick={() => handleMenuItemClick("upload")}
          >
            <Image
              variant="top"
              className="uploadimg pe-2"
              src={`${activeMenuItem == "upload" ? uploadActive : uploadimg}`}
            />
            Upload
          </span>
          <span
            className={`${activeMenuItem == "paste" ? "active" : ""
              } p-2 cursor`}
            onClick={() => handleMenuItemClick("paste")}
          >
            <Image
              variant="top"
              className="pasteimg pe-2"
              src={`${activeMenuItem == "paste" ? pasteActive : paste}`}
            />
            Paste Resume
          </span>
        </Modal.Header>
        {showdiv && (
          <Modal.Body>
            <div className="wlecomeContainer">
              {hideOnUpload && (
                <>
                
                  {" "}
                  <span className="welcomelable">
                    Upload your latest Resume
                  </span>
                 
                  <div className="row ">
                   
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      className="fileUploadContainer"
                    >
                      <div className="d-flex justify-content-end ">max-size: 50mb</div>
                      <div className="fileUpload">
                      <Image
                        variant="top"
                        src={uploadicon}
                        style={{ height: 45 }}
                      />

                      <p className="fileuploadtxt">
                        Drag and drop to upload file
                      </p>
                      
                      <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={handleImageUpload}
                        accept=".pdf, .docx"
                      />
                      {/* <Button className='letsGo cursor' type="submit" htmlFor="fileInput"> */}

                      <label htmlFor="fileInput" className="cursor letsGo">
                        {" "}
                        Browse file
                      </label>
                      {/* </Button> */}
                      <p className="support">Supports: docx, pdf</p>
                    </div></div>
                  </div>
                </>
              )}
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              {selectedFile && (
                <div>
                  <Image
                    variant="top"
                    src={right}
                    style={{ height: 35, marginBottom: 10 }}
                  />

                  <p className="fileuploadtext">
                    {selectedFile.name} (
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                  </p>
                </div>
              )}
            </div>
          </Modal.Body>
        )}

        {showPasteDiv && (
          <Modal.Body>
            <div>
              <span className="fileuploadtext ms-3">
                Paste your latest Resume
              </span>
              <div className="row wlecomeContainer1 mt-2">
                <Form.Control
                  as="textarea"
                  required
                  style={{
                    maxHeight: "90vh",
                    minHeight: "30vh",
                    background: "linear-gradient(0deg, #F5F5F5, #F5F5F5)",
                  }}
                  onChange={handleTextAreaChange}
                />
              </div>
              <span className="d-flex justify-content-end me-2">
                <Button
                  className="submitbtncss"
                  type="submit"
                  onClick={PasteResume}
                >
                  Submit
                </Button>
              </span>
            </div>
          </Modal.Body>
        )}
      </Modal>

      <Modal
        show={welcome1}
        // onHide={handleClose1}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="interviewprep"
      >
        <Modal.Header
          onHide={handleClose1}
          className="d-flex justify-content-end"
        >
          <span
            style={{ color: "#FF7F50", cursor: "pointer" }}
            onClick={() => handleClose1()}
          >
            Skip
          </span>
        </Modal.Header>
        <Modal.Body>
          <div className="wlecomeContainer">
            <Image variant="top" className="socialImg" src={welcomeimg} />
            <span className="welcomelable">Welcome to Zunamu!</span>
            <WelcomePage closeModal={handleClose1} />
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={newInterview}
        onHide={newInterviewClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="newInterview interviewContainer"
      >
        <Modal.Body className="newModal">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <div className="col-sm-12 pb-3">
            <Row>
                  <Col lg={6}>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label className="text-start labelcss">
                  Choose Role<span class="required">*</span>
                </Form.Label>
                
                    <Form.Control
                      type="text"
                      className="textcontainer"
                      name="role"
                      placeholder="Enter Role"
                      onChange={handleChange1}
                      required
                    />
                 
                <Form.Control.Feedback type="invalid">Please enter role</Form.Control.Feedback>
              </Form.Group>
              </Col>
                </Row>
            </div>

            <div className="row jobescription">

              <Form.Label className="text-start labelcss" style={{ display: 'flex', justifyContent: 'space-between' }}><span>Job Description<span class="required">*</span></span>  <span style={{ color: '#FF7F50', cursor: 'pointer' }} >
                <div
                >
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload1}
                    accept=".pdf, .docx"
                  />
                  <label htmlFor="fileInput" className="cursor"> Upload
                  </label>

                </div>

              </span></Form.Label>
              <Form.Group controlId="exampleForm.ControlTextarea1">

                {extractData ? <Form.Control as="textarea" required
                  name="content"
                  onChange={handleInputChange}
                  className='cardBody'
                  value={extractData}
                /> : <Form.Control as="textarea" required
                  name="content"
                  onChange={handleInputChange}
                  className='cardBody'
                  defaultValue={extractData}
                />}
                <Form.Control.Feedback type="invalid">Please enter terms</Form.Control.Feedback>
              </Form.Group>

            </div>

            <span className="d-flex ms-xs-3 justify-content-end ms-auto">
              <Button className="savebtn" type="submit">
                Submit
              </Button>
            </span>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};
