import axios from "axios";
import { useState } from "react";
import { Alert, Keyboard } from "react-native";
import { Vehicle } from "../../service/vehicle/vehicle.service";
import { VehicleOutput } from "../../service/vehicle/VehicleOutput";
import { EditVehicleInput } from "./EditVehicleInput";

export const useEditVehicle = (vehicleData: VehicleOutput) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<EditVehicleInput>({plate: vehicleData.plate, model: vehicleData.model, color: vehicleData.color, brand: vehicleData.brand, seats: vehicleData.seats, serieYear: vehicleData.serieYear})
    
    const handleChange = (name: string, value: string) => {
        setData((prevState) => ({
            ...prevState, [name]: value
        }))
    }


    const handleSubmit = async () => {
        Keyboard.dismiss();
        
        try {
            setIsLoading(true)

            const payload: EditVehicleInput = {
                ...data,
            }

            await Vehicle.vehicle.editVehicle(vehicleData.id, payload);

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
        handleChange,
        handleSubmit,
        isLoading,
        data
    }

}