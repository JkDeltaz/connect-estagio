import { useState } from 'react';

export function EmpresaDashboard({ onLogout }) {
  const [searchTerm, setSearchTerm] = useState('');

  const applications = [
    { id: 1, candidateName: 'Maria Silva', position: 'Frontend Intern', date: '2026-03-25', status: 'Novo' },
    { id: 2, candidateName: 'João Santos', position: 'Backend Developer Intern', date: '2026-03-24', status: 'Em Análise' },
    { id: 3, candidateName: 'Ana Costa', position: 'UI/UX Design Intern', date: '2026-03-23', status: 'Novo' },
    { id: 4, candidateName: 'Pedro Oliveira', position: 'Frontend Intern', date: '2026-03-22', status: 'Aprovado' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Novo':
        return 'bg-[#B79676] text-[#1C261C]';
      case 'Em Análise':
        return 'bg-[#304230] text-[#E8E8E8]';
      case 'Aprovado':
        return 'bg-green-700 text-white';
      default:
        return 'bg-[#304230] text-[#E8E8E8]';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Top Navigation */}
      <nav className="bg-[#202C20] border-b border-[#304230]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-xl" style={{ color: '#B79676' }}>ConnectEstágio</h1>
              <div className="hidden md:flex gap-6">
                <a href="#" className="text-[#E8E8E8] hover:text-[#B79676] transition-colors">Minhas Vagas</a>
                <a href="#" className="text-[#E8E8E8] hover:text-[#B79676] transition-colors">Postar Vaga</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#B79676] flex items-center justify-center text-[#1C261C]">
                E
              </div>
              <button onClick={onLogout} className="text-[#A0A0A0] hover:text-[#E8E8E8]">Sair</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h2 className="text-2xl text-[#E8E8E8]">Painel da Empresa</h2>
          <button className="px-6 py-3 bg-[#B79676] text-[#1C261C] rounded-lg hover:bg-[#A68666] transition-colors">
            + Postar Nova Vaga
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Buscar candidatos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 bg-[#202C20] border border-[#304230] rounded-lg text-[#E8E8E8] focus:outline-none focus:border-[#B79676]"
          />
          <select className="px-4 py-2 bg-[#202C20] border border-[#304230] rounded-lg text-[#E8E8E8] focus:outline-none focus:border-[#B79676]">
            <option>Todas as Vagas</option>
            <option>Frontend Intern</option>
            <option>Backend Developer Intern</option>
            <option>UI/UX Design Intern</option>
          </select>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-[#202C20] border border-[#304230] rounded-lg p-6 hover:border-[#B79676] transition-colors"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-lg text-[#E8E8E8] mb-1">{app.candidateName}</h3>
                  <p className="text-[#A0A0A0]">
                    Aplicou para: <span className="text-[#B79676]">{app.position}</span>
                  </p>
                  <p className="text-[#A0A0A0] mt-1">Data: {app.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                  <button className="px-4 py-2 bg-[#304230] text-[#B79676] rounded-lg hover:bg-[#3a5240] transition-colors">
                    Ver Perfil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
