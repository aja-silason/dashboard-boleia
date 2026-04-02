import { useAuthContext } from "@/app/shared/context/auth.context";
import axios from "axios";
import { useState } from "react";
import { Alert, Keyboard } from "react-native";
import { Travel } from "../../service/travel/travel.service";
import { ResgisterTravelInput } from "./RegisterTravelInput";

export const useCreateTravel = () => {
    const [data, setData] = useState<ResgisterTravelInput>({dateToTravel: "", destiny: "", driverId: "", origin: "", price: 0, seats: 0, vehicleId: ""});
    const [selectedVehicleId, setSelectedVehicleId] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [displayDate, setDisplayDate] = useState("");
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    
    const handleChange = (name: string, value: string) => {
        setData((prevState) => ({
            ...prevState, [name]: value
        }))
    }

    const {userInformation} = useAuthContext();

    const driverId = userInformation !== null ? userInformation.id : "N-D";

    const onDateSelected = (selectedDate: Date) => {
        const formattedToView = selectedDate.toLocaleString('pt-AO', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
        setDisplayDate(formattedToView);

        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const hours = String(selectedDate.getHours()).padStart(2, '0');
        const minutes = String(selectedDate.getMinutes()).padStart(2, '0');
        const seconds = "00";

        const isoDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;        
        handleChange("dateToTravel", isoDateTime);
    };

    const handleSubmit = async () => {
        Keyboard.dismiss();
        
        try {
            if (!selectedVehicleId) {
                return Alert.alert("Aviso", "Por favor, selecione um veículo.");
            }

            setIsLoading(true)
            setIsSuccess(false);
            
            const payload: ResgisterTravelInput = {
                ...data,
                price: +data.price,
                seats: +data.seats,
                vehicleId: selectedVehicleId,
                driverId: driverId
            }

            console.log(JSON.stringify(payload, null, 2))

            if(driverId === "N-D") return;

            console.log(JSON.stringify(payload, null, 2))
            
            await Travel.travel.register(payload);

            setIsSuccess(true);
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
        handleChange,
        setSelectedVehicleId,
        onDateSelected,
        selectedVehicleId,
        displayDate,
        isSuccess,
        isLoading
    }

}