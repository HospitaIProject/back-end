export type CheckListsItemType = {
    patientId: number;
    patientName: string;
    patientNumber: number;
    checkListId: number;
    createAt: string;
    updatedAt: string;

    explainBeforeOperation?: 'YES' | 'NO'; //EAS 수술전 설명
    takingONSBeforeOperationTwo_Hours?: 'YES' | 'NO'; //수술 2시간 전 ONS 복용여부
    takingAfterBowelPreparation?: 'YES' | 'NO'; //Bowel preparation 후 ONS 경장영양액 복용여부
    preventionDVT?: 'YES' | 'NO'; //DVT 예방
    takingLaxatives?: 'YES' | 'NO'; //Laxatives 복용
    chewingGum?: 'YES' | 'NO'; //Chewing gum
    dayOfRemoveJP_Drain?: 'POD_1' | 'POD_2' | 'POD_3' | 'POD_4' | 'AFTER_POD_5'; //JP Drain 제거일
    reasonByRemoveJP_DrainDelay?: 'YES' | 'NO'; //JP Drain 제거 지연 사유
    dayOfRemoveUrinary_Catheter?: 'YES' | 'NO'; //Urinary catheter 제거일
    reasonByRemoveUrinary_CatheterDelay?: 'YES' | 'NO'; //Urinary catheter 제거 지연 사유
    afterOperationLimitIV_Fluid?: 'YES' | 'NO'; //수술 후 IV fluid 제한
    dayOfRemoveIV_Fluid?: 'YES' | 'NO'; //IV fluid 제거일
    reasonByRemoveIV_FluidDelay?: 'YES' | 'NO'; //IV fluid 제거 지연 이유
    post_Nausea_Vomiting?: 'YES' | 'NO'; //Post OP Nausea & Vomiting prophylaxis
    postOpDayExercise?: 'YES' | 'NO'; //Post OP day 운동
    pod_1Exercise?: 'YES' | 'NO'; //POD#1 운동
    pod_2Exercise?: 'YES' | 'NO'; //POD#2 운동
    pod_3Exercise?: 'YES' | 'NO'; //POD#3 운동
    postOpDayMeal?: 'YES' | 'NO'; //Post OP day 식사
    pod_1Meal?: 'YES' | 'NO'; //POD#1 식사
    pod_2Meal?: 'YES' | 'NO'; //POD#2 식사
    beforeOperationMedicine?: 'YES' | 'NO'; //수술 전 통증 조절약
    silt_Itm?: string; //수술중 SILT or ITM
    postOpEffectivePainControl?: 'YES' | 'NO'; //Post op Effective pain control
    pod_1PainScore?: 'DAY' | 'EVENING' | 'NIGHT';
    pod_2PainScore?: 'DAY' | 'EVENING' | 'NIGHT';
    pod_3PainScore?: 'DAY' | 'EVENING' | 'NIGHT';
    beforeSixtyMinute?: 'YES' | 'NO'; //피부 절개 60분 전 예방적 항생제 투여
    maintainTemperature?: 'YES' | 'NO'; //수술 중 환자 체온 유지
    volumeOfIntraoperativeInfusion?: 'YES' | 'NO'; //Volume of intraoperative infusion (ml)
    bloodLoss?: number; //Blood loss (cc)
    urineOutput?: number; //Urine output (cc)
    operationTime?: number; //Operation time (min)
    hasPost_Nausea_Vomiting?: 'YES' | 'NO'; //Post OP Nausea & Vomiting prophylaxis 여부
    locate?: string; //입원병동

    //비고
    explainBeforeOperation_remark?: string;
    takingONSBeforeOperationTwo_Hours_remark?: string;
    takingAfterBowelPreparation_remark?: string;
    preventionDVT_remark?: string;
    takingLaxatives_remark?: string;
    chewingGum_remark?: string;
    dayOfRemoveJP_Drain_remark?: string;
    reasonByRemoveJP_DrainDelay_remark?: string;
    dayOfRemoveUrinary_Catheter_remark?: string;
    reasonByRemoveUrinary_CatheterDelay_remark?: string;
    afterOperationLimitIV_Fluid_remark?: string;
    dayOfRemoveIV_Fluid_remark?: string;
    reasonByRemoveIV_FluidDelay_remark?: string;
    post_Nausea_Vomiting_remark?: string;
    postOpDayExercise_remark?: string;
    pod_1Exercise_remark?: string;
    pod_2Exercise_remark?: string;
    pod_3Exercise_remark?: string;
    postOpDayMeal_remark?: string;
    pod_1Meal_remark?: string;
    pod_2Meal_remark?: string;
    beforeOperationMedicine_remark?: string;
    silt_Itm_remark?: string;
    postOpEffectivePainControl_remark?: string;
    pod_1PainScore_remark?: string;
    pod_2PainScore_remark?: string;
    pod_3PainScore_remark?: string;
    beforeSixtyMinute_remark?: string;
    maintainTemperature_remark?: string;
    volumeOfIntraoperativeInfusion_remark?: string;
    bloodLoss_remark?: string;
    urineOutput_remark?: string;
    operationTime_remark?: string;
    hasPost_Nausea_Vomiting_remark?: string;
    locate_remark?: string;
};
