import React, { useEffect } from 'react';

// Importa os componentes de cada funcionalidade
import SplashScreen from './features/splash/SplashScreen';
import LoginForm from './features/splash/components/LoginForm';
import HomeScreen from './features/home/components/HomeScreen';
import UserTypeSelection from './features/splash/components/UserTypeSelection';
import ForgotPassword from './features/splash/components/ForgotPassword';

// Importa os componentes de cadastro
import RegisterResponsible from './features/cadastro/components/RegisterResponsible';
import RegisterDriver from './features/cadastro/components/RegisterDriver';
import RegisterSchool from './features/cadastro/components/RegisterSchool';
import RegisterStudent from './features/cadastro/components/RegisterStudent';
import DriverProfile from './features/motorista/components/DriverProfile';
import DriverScreen from './features/motorista/components/DriverScreen';

// 1. BrowserRouter PRECISA ser importado (e USADO)
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RotasPage from './features/rotas/pages/RotasPage';

// 🔔 Toaster (toast com Tailwind) e FCM helpers
import { Toaster } from 'react-hot-toast';
import { requestFcmToken, listenForegroundMessages } from './firebase';

// --- NOVO 1: Importar o StatusModal ---
// (Usando o caminho que definimos: src/features/shared/components/)
import StatusModal from './features/shared/components/StatusModal';

function App() {
  // Bootstrap das notificações (foreground + token via VAPID)
  useEffect(() => {
    (async () => {
      await requestFcmToken();       // usa VITE_FIREBASE_VAPID_KEY, se definido
      await listenForegroundMessages(); // exibe toast quando a aba estiver ativa
    })();
  }, []);

  return (
    <div className="App">
      {/* --- NOVO 2: Adicionar o BrowserRouter --- */}
      {/* Suas rotas PRECISAM estar dentro dele para funcionar */}
        <Routes>
          {/* 3. A rota "/" agora é o SplashScreen (login) */}
          <Route path="/" element={<SplashScreen />} />
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/login" element={<SplashScreen />} />
          
          {/* 4. HomeScreen agora está em "/home" */}
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
        </Routes>

        {/* --- NOVO 3: Renderizar o Modal global --- */}
        {/* Ele fica aqui (fora do <Routes>) para estar 
          sempre pronto para ser ativado pelo Zustand,
          em qualquer página.
        */}
        <StatusModal />

        {/* Toaster global para notificações em foreground */}
        <Toaster position="top-right" toastOptions={{ className: 'text-sm' }} />
      
    </div>
  );
}

export default App;