import React, { useState } from "react";
import Response from "../../lib/Response";
import apiClient from "../../lib/apiClient";
import User from "./User";
import { Container } from 'reactstrap';
import { MdPersonPin } from 'react-icons/md';
import UserDetailsModel from './UserDetailsModel';
import UserSearchComponent from './UserSearchComponent';

const containerStyle = {
  // width: '100vw',
  height: '90vh',
  overflowY: 'auto'
}

export default function UsersList(props) {
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({});
  const [userDetailsShow, setUserDetailsShow] = useState(false);
  const [loadMoreData, setLoadMoreData] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const [lastIndex, setLastIndex] = useState(0);

  //function to load the user list
  const getUserList = async (reset) => {
    if ((reset && inProgress) || !loadMoreData) return;
    setInProgress(true);

    props.setRouteBreadCrumbs([{route: '/users', title: 'Users'}]);

    let inputParam = { 'access_token': props.accessToken, limit: 10, last_index: reset ? 0 : lastIndex };
    if (searchText !== '' && typeof searchText !== "undefined") inputParam.search_text = searchText;

    const res = await apiClient('/list', 'GET', null, inputParam);
    if (res.responseCode === Response.STATUS_OK) {
      reset ? setUserList([...res.responseData.users]) : setUserList([...userList, ...res.responseData.users]);
      if (!res.responseData.users || res.responseData.users.length < 10) setLoadMoreData(false);
      else setLastIndex(res.responseData.users[res.responseData.users.length - 1].user_index);
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setError(true);
    }

    setInProgress(false);
    setLoading(false);
  }

  const handleClick = (data) => {
    //storing user details in userDetails variable and opening the model to show the details
    setUserDetails(data);
    setUserDetailsShow(true);
  };

  //load user on param change in search bar
  function handleParamChange(e) {
    e.preventDefault();
    setLoadMoreData(true);
    const value = e.target.value;
    setSearchText(value);
  }

  function handleTypeChange(e) {
    e.preventDefault();
    setLoadMoreData(true);
    setSearchText("");
  }

  //getUserList function will be called whenever searchText is updated
  React.useEffect(() => {
    getUserList(true);
  }, [searchText]);

  const scrollCheck = event => {
    if (!event.target.scrollTop) return;

    const bottom = (Math.floor(event.target.scrollHeight - event.target.scrollTop) === (event.target.clientHeight-1)) || (Math.floor(event.target.scrollHeight - event.target.scrollTop) === (event.target.clientHeight));
    if (bottom) {
      getUserList(false);
    }
  };

  return (
    <Container className="" style={containerStyle} onScroll={scrollCheck}>
      <div>
        {/* user search component */}
        <UserSearchComponent
          onParamChange={handleParamChange}
          onTypeChange={handleTypeChange}
        />
    <div className="d-flex flex-column align-items-center">
      {!error && userList.length === 0 && ((!inProgress && getUserList(true) && false) || (!loading && (!loadMoreData ? <h1>No Data found</h1> : <h1>Loading...</h1>)))}
      {!error && error && <h1>Error. Try Refreshing.</h1>}
      {userList.length === 0 && (loading ? <h1>Loading...</h1> : <h1>No Data found</h1>)}
      {/* Model to list all users in table view */}
      {userList.length !== 0 && 
      <User 
        userList={userList} 
        onButtonClick={(userDetail) => { handleClick(userDetail) }}
        headers={[
          <MdPersonPin size={25} />,
          'USER NAME',
          'CONTACT',
          'GENDER',
          '',
        ]}/>}
      {userList.length !== 0 && loadMoreData && (
        <div className="loading">
          <p>Loading More....</p>
        </div>
      )}
    </div>

      {/* Model to get user details */}
      <UserDetailsModel
        isOpen={userDetailsShow}
        userDetails={userDetails}
        toggle={() => { setUserDetailsShow(false); }}
      />
    </div>
    </Container>
  );
}
