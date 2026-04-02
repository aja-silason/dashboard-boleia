export interface UserOutput {
    id: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    identificationNumber: string,
    licenseNumber: string,
    status: string
}

export type DriverOuput = {
  id: string,
  identificationNumber: string,
  licenseNumber: string,
  status: string,
  user: {
    id: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    isDriver: boolean,
    createdAt: string,
    updatedAt: string
  },
  createdAt: string,
  updatedAt: string
}

export interface LoginOutput {
  id: string;
  firstName: string,
  lastName: string,
  phoneNumber: string,
  identificationNumber: string,
  licenseNumber: string,
  status: string,
  userWillBeSignedUntil: string,
}