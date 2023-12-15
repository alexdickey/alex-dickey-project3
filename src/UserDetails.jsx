import { useState, useEffect } from 'react'
import axios from 'axios';
import NavBar from './NavBar';

import './App.css'
import { useParams } from 'react-router';
import { useNavigate } from "react-router";


function UserDetails() {
  const [userDetailState, setUserDetailState] = useState(null);
  const [usersStatusUpdatesList, setUsersStatusUpdatesList] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const navigate = useNavigate();


  const params = useParams();
  const username = params.username;

  async function getCurrentUser() {
    const response = await axios.get('/api/user/isLoggedIn')
    setCurrentUser(response.data.username);
  }

  async function getUserDetails() {
    const response = await axios.get('/api/user/' + username)
    setUserDetailState(response.data);
  }

  async function getAllStatusUpdates(username) {
    const response = await axios.get('/api/statusUpdates/user/' + username)
    setUsersStatusUpdatesList(response.data);
  }

  function displayEditDeleteButton(match, postID) {
    if (match) { return ( <button className='status-update-edit-button' onClick={()=>editStatusUpdateContent(postID)}> ✏️ </button> )}}
  function editStatusUpdateContent(postID){
    navigate('/statusUpdate/edit/'+ postID)
  } 

  function canEditUserDescription(currentUser) {
    if (currentUser == username) {
      return (
        <div>
          <button className='profile-about-me-edit-button' onClick={editUserDescription}>Update Description</button>
        </div>
      )
    }
  }
  
  function editUserDescription(){
    navigate('/user/editDescription/'+username)
  } 

  const statusUpdatesComponent = [];

  for(let i = 0; i < usersStatusUpdatesList.length; i++) {
    const currentStatusUpdate = usersStatusUpdatesList[i];

    let editDeleteOption = false;
    if (currentStatusUpdate.owner == currentUser) { editDeleteOption = true; }
    statusUpdatesComponent.push(
      <div className='status-update-box'>
        <div className='status-update-header'>
          <div className='status-update-username'>
            {currentStatusUpdate.owner}          
          </div> 
          <span className='status-update-meta'> Created: {getPostTimeCreated(currentStatusUpdate)} </span> 
          <span className='status-update-edit-button'>
            {displayEditDeleteButton(editDeleteOption, currentStatusUpdate._id)}
          </span>
        </div>
        <div className='status-update-separator'/>
        <div className='status-update-content'>
          {currentStatusUpdate.content}
        </div>
      </div>
    )
  }

  statusUpdatesComponent.reverse()

  function goHome() { navigate('/') }

  function getUserDateJoined(){
    const timestamp = userDetailState.createdTime
    const dateObject = new Date(timestamp);
    const formattedDate = dateObject.toLocaleString();
    return formattedDate;
  }
  function getPostTimeCreated(post){
    const timestamp = post.timeCreated
    const dateObject = new Date(timestamp);
    const formattedDate = dateObject.toLocaleString();
    return formattedDate;
  }

  getCurrentUser();

  useEffect(function() {
    getCurrentUser();
    getUserDetails();
    getAllStatusUpdates(username);
  }, []);

  if(!userDetailState) { return (<div>Loading...</div>) }

  return (
    <div>
        <NavBar />

        <h1> {userDetailState.username} </h1>
        <div className='profile-info'>
          <div className='profile-joined'>Member since: {getUserDateJoined()}</div>
        </div>

        <div className="profile-about-me">
          <div className="profile-about-me-header">About Me</div>
          <div className="profile-about-me-content" title='Description'>
              {userDetailState.description}
              <p></p>
              {canEditUserDescription(currentUser)}
          </div>
        </div>

        <h2>Post History:</h2>
        <div className='status-update-display-all-container'>
          {statusUpdatesComponent}
        </div>
    </div>

  )
}

export default UserDetails
