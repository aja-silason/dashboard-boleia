import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type props = {
    to: string,
    icon: ReactNode,
    label: string,
    active: boolean
}

export const SidebarItem = ({ to, icon, label, active }: props)  => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        active 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
}