import axios from "axios";
import { useState, type FormEvent } from "react";
import type { SignUpInput } from "./SignUpInput";
import { auth } from "../service/entity/auth.service";

export const useCreateAccount = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [ddi, setDdi] = useState("+244");
    const [localPhone, setLocalPhone] = useState("");
    
    const formatPhoneNumber = (text: string) => {
        const cleaned = text.replace(/\D/g, "");
        let formatted = cleaned;
        if (cleaned.length > 3 && cleaned.length <= 6) {
            formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
        } else if (cleaned.length > 6) {
            formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 9)}`;
        }
        setLocalPhone(formatted);
    };

    const [data, setData] = useState<SignUpInput>({firstName: "", identificationNumber: "", isDriver: true, lastName: "", licenseNumber: "", password: "", phoneNumber: ""});

    const handleChange = (name: string, value: string) => {
        setData((prevState) => ({
            ...prevState, [name]: value
        }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const pureNumber = localPhone.replace(/-/g, "");
        if (pureNumber.length < 9) return alert("Número incompleto");
        
        const fullNumber = `${ddi}${pureNumber}`;

        const payload: SignUpInput = {
            ...data,
            isDriver: true,
            phoneNumber: fullNumber
        }

        try {
            setIsLoading(true);
            
            await auth.signUp(payload);

            setIsLoading(false);

        } catch (error) {
            setIsLoading(false);
            if(axios.isAxiosError(error)){
                if(error.status === 500) return alert("Alguma coisa correu mal, estamos resolvendo por você");
                if(error.status === 400) return alert(error.response?.data.message);
                if(error.status === 404) return alert(error.response?.data.message);
                if(error.status === 409) return alert(error.response?.data.message);
            }
        }

    }

    return {
        handleChange,
        handleSubmit,
        formatPhoneNumber,
        ddi,
        data,
        setDdi,
        setLocalPhone,
        isLoading,
    }


}