import { useLocation } from 'react-router-dom';
import { Home, Users, Settings, LogOut, Car } from 'lucide-react';
import { useAuthContext } from '../../shared/context/auth.context';
import { SidebarItem } from './item/SideBarItem';

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const {logOut} = useAuthContext();

  return (
    <aside className="w-64 bg-slate-900 min-h-screen p-6 flex flex-col">
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Car className="text-white" size={24} />
        </div>
        <span className="text-white font-bold text-xl tracking-tight">Boleia Admin</span>
      </div>

      <nav className="flex-1 space-y-2">
        <SidebarItem 
          to="/" 
          icon={<Home size={20} />} 
          label="Dashboard" 
          active={isActive('/')} 
        />
        <SidebarItem 
          to="/motoristas" 
          icon={<Users size={20} />} 
          label="Motoristas" 
          active={isActive('/motoristas')} 
        />
        <SidebarItem 
          to="/veiculos" 
          icon={<Car size={20} />} 
          label="Veículos" 
          active={isActive('/veiculos')} 
        />
      </nav>

      <div className="border-t border-slate-800 pt-6 space-y-2">
        <SidebarItem 
          to="/definicoes" 
          icon={<Settings size={20} />} 
          label="Definições" 
          active={isActive('/definicoes')} 
        />
        <button onClick={logOut} className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-red-400 transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </aside>
  );
}