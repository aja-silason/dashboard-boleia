import { 
  X, User, Phone, FileText, Calendar, 
  CheckCircle, AlertTriangle, ShieldCheck 
} from 'lucide-react';
import type { DriverOuput } from '../../infra/service/entity/UserOutput';
import { StatusBadge } from '../budget/StatusBadget';

interface DriverDetailProps {
  driver: DriverOuput | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const DriverDetailModal = ({ driver, isOpen, onClose, onApprove, onReject }: DriverDetailProps) => {
  if (!isOpen || !driver) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-AO', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Detalhes do Motorista</h2>
              <p className="text-sm text-slate-500">ID: {driver.id.substring(0, 8)}...</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="space-y-6">
            <section>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <User size={14} /> Dados Pessoais
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-500">Nome Completo</p>
                  <p className="font-semibold text-slate-800">{driver.user.firstName} {driver.user.lastName}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Telefone</p>
                  <p className="font-semibold text-slate-800 flex items-center gap-2">
                    <Phone size={14} className="text-slate-400" />
                    {driver.user.phoneNumber}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Calendar size={14} /> Sistema
              </h3>
              <div>
                <p className="text-xs text-slate-500">Data de Cadastro</p>
                <p className="font-medium text-slate-700">{formatDate(driver.createdAt)}</p>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileText size={14} /> Documentação
              </h3>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-4">
                <div>
                  <p className="text-xs text-slate-500 italic">Número de Identificação (NIF)</p>
                  <p className="font-mono font-bold text-blue-700 text-lg">{driver.identificationNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 italic">Número da Carta de Condução</p>
                  <p className="font-mono font-bold text-slate-800 text-lg">{driver.licenseNumber}</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Status Atual</h3>
              <StatusBadge status={driver.status} />
            </section>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-3 justify-end">
          <button 
            onClick={() => onReject(driver.id)}
            disabled={driver.status === 'REJECTED'}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all disabled:opacity-50"
          >
            <AlertTriangle size={18} />
            REPROVAR
          </button>
          
          <button 
            onClick={() => onApprove(driver.id)}
            disabled={driver.status === 'APPROVED'}
            className="flex items-center gap-2 px-8 py-2.5 rounded-xl font-bold bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-200 transition-all disabled:opacity-50"
          >
            <CheckCircle size={18} />
            APROVAR MOTORISTA
          </button>
        </div>
      </div>
    </div>
  );
};