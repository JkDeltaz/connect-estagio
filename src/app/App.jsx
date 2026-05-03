import { useState } from 'react';
import { LoginCadastro } from './components/LoginCadastro';
import { EmpresaDashboard } from './components/EmpresaDashboard';
import { EstudanteDashboard } from './components/EstudanteDashboard';
import { EmpresasPage } from './components/EmpresasPage';

export default function App() {
  const [userType, setUserType] = useState(null);
  const [currentPage, setCurrentPage] = useState('login');

  const handleLogin = (type) => {
    setUserType(type);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUserType(null);
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

  if (userType === 'empresa') {
    return <EmpresaDashboard onLogout={handleLogout} />;
  }

  if (userType === 'estudante') {
    if (currentPage === 'empresas') {
      return <EmpresasPage onNavigate={handleNavigate} onLogout={handleLogout} />;
    }
    return <EstudanteDashboard onNavigate={handleNavigate} onLogout={handleLogout} />;
  }

  return <LoginCadastro onLogin={handleLogin} />;
}