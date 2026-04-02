import type { ReactNode } from "react";

type props = { 
    title: string, 
    value: string, 
    change: string, 
    isPositive: boolean,
    icon: ReactNode
 }

export const  StatCard = ({ title, value, change, isPositive, icon }: props) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
        <span className={`text-xs font-bold px-2 py-1 rounded ${isPositive ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
          {change}
        </span>
      </div>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
    </div>
  );
}