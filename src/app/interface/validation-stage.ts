export interface ValidationStage {

    profil : string,
    description : string,
    previousStage : string,
    antecedentStage : string,
    codeWholesaler: string,
    codeValidationStage: string
}

export interface ValidationStageStore {

    profil : string,
    description : string,
    previousValidationStageCode : string,
    antecedentValidationStageCode : string,
    wholesalerCode: string,
    codeValidationStage: string
}

export interface ValidationStageUpdate {

    profil : string,
    description : string,
    previousValidtionStageCode : string,
    antecedentValidationStageCode : string,
    
}
