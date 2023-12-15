import { useState, useEffect } from 'react'
import axios from 'axios';
import NavBar from './NavBar';


import './App.css'
import { useParams } from 'react-router';
import { useNavigate } from "react-router";


function DescriptionDetails() {
  const [userDetailState, setUserDetailState] = useState(null);
  const [currentUser, setCurrentUser] = useState('');
  const [updatedDescriptionState, setUpdatedDescriptionState] = useState('');
  const [useMessage, setUseMessage] = useState('')

  const navigate = useNavigate();

  const params = useParams();
  const username = params.username;
  const description = params.description;

  async function getCurrentUser() {
    const response = await axios.get('/api/user/isLoggedIn')
    setCurrentUser(response.data.username);
  }

  async function getUserDetails() {
    const response = await axios.get('/api/user/' + username)
    setUserDetailState(response.data);
  }
  function updateDescription(event) {
    setUpdatedDescriptionState(event.target.value);
  }

  async function saveNewDescription(){
    const response = await axios.put('/api/user/updateDescription/' + username, {description: updatedDescriptionState})
    setUseMessage('Description has been updated')
  }

  function displayDescriptionField(currentUser) {
    if (canEditUserDescription(currentUser)) {
      return(
        <div>
          <h3 className="left-align">Edit Description</h3>
          <textarea className="edit-page-textarea" defaultValue={userDetailState.description} onInput={updateDescription}/>
          <button className="edit-page-button" onClick={saveNewDescription}>Save</button>
        </div>
      )
    } else {
      return(
        <div>
          <div>
            {description}
          </div>
          <button onClick={goHome}>Go Home</button>
        </div>
      )
    }

  }

  function canEditUserDescription(currentUser) { return currentUser == username }
  
  function goHome() { navigate('/') }
  function goToUserProfile() {navigate('/user/' + username)}

  getCurrentUser();

  useEffect(function() {
    getCurrentUser();
    getUserDetails();
    setUseMessage('');

  }, []);

  if(!userDetailState) { return (<div>Loading...</div>) }

  return (
    <div>
      <NavBar />
        <div className='edit-page-container'>
          <div>{useMessage}</div>
          <div> {displayDescriptionField(currentUser)} </div>
        </div>
    </div>

  )
}

export default DescriptionDetails
