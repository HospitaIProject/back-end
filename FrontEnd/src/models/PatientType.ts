//--------------------------------------------

type AsaScoreType = 'ASA_I' | 'ASA_II' | 'ASA_III' | 'ASA_IV' | 'ASA_V' | 'ASA_VI' | '';
type LocationType = 'RT_SIDED_COLON' | 'LT_SIDED_COLON' | 'RECTUM' | 'MULTIPLE' | '';
type DignosisType =
    | 'ASCENDING_COLON'
    | 'HF_COLON'
    | 'T_COLON'
    | 'SF_COLON'
    | 'DS_COLON'
    | 'SIGMOID_COLON'
    | 'RS_COLON'
    | 'RECTUM'
    | 'CECUM'
    | 'APPENDICEAL'
    | 'ANUS'
    | '';
export type PatientFormType = {
    [key: string]: string | number | Date;
    patientNumber: number | ''; //등록번호
    name: 'MALE' | 'FEMALE' | ''; //환자이름
    sex: string | ''; //성별
    age: number | ''; //나이
    height: number | ''; //키(cm)
    weight: number | ''; //몸무게(kg)
    bmi: number | ''; //BMI(kg/cm^2)
    asaScore: AsaScoreType; //ASA score
    location: LocationType; //위치            //enum
    dignosis: DignosisType; //진단명          //enum
    operationDate: string | ''; //수술일
    hospitalizedDate: string | ''; //입원일
    dischargedDate: string | ''; //퇴원일
    totalHospitalizedDays: number | ''; //총 재원 일수(일)
};

export type PatientWithOperationDtoType = {
    checkListCreatedToday: boolean;
    patientDTO: {
        id: number; // 환자ID
        patientNumber: number; // 환자번호
        name: string; // 이름
        sex: 'MALE' | 'FEMALE'; // 성별
        age: number; // 나이
        height: number; // 키
        weight: number; // 몸무게
        bmi: number; // BMI
        asaScore: AsaScoreType; // ASA score
        location: LocationType; // 위치
        dignosis: DignosisType; // 진단명
        operationDate: string; // 수술일
        hospitalizedDate: string; // 입원일
        dischargedDate: string; // 퇴원일
        totalHospitalizedDays: number; // 총 재원 일수
    };
    operationDateDTOs: {
        operationId: number; // 수술ID
        operationMethod: string; // 수술명
        operationDate: string; // 수술일자
        hospitalizedDate: string; // 입원일자
        dischargedDate: string; // 퇴원일자
    }[];
};
