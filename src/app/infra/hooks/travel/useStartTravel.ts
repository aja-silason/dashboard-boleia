import axios from "axios";
import { useState } from "react";
import { Alert } from "react-native";
import { Travel } from "../../service/travel/travel.service";

export const useStartTravel = (travelId: string) => {    
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {

        try {

            setIsLoading(true)
            
            await Travel.travel.start(travelId);

            setIsLoading(false)
            
        } catch (error) {
            setIsLoading(false)
            if(axios.isAxiosError(error)){
                if(error.status === 500) return Alert.alert("Aviso", "Alguma coisa correu mal, estamos resolvendo por você", [
                    {text: "Entendido", onPress: () => {}}
                ]);
                if(error.status === 400) return Alert.alert("Informação", error.response?.data.message);
                if(error.status === 404) return Alert.alert("Informação", error.response?.data.message);   
            }
        }
    }

    return {
        handleSubmit,
        isLoading
    }

}