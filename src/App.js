// src/App.js
import React, { useEffect } from 'react';

// Importa os componentes de cada funcionalidade
import HomeScreen from './features/home/components/HomeScreen'; // se for usar para outros perfis depois
import SplashScreen from './features/splash/SplashScreen';
import UserTypeSelection from './features/splash/components/UserTypeSelection';
import ForgotPassword from './features/splash/components/ForgotPassword';

// Guarda de rota para motorista
import DriverRouteGuard from './features/motorista/components/DriverRouteGuard.js';

// Componentes de cadastro
import RegisterResponsible from './features/cadastro/components/RegisterResponsible';
import RegisterDriver from './features/cadastro/components/RegisterDriver';
import RegisterSchool from './features/cadastro/components/RegisterSchool';
import RegisterStudent from './features/cadastro/components/RegisterStudent';

// Telas de motorista
import RouteManagementScreen from './features/motorista/components/RouteManagementScreen.js';
import StudentAssignmentScreen from './features/motorista/components/StudentAssignmentScreen.js';
import DriverScreen from './features/motorista/components/DriverScreen';
import PassengerProfileScreen from './features/motorista/components/PassengerProfileScreen.js';

// Telas de configurações
import SettingsScreen from './features/home/components/SettingsScreen.js';
import ChangePasswordScreen from './features/home/components/settings/ChangePasswordScreen.js';
import TermsOfUseScreen from './features/home/components/settings/TermsOfUseScreen.js';
import EditProfileScreen from './features/home/components/settings/EditProfileScreen.js';

// Rotas gerais
import RotasPage from './features/rotas/pages/RotasPage';

// Layout (Header + Sidebar)
import { DashboardLayout } from './features/home/components/layout/LayoutComponents.js';

// Router
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// Status modal e toaster
import StatusModal from './features/shared/components/StatusModal.js';
import { Toaster } from 'react-hot-toast';
import { requestFcmToken, listenForegroundMessages } from './firebase';
import useUserStore from './features/shared/store/user-store.js';

function App() {
  const {tipo, info} = useUserStore()
  useEffect(() => {
    (async () => {
      await requestFcmToken();
      await listenForegroundMessages();
    })();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* 🔓 Rotas públicas (login / cadastro) */}
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<SplashScreen />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<UserTypeSelection />} />
          <Route path="/register/responsible" element={<RegisterResponsible />} />
          <Route path="/register/driver" element={<RegisterDriver />} />
          <Route path="/register/school" element={<RegisterSchool />} />
          <Route path="/register/student" element={<RegisterStudent />} />
          



            {tipo && tipo=="ROLE_MOTORISTA" &&  <Route path="/" element = {<DashboardLayout />}>
              
              {/* Página inicial do motorista (cards de passageiros) */}
              <Route path="/home" element={<DriverScreen />} />

              {/* Perfil do passageiro (acesso pelo botão "Visualizar perfil") */}
               
              <Route
                path="/driver/passengers/:id"
                element={<PassengerProfileScreen />}
              />

              {/* Solicitações / gerenciamento de alunos na rota */}
              <Route
                path="/driver/manage-students"
                element={<StudentAssignmentScreen />}
              />

              {/* Rotas do motorista */}
              <Route
                path="/driver/manage-route"
                element={<RouteManagementScreen />}
              />
            
              <Route path="/settings" element={<SettingsScreen />} />
              </Route>}

          {/* 🔒 Rotas protegidas para MOTORISTA */}
          <Route element={<DriverRouteGuard />}>
            {/* Layout comum (header + sidebar) */}
            <Route element={<DashboardLayout />}>
           
              <Route path="/rotas" element={<RotasPage />} />

              {/* Configurações / Perfil */}
              <Route path="/settings" element={<SettingsScreen />} />
              <Route path="/settings/perfil" element={<EditProfileScreen />} />
              <Route
                path="/settings/alterar-senha"
                element={<ChangePasswordScreen />}
              />
              <Route path="/termos-de-uso" element={<TermsOfUseScreen />} />
            </Route>
          </Route>
        </Routes>
      </Router>

      <StatusModal />
      <Toaster position="top-right" toastOptions={{ className: 'text-sm' }} />
    </div>
  );
}

export default App;
