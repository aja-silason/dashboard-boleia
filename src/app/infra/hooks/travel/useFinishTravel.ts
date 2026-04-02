import axios from "axios";
import { useState } from "react";
import { travel } from "../../service/travel/travel.service";

export const useFinishTravel = (travelId: string) => {    
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {

        try {

            setIsLoading(true)
            
            await travel.finish(travelId);

            setIsLoading(false)
            
        } catch (error) {
            setIsLoading(false)
            if(axios.isAxiosError(error)){
                if(error.status === 500) return alert("Alguma coisa correu mal, estamos resolvendo por você");
                if(error.status === 400) return alert(error.response?.data.message);
                if(error.status === 404) return alert(error.response?.data.message);   
            }
        }
    }

    return {
        handleSubmit,
        isLoading
    }

}