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
    approveDriver: (id: string) => {
        return api.patch<DriverOuput>(`driver/${id}/approve`)
    },
    declineDriver: (id: string) => {
        return api.patch<DriverOuput>(`driver/${id}/decline`)
    },
    banDriver: (id: string) => {
        return api.patch<DriverOuput>(`driver/${id}/ban`)
    },
}
