import { useState, type FormEvent } from "react";
import type { AuthInput } from "./AuthInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../shared/context/auth.context";
import { auth } from "../service/entity/auth.service";

export const useAuth = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [ddi, setDdi] = useState("+244");
    const [localPhone, setLocalPhone] = useState("");
    const [data, setData] = useState<AuthInput>({phoneNumber: "", password: ""});

    const {addUserInformation} = useAuthContext();

    const navigate = useNavigate();

    const handleChange = (name: string, value: string) => {
        setData((prevState) => ({
            ...prevState, [name]: value
        }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const pureNumber = localPhone.replace(/-/g, "");
            if (pureNumber.length < 9) return alert("Número incompleto");
        
        const fullNumber = `${ddi}${pureNumber}`;
        
        const payload: AuthInput = {
            phoneNumber: fullNumber,
            password: data.password
        }

        try {

            setIsLoading(true)

            const res = await auth.login(payload);

            addUserInformation(res.data);

            setIsLoading(false);

            localStorage.setItem('yhameNaKuHanna', 'henGa');
            if(res?.status === 200 || res?.status === 201 ) return navigate("/", {replace: true});
            
        } catch (error) {

            setIsLoading(false);

            if(axios.isAxiosError(error)){
                if(error.status === 500) return alert("Alguma coisa correu mal, estamos resolvendo por você");

                if(error.status === 400) return alert(error.response?.data.message);
                
                if(error.status === 404) return alert(error.response?.data.message);
            }
            
        }

    }

    return {
        isLoading,
        handleChange,
        handleSubmit,
        setDdi,
        setLocalPhone,
        localPhone,
        ddi
    }

}