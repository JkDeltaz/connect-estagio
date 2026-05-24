import { useState } from 'react';
import { LoginCadastro } from './components/LoginCadastro';
import { EmpresaDashboard } from './components/EmpresaDashboard';
import { EstudanteDashboard } from './components/EstudanteDashboard';
import { EmpresasPage } from './components/EmpresasPage';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('login');

  const handleLogin = (user) => {
    setCurrentUser(user);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
  };

  const handleNavigate = (page) => {
    if (page === 'empresas') {
      setCurrentPage('empresas');
    } else if (page === 'vagas') {
      setCurrentPage('dashboard');
    }
  };

  if (currentPage === 'login') {
    return <LoginCadastro onLogin={handleLogin} />;
  }

  if (!currentUser) {
    return <LoginCadastro onLogin={handleLogin} />;
  }

  if (currentUser.userType === 'empresa') {
    return <EmpresaDashboard currentUser={currentUser} onLogout={handleLogout} />;
  }

  if (currentUser.userType === 'estudante') {
    if (currentPage === 'empresas') {
      return <EmpresasPage currentUser={currentUser} onNavigate={handleNavigate} onLogout={handleLogout} />;
    }
    return <EstudanteDashboard currentUser={currentUser} onNavigate={handleNavigate} onLogout={handleLogout} />;
  }

  return <LoginCadastro onLogin={handleLogin} />;
}