import { useState } from 'react';
import { Lock, Car, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../infra/hooks/useAuth';
import { InputPhone } from '../component/input/InputPhone';

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  
  const {handleChange, handleSubmit, isLoading, ddi, setDdi, setLocalPhone,localPhone} = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        
        <div className="bg-slate-900 p-8 text-center">
          <div className="inline-flex bg-blue-600 p-3 rounded-xl mb-4">
            <Car className="text-white" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white">Boleia Admin</h2>
          <p className="text-slate-400 text-sm mt-1">Gestão de Mobilidade e Motoristas</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">

          <InputPhone 
            ddi={ddi}
            setDdi={setDdi}
            phoneNumber={localPhone}
            onChange={setLocalPhone}
          />

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Palavra-passe</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type={showPassword ? "text" : "password"} 
                required
                className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="••••••••"
                onChange={(e) => handleChange("password", e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-200 transition-all transform active:scale-[0.98]"
          >
            {isLoading ? 'Processando ...' : 'Entrar no Painel'}
          </button>

          <p className="text-center text-xs text-slate-400">
            Acesso restrito a administradores autorizados.
          </p>
        </form>
      </div>
    </div>
  );
}