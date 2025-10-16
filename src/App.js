// src/App.js
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Importa o NOVO PrivateRoute
import PrivateRoute from './features/shared/components/PrivateRoute'; 

// Importa os componentes de cada funcionalidade
import HomeScreen from './features/home/components/HomeScreen';
import SplashScreen from './features/splash/SplashScreen'; // Corrigido o caminho
import LoginForm from './features/splash/components/LoginForm';
import ForgotPassword from './features/splash/components/ForgotPassword';

// ... (Outras importações permanecem iguais)
import UserTypeSelection from './features/splash/components/UserTypeSelection';
import RegisterResponsible from './features/cadastro/components/RegisterResponsible';
import RegisterDriver from './features/cadastro/components/RegisterDriver';
// ... (demais imports de cadastro e motorista)

// 🔔 Toaster (toast com Tailwind) e FCM helpers
import { Toaster } from 'react-hot-toast';
import { requestFcmToken, listenForegroundMessages } from './firebase';


function App() {
  // ... (useEffect para notificações permanece igual)
  useEffect(() => {
    (async () => {
      await requestFcmToken();          // usa VITE_FIREBASE_VAPID_KEY, se definido
      await listenForegroundMessages(); // exibe toast quando a aba estiver ativa
    })();
  }, []);

  return (
    <div className="App">
      <Routes>
        {/* 1. Rota RAIZ: O usuário sempre começa no SplashScreen */}
        <Route path="/" element={<SplashScreen />} /> 
        
        {/* 2. Rotas de Autenticação (Acesso público) */}
        {/* Mantive o /login apontando para LoginForm, não mais para SplashScreen */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<UserTypeSelection />} />

        {/* Rotas de Cadastro (Acesso público) */}
        <Route path="/register/responsible" element={<RegisterResponsible />} />
        <Route path="/register/driver" element={<RegisterDriver />} />
        {/* ... (Demais rotas de cadastro) */}

        {/* 3. Rota PROTEGIDA: HomeScreen SÓ é acessível após login */}
        {/* Substituí a rota direta por uma rota PrivateRoute */}
        <Route 
          path="/home" 
          element={
            <PrivateRoute>
              <HomeScreen />
            </PrivateRoute>
          } 
        />
        
        {/* Rota Protegida de Dashboard (Se existir) */}
        {/* <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}
        
        {/* Rotas Protegidas de Motorista e Rotas */}
        {/* Você deve envolver todas as rotas internas com PrivateRoute! */}
        {/* Exemplo: */}
        {/* <Route path="/motoristas" element={<PrivateRoute><DriverScreen /></PrivateRoute>} /> */}
        
        {/* ... (Demais rotas, mantendo como estavam ou protegendo com PrivateRoute) */}
        
      </Routes>

      {/* Toaster global para notificações em foreground */}
      <Toaster position="top-right" toastOptions={{ className: 'text-sm' }} />
    </div>
  );
}

export default App;