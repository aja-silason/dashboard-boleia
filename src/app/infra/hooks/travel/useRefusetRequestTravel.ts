import { useAuthContext } from "@/app/shared/context/auth.context";
import axios from "axios";
import { useState } from "react";
import { Alert, Keyboard } from "react-native";
import { Travel } from "../../service/travel/travel.service";
import { RequestTravelInput } from "./RequestTravelInput";

export const useRefusetRequestTravel = (travelId: string, passangerId: string) => {
    
    const [isLoading, setIsLoading] = useState(false);

    const {userInformation} = useAuthContext();

    const driverId = userInformation !== null ? userInformation.id : "N-D";

    const handleSubmit = async () => {
        Keyboard.dismiss();
        
        try {

            setIsLoading(true)
            
            const payload: RequestTravelInput = {
                passangerId: passangerId,
                travelId: travelId
            }

            console.log(JSON.stringify(payload, null, 2))

            if(driverId === "N-D") return;

            console.log(JSON.stringify(payload, null, 2))
            
            await Travel.travel.refuse(payload);

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