export type PatientFormType = {
    [key: string]: string | number | Date;
    patientNumber: number | '';
    name: string;
    sex: 'MALE' | 'FEMALE' | '';
    birthday: Date | '';
}; //환자 정보 등록폼

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

//--------------------------------------------
export type TestPatientFormType = {
    [key: string]: string | number | Date;
    patientNumber: number | ''; //등록번호
    name: 'MALE' | 'FEMALE'; //환자이름
    sex: string | ``; //성별
    age: number | ``; //나이
    height: number | ``; //키(cm)
    weight: number; //몸무게(kg)
    bmi: number; //BMI(kg/cm^2)
    asaScore: 'ASA_I' | 'ASA_II' | 'ASA_III' | 'ASA_IV' | 'ASA_V' | 'ASA_VI' | ''; //ASA score
    location: string; //위치            //enum
    dignosis: string; //진단명          //enum
    operationDate: string; //수술일
    hospitalizedDate: string; //입원일
    dischargedDate: string; //퇴원일
    totalHospitalizedDays: number; //총 재원 일수(일)
};
export type TestPatientWithOperationDtoType = {
    checkListCreatedToday: boolean;
    patientDTO: {
        id: number; // 환자ID
        patientNumber: number; // 환자번호
        name: string; // 이름
        sex: 'MALE' | 'FEMALE'; // 성별
        age: string; // 나이
    };
    operationDateDTOs: {
        operationId: number; // 수술ID
        operationMethod: string; // 수술명
        operationDate: string; // 수술일자
        hospitalizedDate: string; // 입원일자
        dischargedDate: string; // 퇴원일자
    }[];
};
