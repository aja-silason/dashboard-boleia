export interface TravelOutput {
    id: string,
    vehicleId: string,
    driverId: string,
    dateToTravel: string,
    status: string,
    price: number,
    valuePaid: number,
    origin: string,
    destiny: string,
    seats: string,
    availableSeats: string,
    availablePassangers: PassengerOutput[],
    pendingPassanger: PassengerOutput[],
    createdAt: string,
    updatedAt: string
}

export interface PassengerOutput{
    id: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    status: string,
    requestedAt: string
}


