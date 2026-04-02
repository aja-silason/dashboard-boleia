import axios from "axios";
import { useState, type FormEvent } from "react";
import type { RegisterVehicleInput } from "./RegisterVehicleInput";
import { driver } from "../../service/entity/driver.service";
import { vehicle } from "../../service/vehicle/vehicle.service";

export const useRegisterVehicle = (phoneNumber: string) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<RegisterVehicleInput>({idDriver: "", plate: "", model: "", color: "", brand: "", seats: "", serieYear: ""})
    
    const handleChange = (name: string, value: string) => {
        setData((prevState) => ({
            ...prevState, [name]: value
        }))
    }

    console.log(phoneNumber)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        try {
            setIsLoading(true)

            const out = await driver.findDriverByPhoneNumber(phoneNumber);

            const driverId = out?.data?.id;

            const payload: RegisterVehicleInput = {
                ...data,
                idDriver: driverId
            }

            await vehicle.registerVehicle(payload);

            setIsLoading(false)
            
        } catch (error) {
            setIsLoading(false)
            if(axios.isAxiosError(error)){
                if(error.status === 500) return alert("Alguma coisa correu mal, estamos resolvendo por você");
                if(error.status === 400) return alert(error.response?.data.message);
                if(error.status === 404) return alert(error.response?.data.message);   
            }
            return;
        }

    }

    return {
        handleChange,
        handleSubmit,
        isLoading,
        data
    }

}