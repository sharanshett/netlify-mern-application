import React, { useState } from 'react';
import './styles/reduction.scss';
import './App.css';
import Home from './pages/home/Home';
import SignIn from './pages/signIn/signIn';
import SignUp from './pages/signIn/signup';
import PageSpinner from './components/PageSpinner';
import getViewport from './lib/viewpoint';
import Response from './lib/Response';
import apiClient from './lib/apiClient';

function App() {
  let [accessToken, setAccessToken] = useState();
  let [inProgress, setInProgress] = useState(false);
  let [accessTokenValid, setAccessTokenValid] = useState(false);
  const [isSignUpPage, setIsSignUpPage] = useState(false);

  const [gender, setGender] = useState({});

  //function to update the accessToken
  const updateAccessToken = (token) => {
    setAccessToken(token);
  };

  //function to reset the accessToken
  const resetAccessToken = () => {
    setAccessToken(null);
    localStorage.removeItem('access_token');
  };

  //function to user handle logout
  const handleLogout = async () => {
    const res = await apiClient("/logout", "POST", {
      'access_token': accessToken
    });

    if (res.responseCode === Response.STATUS_OK) {
      resetAccessToken();
      window.location.href = '/';
    }
  };

  //function to check the existing accesstoekn is valid or not
  const validateAccessToken = () => {
    
    if (inProgress) return;

    setGender({
      'male': true,
      'female': false,
      'other': false
    });

    apiClient('/list', 'GET', null, { 'access_token': accessToken }).then(res => {
      if (res.responseCode === Response.STATUS_OK) {
        setAccessTokenValid(true);
      } 
      else if (res.responseCode === Response.TOKEN_EXPIRED) {
        resetAccessToken();
      }
      setInProgress(false);
    });
  };

  return (
    <div className="bg-light">
      {!accessToken &&
        localStorage.getItem('access_token') &&
        setAccessToken(localStorage.getItem('access_token'))}

      {/* if accesstoken is not valid then signin component will be called */}
      {!accessToken && !isSignUpPage &&
        ((
          <SignIn
            onAccessTokenUpdate={updateAccessToken}
            setIsSignUpPage={()=>{setIsSignUpPage(true)}}
          />
        ))}

      {!accessToken && isSignUpPage &&
        ((
          <SignUp
          gender={gender}
          setGender={(data)=>{setGender(data)}}

            setIsSignUpPage={()=>{setIsSignUpPage(false)}}
          />
        ))}

      {/* if accesstoken is valid then home componet will be called*/}
      {accessToken && !accessTokenValid && (!inProgress && (setInProgress(true) || (!validateAccessToken() || <React.Suspense fallback={<PageSpinner />}><PageSpinner /></React.Suspense>)))}
      {accessToken && ((accessTokenValid && (
        <Home
          accessToken={accessToken}
          resetAccessToken={resetAccessToken}
          handleLogout={handleLogout}
          breakpoint={getViewport()}
        />
      )))}
    </div>
  );
}

export default App;
