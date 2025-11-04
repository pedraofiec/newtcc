import React, { useEffect } from 'react';

// Importa os componentes de cada funcionalidade (Extensões .jsx adicionadas para resolver o erro)
import SplashScreen from './features/splash/SplashScreen.js';
// import LoginForm from './features/splash/components/LoginForm.jsx'; // Não usado diretamente aqui
import HomeScreen from './features/home/components/HomeScreen.js';
import UserTypeSelection from './features/splash/components/UserTypeSelection.js';
import ForgotPassword from './features/splash/components/ForgotPassword.js';

// Importa os componentes de cadastro (Extensões .jsx adicionadas para resolver o erro)
import RegisterResponsible from './features/cadastro/components/RegisterResponsible.js';
import RegisterDriver from './features/cadastro/components/RegisterDriver.js';
import RegisterSchool from './features/cadastro/components/RegisterSchool.js';
import RegisterStudent from './features/cadastro/components/RegisterStudent.js';
import DriverProfile from './features/motorista/components/DriverProfile.js';
import DriverScreen from './features/motorista/components/DriverScreen.js';
import SettingsScreen from './features/home/components/SettingsScreen.js';

import ChangePasswordScreen from './features/home/components/settings/ChangePasswordScreen.js';
import TermsOfUseScreen from './features/home/components/settings/TermsOfUseScreen.js';
import EditProfileScreen from './features/home/components/settings/EditProfileScreen.js';

// 1. BrowserRouter PRECISA ser importado
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RotasPage from './features/rotas/pages/RotasPage.js';

import StatusModal from './features/shared/components/StatusModal.js';

// 🔔 Toaster (toast com Tailwind) e FCM helpers
import { Toaster } from 'react-hot-toast';
// Extensão .js adicionada para resolver o erro de './firebase'
import { requestFcmToken, listenForegroundMessages } from './firebase.js';

function App() {
  // Bootstrap das notificações (foreground + token via VAPID)
  useEffect(() => {
    (async () => {
      // Nota: As variáveis globais __firebase_config e __initial_auth_token 
      // devem ser usadas em um arquivo de inicialização do Firebase, não diretamente aqui.
      // Assumindo que o firebase.js lida com a inicialização e autenticação.
      try {
        await requestFcmToken();      // usa VITE_FIREBASE_VAPID_KEY, se definido
        await listenForegroundMessages(); // exibe toast quando a aba estiver ativa
      } catch (error) {
        // console.error("Erro ao configurar notificações: ", error);
        // Silently fail if FCM is not available/configured
      }
    })();
  }, []);

  return (
    <div className="App">
      {/* 2. Envolvendo as rotas com o BrowserRouter para habilitar o roteamento */}
      
        <Routes>
          {/* MUDANÇA PARA TESTES: A rota "/" agora carrega HomeScreen */}
          <Route path="/" element={<HomeScreen />} /> 
          
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/login" element={<SplashScreen />} />
          
          {/* 4. HomeScreen (mantido para acesso direto) */}
          <Route path="/home" element={<HomeScreen />} /> 

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
      

      <StatusModal />

      {/* Toaster global para notificações em foreground */}
      <Toaster position="top-right" toastOptions={{ className: 'text-sm' }} />
    </div>
  );
}

export default App;
