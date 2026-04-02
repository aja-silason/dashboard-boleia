import { RefreshCcw } from "lucide-react"

type props = {
    onClick: VoidFunction;
    isLoading: boolean;
}

export const RefreshButton = ({isLoading, onClick}: props) => {
    return (
        <button
          onClick={onClick}
           className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white mt-5 px-2 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
            <RefreshCcw size={18} />
            {isLoading ? 'Processando...' : 'Recarregar'}
          </button>
    )
}