import { CreditMetrics } from "./creditMetrics";

export interface SystemFlux {

    systemBalance : number;
    overdraft: CreditMetrics;
    nanoCredit: CreditMetrics;
}
