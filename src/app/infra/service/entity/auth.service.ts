import type { AtributePasswordInput } from "../../hooks/AtributePasswordInput"
import type { AuthInput } from "../../hooks/AuthInput"
import type { ChangePasswordInput } from "../../hooks/ChangePasswordInput"
import type { SignUpInput } from "../../hooks/SignUpInput"
import { api } from "../api"
import type { LoginOutput, UserOutput } from "./UserOutput"

export const auth = {

    login: (input: AuthInput) => {
        return api.post<LoginOutput>('auth/driver/signin', input)
    },

    signUp: (input: SignUpInput) => {
        return api.post<UserOutput>('driver', input)
    },

    changePassword: (input: ChangePasswordInput) => {
        return api.patch<boolean>('auth/driver/recovery-password', input)
    },

    atributePassword: (input: AtributePasswordInput) => {
        return api.patch<boolean>('auth/driver/atribute-password', input)
    }

}
