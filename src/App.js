// src/App.js
import React, { useEffect } from 'react';

// Importa os componentes de cada funcionalidade
import HomeScreen from './features/home/components/HomeScreen';
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

// Telas de responsável (NOVAS)
import DependentesScreen from './features/responsavel/components/DependentesScreen';
import EncontrarMotoristasScreen from './features/responsavel/components/EncontrarMotoristasScreen';
import StudentProfileScreen from './features/responsavel/components/StudentProfileScreen.js';
import ResponsavelProfileScreen from './features/responsavel/components/ResponsavelProfileScreen.js';
import ResponsavelLayout from './features/responsavel/components/layout/ResponsavelLayout';

//Tela Escola
import EscolaLayout from './features/escola/components/layout/EscolaLayout.js';
import EscolaProfileScreen from './features/escola/components/EscolaProfileScreen.js';
import EscolaHomeScreen from './features/escola/components/EscolaHomeScreen.js';
import EscolaStudentProfileScreen from './features/escola/components/EscolaStudentProfileScreen.js';

// Telas de configurações
import SettingsScreen from './features/home/components/SettingsScreen.js';
import ChangePasswordScreen from './features/home/components/settings/ChangePasswordScreen.js';
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
  const { tipo } = useUserStore();

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
          {/* 🔓 Rotas públicas */}
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<SplashScreen />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<UserTypeSelection />} />
          <Route path="/register/responsible" element={<RegisterResponsible />} />
          <Route path="/register/driver" element={<RegisterDriver />} />
          <Route path="/register/school" element={<RegisterSchool />} />
          <Route path="/register/student" element={<RegisterStudent />} />

          {/* ====================================================================================== */}
          {/* 🔒 ROTAS EXCLUSIVAS DO MOTORISTA */}
          {/* ====================================================================================== */}

          {tipo === "ROLE_MOTORISTA" && (
            <Route path="/" element={<DashboardLayout />}>

              {/* Home do motorista */}
              <Route path="/home" element={<DriverScreen />} />

              {/* Perfil do passageiro */}
              <Route path="/driver/passengers/:id" element={<PassengerProfileScreen />} />

              {/* Gerenciamento de alunos */}
              <Route path="/driver/manage-students" element={<StudentAssignmentScreen />} />

              {/* Gerenciamento da rota */}
              <Route path="/driver/manage-route" element={<RouteManagementScreen />} />

              {/* Configurações */}
              <Route path="/settings" element={<SettingsScreen />} />
              <Route path="/settings/perfil" element={<EditProfileScreen />} />
              <Route path="/settings/alterar-senha" element={<ChangePasswordScreen />} />
              <Route path="/rotas" element={<RotasPage />} />
            </Route>
          )}

          {/* 🔒 ROTAS EXCLUSIVAS DO RESPONSÁVEL */}
          {tipo === "ROLE_RESPONSAVEL" && (
            <Route path="/" element={<ResponsavelLayout />}>

              {/* Home do responsável */}
              <Route index element={<DependentesScreen />} />
              <Route path="home" element={<DependentesScreen />} />

              {/* Solicitações = EncontrarMotoristas */}
              <Route path="solicitacoes" element={<EncontrarMotoristasScreen />} />
              {/* (se em algum lugar você ainda usar /encontrar-motoristas, também deixo funcionando) */}
              <Route path="encontrar-motoristas" element={<EncontrarMotoristasScreen />} />

              {/* Perfil do dependente */}
              <Route path="students/:id" element={<StudentProfileScreen />} />

              {/* Perfil do responsável */}
              <Route path="profile" element={<ResponsavelProfileScreen />} />

              {/* Configurações */}
              <Route path="settings" element={<SettingsScreen />} />
              <Route path="settings/alterar-senha" element={<ChangePasswordScreen />} />
            </Route>
          )}

          {tipo === "ROLE_ESCOLA" && (
            <Route path="/" element={<EscolaLayout />}>
              {/* Página inicial da escola → estudantes */}
              <Route index element={<EscolaHomeScreen />} />
              <Route path="home" element={<EscolaHomeScreen />} />

              {/* Perfil da escola (a tela de edição que fizemos) */}
              <Route path="profile" element={<EscolaProfileScreen />} />

              {/* ✅ NOVA ROTA: perfil de aluno */}
              <Route path="students/:id" element={<EscolaStudentProfileScreen />} />
            </Route>
          )}

        </Routes>
      </Router>

      <StatusModal />
      <Toaster position="top-right" toastOptions={{ className: 'text-sm' }} />
    </div>
  );
}

export default App;
