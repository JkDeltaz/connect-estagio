import { useState } from 'react';

export function EmpresasPage({ onNavigate, onLogout }) {
  const [searchTerm, setSearchTerm] = useState('');

  const companies = [
    {
      id: 1,
      name: 'TechStart',
      industry: 'Tecnologia',
      about: 'Startup focada em desenvolvimento de soluções inovadoras para o mercado digital.',
      vacancies: 5 },
    {
      id: 2,
      name: 'CodeLabs',
      industry: 'Desenvolvimento de Software',
      about: 'Consultoria especializada em desenvolvimento web e mobile com tecnologias modernas.',
      vacancies: 3 },
    {
      id: 3,
      name: 'DataFlow',
      industry: 'Big Data & Analytics',
      about: 'Empresa especializada em análise de dados e business intelligence para grandes empresas.',
      vacancies: 4 },
    {
      id: 4,
      name: 'Growth Agency',
      industry: 'Marketing Digital',
      about: 'Agência de marketing digital com foco em growth hacking e performance.',
      vacancies: 2 },
    {
      id: 5,
      name: 'Analytics Co',
      industry: 'Data Science',
      about: 'Consultoria em ciência de dados e machine learning para diversos setores.',
      vacancies: 3 },
    {
      id: 6,
      name: 'Innovation Hub',
      industry: 'Design & UX',
      about: 'Estúdio de design focado em criar experiências digitais inovadoras e centradas no usuário.',
      vacancies: 4 },
  ];

  return (
    <div className="min-h-screen">
      {/* Top Navigation */}
      <nav className="bg-[#202C20] border-b border-[#304230]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-xl" style={{ color: '#B79676' }}>ConnectEstágio</h1>
              <div className="hidden md:flex gap-6">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('vagas');
                  }}
                  className="text-[#E8E8E8] hover:text-[#B79676] transition-colors"
                >
                  Buscar Vagas
                </a>
                <a href="#" className="text-[#B79676]">Empresas</a>
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
        <h2 className="text-2xl text-[#E8E8E8] mb-6">Empresas Cadastradas</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Buscar empresa por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 bg-[#202C20] border border-[#304230] rounded-lg text-[#E8E8E8] focus:outline-none focus:border-[#B79676] mb-8"
        />

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies
            .filter((company) =>
              company.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((company) => (
              <div
                key={company.id}
                className="bg-[#202C20] border border-[#304230] rounded-lg p-6 hover:border-[#B79676] transition-colors"
              >
                <div className="w-16 h-16 rounded-lg bg-[#304230] flex items-center justify-center mb-4 text-2xl text-[#B79676]">
                  {company.name[0]}
                </div>
                <h3 className="text-lg text-[#E8E8E8] mb-2">{company.name}</h3>
                <p className="text-[#B79676] mb-3">{company.industry}</p>
                <p className="text-[#E8E8E8] mb-4 line-clamp-2">{company.about}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#A0A0A0]">
                    {company.vacancies} {company.vacancies === 1 ? 'vaga' : 'vagas'}
                  </span>
                  <button className="px-4 py-2 bg-[#B79676] text-[#1C261C] rounded-lg hover:bg-[#A68666] transition-colors">
                    Ver Vagas
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
