// src/App.js
import React, { useState } from 'react';
import LoginForm from './features/splash/components/LoginForm';
import UserTypeSelection from './features/splash/components/UserTypeSelection';
import RegisterResponsible from './features/cadastro/components/RegisterResponsible';
import RegisterDriver from './features/cadastro/components/RegisterDriver';
import RegisterSchool from './features/cadastro/components/RegisterSchool';
import RegisterStudent from './features/cadastro/components/RegisterStudent';
import SplashScreen from './features/splash/SplashScreen';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/register" element={<UserTypeSelection />} />
          <Route path="/register/responsible" element={<RegisterResponsible />} />
          <Route path="/register/driver" element={<RegisterDriver />} />
          <Route path="/register/school" element={<RegisterSchool />} />
          <Route path="/register/student" element={<RegisterStudent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;