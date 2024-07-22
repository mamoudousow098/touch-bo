import { Account } from "./account"


export interface Fournisseur {
    codeFournisseur: string
    name: string
    createdAt: Date
    creditAccount: Account
    creditVolume: number
    creditFlux: number
}
