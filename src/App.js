// src/App.js
import React, { useState } from 'react';
import LoginForm from './features/splash/components/LoginForm';
import UserTypeSelection from './features/splash/components/UserTypeSelection';
import RegisterDependent from './features/cadastro/components/RegisterDependent';

function App() {
  const [currentView, setCurrentView] = useState('login');

  const showUserTypeSelection = (e) => {
    e.preventDefault();
    setCurrentView('userType');
  };

  const showRegisterDependent = () => {
    setCurrentView('registerDependent');
  };

  return (
    <div className="App">
      {currentView === 'login' && <LoginForm onRegisterClick={showUserTypeSelection} />}
      {currentView === 'userType' && <UserTypeSelection onSelectResponsible={showRegisterDependent} />}
      {currentView === 'registerDependent' && <RegisterDependent />}
    </div>
  );
}

export default App;