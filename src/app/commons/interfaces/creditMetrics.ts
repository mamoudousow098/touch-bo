import { CreditRequestType } from "../enums/CreditRequestType";

export interface CreditMetrics {
    flux: number;
    volume: number;
    type: CreditRequestType;
}
