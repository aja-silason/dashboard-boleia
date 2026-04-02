import axios from "axios";
import { useCallback, useState } from "react";
import type { DriverOuput } from "../../service/entity/UserOutput";
import { driver } from "../../service/entity/driver.service";

export const useGetAllDrivers = () => {
    const [data, setData] = useState<DriverOuput[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const handleFetch = useCallback(async () => {

        try {
            
            setIsLoading(true);
            setIsError(false);

            const res = await driver.findAll();

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