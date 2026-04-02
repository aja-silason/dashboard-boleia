
import axios from "axios";
import { useState, type FormEvent } from "react";
import type { AtributePasswordInput } from "./AtributePasswordInput";
import { auth } from "../service/entity/auth.service";

type Props = {
    password: string;
    repeatPassword: string
    identificationNumber: string;
} 

export const useAtributePassword = () => {

    const [data, setData] = useState<Props>({identificationNumber: "", password: "", repeatPassword: ""});
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    

    const handleChange = (name: string, value: string) => {
        setData((prevState) => ({
            ...prevState, [name] : value
        }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if(data.password.length !== 6) return alert("A senha deve ter exatamente 6 caracteres.");

        if(data.password !== data.repeatPassword) return alert("Senha não coincidem, tente novamente");



        const payload: AtributePasswordInput = {
            indentificationNumber: data.identificationNumber,
            password: data.password
        }

        try {
            setIsLoading(true);

            await auth.atributePassword(payload);
            
            setIsSuccess(true);
            setIsLoading(false);

        } catch (error) {
            setIsLoading(false);
            setIsSuccess(false);
            if(axios.isAxiosError(error)){
                if(error.status === 500) return alert("Alguma coisa correu mal, estamos resolvendo por você");
                if(error.status === 400) return alert(error.response?.data.message);
                if(error.status === 404) return alert(error.response?.data.message);
            }
        }

    }

    return {
        handleSubmit,
        handleChange,
        isLoading,
        isSuccess,
        data
    }
}