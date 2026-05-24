import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL ?? '/api';

export function LoginCadastro({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [userType, setUserType] = useState('estudante');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Falha no login.');
        }
        onLogin(data);
      } else {
        if (password !== confirmPassword) {
          throw new Error('Senhas não coincidem.');
        }
        const response = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, userType }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Falha no cadastro.');
        }
        onLogin(data);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-2" style={{ color: '#B79676' }}>ConnectEstágio</h1>
          <p className="text-[#A0A0A0]">Conectando talentos a oportunidades</p>
        </div>

        <div className="bg-[#202C20] rounded-lg p-8 border border-[#304230]">
          <div className="flex gap-2 mb-6 bg-[#1C261C] rounded-lg p-1">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                mode === 'login' ? 'bg-[#B79676] text-[#1C261C]' : 'text-[#A0A0A0] hover:text-[#E8E8E8]'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode('cadastro')}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                mode === 'cadastro' ? 'bg-[#B79676] text-[#1C261C]' : 'text-[#A0A0A0] hover:text-[#E8E8E8]'
              }`}
            >
              Cadastro
            </button>
          </div>

          {mode === 'cadastro' && (
            <div className="flex gap-2 mb-6 bg-[#1C261C] rounded-lg p-1">
              <button
                type="button"
                onClick={() => setUserType('estudante')}
                className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                  userType === 'estudante' ? 'bg-[#B79676] text-[#1C261C]' : 'text-[#A0A0A0] hover:text-[#E8E8E8]'
                }`}
              >
                Eu sou Estudante
              </button>
              <button
                type="button"
                onClick={() => setUserType('empresa')}
                className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                  userType === 'empresa' ? 'bg-[#B79676] text-[#1C261C]' : 'text-[#A0A0A0] hover:text-[#E8E8E8]'
                }`}
              >
                Eu sou Empresa
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'cadastro' && (
              <div>
                <label className="block text-[#E8E8E8] mb-2">
                  {userType === 'estudante' ? 'Nome Completo' : 'Nome da Empresa'}
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="w-full px-4 py-2 bg-[#1C261C] border border-[#304230] rounded-lg text-[#E8E8E8] focus:outline-none focus:border-[#B79676]"
                  placeholder={userType === 'estudante' ? 'Digite seu nome completo' : 'Digite o nome da empresa'}
                />
              </div>
            )}

            <div>
              <label className="block text-[#E8E8E8] mb-2">E-mail</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full px-4 py-2 bg-[#1C261C] border border-[#304230] rounded-lg text-[#E8E8E8] focus:outline-none focus:border-[#B79676]"
                placeholder="seuemail@exemplo.com"
              />
            </div>

            <div>
              <label className="block text-[#E8E8E8] mb-2">Senha</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full px-4 py-2 bg-[#1C261C] border border-[#304230] rounded-lg text-[#E8E8E8] focus:outline-none focus:border-[#B79676]"
                placeholder="Digite sua senha"
              />
            </div>

            {mode === 'cadastro' && (
              <div>
                <label className="block text-[#E8E8E8] mb-2">Confirmar Senha</label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  className="w-full px-4 py-2 bg-[#1C261C] border border-[#304230] rounded-lg text-[#E8E8E8] focus:outline-none focus:border-[#B79676]"
                  placeholder="Confirme sua senha"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#B79676] text-[#1C261C] rounded-lg hover:bg-[#A68666] transition-colors disabled:cursor-not-allowed disabled:opacity-60"
            >
              {mode === 'login' ? 'Entrar' : 'Cadastrar'}
            </button>
          </form>

          {error && <p className="mt-4 text-center text-red-500">{error}</p>}

          {mode === 'login' && (
            <div className="mt-4 text-center">
              <a href="#" className="text-[#B79676] hover:underline">
                Esqueceu a senha?
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
