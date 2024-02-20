import React, { useState, useEffect } from 'react'
import { Card, Col, Container, Row, Form, Button, Image, Modal, Nav, CardBody } from 'react-bootstrap'
import arrow from '../../assets/images/arrow.png'
import like from '../../assets/images/like.png'
import like1 from '../../assets/images/like1.svg'
import { toast, ToastContainer } from 'react-toastify';
import ep_back from '../../assets/images/ep_back.png'
import './InterviewQuestion.css'
import { getQuestion, favoriteAnswer, helpme, saveInterviewSession } from '../../redux/authSlice'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import regen from '../../assets/images/regen.svg'
import back from '../../assets/images/back.png'
import Loader from './../../Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default function InterviewQuestion() {

    const navigate = useNavigate();
    const [inputAnswerData, setInputAnswerData] = useState('')

    const dispatch = useDispatch()
    const [questionInterview, setQuestionInterview] = useState(false)
    const questionCLose = () => setQuestionInterview(false)
    const [loading, setLoading] = useState(false);
    const [typeanswer, settypeanswer] = useState(true);
    const [showans, setshowans] = useState(false);

    const [questionData, setQuestionData] = useState([]);
    const [answerData, setanswerData] = useState('');

    const location = useLocation();
    const [selectedItem, setSelectedItem] = useState('');
    const [isClicked, setIsClicked] = useState(false);

    const [userdata] = useState(location.state?.userData);
    const [answers, setAnswers] = useState({
        role: '',
        question_1: '',
        answer_1: '',
        favourite_1:'False',
        question_2: '',
        answer_2: '',
        favourite_2:'False',
        question_3: '',
        answer_3: '',
        favourite_3:'False',
        question_4: '',
        answer_4: '',
        favourite_4:'False',
        question_5: '',
        answer_5: '',
        favourite_5:'False',

    });

    const [enablebtn, setEnablebtn] = useState(false)
    useEffect(() => {
        setanswerData('')
        settypeanswer(true)
        setshowans(false)
        setInputAnswerData('')
        setEnablebtn(false)

        setLoading(true)
        const body = {
            "model": "gpt-4",
            "messages": [
                userdata
            ]
        }

        dispatch(getQuestion(body))
            .then((result) => {
                console.log(result?.payload?.choices[0].message.content.split('\n'), "content")
                const questionArray = result?.payload?.choices[0].message.content.split('\n');
                setQuestionData(questionArray?.filter((item) => item != ""))

                {
                    questionArray?.filter((item) => item != '')?.map((item, i) => (
                        setAnswers(prevAnswers => ({
                            ...prevAnswers,
                            [`question_${i + 1}`]: item
                        }))
                    ))
                }

                { questionArray?.filter((item) => item != '')?.map((item, i) => ((i == 0) ? setSelectedItem(item) : '')) }
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
            });




    }, []);

    const handleItemClick = (item, index) => {
        // setLoading(true)
       
        // console.log(index, "ques")

        // enablebtn

        if (answers.hasOwnProperty(`answer_${index}`)) {
           // console.log(answers, "answers")
            const ques = `answer_${index}`
            // console.log(ques, "ques")
            // console.log(answers[ques], "answers.ques")

            settypeanswer(true)
            setInputAnswerData(answers[ques])
            console.log(answers.ques,"answers.ques")
            if (answers[ques] !='') {
                setEnablebtn(true)
            } else {
                setEnablebtn(false)
            }

        } else {
           
            // "answer_1" is not available in the object
            setanswerData('')
            setEnablebtn(false)
            setInputAnswerData('')
        }

        setSelectedItem(item);
        setIsClicked(false);

        settypeanswer(true)
        setshowans(false)

    };


    const regenerateQ = () => {
        setLoading(true)
        setanswerData('')
        settypeanswer(true)
        setshowans(false)
        setIsClicked(false);
        setInputAnswerData('')

        const body = {
            "model": "gpt-4",
            "messages": [
                userdata
            ]
        }
        setAnswers([])
        setanswerData('')
        setInputAnswerData('')
        dispatch(getQuestion(body))
            .then((result) => {
                console.log(result, "res")
                console.log(result?.payload?.choices[0].message.content.split('\n'), "content")

                const questionArray = result?.payload?.choices[0].message.content.split('\n');
                setQuestionData(questionArray?.filter((item) => item != ""))

                {
                    questionArray?.filter((item) => item != '')?.map((item, i) => (
                        setAnswers(prevAnswers => ({
                            ...prevAnswers,
                            [`question_${i + 1}`]: item
                        }))
                    ))
                }

                { questionArray?.filter((item) => item != '')?.map((item, i) => ((i == 0) ? setSelectedItem(item) : '')) }
                setLoading(false)

            })
            .catch((error) => {
                console.log(error)
            });
    };

    const helpmeClick = () => {
        setLoading(true)
        setIsClicked(false);
        console.log(selectedItem, "selectedItem")

        const selectedquestion = selectedItem.split('.')[1];
        const question = `${selectedquestion}${' answer this assuming you are the candidate'}`
        // answer this assuming you are the candidate
        const body = {
            "model": "gpt-4",
            "messages": [
                {
                    "role": "user",
                    "content": question
                }
            ]
        }

        dispatch(helpme(body))
            .then((result) => {
                setLoading(false)
                console.log(result, "re")
                setanswerData('');
                const data = Object.values(result?.payload?.choices[0].message.content)
                handleAnswerChange(selectedItem, data.join(''))
                if (data != '') {
                    settypeanswer(false)
                    setshowans(true)
                    setanswerData(Object.values(result?.payload?.choices[0].message.content))
                }

                // setQuestionData(Object.values(result?.payload?.choices[0].message.content[0]))


            })
            .catch((error) => {
                console.log(error)
            });

    }

    const favanswer = () => {

        if (answerData.length === 0 && inputAnswerData === '') {
            toast.error("Answer is required", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
                hideProgressBar: true,
            });
        } else {
            const num = selectedItem.split('.')[0];
            setAnswers(prevAnswers => ({
                ...prevAnswers,
                [`favourite_${num}`]: "True"
            }));
            
            const body1 = {
                "answer": answerData.length === 0 ? inputAnswerData : answerData.join(''),
                "question": selectedItem,
                "role": userdata.role
            }
            if (isClicked != true) {
                dispatch(favoriteAnswer(body1))
                    .then((result) => {
                        setIsClicked(!isClicked);
                        console.log(result, "result")

                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else {

            }

        }



    }
    const textStyle = {
        color: isClicked ? 'rgba(0, 115, 179, 1)' : 'rgba(174, 174, 174, 1)',
        cursor: 'pointer',
    };

    /////////save session data


    // Handler to update answer for a specific question
    const handleAnswerChange = (question, answer) => {
        setEnablebtn(true)
        const num = question.split('.')[0]
        console.log(`question_${num}`)
        setInputAnswerData(answer)
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [`question_${num}`]: question
        }));
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [`answer_${num}`]: answer
        }));
    };

    const saveData = () => {
        setLoading(true)
        answers.role = userdata.role

        const questionKeys = Object.keys(answers).filter(key => key.startsWith('question_'));
        const answerKeys = Object.keys(answers).filter(key => key.startsWith('answer_'));

        // if (questionKeys.length !== 5) {

        //     {questionData?.filter((item) => item != '')?.map((item, i) => (
        //     setAnswers(prevAnswers => ({
        //         ...prevAnswers,
        //         [`question_${i}`]: item.split('.')[0]
        //     }))
        //     ))}
        // } else {
        dispatch(saveInterviewSession(answers))
            .then((result) => {
                setLoading(false)
                toast.success("Data saved successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    hideProgressBar: true,
                });

                // setAnswers([])
                // setanswerData('')
                // setInputAnswerData('')

            })
            .catch((error) => {
                console.log(error)
            });
        // }
    }
    const [feedbackText, setfeedbackText] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const submitData = (question, answer) => {
        const selectedquestion = question.split('.')[1];
        setLoading(true)
        const string = `${'question:'} ${selectedquestion} ${'?'} ${'answer:'} ${answer} ${'can you please give feedback on this?'}`
        const body = {
            "model": "gpt-4",
            "messages": [
                {
                    "role": "user",
                    "content": string
                }
            ]
        }

        dispatch(helpme(body))
            .then((result) => {
                setLoading(false)
                setfeedbackText(result?.payload?.choices[0].message.content)
                setQuestionInterview(true)
                console.log(result, "result")

            })
            .catch((error) => {
                console.log(error)
            });

    }
    const toggleTab = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div>
            <ToastContainer />

            <Container fluid>
                {loading ? (
                    <Loader />
                ) : (
                    <div>

                    </div>
                )}
                <Row className="smallscreenque seesionHeader  mb-3">

                    <Col className="mt-lg-4 ms-lg-5  backsmall" ><span className='cursor' onClick={() => navigate('/interview')}><Image src={ep_back} height={20} /><span className='ms-1 backcss'>Back</span></span></Col>
                    <Col className="d-flex justify-content-end  mt-lg-2 me-lg-5 mx-auto"> <Button className='sessionbtn' type="submit" onClick={saveData}>Save Interview Session</Button></Col>
                </Row>
                <Row className='d-lg-none seequestion'>
                    <Col>
                        <button type="button" className="btn btn-outline-primary ms-2 mb-2">See All Questions</button>
                    </Col>
                </Row>
                <Row>
                    <Col lg={isOpen ? 1 : 4} className='d-none d-lg-block'>

                        <Card className="flex-column cardbackground1 ms-5 me-2 mt-2 mb-2" style={{ height: '120vh', overflow: 'auto' }} >

                            <div className='row ms-1 mt-3'>
                                {/* <div className='col-sm d-flex justify-content-center cursor'><Image onClick={() => regenerateQ()} src={regenerate} style={{ height: 27 }} /></div> */}
                                <div className='col-sm regen cursor'>
                                    {!isOpen && <> <Image onClick={() => regenerateQ()} src={regen}  />
                                        <span className='retxt'>Regenerate Questions</span> </>}
                                </div>
                                <div className='col-sm d-flex justify-content-end me-2'>
                                    <Image className={`cursor ${isOpen ? 'rot180' : ''}`} onClick={toggleTab} src={back} style={{ height: 30 }} />
                                </div>
                            </div>

                            {!isOpen &&
                                <Nav className="flex-column mb-2">

                                    {questionData?.filter((item) => item != '')?.map((item, i) => (

                                        <Nav.Item key={item}
                                            className={`${selectedItem === item ? 'sideActive' : 'sideInactive'} pb-2`}
                                            onClick={() => handleItemClick(item, i + 1)}>
                                            <Nav.Link href="#section1" className={`profiletext ${selectedItem === item ? 'activetext1' : 'notactive1'}`} >{item}</Nav.Link>
                                        </Nav.Item>

                                    ))}
                                </Nav>
                            }
                        </Card>


                    </Col>


                    <Col lg={isOpen ? 11 : 8} >
                        <div>

                            {typeanswer && <div className="row mb-2 mt-2">
                                <div className="col-sm">
                                    <Card className='typeanswer'>
                                        <CardBody style={{ height: '110vh' }}>
                                            <Form.Label className="d-flex backcss">
                                                {selectedItem}
                                            </Form.Label>
                                            <span className='answer'>Answer:</span>
                                            <Form.Group controlId="exampleForm.ControlTextarea1">

                                                <Form.Control as="textarea" required style={{ height: '80vh', overflow: 'auto' }}
                                                    value={inputAnswerData}
                                                    placeholder='Type your answer..' onChange={(e) => handleAnswerChange(selectedItem, e.target.value)}
                                                />

                                                <Form.Control.Feedback type="invalid">Please enter terms</Form.Control.Feedback>
                                            </Form.Group>
                                        </CardBody>
                                    </Card>
                                </div>
                            </div>}

                            {showans && <div className="row mb-2 mt-2">
                                <div className="col-sm">
                                    <Card>
                                        <CardBody style={{ height: '100vh' }}>
                                            <Form.Label className="d-flex backcss">
                                                {selectedItem}
                                            </Form.Label>
                                            <span className='answer'>Answer:</span>
                                            <p style={{ height: '80vh', overflow: 'auto' }}>
                                                {/* <Form.Control as="textarea" required style={{ minHeight: '90vh',overflow:'auto' }}
                                                value={answerData} onChange={(e) => setInputAnswerData(e.target.value)}
                                                /> */}
                                                {answerData}
                                            </p>
                                        </CardBody>
                                    </Card>
                                </div>
                            </div>}
                            <div className='questionBottom mb-2'>
                                <span className='liketext cursor d-none d-lg-block' style={textStyle} onClick={() => favanswer()} >
                                    {isClicked ? <FontAwesomeIcon icon={faHeart} style={{ color: 'red', paddingRight: 5 }} />
                                        :
                                        <Image src={like} className='arrowimg' style={textStyle} />}
                                    Favorite this answer</span>
                                <span className='liketext cursor d-lg-none'><Image src={like} className='arrowimg' />Save this answer</span>
                                <span >
                                    <Button className='questionsave'
                                        style={{
                                            backgroundColor: enablebtn ? 'rgba(0, 168, 119, 1)' : 'rgba(174, 174, 174, 1)',
                                            borderColor: enablebtn ? 'rgba(0, 168, 119, 1)' : 'rgba(174, 174, 174, 1)'
                                        }}
                                        disabled={!enablebtn} type="submit" onClick={() => answerData ? submitData(selectedItem, answerData.join('')) : submitData(selectedItem, inputAnswerData)} >Submit
                                        <Image src={arrow} style={{ height: 22 }} className='ms-2 ' />
                                    </Button>


                                    <Button className='helpbtncss ms-2' type="submit" onClick={() => helpmeClick()}>Help me</Button>
                                </span>
                            </div>

                        </div>


                    </Col>
                </Row>

                <Modal show={questionInterview} onHide={questionCLose}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered className="newInterview interviewQuestion"
                >
                    <Modal.Body className="newModal p-4">
                        <p className='feedback'>Feedback</p>
                        <p className='feedbacktext'>{feedbackText}</p>

                        <span className="d-flex ms-xs-3 justify-content-end ms-auto">
                            <Button className='savebtn' type="submit" onClick={questionCLose} >Close</Button>
                        </span>
                    </Modal.Body>

                </Modal>
            </Container>
        </div>
    )
}
