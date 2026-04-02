import axios from "axios";
import { useState, type FormEvent } from "react";
import type { VehicleOutput } from "../../service/vehicle/VehicleOutput";
import type { EditVehicleInput } from "./EditVehicleInput";
import { vehicle } from "../../service/vehicle/vehicle.service";

export const useEditVehicle = (vehicleData: VehicleOutput) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<EditVehicleInput>({plate: vehicleData.plate, model: vehicleData.model, color: vehicleData.color, brand: vehicleData.brand, seats: vehicleData.seats, serieYear: vehicleData.serieYear})
    
    const handleChange = (name: string, value: string) => {
        setData((prevState) => ({
            ...prevState, [name]: value
        }))
    }


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        try {
            setIsLoading(true)

            const payload: EditVehicleInput = {
                ...data,
            }

            await vehicle.editVehicle(vehicleData.id, payload);

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
        handleChange,
        handleSubmit,
        isLoading,
        data
    }

}