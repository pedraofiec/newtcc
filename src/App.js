// src/App.js
import React, { useEffect } from 'react';

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
import DriverProfile from './features/motorista/components/DriverProfile';
import DriverScreen from './features/motorista/components/DriverScreen';
import SettingsScreen from './features/home/components/SettingsScreen.js';

import ChangePasswordScreen from './features/home/components/settings/ChangePasswordScreen.js';
import TermsOfUseScreen from './features/home/components/settings/TermsOfUseScreen.js';
import EditProfileScreen from './features/home/components/settings/EditProfileScreen.js';

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import RotasPage from './features/rotas/pages/RotasPage';

import StatusModal from './features/shared/components/StatusModal.js';

// 🔔 Toaster (toast com Tailwind) e FCM helpers
import { Toaster } from 'react-hot-toast';
import { requestFcmToken, listenForegroundMessages } from './firebase';

function App() {
  // Bootstrap das notificações (foreground + token via VAPID)
  useEffect(() => {
    (async () => {
      await requestFcmToken();          // usa VITE_FIREBASE_VAPID_KEY, se definido
      await listenForegroundMessages(); // exibe toast quando a aba estiver ativa
    })();
  }, []);

  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/splash" element={<SplashScreen />} />
        <Route path="/login" element={<SplashScreen />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<UserTypeSelection />} />
        <Route path="/register/responsible" element={<RegisterResponsible />} />
        <Route path="/register/driver" element={<RegisterDriver />} />
        <Route path="/register/school" element={<RegisterSchool />} />
        <Route path="/register/student" element={<RegisterStudent />} />
        <Route path="/motoristas" element={<DriverScreen />} />
        <Route path="/motoristas/:id" element={<DriverProfile />} />
        <Route path="/rotas" element={<RotasPage />} />

        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="/settings/perfil" element={<EditProfileScreen />}  />
        <Route path="/settings/alterar-senha" element={<ChangePasswordScreen />}  />
        <Route path="/termos-de-uso" element={<TermsOfUseScreen />}  />
      </Routes>
      </Router>

      <StatusModal />

      {/* Toaster global para notificações em foreground */}
      <Toaster position="top-right" toastOptions={{ className: 'text-sm' }} />
    </div>
  );
}

export default App;