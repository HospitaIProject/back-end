export type SurgeryType = {
    operationId: number;
    height: number;
    weight: number;
    bmi: number;
    asaScore: 'ASA_I' | 'ASA_II' | 'ASA_III' | 'ASA_IV' | 'ASA_V' | 'ASA_VI';
    location: string;
    dignosis: string;
    opertationDate: Date;
    hospitalizedDate: Date;
    dischargedDate: Date;
    totalHospitalizedDays: number;
    operationMethod: string;
    operationApproach: string;
    stomaFormation: 'COLOSTOMY' | 'IlEOSTOMY' | 'UROSTOMY' | 'GASTROSTOMY' | 'JEJUNOSTOMY';
    ajcCStage: string;
    numberOfRetrievedLine: number;
    complicationOccurence: 'YES' | 'NO';
    cdClassification: string;
    reOperationWithIn30Days: 'YES' | 'NO';
    reOperationCause: string;
};
export type SurgeryComplianceType = {
    patientId: number;
    patientName: string;
    patientNumber: number;
    checkListId: number;
    createAt: string;
    updateAt: string;
};