import { useCallback, useState } from "react";
import type { TravelOutput } from "../../service/travel/TravelOutput";
import axios from "axios";
import { travel } from "../../service/travel/travel.service";

export const useGetAllTravel = () => {
    const [data, setData] = useState<TravelOutput[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const handleFetch = useCallback(async () => {

        try {
            
            setIsLoading(true);
            setIsError(false);

            const res = await travel.findAllTravel();

            setData(res.data);

        } catch (error) {
            setIsError(true);
            console.error("Erro ao buscar viagens:", error);

            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "Não foi possível carregar as viagens.";
                alert(message);
            }
        } finally {
            setIsLoading(false);
        }

    }, []);

    return {
        data,
        isLoading,
        isError,
        handleFetch
    }

}