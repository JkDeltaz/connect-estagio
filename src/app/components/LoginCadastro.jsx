import { useState } from 'react';

export function LoginCadastro({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [userType, setUserType] = useState('estudante');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(userType);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-2" style={{ color: '#B79676' }}>ConnectEstágio</h1>
          <p className="text-[#A0A0A0]">Conectando talentos a oportunidades</p>
        </div>

        <div className="bg-[#202C20] rounded-lg p-8 border border-[#304230]">
          {/* Mode Toggle */}
          <div className="flex gap-2 mb-6 bg-[#1C261C] rounded-lg p-1">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                mode === 'login' ? 'bg-[#B79676] text-[#1C261C]' : 'text-[#A0A0A0] hover:text-[#E8E8E8]'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode('cadastro')}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                mode === 'cadastro' ? 'bg-[#B79676] text-[#1C261C]' : 'text-[#A0A0A0] hover:text-[#E8E8E8]'
              }`}
            >
              Cadastro
            </button>
          </div>

          {/* User Type Toggle (only for cadastro) */}
          {mode === 'cadastro' && (
            <div className="flex gap-2 mb-6 bg-[#1C261C] rounded-lg p-1">
              <button
                onClick={() => setUserType('estudante')}
                className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                  userType === 'estudante' ? 'bg-[#B79676] text-[#1C261C]' : 'text-[#A0A0A0] hover:text-[#E8E8E8]'
                }`}
              >
                Eu sou Estudante
              </button>
              <button
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
                  type="text"
                  className="w-full px-4 py-2 bg-[#1C261C] border border-[#304230] rounded-lg text-[#E8E8E8] focus:outline-none focus:border-[#B79676]"
                  placeholder={userType === 'estudante' ? 'Digite seu nome completo' : 'Digite o nome da empresa'}
                />
              </div>
            )}

            <div>
              <label className="block text-[#E8E8E8] mb-2">E-mail</label>
              <input
                type="email"
                className="w-full px-4 py-2 bg-[#1C261C] border border-[#304230] rounded-lg text-[#E8E8E8] focus:outline-none focus:border-[#B79676]"
                placeholder="seuemail@exemplo.com"
              />
            </div>

            <div>
              <label className="block text-[#E8E8E8] mb-2">Senha</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-[#1C261C] border border-[#304230] rounded-lg text-[#E8E8E8] focus:outline-none focus:border-[#B79676]"
                placeholder="Digite sua senha"
              />
            </div>

            {mode === 'cadastro' && (
              <div>
                <label className="block text-[#E8E8E8] mb-2">Confirmar Senha</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-[#1C261C] border border-[#304230] rounded-lg text-[#E8E8E8] focus:outline-none focus:border-[#B79676]"
                  placeholder="Confirme sua senha"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#B79676] text-[#1C261C] rounded-lg hover:bg-[#A68666] transition-colors"
            >
              {mode === 'login' ? 'Entrar' : 'Cadastrar'}
            </button>
          </form>

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
