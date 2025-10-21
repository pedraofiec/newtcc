// src/features/shared/components/AuthPage.js
import React from 'react';

// ✅ Corrigido para usar a extensão .js
import LoginForm from '../../splash/components/LoginForm.js';
import RegisterForm from '../../splash/components/RegisterForm.js';
import RegisterComplete from '../../splash/components/RegisterComplete.js';

import RegisterSchool from '../../cadastro/components/RegisterSchool.js';
import RegisterDriver from '../../cadastro/components/RegisterDriver.js';
import RegisterResponsible from '../../cadastro/components/RegisterResponsible.js';

const AuthPage = () => {
  const [mode, setMode] = React.useState('login');

  const [registrationForm, setRegistrationForm] = React.useState({
    name: "",
    email: "",
    password: "",
    tipo: "Admin",
  });

  // --- Navegação entre formulários ---
  const goToRegister = () => setMode('register');
  const goToLogin = () => setMode('login');
  const goBackToRegister = () => setMode('register');

  const goToCompleteRegistration = (basicFormData) => {
    setRegistrationForm(prev => ({
      ...prev,
      ...basicFormData,
    }));
    setMode('register-complete');
  }

  const goToRegisterSchool = () => setMode('register-school');
  const goToRegisterDriver = () => setMode('register-driver');
  const goToRegisterResponsible = () => setMode('register-responsible');

  const renderContent = () => {
    switch (mode) {
      case 'login':
        return <LoginForm goToRegister={goToRegister} />;

      case 'register':
        return (
          <RegisterForm
            goToLogin={goToLogin}
            goToCompleteRegistration={goToCompleteRegistration}
            goToRegisterSchool={goToRegisterSchool}
            goToRegisterDriver={goToRegisterDriver}
            goToRegisterResponsible={goToRegisterResponsible}
          />
        );

      case 'register-complete':
        return (
          <RegisterComplete
            goBackToRegister={goBackToRegister}
            form={registrationForm}
            setForm={setRegistrationForm}
          />
        );

      case 'register-school':
        return <RegisterSchool goToLogin={goToLogin} />;
      case 'register-driver':
        return <RegisterDriver goToLogin={goToLogin} />;
      case 'register-responsible':
        return <RegisterResponsible goToLogin={goToLogin} />;

      default:
        return <LoginForm goToRegister={goToRegister} />;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {renderContent()}
    </div>
  );
};

export default AuthPage;
