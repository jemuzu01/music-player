import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Login } from './Container/Login';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './Store/store';
import { Homepage } from './Container/Homepage';
import ErrorPage from './Container/Errorpage/ErrorPage';

export let renderedRoutes:any

function App() {
  const isLogged = useSelector((state: RootState) => state.login.user)
  const navigate = useNavigate();
  
    if(isLogged.isLogged){
      return (
        <div className="App">
          <Routes>
              <Route path="/home" element={<Homepage />}></Route>
              <Route path="/" element={<Login />}></Route> 
              <Route path="*"element={<Navigate to='/home' replace />}></Route>
          </Routes>
        </div>
      )
    }
    else{
      return (
        <div className="App">
          <Routes>
              <Route path="/" element={<Login />}></Route> 
              <Route path="*"element={<Navigate to='/' replace />}></Route> 
          </Routes>
        </div>
    );
  }
}

export default App;

