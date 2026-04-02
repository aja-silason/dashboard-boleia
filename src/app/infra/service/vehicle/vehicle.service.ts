import type { EditVehicleInput } from "../../hooks/vehicle/EditVehicleInput";
import type { RegisterVehicleInput } from "../../hooks/vehicle/RegisterVehicleInput";
import { api } from "../api";
import type { VehicleOutput } from "./VehicleOutput";

export const vehicle = {
    registerVehicle:  (input: RegisterVehicleInput) => {
        return api.post<void>('vehicle', input);
    },

    editVehicle:  (id: string, input: EditVehicleInput) => {
        return api.patch<void>('vehicle/'+id, input);
    },

    findAllVehicle: () => {
        return api.get<VehicleOutput[]>('vehicle');
    }

}