import { Account } from "../interfaces/account";
import { AggregatorWholesaler } from "../interfaces/aggregator-wholesaler";
import {SimpleWholesaler} from "../interfaces/simple-wholesaler";
import {SimpleCategory} from "../interfaces/simple-category";

export class BaseSimpleCategory implements SimpleCategory {
    codeCategory: string;
    name: string;


    constructor(category: SimpleCategory) {
        this.codeCategory = category.codeCategory
        this.name = category.name

    }

}


