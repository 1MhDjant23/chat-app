import  { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react'
import {Login} from './components/Login.jsx';
import  {Register} from './components/Register.jsx';
import { PrivateRoute, PublicRoutes } from './routes/ProtectRoutes.jsx';
import { Chat } from './components/Chat.jsx';
import  './components/public/css/Variables.css';
import { ChatLayout } from './components/layout/ChatLayout.jsx';
import  { ToastContainer }  from  'react-toastify';


function App() {

  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <PrivateRoute token={token}>
              <ChatLayout/>
            </PrivateRoute>
          }
          />
        <Route
          path='/chat/:userId'
          element={
            <PrivateRoute token={token}>
              <Chat />
            </PrivateRoute>
          }
          />
        <Route
          path='/login'
          element={
            <PublicRoutes token={token} >
              <Login setToken={setToken} />
            </PublicRoutes>
          }
        />
        <Route
          path='/register'
          element={
            <PublicRoutes token={token}>
              <Register/>
            </PublicRoutes>
          }
        />
        <Route
          path='*'
          element={
            <Navigate to={ token ? '/' : '/login' } />
          }
        />
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  )
}

export default App
