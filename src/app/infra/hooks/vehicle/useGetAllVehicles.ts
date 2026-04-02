import { useAuthContext } from "@/app/shared/context/auth.context";
import axios from "axios";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { Vehicle } from "../../service/vehicle/vehicle.service";
import { VehicleOutput } from "../../service/vehicle/VehicleOutput";

export const useGetAllVehicles = () => {
    const [data, setData] = useState<VehicleOutput[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const {userInformation} = useAuthContext();

    const driverId = userInformation != null ? userInformation?.id : "N-D";

    const handleFetch = useCallback(async () => {

        try {
            
            setIsLoading(true);
            setIsError(false);

            if(driverId === "N-D") return;

            const res = await Vehicle.vehicle.findAllVehicle(driverId);

            setData(res.data);

        } catch (error) {
            setIsError(true);
            console.error("Erro ao buscar viagens:", error);

            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "Não foi possível carregar as viagens.";
                Alert.alert("Aviso", message);
            }
        } finally {
            setIsLoading(false);
        }

    }, [driverId]);

    return {
        data,
        isLoading,
        isError,
        handleFetch
    }
}