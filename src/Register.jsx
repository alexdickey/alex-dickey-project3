import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router";
import NavBar from './NavBar';
import './App.css'



export default function Register() {

    const [registrationFormState, setRegistrationFormState] = useState({});
    const [errorDetailsState, setErrorDetailsState] = useState('');
    const navigate = useNavigate();

    function updateUserNameInState(event) {
        const username = event.target.value;

        const newRegistrationFormState = {
            password: registrationFormState.password,
            username: username,
        }

        setRegistrationFormState(newRegistrationFormState)
    }
    
    function updatePasswordInState(event) {
        const password = event.target.value;

        const newRegistrationFormState = {
            username: registrationFormState.username,
            password: password,
        }

        setRegistrationFormState(newRegistrationFormState)
    }

    async function submitRegistration() {
        try {
            const response = await axios.post('/api/user/register', registrationFormState)
            navigate('/')    
        } catch (err) {
            setErrorDetailsState("Issue Registering User: Username Already Taken")
        }
    }

    function goHome() {
        navigate('/')
    }

    let errorMessage = null;
    if(errorDetailsState) {
        errorMessage = <div>{errorDetailsState}</div>
    }
    function goHome() {
    navigate('/')
  }

    return <div>
      <NavBar />
      <div className="login-register-container">
        <h1> Create a New Account </h1>
        <div>
            {errorMessage}
        </div>
        <p></p>
        <div>Username:</div>
        <input type='text' onInput={updateUserNameInState} />
        <div>Password:</div>
        <input type='password' onInput={updatePasswordInState} />
        <div>
            <button onClick={submitRegistration}>Register</button>
        </div>
        
        
        </div>

    </div>
}