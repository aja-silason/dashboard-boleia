import  { useState } from 'react';
import { Search, Filter,  Check, X, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { StatusBadge } from '../component/budget/StatusBadget';
import { useGetAllDrivers } from '../infra/hooks/driver/useGetAllDrivers';
import { RefreshButton } from '../component/button/Refreshutton';

export default function DriversList() {

  const {data, handleFetch, isLoading} = useGetAllDrivers();

  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredDrivers = data.filter(e => 
    e.identificationNumber?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.user.phoneNumber?.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredDrivers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDrivers.slice(indexOfFirstItem, indexOfLastItem);

  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestão de Motoristas</h1>
          <p className="text-slate-500">Aprove, bloqueie ou visualize detalhes dos condutores.</p>
          <RefreshButton onClick={handleFetch} isLoading={isLoading}/>
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
            onChange={(e) => handleSearchChange(e.target.value)}
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
        <div className='overflow-x-auto'>
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
              {currentItems?.map((driver, index: number) => (
                <tr key={driver.id || index} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                        {driver?.user.firstName?.charAt(0)}
                      </div>
                      <span className="font-semibold text-slate-700">{driver?.user.firstName + ' ' +driver?.user.lastName}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 text-sm">{driver?.identificationNumber}</td>
                  <td className="p-4 text-slate-600 text-sm">{driver?.user.phoneNumber}</td>
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

        <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-white">
          <span className="text-sm text-slate-500">
            Mostrando <b>{indexOfFirstItem + 1}</b> a <b>{Math.min(indexOfLastItem, filteredDrivers.length)}</b> de <b>{filteredDrivers.length}</b> motoristas
          </span>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === page 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button 
              onClick={goToNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-2 rounded-lg border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}