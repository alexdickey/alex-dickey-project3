import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router";
import NavBar from './NavBar';
import './App.css'


export default function Login() {

    const [loginFormState, setLoginFormState] = useState({});
    const [errorDetailsState, setErrorDetailsState] = useState('');
    const navigate = useNavigate();

    function updateUserNameInState(event) {
        const username = event.target.value;

        const newLoginFormState = {
            password: loginFormState.password,
            username: username,
        }

        setLoginFormState(newLoginFormState)
    }
    
    function updatePasswordInState(event) {
        const password = event.target.value;

        const newLoginFormState = {
            username: loginFormState.username,
            password: password,
        }

        setLoginFormState(newLoginFormState)
    }

    async function submitLogin() {
        try {
            const response = await axios.post('/api/user/login', loginFormState)
            navigate('/')    
        } catch (err) {
            setErrorDetailsState("Issue logging in, please try again :)")
        }

    }
    function goHome() {
        navigate('/')
    }

    let errorMessage = null;
    if(errorDetailsState) {
        errorMessage = <div>{errorDetailsState}</div>
    }

    return <div>
      <NavBar />
      <div className="login-register-container">
        <h1> Login Here </h1>
        <div>Username:</div>
        <input type='text' onInput={updateUserNameInState} />
        <div>Password:</div>
        <input type='password' onInput={updatePasswordInState} />
        <div>
            <button onClick={submitLogin}>Login</button>
        </div>
        <div>
            {errorMessage}
        </div>
      </div>

    </div>
}