import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL ?? '/api';

export function EmpresaDashboard({ currentUser, onLogout }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [companyProfile, setCompanyProfile] = useState(null);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [newJob, setNewJob] = useState({ title: '', location: '', description: '', type: 'Remoto', area: 'Desenvolvimento', companyId: currentUser?.companyId || 1 });
  const [profileError, setProfileError] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadJobs();
    loadApplications();
    loadCompanyProfile();
  }, []);

  const loadCompanyProfile = async () => {
    if (!currentUser?.companyId) return;
    try {
      const res = await fetch(`${API_URL}/companies/${currentUser.companyId}`);
      const data = await res.json();
      if (res.ok) {
        setCompanyProfile(data);
        setNewJob((prev) => ({ ...prev, companyId: data.id }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadJobs = async () => {
    try {
      const res = await fetch(`${API_URL}/jobs`);
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadApplications = async () => {
    try {
      const res = await fetch(`${API_URL}/applications`);
      const data = await res.json();
      setApplications(data);
    } catch (err) {
      console.error(err);
    }
  };

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

  const handleCreateJob = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob),
      });
      const created = await response.json();
      if (!response.ok) throw new Error(created.error || 'Erro ao criar vaga.');
      setJobs((prev) => [created, ...prev]);
      setNewJob({ title: '', location: '', description: '', type: 'Remoto', area: 'Desenvolvimento', companyId: currentUser?.companyId || 1 });
      setShowJobModal(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (id) => {
    await fetch(`${API_URL}/jobs/${id}`, { method: 'DELETE' });
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  const handleUpdateCompanyProfile = async (e) => {
    e.preventDefault();
    setProfileError('');
    if (!companyProfile?.id) return;

    try {
      const res = await fetch(`${API_URL}/companies/${companyProfile.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Type': currentUser?.userType || '',
          'X-Company-Id': currentUser?.companyId || '',
        },
        body: JSON.stringify({
          name: companyProfile.name,
          industry: companyProfile.industry,
          about: companyProfile.about,
          vacancies: companyProfile.vacancies,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao atualizar perfil da empresa.');
      setCompanyProfile(data);
      setShowProfileModal(false);
    } catch (err) {
      setProfileError(err.message);
    }
  };

  const handleUpdateStatus = async (applicationId, status) => {
    await fetch(`${API_URL}/applications/${applicationId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    loadApplications();
  };

  const openApplicationModal = (application) => {
    setSelectedApplication(application);
    setShowApplicationModal(true);
  };

  const filteredApplications = applications.filter((app) =>
    app.candidate_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl text-[#E8E8E8]">Painel da Empresa</h2>
            <p className="text-[#A0A0A0] mt-2">Gerencie perfil, vagas e candidaturas em um único lugar.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => setShowProfileModal(true)}
              className="px-6 py-3 bg-[#304230] text-[#E8E8E8] rounded-lg hover:bg-[#3a5240] transition-colors"
            >
              Editar Perfil da Empresa
            </button>
            <button
              type="button"
              onClick={() => setShowJobModal(true)}
              className="px-6 py-3 bg-[#B79676] text-[#1C261C] rounded-lg hover:bg-[#A68666] transition-colors"
            >
              + Postar Nova Vaga
            </button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[360px_1fr] mb-8">
          <section className="bg-[#202C20] border border-[#304230] rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl text-[#E8E8E8]">Perfil da Empresa</h3>
                <p className="text-[#A0A0A0] mt-1">Informações visíveis para candidatos e no painel.</p>
              </div>
              <span className="inline-flex items-center rounded-full bg-[#304230] px-3 py-1 text-sm text-[#E8E8E8]">
                {companyProfile ? `${companyProfile.vacancies || 0} vagas abertas` : 'Carregando'}
              </span>
            </div>
            {companyProfile ? (
              <div className="space-y-4">
                <div className="rounded-3xl bg-[#1C261C] p-4 border border-[#304230]">
                  <h4 className="text-lg text-[#E8E8E8]">{companyProfile.name}</h4>
                  <p className="text-[#A0A0A0] mt-2">{companyProfile.about || 'Nenhuma descrição cadastrada ainda.'}</p>
                </div>
                <div className="grid gap-3">
                  <div className="rounded-3xl bg-[#1C261C] p-4 border border-[#304230]">
                    <p className="text-[#A0A0A0] text-sm">Indústria</p>
                    <p className="text-[#E8E8E8] mt-1">{companyProfile.industry || 'Não informado'}</p>
                  </div>
                  <div className="rounded-3xl bg-[#1C261C] p-4 border border-[#304230]">
                    <p className="text-[#A0A0A0] text-sm">Total de vagas</p>
                    <p className="text-[#E8E8E8] mt-1">{companyProfile.vacancies || 0}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-[#A0A0A0]">Carregando perfil...</p>
            )}
          </section>

          <div className="space-y-6">
            <section className="bg-[#202C20] border border-[#304230] rounded-lg p-6">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl text-[#E8E8E8]">Vagas publicadas</h3>
                  <p className="text-[#A0A0A0] mt-1">Gerencie suas vagas ativas.</p>
                </div>
                <span className="rounded-full bg-[#304230] px-3 py-1 text-sm text-[#E8E8E8]">{jobs.length} vagas</span>
              </div>
              <div className="grid gap-4">
                {jobs.map((job) => (
                  <div key={job.id} className="bg-[#1C261C] border border-[#304230] rounded-lg p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-start">
                      <div>
                        <h4 className="text-lg text-[#E8E8E8]">{job.title}</h4>
                        <p className="text-[#A0A0A0] mt-1">{job.type} • {job.location}</p>
                        <p className="text-[#A0A0A0] mt-1">{job.area}</p>
                      </div>
                      <div className="flex flex-col gap-2 sm:items-end">
                        <button
                          type="button"
                          onClick={() => handleDeleteJob(job.id)}
                          className="px-3 py-1 rounded-lg bg-red-600 text-white hover:bg-red-500"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-[#202C20] border border-[#304230] rounded-lg p-6">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl text-[#E8E8E8]">Candidaturas recentes</h3>
                  <p className="text-[#A0A0A0] mt-1">Revise os candidatos e atualize status rapidamente.</p>
                </div>
                <span className="rounded-full bg-[#304230] px-3 py-1 text-sm text-[#E8E8E8]">{filteredApplications.length} candidaturas</span>
              </div>
              <input
                type="text"
                placeholder="Buscar candidaturas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 mb-4 bg-[#1C261C] border border-[#304230] rounded-lg text-[#E8E8E8] focus:outline-none focus:border-[#B79676]"
              />
              <div className="space-y-4">
                {filteredApplications.map((app) => (
                  <div key={app.id} className="bg-[#1C261C] border border-[#304230] rounded-lg p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-start">
                      <div>
                        <h4 className="text-lg text-[#E8E8E8]">{app.candidate_name}</h4>
                        <p className="text-[#A0A0A0] mt-1">Vaga: {app.jobTitle}</p>
                        <p className="text-[#A0A0A0]">Empresa: {app.companyName}</p>
                      </div>
                      <div className="flex flex-col gap-2 items-start sm:items-end">
                        <span className={`px-3 py-1 rounded-full ${getStatusColor(app.status)}`}>{app.status}</span>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(app.id, app.status === 'Novo' ? 'Em Análise' : 'Aprovado')}
                            className="px-3 py-1 rounded-lg bg-[#B79676] text-[#1C261C] hover:bg-[#A68666]"
                          >
                            Atualizar status
                          </button>
                          <button
                            type="button"
                            onClick={() => openApplicationModal(app)}
                            className="px-3 py-1 rounded-lg bg-[#304230] text-[#E8E8E8] hover:bg-[#3a5240]"
                          >
                            Ver detalhes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {showJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8">
          <div className="w-full max-w-2xl rounded-3xl bg-[#202C20] border border-[#304230] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl text-[#E8E8E8]">Postar nova vaga</h3>
                <p className="text-[#A0A0A0] mt-1">Preencha os detalhes e publique a vaga diretamente.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowJobModal(false)}
                className="rounded-full border border-[#304230] px-4 py-2 text-[#A0A0A0] hover:text-[#E8E8E8]"
              >
                Fechar
              </button>
            </div>
            <form onSubmit={handleCreateJob} className="space-y-4">
              <input
                value={newJob.title}
                onChange={(e) => setNewJob((prev) => ({ ...prev, title: e.target.value }))}
                type="text"
                placeholder="Título da vaga"
                className="w-full px-4 py-3 bg-[#1C261C] border border-[#304230] rounded-2xl text-[#E8E8E8] focus:outline-none focus:border-[#B79676]"
              />
              <input
                value={newJob.location}
                onChange={(e) => setNewJob((prev) => ({ ...prev, location: e.target.value }))}
                type="text"
                placeholder="Localização"
                className="w-full px-4 py-3 bg-[#1C261C] border border-[#304230] rounded-2xl text-[#E8E8E8] focus:outline-none focus:border-[#B79676]"
              />
              <textarea
                value={newJob.description}
                onChange={(e) => setNewJob((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Descrição da vaga"
                className="w-full px-4 py-3 min-h-[140px] bg-[#1C261C] border border-[#304230] rounded-2xl text-[#E8E8E8] focus:outline-none focus:border-[#B79676]"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                  value={newJob.type}
                  onChange={(e) => setNewJob((prev) => ({ ...prev, type: e.target.value }))}
                  className="w-full px-4 py-3 bg-[#1C261C] border border-[#304230] rounded-2xl text-[#E8E8E8] focus:outline-none focus:border-[#B79676]"
                >
                  <option value="Remoto">Remoto</option>
                  <option value="Presencial">Presencial</option>
                  <option value="Híbrido">Híbrido</option>
                </select>
                <input
                  value={newJob.area}
                  onChange={(e) => setNewJob((prev) => ({ ...prev, area: e.target.value }))}
                  type="text"
                  placeholder="Área"
                  className="w-full px-4 py-3 bg-[#1C261C] border border-[#304230] rounded-2xl text-[#E8E8E8] focus:outline-none focus:border-[#B79676]"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-[#B79676] text-[#1C261C] rounded-2xl hover:bg-[#A68666] transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Criar vaga
                </button>
                <button
                  type="button"
                  onClick={() => setShowJobModal(false)}
                  className="flex-1 px-4 py-3 bg-[#304230] text-[#E8E8E8] rounded-2xl hover:bg-[#3a5240] transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8">
          <div className="w-full max-w-2xl rounded-3xl bg-[#202C20] border border-[#304230] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl text-[#E8E8E8]">Editar perfil da empresa</h3>
                <p className="text-[#A0A0A0] mt-1">Atualize os dados que aparecem para os candidatos.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowProfileModal(false)}
                className="rounded-full border border-[#304230] px-4 py-2 text-[#A0A0A0] hover:text-[#E8E8E8]"
              >
                Fechar
              </button>
            </div>
            <form onSubmit={handleUpdateCompanyProfile} className="space-y-4">
              <input
                value={companyProfile?.name || ''}
                onChange={(e) => setCompanyProfile((prev) => ({ ...prev, name: e.target.value }))}
                type="text"
                placeholder="Nome da empresa"
                className="w-full px-4 py-3 bg-[#1C261C] border border-[#304230] rounded-2xl text-[#E8E8E8] focus:outline-none focus:border-[#B79676]"
              />
              <input
                value={companyProfile?.industry || ''}
                onChange={(e) => setCompanyProfile((prev) => ({ ...prev, industry: e.target.value }))}
                type="text"
                placeholder="Área de atuação"
                className="w-full px-4 py-3 bg-[#1C261C] border border-[#304230] rounded-2xl text-[#E8E8E8] focus:outline-none focus:border-[#B79676]"
              />
              <textarea
                value={companyProfile?.about || ''}
                onChange={(e) => setCompanyProfile((prev) => ({ ...prev, about: e.target.value }))}
                placeholder="Sobre a empresa"
                className="w-full px-4 py-3 min-h-[140px] bg-[#1C261C] border border-[#304230] rounded-2xl text-[#E8E8E8] focus:outline-none focus:border-[#B79676]"
              />
              <input
                value={companyProfile?.vacancies || ''}
                onChange={(e) => setCompanyProfile((prev) => ({ ...prev, vacancies: e.target.value }))}
                type="text"
                placeholder="Número de vagas abertas"
                className="w-full px-4 py-3 bg-[#1C261C] border border-[#304230] rounded-2xl text-[#E8E8E8] focus:outline-none focus:border-[#B79676]"
              />
              {profileError && <p className="text-red-500">{profileError}</p>}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-[#B79676] text-[#1C261C] rounded-2xl hover:bg-[#A68666] transition-colors"
                >
                  Salvar alterações
                </button>
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="flex-1 px-4 py-3 bg-[#304230] text-[#E8E8E8] rounded-2xl hover:bg-[#3a5240] transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showApplicationModal && selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8">
          <div className="w-full max-w-xl rounded-3xl bg-[#202C20] border border-[#304230] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl text-[#E8E8E8]">Detalhes da candidatura</h3>
                <p className="text-[#A0A0A0] mt-1">Veja mais informações sobre o candidato.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowApplicationModal(false)}
                className="rounded-full border border-[#304230] px-4 py-2 text-[#A0A0A0] hover:text-[#E8E8E8]"
              >
                Fechar
              </button>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl bg-[#1C261C] p-4 border border-[#304230]">
                <p className="text-[#A0A0A0] text-sm">Candidato</p>
                <p className="text-[#E8E8E8] mt-1 text-lg">{selectedApplication.candidate_name}</p>
              </div>
              <div className="rounded-3xl bg-[#1C261C] p-4 border border-[#304230]">
                <p className="text-[#A0A0A0] text-sm">Email</p>
                <p className="text-[#E8E8E8] mt-1">{selectedApplication.candidate_email}</p>
              </div>
              <div className="rounded-3xl bg-[#1C261C] p-4 border border-[#304230]">
                <p className="text-[#A0A0A0] text-sm">Vaga</p>
                <p className="text-[#E8E8E8] mt-1">{selectedApplication.jobTitle}</p>
              </div>
              <div className="rounded-3xl bg-[#1C261C] p-4 border border-[#304230]">
                <p className="text-[#A0A0A0] text-sm">Status</p>
                <p className={`inline-flex items-center rounded-full px-3 py-1 mt-1 ${getStatusColor(selectedApplication.status)}`}>{selectedApplication.status}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
