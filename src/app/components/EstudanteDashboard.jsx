import { useState } from 'react';

export function EstudanteDashboard({ onNavigate, onLogout }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const jobs = [
    {
      id: 1,
      title: 'UI/UX Design Intern',
      company: 'TechStart',
      location: 'São Paulo, SP',
      description: 'Oportunidade para trabalhar com design de interfaces e experiência do usuário.',
      type: 'Remoto',
      area: 'Design' },
    {
      id: 2,
      title: 'Frontend Developer Intern',
      company: 'CodeLabs',
      location: 'Rio de Janeiro, RJ',
      description: 'Desenvolvimento de aplicações web modernas com React e TypeScript.',
      type: 'Híbrido',
      area: 'Desenvolvimento' },
    {
      id: 3,
      title: 'Backend Developer Intern',
      company: 'DataFlow',
      location: 'Belo Horizonte, MG',
      description: 'Criação de APIs REST e integração com bancos de dados.',
      type: 'Presencial',
      area: 'Desenvolvimento' },
    {
      id: 4,
      title: 'Marketing Digital Intern',
      company: 'Growth Agency',
      location: 'Curitiba, PR',
      description: 'Gestão de campanhas digitais e análise de métricas.',
      type: 'Remoto',
      area: 'Marketing' },
    {
      id: 5,
      title: 'Data Science Intern',
      company: 'Analytics Co',
      location: 'Porto Alegre, RS',
      description: 'Análise de dados e criação de modelos preditivos.',
      type: 'Híbrido',
      area: 'Dados' },
    {
      id: 6,
      title: 'Product Design Intern',
      company: 'Innovation Hub',
      location: 'Brasília, DF',
      description: 'Design de produtos digitais e prototipagem.',
      type: 'Remoto',
      area: 'Design' },
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'Remoto':
        return 'bg-[#B79676] text-[#1C261C]';
      case 'Presencial':
        return 'bg-[#304230] text-[#E8E8E8]';
      case 'Híbrido':
        return 'bg-[#3a5240] text-[#E8E8E8]';
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
                <a href="#" className="text-[#B79676]">Buscar Vagas</a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('empresas');
                  }}
                  className="text-[#E8E8E8] hover:text-[#B79676] transition-colors"
                >
                  Empresas
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#B79676] flex items-center justify-center text-[#1C261C]">
                A
              </div>
              <button onClick={onLogout} className="text-[#A0A0A0] hover:text-[#E8E8E8]">Sair</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <h2 className="text-2xl text-[#E8E8E8] mb-6">Vagas Disponíveis</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Buscar vagas, habilidades, empresas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 bg-[#202C20] border border-[#304230] rounded-lg text-[#E8E8E8] focus:outline-none focus:border-[#B79676] mb-4"
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterType === 'all' ? 'bg-[#B79676] text-[#1C261C]' : 'bg-[#202C20] text-[#E8E8E8] border border-[#304230] hover:border-[#B79676]'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilterType('Remoto')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterType === 'Remoto' ? 'bg-[#B79676] text-[#1C261C]' : 'bg-[#202C20] text-[#E8E8E8] border border-[#304230] hover:border-[#B79676]'
            }`}
          >
            Remoto
          </button>
          <button
            onClick={() => setFilterType('Presencial')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterType === 'Presencial' ? 'bg-[#B79676] text-[#1C261C]' : 'bg-[#202C20] text-[#E8E8E8] border border-[#304230] hover:border-[#B79676]'
            }`}
          >
            Presencial
          </button>
          <button
            onClick={() => setFilterType('Híbrido')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterType === 'Híbrido' ? 'bg-[#B79676] text-[#1C261C]' : 'bg-[#202C20] text-[#E8E8E8] border border-[#304230] hover:border-[#B79676]'
            }`}
          >
            Híbrido
          </button>
          <select className="px-4 py-2 bg-[#202C20] border border-[#304230] rounded-lg text-[#E8E8E8] focus:outline-none focus:border-[#B79676]">
            <option>Todas as Áreas</option>
            <option>Design</option>
            <option>Desenvolvimento</option>
            <option>Marketing</option>
            <option>Dados</option>
          </select>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs
            .filter((job) => filterType === 'all' || job.type === filterType)
            .map((job) => (
              <div
                key={job.id}
                className="bg-[#202C20] border border-[#304230] rounded-lg p-6 hover:border-[#B79676] transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-[#304230] flex items-center justify-center mb-4 text-[#B79676]">
                  {job.company[0]}
                </div>
                <h3 className="text-lg text-[#E8E8E8] mb-2">{job.title}</h3>
                <p className="text-[#B79676] mb-2">{job.company}</p>
                <p className="text-[#A0A0A0] mb-3">{job.location}</p>
                <p className="text-[#E8E8E8] mb-4 line-clamp-2">{job.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full ${getTypeColor(job.type)}`}>
                    {job.type}
                  </span>
                  <button className="px-4 py-2 bg-[#B79676] text-[#1C261C] rounded-lg hover:bg-[#A68666] transition-colors">
                    Candidatar-se
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
