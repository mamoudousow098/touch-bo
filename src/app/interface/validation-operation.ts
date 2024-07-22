import { ValidationStage } from "./validation-stage";

export interface ValidationOperation {

    createdAt: Date,
    user: string,
    description: string,
    status: string,
    validationStage: ValidationStage
}
