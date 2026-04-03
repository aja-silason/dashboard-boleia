import { useCallback, useState } from "react";
import type { VehicleOutput } from "../../service/vehicle/VehicleOutput";
import { vehicle } from "../../service/vehicle/vehicle.service";
import axios from "axios";

export const useGetAllVehicles = () => {
    const [data, setData] = useState<VehicleOutput[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const handleFetch = useCallback(async () => {

        try {
            
            setIsLoading(true);
            setIsError(false);

            const res = await vehicle.findAllVehicle();

            setData(res.data);

        } catch (error) {
            setIsError(true);
            console.error("Erro ao buscar viagens:", error);

            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "Não foi possível carregar os veiculos.";
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