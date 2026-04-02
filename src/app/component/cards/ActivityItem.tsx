type props = { 
    time: string,
    text: string,
    color: string
 }

export const  ActivityItem = ({ time, text, color }: props) => {
  return (
    <div className="flex gap-4">
      <div className="relative">
        <div className={`w-2 h-2 rounded-full ${color} mt-2`} />
        <div className="absolute top-4 bottom-[-24px] left-[3px] w-[1px] bg-slate-100" />
      </div>
      <div>
        <p className="text-sm text-slate-700 leading-tight">{text}</p>
        <span className="text-[10px] text-slate-400 font-bold uppercase">{time}</span>
      </div>
    </div>
  );
}