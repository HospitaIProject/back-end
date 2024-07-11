export type OperationInfoFormType = {
    [key: string]:
        | 'ASA_I'
        | 'ASA_II'
        | 'ASA_III'
        | 'ASA_IV'
        | 'ASA_V'
        | 'ASA_VI'
        | 'COLOSTOMY'
        | 'IlEOSTOMY'
        | 'UROSTOMY'
        | 'GASTROSTOMY'
        | 'JEJUNOSTOMY'
        | 'YES'
        | 'NO'
        | ''
        | number
        | string
        | Date;

    height: number | '';
    weight: number | '';
    bmi: number | '';
    asaScore: 'ASA_I' | 'ASA_II' | 'ASA_III' | 'ASA_IV' | 'ASA_V' | 'ASA_VI' | '';
    location: string | '';
    dignosis: string | '';
    operationDate: Date | '';
    hospitalizedDate: Date | '';
    dischargedDate: Date | '';
    totalHospitalizedDays: number | '';
    operationMethod: string | '';
    operationApproach: string | '';
    stomaFormation: 'COLOSTOMY' | 'IlEOSTOMY' | 'UROSTOMY' | 'GASTROSTOMY' | 'JEJUNOSTOMY' | '';
    ajcCStage: string | '';
    numberOfRetrievedLine: number | '';
    complicationOccurence: 'YES' | 'NO' | '';
    cdClassification: string | '';
    reOperationWithIn30Days: 'YES' | 'NO' | '';
    reOperationCause: string | '';
}; //환자 수술정보 등록폼

export type OperationItemType = {
    operationId: number;
    height: number;
    weight: number;
    bmi: number;
    asaScore: 'ASA_I' | 'ASA_II' | 'ASA_III' | 'ASA_IV' | 'ASA_V' | 'ASA_VI';
    location: string;
    dignosis: string;
    operationDate: Date;
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
export type OperationComplianceType = {
    patientId: number;
    patientName: string;
    patientNumber: number;
    checkListId: number;
    createAt: string;
    updateAt: string;
};

//--------------------------------------------
export type TestOperationInfoFormType = {
    [key: string]: string | number;
    operationMethod: string | ''; //수술방법 //enum
    operationApproach: string | ''; //수술approach //enum
    stomaFormation: 'YES' | 'NO' | ''; //장루 조성술 여부
    operationStartTime: string | ''; //수술 시작 시간
    operationEndTime: string | ''; //수술 종료 시간
    totalOperationTime: number | ''; //전체 수술 시간 (분)
    totalFluidsAmount: number | ''; //수술 중 총 들어간 수액 양 (cc)
    bloodLoss: number | ''; //수술 중 실혈량 (cc)
}; //환자 수술정보 등록폼

export type TestOperationItemType = {
    id: number;

    operationMethod: string;
    operationApproach: string;
    stomaFormation: 'YES' | 'NO';
    operationStartTime: string;
    operationEndTime: string;
    totalOperationTime: number;
    totalFluidsAmount: number;
    bloodLoss: number;
};
