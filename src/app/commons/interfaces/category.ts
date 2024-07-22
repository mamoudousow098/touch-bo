import {Fournisseur} from "./suplier";


export interface Category {
    codeCategory: string
    name: string
    createdAt: Date
    fournisseur:Fournisseur
}
