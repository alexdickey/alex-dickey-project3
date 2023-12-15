import { useState, useEffect } from 'react'
import axios from 'axios';
import NavBar from './NavBar';


import './App.css'
import { useParams } from 'react-router';
import { useNavigate } from "react-router";


function StatusUpdateDetails() {
  const [statusUpdateDetailsState, setStatusUpdateDetailsState] = useState(null);
  const [currentStatusUpdateContent, setcurrentStatusUpdateContent] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [statusUpdateUser, setStatusUpdateUser] = useState('');
  const [useMessage, setUseMessage] = useState('')
 
  const params = useParams();
  const postID = params.postID;
  const navigate = useNavigate();

  async function getStatusUpdateDetails() {
    const response = await axios.get('/api/statusUpdates/postID/' + postID)
    setStatusUpdateDetailsState(response.data)
    setStatusUpdateUser(response.data.owner)
  }

  async function getCurrentUser() {
    const response = await axios.get('/api/user/isLoggedIn')
    setCurrentUser(response.data.username);
  }

  function updateStatusUpdateContent(event){
    setcurrentStatusUpdateContent(event.target.value);
  }

  async function saveNewStatusUpdate(){
    await axios.put('/api/statusUpdates/edit/' + postID, {content: currentStatusUpdateContent})
    setUseMessage('Post has been updated')
  }

  async function deleteStatusUpdate(){
    await axios.delete('/api/statusUpdates/delete/' + postID)
    setUseMessage('Post has been deleted')
  }

  function displayStatusUpdate() {
    if (canEditUserDescription(currentUser)) {
      return(
        <div >
          <h3 className="left-align">Edit Status Update</h3>
          <textarea className="edit-page-textarea" defaultValue={statusUpdateDetailsState.content} onInput={updateStatusUpdateContent}/>
          <button className="edit-page-button" onClick={saveNewStatusUpdate}>Save</button>
          <button className="edit-page-delete-button" onClick={deleteStatusUpdate}>Delete Post</button>
        </div>
      )
    } else {
      return(
        <div>
          <div className='status-update-box'>
            {statusUpdateDetailsState.content}
          </div>
          <button onClick={goHome}>Go Home</button>
        </div>
      )
    }}

  function goHome() { navigate('/') }  
  function canEditUserDescription(currentUser) { return currentUser == statusUpdateUser }


  useEffect(function() {
    getStatusUpdateDetails();
    getCurrentUser();
    setUseMessage('');
  }, []);



  // if(!pokemonDetailState) {
  //   return (<div>Loading...</div>)
  // }

  if(!statusUpdateDetailsState) { return (<div>Loading...</div>) }
  return (
    <div>
      <NavBar />
      <div className='edit-page-container'>
        <div>{useMessage}</div>
        <div>{displayStatusUpdate()} </div>
      </div>
    </div>

  )
}

export default StatusUpdateDetails
