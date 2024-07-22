import { ValidationStage } from "src/app/interface/validation-stage";
import { Agent } from "./agent";
import {SimpleAgent} from "./simple-agent";

export interface CreditRequest {
    token: string
    amount: number
    fees: number
    outstandingBalance: number
    recoveredAmount: number
    codeProduct:string
    status: string
    agent: SimpleAgent
    type: string
    createdAt: Date,
    validationStage: ValidationStage
    recoveryAmountByPeriod: number
    recoveryPeriodInDays: number
}


export interface CreditRequestExport {
    token: string
    externalReference: string
    amount: number
    fees: number
    outstandingBalance: number
    recoveredAmount: number
    status: string
    agent: Agent
    type: string
    createdAt: Date
}
