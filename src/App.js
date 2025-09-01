import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Importa os componentes de cada funcionalidade
import HomeScreen from './features/home/components/HomeScreen';
import SplashScreen from './features/splash/SplashScreen';
import LoginForm from './features/splash/components/LoginForm';
import UserTypeSelection from './features/splash/components/UserTypeSelection';
import ForgotPassword from './features/splash/components/ForgotPassword';

// Importa os componentes de cadastro
import RegisterResponsible from './features/cadastro/components/RegisterResponsible';
import RegisterDriver from './features/cadastro/components/RegisterDriver';
import RegisterSchool from './features/cadastro/components/RegisterSchool';
import RegisterStudent from './features/cadastro/components/RegisterStudent';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/splash" element={<SplashScreen />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<UserTypeSelection />} />
        <Route path="/register/responsible" element={<RegisterResponsible />} />
        <Route path="/register/driver" element={<RegisterDriver />} />
        <Route path="/register/school" element={<RegisterSchool />} />
        <Route path="/register/student" element={<RegisterStudent />} />
      </Routes>
    </div>
  );
}

export default App;
