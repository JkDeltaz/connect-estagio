import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL ?? '/api';

export function EmpresasPage({ currentUser, onNavigate, onLogout }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState([]);
  const [editingCompany, setEditingCompany] = useState(null);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [newCompany, setNewCompany] = useState({ name: '', industry: '', about: '', vacancies: 0 });
  const [error, setError] = useState('');

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const res = await fetch(`${API_URL}/companies`);
      const data = await res.json();
      setCompanies(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateCompany = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_URL}/companies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Type': currentUser?.userType || '',
          'X-Company-Id': currentUser?.companyId || '',
        },
        body: JSON.stringify(newCompany),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Erro ao cadastrar empresa');
      }
      setCompanies((prev) => [data, ...prev]);
      setNewCompany({ name: '', industry: '', about: '', vacancies: 0 });
      setShowCompanyModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteCompany = async (id) => {
    await fetch(`${API_URL}/companies/${id}`, {
      method: 'DELETE',
      headers: {
        'X-User-Type': currentUser?.userType || '',
        'X-Company-Id': currentUser?.companyId || '',
      },
    });
    setCompanies((prev) => prev.filter((company) => company.id !== id));
  };

  const handleUpdateCompany = async (e) => {
    e.preventDefault();
    if (!editingCompany) return;
    setError('');
    try {
      const res = await fetch(`${API_URL}/companies/${editingCompany.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Type': currentUser?.userType || '',
          'X-Company-Id': currentUser?.companyId || '',
        },
        body: JSON.stringify(editingCompany),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Erro ao atualizar empresa');
      }
      setCompanies((prev) => prev.map((company) => (company.id === data.id ? data : company)));
      setEditingCompany(null);
      setShowCompanyModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl text-[#E8E8E8]">Empresas Cadastradas</h2>
            <p className="text-[#A0A0A0] mt-2">Encontre oportunidades de parceria e vagas disponíveis.</p>
          </div>
          {currentUser?.userType === 'empresa' && (
            <button
              type="button"
              onClick={() => {
                setEditingCompany(null);
                setNewCompany({ name: '', industry: '', about: '', vacancies: 0 });
                setError('');
                setShowCompanyModal(true);
              }}
              className="px-6 py-3 bg-[#B79676] text-[#1C261C] rounded-lg hover:bg-[#A68666] transition-colors"
            >
              + Nova Empresa
            </button>
          )}
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Buscar empresa por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-[#202C20] border border-[#304230] rounded-lg text-[#E8E8E8] focus:outline-none focus:border-[#B79676]"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCompanies.map((company) => (
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
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[#A0A0A0]">{company.vacancies} {company.vacancies === 1 ? 'vaga' : 'vagas'}</span>
                  <div className="flex gap-2">
                    {currentUser?.userType === 'empresa' && currentUser.companyId === company.id ? (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCompany(company);
                            setError('');
                            setShowCompanyModal(true);
                          }}
                          className="px-3 py-2 rounded-lg bg-[#B79676] text-[#1C261C] hover:bg-[#A68666]"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCompany(company.id)}
                          className="px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500"
                        >
                          Excluir
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {showCompanyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8">
          <div className="w-full max-w-2xl rounded-3xl bg-[#202C20] border border-[#304230] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl text-[#E8E8E8]">
                  {editingCompany ? 'Editar Empresa' : 'Cadastrar Nova Empresa'}
                </h3>
                <p className="text-[#A0A0A0] mt-1">
                  {editingCompany
                    ? 'Atualize os dados da empresa.'
                    : 'Adicione uma nova empresa ao portal.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowCompanyModal(false);
                  setEditingCompany(null);
                }}
                className="rounded-full border border-[#304230] px-4 py-2 text-[#A0A0A0] hover:text-[#E8E8E8]"
              >
                Fechar
              </button>
            </div>
            <form
              onSubmit={editingCompany ? handleUpdateCompany : handleCreateCompany}
              className="space-y-4"
            >
              <input
                value={editingCompany?.name ?? newCompany.name}
                onChange={(e) => {
                  if (editingCompany) {
                    setEditingCompany((prev) => ({ ...prev, name: e.target.value }));
                  } else {
                    setNewCompany((prev) => ({ ...prev, name: e.target.value }));
                  }
                }}
                type="text"
                placeholder="Nome da empresa"
                className="w-full px-4 py-3 bg-[#1C261C] border border-[#304230] rounded-2xl text-[#E8E8E8] focus:outline-none focus:border-[#B79676]"
              />
              <input
                value={editingCompany?.industry ?? newCompany.industry}
                onChange={(e) => {
                  if (editingCompany) {
                    setEditingCompany((prev) => ({ ...prev, industry: e.target.value }));
                  } else {
                    setNewCompany((prev) => ({ ...prev, industry: e.target.value }));
                  }
                }}
                type="text"
                placeholder="Indústria"
                className="w-full px-4 py-3 bg-[#1C261C] border border-[#304230] rounded-2xl text-[#E8E8E8] focus:outline-none focus:border-[#B79676]"
              />
              <textarea
                value={editingCompany?.about ?? newCompany.about}
                onChange={(e) => {
                  if (editingCompany) {
                    setEditingCompany((prev) => ({ ...prev, about: e.target.value }));
                  } else {
                    setNewCompany((prev) => ({ ...prev, about: e.target.value }));
                  }
                }}
                placeholder="Descrição da empresa"
                className="w-full px-4 py-3 min-h-[140px] bg-[#1C261C] border border-[#304230] rounded-2xl text-[#E8E8E8] focus:outline-none focus:border-[#B79676]"
              />
              <input
                value={editingCompany?.vacancies ?? newCompany.vacancies}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (editingCompany) {
                    setEditingCompany((prev) => ({ ...prev, vacancies: isNaN(value) ? 0 : value }));
                  } else {
                    setNewCompany((prev) => ({ ...prev, vacancies: isNaN(value) ? 0 : value }));
                  }
                }}
                type="number"
                min="0"
                placeholder="Número de vagas"
                className="w-full px-4 py-3 bg-[#1C261C] border border-[#304230] rounded-2xl text-[#E8E8E8] focus:outline-none focus:border-[#B79676]"
              />
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-[#B79676] text-[#1C261C] rounded-2xl hover:bg-[#A68666] transition-colors"
                >
                  {editingCompany ? 'Salvar alterações' : 'Cadastrar'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCompanyModal(false);
                    setEditingCompany(null);
                  }}
                  className="flex-1 px-4 py-3 bg-[#304230] text-[#E8E8E8] rounded-2xl hover:bg-[#3a5240] transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
