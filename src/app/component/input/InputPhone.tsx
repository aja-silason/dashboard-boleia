import { useMemo } from 'react';
import { Phone } from 'lucide-react';

// Reutilizando sua lógica de placeholders
const PLACEHOLDERS: Record<string, string> = {
  "+244": "923 456 789",
  "+258": "841 234 567",
  "+238": "912 34 56",
  "+351": "912 345 678",
  "+55": "11 91234-5678"
};

// Dados dos países (Você pode importar do seu countycode.utils)
const countryCodes = [
  { label: "🇦🇴 AO", value: "+244" },
  { label: "🇲🇿 MZ", value: "+258" },
  { label: "🇵🇹 PT", value: "+351" },
  { label: "🇧🇷 BR", value: "+55" },
  // ... adicione os outros
];

type Props = {
  ddi: string;
  setDdi: (value: string) => void;
  phoneNumber: string;
  onChange: (value: string) => void;
};

export const InputPhone = ({ ddi, setDdi, phoneNumber, onChange }: Props) => {
  const currentPlaceholder = useMemo(() => {
    return PLACEHOLDERS[ddi] || "923 456 789";
  }, [ddi]);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">
        Telefone
      </label>
      
      <div className="flex gap-2">
        {/* Seletor de País/DDI */}
        <div className="relative w-32">
          <select
            value={ddi}
            onChange={(e) => setDdi(e.target.value)}
            className="w-full h-[50px] pl-3 pr-8 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer text-sm font-medium transition-all"
          >
            {countryCodes.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label} ({country.value})
              </option>
            ))}
          </select>
          {/* Seta customizada para o select */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>

        {/* Campo de Número */}
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Phone size={18} />
          </div>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => onChange(e.target.value)}
            placeholder={currentPlaceholder}
            className="w-full h-[50px] pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>
    </div>
  );
};