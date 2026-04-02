import type { ResgisterTravelInput } from "../../hooks/travel/RegisterTravelInput";
import type { RequestTravelInput } from "../../hooks/travel/RequestTravelInput";
import { api } from "../api";
import type { TravelOutput } from "./TravelOutput";

export const travel = {
    findAllTravel: () => {
        return api.get<TravelOutput[]>('travels');
    },

    findByTravelId: (id: string) => {
        return api.get<TravelOutput>('travels/'+id);
    },

    register: (input: ResgisterTravelInput) => {
        return api.post('travels', input);
    },

    accept: (input: RequestTravelInput) => {
        return api.patch('travels/request/approve', input);
    },

    refuse: (input: RequestTravelInput) => {
        return api.patch('travels/request/refuse', input);
    },

    start: (id: string) => {
        return api.patch('travels/'+ id +'/start');
    },

    finish: (id: string) => {
        return api.patch('travels/'+ id +'/finish');
    }
}