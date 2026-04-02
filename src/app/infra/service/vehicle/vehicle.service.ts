import { EditVehicleInput } from "../../hooks/vehicle/EditVehicleInput";
import { RegisterVehicleInput } from "../../hooks/vehicle/RegisterVehicleInput";
import { api } from "../api";
import { VehicleOutput } from "./VehicleOutput";

export namespace Vehicle {
    export const vehicle = {
        registerVehicle:  (input: RegisterVehicleInput) => {
            return api.post<void>('vehicle', input, {skipAuth: true});
        },

        editVehicle:  (id: string, input: EditVehicleInput) => {
            return api.patch<void>('vehicle/'+id, input, {skipAuth: true});
        },

        findAllVehicle: (id: string) => {
            return api.get<VehicleOutput[]>('vehicle/driver/all/'+id, {skipAuth: true});
        }

    }
}