
import {Fournisseur} from "./suplier";
import {Category} from "./category";
import {Media} from "./media";

export interface Product {
    codeProduct: string
    name:  string
    price: number
    medias: Media[]
    fournisseur: Fournisseur
    category: Category
    description: string
    createdAt: Date
    codeCategory : string
}
