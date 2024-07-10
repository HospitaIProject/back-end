export type PatientType = {
    createdAt: Date;
    updatedAt: Date;
    id: number;
    patientNumber: number | '';
    name: string | '';
    sex: 'MALE' | 'FEMALE' | '';
    birthday: Date | '';
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
};

export type PatientWithOperationDtoType = {
    checkListCreatedToday: boolean;
    patientDTO: {
        patientId: number; // 환자ID
        patientNumber: number; // 환자번호
        name: string; // 이름
        sex: 'MALE' | 'FEMALE'; // 성별
        birthday: string; // 생년월일
    };
    operationDateDTOs: {
        operationId: number; // 수술ID
        operationMethod: string; // 수술명
        operationDate: string; // 수술일자
        hospitalizedDate: string; // 입원일자
        dischargedDate: string; // 퇴원일자
    }[];
};
