// src/App.js
import React, { useState } from 'react';
import LoginForm from './features/splash/components/LoginForm';
import UserTypeSelection from './features/splash/components/UserTypeSelection';
import RegisterResponsible from './features/cadastro/components/RegisterResponsible';
import RegisterDriver from './features/cadastro/components/RegisterDriver';
import RegisterSchool from './features/cadastro/components/RegisterSchool';
import RegisterStudent from './features/cadastro/components/RegisterStudent';

function App() {
  const [currentView, setCurrentView] = useState('login');

  const showUserTypeSelection = (e) => {
    e.preventDefault();
    setCurrentView('userType');
  };

  const showRegisterResponsible = () => {
    setCurrentView('registerResponsible');
  };

  const showRegisterDriver = () => {
    setCurrentView('registerDriver');
  };
  
  const showRegisterSchool = () => {
    setCurrentView('registerSchool');
  };

  const showRegisterStudent = () => {
    setCurrentView('registerStudent');
  };

  return (
    <div className="App">
      {currentView === 'login' && <LoginForm onRegisterClick={showUserTypeSelection} />}
      {currentView === 'userType' && (
        <UserTypeSelection
          onSelectResponsible={showRegisterResponsible}
          onSelectDriver={showRegisterDriver}
          onSelectSchool={showRegisterSchool}
        />
      )}
      {currentView === 'registerResponsible' && (
        <RegisterResponsible onRegisterStudent={showRegisterStudent} />
      )}
      {currentView === 'registerDriver' && <RegisterDriver />}
      {currentView === 'registerSchool' && <RegisterSchool />}
      {currentView === 'registerStudent' && <RegisterStudent />}
    </div>
  );
}

export default App;