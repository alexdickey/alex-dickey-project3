import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

import StatusUpdateDetails from './StatusUpdateDetails.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import User from './UserDetails.jsx';
import UpdateDescription from './DescriptionDetails.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/user/:username',
    element: <User />
  },
  {
    path: '/user/editDescription/:username',
    element: <UpdateDescription />
  },
  {
    path: '/statusUpdate/edit/:postID',
    element: <StatusUpdateDetails />
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='main-container'>
    <RouterProvider router={router} />
    </div>
  </React.StrictMode>,
)
