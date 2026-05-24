import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL ?? '/api';

export function EstudanteDashboard({ onNavigate, onLogout }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [jobs, setJobs] = useState([]);
  const [appliedIds, setAppliedIds] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const res = await fetch(`${API_URL}/jobs`);
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApply = async (job) => {
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`${API_URL}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidateName: 'Candidato', candidateEmail: 'candidato@example.com', jobId: job.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Erro ao candidatar-se');
      }
      setSuccess('Candidatura enviada com sucesso!');
      setAppliedIds((prev) => [...prev, job.id]);
    } catch (err) {
      setError(err.message);
    }
  };

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

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || job.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-2xl text-[#E8E8E8]">Vagas Disponíveis</h2>
          <div className="space-y-1 text-sm text-[#A0A0A0]">
            <p>Use o botão para candidatar-se.</p>
            {success && <span className="text-green-400">{success}</span>}
            {error && <span className="text-red-400">{error}</span>}
          </div>
        </div>

        <input
          type="text"
          placeholder="Buscar vagas, habilidades, empresas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 bg-[#202C20] border border-[#304230] rounded-lg text-[#E8E8E8] focus:outline-none focus:border-[#B79676] mb-4"
        />

        <div className="flex flex-wrap gap-3 mb-8">
          {['all', 'Remoto', 'Presencial', 'Híbrido'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterType === type ? 'bg-[#B79676] text-[#1C261C]' : 'bg-[#202C20] text-[#E8E8E8] border border-[#304230] hover:border-[#B79676]'
              }`}
            >
              {type === 'all' ? 'Todas' : type}
            </button>
          ))}
          <select className="px-4 py-2 bg-[#202C20] border border-[#304230] rounded-lg text-[#E8E8E8] focus:outline-none focus:border-[#B79676]">
            <option>Todas as Áreas</option>
            <option>Design</option>
            <option>Desenvolvimento</option>
            <option>Marketing</option>
            <option>Dados</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-[#202C20] border border-[#304230] rounded-lg p-6 hover:border-[#B79676] transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-[#304230] flex items-center justify-center mb-4 text-[#B79676]">
                {job.companyName?.[0] ?? 'V'}
              </div>
              <h3 className="text-lg text-[#E8E8E8] mb-2">{job.title}</h3>
              <p className="text-[#B79676] mb-2">{job.companyName || 'Empresa'}</p>
              <p className="text-[#A0A0A0] mb-3">{job.location}</p>
              <p className="text-[#E8E8E8] mb-4 line-clamp-2">{job.description}</p>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className={`px-3 py-1 rounded-full ${getTypeColor(job.type)}`}>{job.type}</span>
                <button
                  type="button"
                  onClick={() => handleApply(job)}
                  disabled={appliedIds.includes(job.id)}
                  className="px-4 py-2 bg-[#B79676] text-[#1C261C] rounded-lg hover:bg-[#A68666] transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {appliedIds.includes(job.id) ? 'Candidatura enviada' : 'Candidatar-se'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
