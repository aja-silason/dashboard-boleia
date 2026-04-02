import { RootStackParamList } from "@/app/shared/route";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Alert, Keyboard } from "react-native";
import { OTPNotification } from "../service/entity/otpnotification.service";
import { VerifyOTP } from "./VerifyOTP";

export const useValidOTP = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();


    const onSubmit = async (code: string, phoneNumber: string) => {
        Keyboard.dismiss();
        const payload: VerifyOTP = {
            phoneNumber: phoneNumber,
            otp: code
        }

        try {

            setIsLoading(true);
            const res = await OTPNotification.otpNotification.verifyOtp(payload);

            setIsLoading(false);
            if(res?.status === 200 || res?.status === 201 ) return navigate.replace("typepassword", {identificationNumber: phoneNumber});

        } catch (error) {
            setIsLoading(false);

            if(axios.isAxiosError(error)){
                if(error.status === 500) return Alert.alert("Aviso", "Alguma coisa correu mal, estamos resolvendo por você", [
                    {
                        text: "Entendido",
                        onPress: () => {}
                    }
                ]);

                if(error.status === 400) return Alert.alert("Informação", error.response?.data.message);
                
                if(error.status === 404) return Alert.alert("Informação", error.response?.data.message);
            }
        }
        return;
    }

    return {
        isLoading,
        onSubmit
    }

}