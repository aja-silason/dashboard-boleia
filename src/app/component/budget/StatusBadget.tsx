type props = {
    status: string
}

export const  StatusBadge = ({ status }: props ) => {
  const styles: any = {
    PENDING: "bg-orange-100 text-orange-700 border-orange-200",
    ACTIVE: "bg-green-100 text-green-700 border-green-200",
    INACTIVE: "bg-slate-100 text-slate-700 border-slate-200",
    DECLINED: "bg-red-100 text-red-700 border-red-200"
  };

  const labels: any = {
    PENDING: "Pendente",
    ACTIVE: "Ativo",
    INACTIVE: "Inativo",
    DECLINED: "REJEITADO"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${styles[status]}`}>
      {labels[status]?.toUpperCase()}
    </span>
  );
}