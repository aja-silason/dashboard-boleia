import axios from "axios";
import { useState } from "react";
import { driver } from "../../service/entity/driver.service";

export const useDeclineDriver = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (id: string) => {

        try {
            setIsLoading(true);
            await driver.declineDriver(id);
            setIsLoading(true);

        } catch (error) {

            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "Não foi possível carregar as viagens.";
                alert(message);
            }
        } finally {
            setIsLoading(false);
        }

    }

    return {
        isLoading,
        handleSubmit
    }

}