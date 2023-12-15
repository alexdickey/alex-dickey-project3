import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';

import './App.css'
import { useNavigate } from 'react-router';

function App() {
  const navigate = useNavigate()
  const [statusUpdatesListState, setStatusUpdatesListState] = useState([]);
  const [statusUpdateContent, setStatusUpdateContent] = useState('');
  const [userName, setUsername] = useState('');
  const [ableToPost, setAbleToPost] = useState(false)

  async function getAllStatusUpdates() {
    const response = await axios.get('/api/statusUpdates/all')
    setStatusUpdatesListState(response.data);
  }

  async function getUsername() {
    const response = await axios.get('/api/user/isLoggedIn')

    if(response.data.username) {
      setUsername(response.data.username)
      setAbleToPost(true)
    }
  }

  async function navigateToSelectedUser(event) {
    const username = event.target.textContent.trim();
    navigate('/user/' + username)
  }

  function displayEditDeleteButton(match, postID) {
    if(match){
      return( <button className='status-update-edit-button' onClick={()=>editStatusUpdateContent(postID)}> ✏️ </button> )
    }
  }

  function editStatusUpdateContent(postID){
    navigate('/statusUpdate/edit/'+ postID)
  } 


  const statusUpdatesComponent = [];

  for(let i = 0; i < statusUpdatesListState.length; i++) {
    const currentStatusUpdate = statusUpdatesListState[i];

    let editDeleteOption = false;
    if (currentStatusUpdate.owner == userName) {
      editDeleteOption = true;
    }

    statusUpdatesComponent.push(
      <div className='status-update-box'>
        <div className='status-update-header'>
          <button className='status-update-username' onClick={navigateToSelectedUser}>
            {currentStatusUpdate.owner}          
          </button> 
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

  function updateStatusUpdate(event) {
    setStatusUpdateContent(event.target.value);
  }

  function getPostTimeCreated(post){
    const timestamp = post.timeCreated
    const dateObject = new Date(timestamp);
    const formattedDate = dateObject.toLocaleString();
    return formattedDate;
  }

  async function insertNewStatusUpdate() {
    const newStatusUpdate= {
      owner: {userName}, 
      content: statusUpdateContent,
    }

    await axios.post('/api/statusUpdates', newStatusUpdate);
    await getAllStatusUpdates();

    setStatusUpdateContent('')
  }

  function onClickPostStatusUpdate() {
    insertNewStatusUpdate();
  }

  async function logOut() {
    axios.post('/api/user/logout', {})
    navigate('/login')
  }
  async function Register() {
    axios.post('/api/user/register', {})
    navigate('/register')
  }

  useEffect( function() {
    getUsername();
    getAllStatusUpdates();
 }, []);

  let usernameMessage = <div>Create an account or Login to start posting</div>
  if (userName) { 
    usernameMessage = <div>Welcome, {userName}! Create a post here:</div> 
  }

  return (
    <div>
      <NavBar />
      <p></p>
      <div className='welcome-message'>{usernameMessage}</div>
      {ableToPost && (
        <div className="create-new-post-container">
        <textarea onInput={updateStatusUpdate} value={statusUpdateContent} placeholder="Type your post here..." rows='4' className='post-input'/>
        <button className='post-button' onClick={onClickPostStatusUpdate}>Post Status</button>
      </div>
      )}
      <div>
          <div className='status-update-display-all-container'>
            <h2>Previous Posts</h2>
            {statusUpdatesComponent}
          </div>
      </div>      
    </div>
  )
}

export default App
