
import {SimpleSupplier} from "../interfaces/simple_suppliers";

export class BaseSimpleSupplier implements SimpleSupplier {
    codeFournisseur: string;
    name: string;


    constructor(fournisseur: SimpleSupplier) {
        this.codeFournisseur = fournisseur.codeFournisseur
        this.name = fournisseur.name

    }

}


