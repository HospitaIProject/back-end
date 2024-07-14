export type ComplianceValuesType = {
    [key: string]:
        | 'YES'
        | 'NO'
        | ''
        | 'POD_1'
        | 'POD_2'
        | 'POD_3'
        | 'POD_4'
        | 'AFTER_POD_5'
        | 'DAY'
        | 'EVENING'
        | 'NIGHT'
        | number
        | string
        | ''
        | undefined;
    patientId?: number;
    patientName?: string;
    patientNumber?: number;
    checkListId?: number;
    createAt?: string;
    updatedAt?: string;

    explainBeforeOperation?: 'YES' | 'NO' | ''; //EAS 수술전 설명
    takingONSBeforeOperationTwo_Hours?: 'YES' | 'NO' | ''; //수술 2시간 전 ONS 복용여부
    takingAfterBowelPreparation?: 'YES' | 'NO' | ''; //Bowel preparation 후 ONS 경장영양액 복용여부
    preventionDVT?: 'YES' | 'NO' | ''; //DVT 예방
    takingLaxatives?: 'YES' | 'NO' | ''; //Laxatives 복용
    chewingGum?: 'YES' | 'NO' | ''; //Chewing gum
    dayOfRemoveJP_Drain?: 'POD_1' | 'POD_2' | 'POD_3' | 'POD_4' | 'AFTER_POD_5' | ''; //JP Drain 제거일
    reasonByRemoveJP_DrainDelay?: 'YES' | 'NO' | ''; //JP Drain 제거 지연 사유
    dayOfRemoveUrinary_Catheter?: 'YES' | 'NO' | ''; //Urinary catheter 제거일
    reasonByRemoveUrinary_CatheterDelay?: 'YES' | 'NO' | ''; //Urinary catheter 제거 지연 사유
    afterOperationLimitIV_Fluid?: 'YES' | 'NO' | ''; //수술 후 IV fluid 제한
    dayOfRemoveIV_Fluid?: 'YES' | 'NO' | ''; //IV fluid 제거일
    reasonByRemoveIV_FluidDelay?: 'YES' | 'NO' | ''; //IV fluid 제거 지연 이유
    post_Nausea_Vomiting?: 'YES' | 'NO' | ''; //Post OP Nausea & Vomiting prophylaxis
    postOpDayExercise?: 'YES' | 'NO' | ''; //Post OP day 운동
    pod_Exercise?: 'YES' | 'NO' | ''; //POD# 운동
    postOpDayMeal?: 'YES' | 'NO' | ''; //Post OP day 식사
    pod_Meal?: 'YES' | 'NO' | ''; //POD# 식사
    beforeOperationMedicine?: 'YES' | 'NO' | ''; //수술 전 통증 조절약
    silt_Itm?: string | ''; //수술중 SILT or ITM
    postOpEffectivePainControl?: 'YES' | 'NO' | ''; //Post op Effective pain control
    pod_PainScore?: 'DAY' | 'EVENING' | 'NIGHT' | '';
    beforeSixtyMinute?: 'YES' | 'NO' | ''; //피부 절개 60분 전 예방적 항생제 투여
    maintainTemperature?: 'YES' | 'NO' | ''; //수술 중 환자 체온 유지
    volumeOfIntraoperativeInfusion?: 'YES' | 'NO' | ''; //Volume of intraoperative infusion (ml)
    bloodLoss?: number | ''; //Blood loss (cc)
    urineOutput?: number | ''; //Urine output (cc)
    operationTime?: number | ''; //Operation time (min)
    hasPost_Nausea_Vomiting?: 'YES' | 'NO' | ''; //Post OP Nausea & Vomiting prophylaxis 여부
    locate?: string | ''; //입원병동

    //비고
    explainBeforeOperation_remark?: string | '';
    takingONSBeforeOperationTwo_Hours_remark?: string | '';
    takingAfterBowelPreparation_remark?: string | '';
    preventionDVT_remark?: string | '';
    takingLaxatives_remark?: string | '';
    chewingGum_remark?: string | '';
    dayOfRemoveJP_Drain_remark?: string | '';
    reasonByRemoveJP_DrainDelay_remark?: string | '';
    dayOfRemoveUrinary_Catheter_remark?: string | '';
    reasonByRemoveUrinary_CatheterDelay_remark?: string | '';
    afterOperationLimitIV_Fluid_remark?: string | '';
    dayOfRemoveIV_Fluid_remark?: string | '';
    reasonByRemoveIV_FluidDelay_remark?: string | '';
    post_Nausea_Vomiting_remark?: string | '';
    postOpDayExercise_remark?: string | '';
    pod_Exercise_remark?: string | '';
    postOpDayMeal_remark?: string | '';
    pod_Meal_remark?: string | '';
    beforeOperationMedicine_remark?: string | '';
    silt_Itm_remark?: string | '';
    postOpEffectivePainControl_remark?: string | '';
    pod_PainScore_remark?: string | '';
    beforeSixtyMinute_remark?: string | '';
    maintainTemperature_remark?: string | '';
    volumeOfIntraoperativeInfusion_remark?: string | '';
    bloodLoss_remark?: string | '';
    urineOutput_remark?: string | '';
    operationTime_remark?: string | '';
    hasPost_Nausea_Vomiting_remark?: string | '';
    locate_remark?: string | '';
};
export type ResponseComplianceType = {
    checkListDTOs: ComplianceValuesType[];
    operationDateDTO: {
        operationId: number;
        operationMethod: string;
        operationDate: string;
        hospitalizedDate: string;
        dischargedDate: string;
    };
    checkListCreatedToday: boolean;
};

export type NewSurgeryInfoValuesType = {
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
}; //환자 등록폼

export type NewPatientValuesType = {
    [key: string]: string | number | Date;
    patientNumber: number | '';
    name: string;
    sex: 'MALE' | 'FEMALE' | '';
    birthday: Date | '';
};

export type CheckListSetupDaySectionType = {
    [key: string]: boolean | number | undefined;
    checkListItemId?: number;
    explainBeforeOperation: boolean; // EAS 수술전 설명
    takingONSBeforeOperationTwo_Hours: boolean; // 수술 2시간 전 ONS 복용여부
    takingAfterBowelPreparation: boolean; // Bowel preparation 후 ONS 경장영양액 복용여부
    takingLaxatives: boolean; // Laxatives 복용
    beforeOperationMedicine: boolean; // 수술 전 통증 조절약
    beforeSixtyMinute: boolean; // 피부 절개 60분 전 예방적 항생제 투여
    //수술전

    silt_Itm: boolean; // 수술중 SILT or ITM
    maintainTemperature: boolean; // 수술 중 환자 체온 유지
    volumeOfIntraoperativeInfusion: boolean; // Volume of intraoperative infusion (ml)
    bloodLoss: boolean; // Blood loss (cc)
    urineOutput: boolean; // Urine output (cc)
    operationTime: boolean; // Operation time (min)
    //수술당일

    preventionDVT: boolean; // DVT 예방
    chewingGum: boolean; // Chewing gum
    dayOfRemoveJP_Drain: boolean; // JP Drain 제거일
    reasonByRemoveJP_DrainDelay: boolean; // JP Drain 제거 지연 사유
    dayOfRemoveUrinary_Catheter: boolean; // Urinary catheter 제거일
    reasonByRemoveUrinary_CatheterDelay: boolean; // Urinary catheter 제거 지연 사유
    afterOperationLimitIV_Fluid: boolean; // 수술 후 IV fluid 제한
    dayOfRemoveIV_Fluid: boolean; // IV fluid 제거일
    reasonByRemoveIV_FluidDelay: boolean; // IV fluid 제거 지연 이유
    post_Nausea_Vomiting: boolean; // Post OP Nausea & Vomiting prophylaxis
    postOpDayExercise: boolean; // Post OP day 운동
    pod_Exercise: boolean; // POD# 운동
    postOpDayMeal: boolean; // Post OP day 식사
    pod_Meal: boolean; // POD# 식사
    postOpEffectivePainControl: boolean; // Post op Effective pain control
    pod_PainScore: boolean; // POD# pain score
    hasPost_Nausea_Vomiting: boolean; // Post OP Nausea & Vomiting prophylaxis 여부

    locate: boolean; // 입원병동
    //수술후
};
export const CHECKLIST_SECTION_KEYS = {
    PREV: [
        'explainBeforeOperation',
        'takingONSBeforeOperationTwo_Hours',
        'takingAfterBowelPreparation',
        'takingLaxatives',
        'beforeOperationMedicine',
        'beforeSixtyMinute',
    ],
    TODAY: [
        'silt_Itm',
        'maintainTemperature',
        'volumeOfIntraoperativeInfusion',
        'bloodLoss',
        'urineOutput',
        'operationTime',
    ],

    POST: [
        'chewingGum',
        'preventionDVT',
        'dayOfRemoveJP_Drain',
        'reasonByRemoveJP_DrainDelay',
        'dayOfRemoveUrinary_Catheter',
        'reasonByRemoveUrinary_CatheterDelay',
        'afterOperationLimitIV_Fluid',
        'dayOfRemoveIV_Fluid',
        'reasonByRemoveIV_FluidDelay',
        'post_Nausea_Vomiting',
        'postOpDayExercise',
        'pod_Exercise',
        'postOpDayMeal',
        'pod_Meal',
        'postOpEffectivePainControl',
        'pod_PainScore',
        'hasPost_Nausea_Vomiting',
        'locate',
    ],
};
