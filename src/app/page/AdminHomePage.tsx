import { Users, TrendingUp, AlertCircle, CheckCircle2, Clock, RefreshCcw} from 'lucide-react';
import { StatCard } from '../component/cards/StatCard';
import { ActivityItem } from '../component/cards/ActivityItem';
import { useGetAllDrivers } from '../infra/hooks/driver/useGetAllDrivers';
import { useGetAllTravel } from '../infra/hooks/travel/useGetAllTravel';

export default function AdminHomePage() {

  const {data: travel, handleFetch: fetchTravel} = useGetAllTravel();
  const {data, handleFetch, isLoading} = useGetAllDrivers();

  const approvedDrivers = data.filter(driver => driver?.status?.includes("APPROVED"));
  const requestDrivers = data.filter(driver => driver?.status?.includes("PENDING"));
  const approvedTravels = travel.filter(travel => travel?.status?.includes("COMPLETED"));

  const splitInitial = (value: string): string => {
    const twoLetters = value.split(' ');
    const first = twoLetters[0].split('')[0] == undefined ? '' : twoLetters[0].split('')[0];
    const second = twoLetters[1].split('')[0] == undefined ? '' : twoLetters[1].split('')[0];
    return first +""+ second;
  }

  const fetch = () => {
    handleFetch();
    fetchTravel()
  }

  return (
    <div className="flex-1 bg-slate-50 min-h-screen p-8">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Olá, Administrador</h1>
          <p className="text-slate-500">Aqui está o que está a acontecer na plataforma hoje.</p>
          <button
          onClick={fetch}
           className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white mt-5 px-2 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
            <RefreshCcw size={18} />
            {isLoading ? 'Processando...' : 'Recarregar'}
          </button>
        </div>
        <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
          <TrendingUp size={18} />
          Gerar Relatório
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          title="Total Motoristas" 
          value={approvedDrivers?.length?.toString()} 
          change="+12%" 
          isPositive={true} 
          icon={<Users className="text-blue-600" />} 
        />
        <StatCard 
          title="Viagens Realizadas" 
          value={approvedTravels?.length?.toString()} 
          change="+18%" 
          isPositive={true} 
          icon={<TrendingUp className="text-green-600" />} 
        />
        <StatCard 
          title="Aprovações Pendentes" 
          value="14" 
          change="Urgente" 
          isPositive={false} 
          icon={<Clock className="text-orange-600" />} 
        />
        <StatCard 
          title="Receita Total" 
          value="2.450.000 Kz" 
          change="+5%" 
          isPositive={true} 
          icon={<CheckCircle2 className="text-indigo-600" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Novas Solicitações de Motoristas</h3>
            <button className="text-blue-600 text-sm font-semibold hover:underline">Ver todos</button>
          </div>
          <div className="divide-y divide-slate-50">
            {requestDrivers?.map((item, index: number) => (
              <div key={index} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                    {splitInitial(`${item?.user.firstName +' ' + item?.user.lastName}`)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700">{item?.user.firstName +' ' + item?.user.lastName}</p>
                    <p className="text-xs text-slate-500">NIF: {item?.identificationNumber} • Cadastrado há 2h</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs font-bold bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100">
                    REVISAR
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <AlertCircle size={18} className="text-slate-400" />
            Atividade do Sistema
          </h3>
          <div className="space-y-6">
            <ActivityItem 
              time="10:30" 
              text="Novo veículo 'Toyota Corolla' aprovado para o motorista Carlos." 
              color="bg-green-500"
            />
            <ActivityItem 
              time="09:15" 
              text="Denúncia recebida: Viagem ID #8432 reportada por comportamento." 
              color="bg-red-500"
            />
            <ActivityItem 
              time="Ontem" 
              text="Manutenção programada concluída com sucesso no servidor." 
              color="bg-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}