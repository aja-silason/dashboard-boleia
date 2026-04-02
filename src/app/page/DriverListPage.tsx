import  { useState } from 'react';
import { Search, Filter,  Check, X, Eye } from 'lucide-react';
import { StatusBadge } from '../component/budget/StatusBadget';

const MOCK_DRIVERS = [
  { id: '1', name: 'Anania Augusto', phone: '+244 944 996 909', nif: '006543210LA044', status: 'PENDING' },
  { id: '2', name: 'Sofia Mendes', phone: '+244 923 111 222', nif: '007123456BC012', status: 'ACTIVE' },
  { id: '3', name: 'Carlos Manuel', phone: '+244 912 333 444', nif: '001987654LA099', status: 'INACTIVE' },
];

export default function DriversList() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestão de Motoristas</h1>
          <p className="text-slate-500">Aprove, bloqueie ou visualize detalhes dos condutores.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nome, telefone ou NIF..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
            <Filter size={18} />
            <span>Filtros</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Motorista</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Identificação (NIF)</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Telefone</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Status</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_DRIVERS.map((driver) => (
              <tr key={driver.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                      {driver.name.charAt(0)}
                    </div>
                    <span className="font-semibold text-slate-700">{driver.name}</span>
                  </div>
                </td>
                <td className="p-4 text-slate-600 text-sm">{driver.nif}</td>
                <td className="p-4 text-slate-600 text-sm">{driver.phone}</td>
                <td className="p-4">
                  <StatusBadge status={driver.status} />
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                      <Eye size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                      <Check size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                      <X size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}