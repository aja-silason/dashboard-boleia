import { api } from "../api"
import type { DriverOuput } from "./UserOutput"

export const driver = {
    findAll: () => {
        return api.get<DriverOuput[]>('driver')
    },
    findById: (id: string) => {
        return api.get<DriverOuput>(`driver/${id}`)
    },
    findDriverByIdentificationNumber: (identificationNumber: string) => {
        return api.get<DriverOuput>(`driver/indentification-number/${identificationNumber}`)
    },
    findDriverByPhoneNumber: (phoneNumber: string) => {
        return api.get<DriverOuput>(`driver/phone-number?phoneNumber=${encodeURIComponent(phoneNumber)}`)
    },
}
