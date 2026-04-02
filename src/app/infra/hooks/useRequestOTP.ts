import { RootStackParamList } from "@/app/shared/route";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Alert, Keyboard } from "react-native";
import { OTPNotification } from "../service/entity/otpnotification.service";

export const useRequestOTP = () => {
    const [ddi, setDdi] = useState("+244");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [localPhone, setLocalPhone] = useState("");
    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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

    const onSubmit = async () => {
        Keyboard.dismiss();
        const pureNumber = localPhone.replace(/-/g, "");
        if (pureNumber.length < 9) return Alert.alert("Aviso", "Número incompleto", [
            {
                text: "Inserir número",
                onPress: () => {}
            }
        ]);
        
        const fullNumber = `${ddi}${pureNumber}`;
        
        try {
            setIsLoading(true)
            await OTPNotification.otpNotification.requestOTP(fullNumber);
            setIsLoading(false);
            return navigate.replace("optrecovery", { phone: fullNumber });
        } catch (error) {
            console.log("Mapeamento do erro no request otp", error)
            setIsLoading(false);
            Alert.alert("Informação", "Alguma coisa ocorreu mal, estamos resolvendo por você!", [
                {
                    text: "Entendido",
                    onPress: () => setIsLoading(false)
                }
            ]);
            setIsLoading(false);
        }
    };


    const onRetryRequest = async () => {
        try {
            setIsLoading(true)
                await OTPNotification.otpNotification.requestOTP(localPhone);
            setIsLoading(false);
            return
        } catch (error) {
            console.log("Mapeamento do erro no request otp", error)
            setIsLoading(false);
            Alert.alert("Informação", "Alguma coisa ocorreu mal, estamos resolvendo por você!", [
                {
                    text: "Entendido",
                    onPress: () => setIsLoading(false)
                }
            ]);
        }
    };

    return { ddi, setDdi, localPhone, setLocalPhone, formatPhoneNumber, onSubmit, onRetryRequest, isLoading}
};