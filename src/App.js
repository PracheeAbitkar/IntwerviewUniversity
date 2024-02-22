import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import About from './components/pages/About';
import LogIn from './components/LogIn/LogIn';
import Header from './components/pages/Header';
import Footer from './components/pages/Footer';
import LandingPage from './components/pages/LandingPage';
import SignUp from './components/SignUp/SignUp';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import Account from './components/Account/Account';
import Feedback from './components/Account/Feedback';
import StartPage from './components/StartPage/StartPage';
import InterviewPrep from './components/InterviewPrep/InterviewPrep';
import ProfessionalExperience from './components/ProfessionalExperience/ProfessionalExperience';
import InterviewQuestion from './components/InterviewPrep/InterviewQuestion';
import ResetPass from './components/ForgetPassword/ResetPass';
import Sidebar from './components/Account/Sidebar';
import Favorite from './components/InterviewPrep/Favorite';
import ViewSavedSession from './components/InterviewPrep/ViewSavedSession';
import React, { useState } from 'react'
import Faq from './components/pages/Faq';
import Contact from './components/pages/Contact';
import Terms from './components/pages/Terms';

function App() {
  const [profilePhoto, setProfilePhoto] = useState(null);

  const isAuthenticated = () => {
    return localStorage.getItem('isAuthenticated') !== null ? true : false
  }

  console.log("check here --->", isAuthenticated())

  const PrivateRoute = ({ element }) => {
    return isAuthenticated() ? (
      element
    ) : (
      <Navigate to="/login" replace={true} state={{ from: window.location.pathname }} />
    );
  };

  return (
    <div className="App">
      <Router>
        <Header /> 
        <Routes>
          <Route path='/login' element={<LogIn />} />
          <Route path='/home' element={<LandingPage />} />
          <Route path='/about' element={<About />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forgetpassword' element={<ForgetPassword />} />
          <Route path='/account' element={<PrivateRoute element={<Account />} />} />
          <Route path='/feedback' element={<PrivateRoute element={<Feedback />} />} />
          <Route path='/' element={<StartPage />} />
          <Route path='/interview' element={<PrivateRoute element={<InterviewPrep />} />} />
          <Route path='/experience' element={<PrivateRoute element={<ProfessionalExperience />} />} />
          <Route path='/question' element={<PrivateRoute element={<InterviewQuestion />} />} />
          <Route exact path='/resetPassword' element={<ResetPass />} />
          <Route exact path='/sidebar' element={<PrivateRoute element={<Sidebar />} />} />
          <Route exact path='/Favorite/:id' element={<PrivateRoute element={<Favorite />} />} />
          <Route exact path='/viewsavedsession/:id/:role' element={<PrivateRoute element={<ViewSavedSession />} />} />

          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/faq' element={<Faq />} />
          <Route exact path='/terms' element={<Terms />} />
          <Route exact path='/privacy' element={<Faq />} />



        </Routes>
        <Footer />
      </Router>

    </div>
  );
}

export default App;
