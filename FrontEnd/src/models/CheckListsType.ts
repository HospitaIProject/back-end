export type CheckListSetupType = {
    [key: string]: number | undefined | boolean | string;
    checkListItemId?: number;
    operationMethod?: string;

    explainedPreOp: boolean; // EAS 수술전 설명
    onsPreOp2hr: boolean; // 수술 2시간 전 ONS 복용여부
    onsPostBowelPrep: boolean; // Bowel preparation 후 경장영양액 복용여부
    dvtPrevention: boolean; // DVT 예방
    antibioticPreIncision: boolean; // 피부 절개 60분 전 예방적 항생제 투여
    painMedPreOp: boolean; // 수술전 통증 조절약 복용 여부
    //-------------------------수술전

    maintainTemp: boolean; // 수술 중 환자 체온 유지
    fluidRestriction: boolean; //수술 중 수액  2-4cc/kg/hr 으로 제한
    antiNausea: boolean; //수술 중 구역구토 방지제 사용 여부
    painControl: boolean; //수술 중 통증 조절을 위한 처치 여부
    //-------------------------수술당일

    giStimulant: boolean; //위장관 촉진 약 복용
    gumChewing: boolean; //하루 3번 15분동안 껌씹기
    antiNauseaPostOp: boolean; //수술 후 구역구토방지제 사용 여부
    ivFluidRestrictionPostOp: boolean; //수술 후 IV fluid 제한
    nonOpioidPainControl: boolean; //수술 후 non-opioid pain control 여부
    jpDrainRemoval: boolean; //수술 후 3일이내 JP drain 제거 여부
    catheterRemoval: boolean; //수술 후 수술장에서 소변줄 제거 여부
    ivLineRemoval: boolean; //수술 후 3일이내 IV line 제거 여부
    podExercise: boolean; //Post OP day 운동, POD 1day 운동, POD 2day 운동, POD 3day 운동
    podMeal: boolean; //Post OP day 식사, POD 1day 식사, POD 2day 식사, POD 3day 식사
    podPain: boolean; //수술 후 통증
};
export const CHECKLIST_SECTION_KEYS = {
    PREV: [
        'explainedPreOp',
        'onsPreOp2hr',
        'onsPostBowelPrep',
        'dvtPrevention',
        'antibioticPreIncision',
        'painMedPreOp',
    ],
    TODAY: ['maintainTemp', 'fluidRestriction', 'antiNausea', 'painControl'],

    POST: [
        'giStimulant',
        'gumChewing',
        'antiNauseaPostOp',
        'ivFluidRestrictionPostOp',
        'nonOpioidPainControl',
        'jpDrainRemoval',
        'catheterRemoval',
        'ivLineRemoval',
        'podExercise',
        'podMeal',
        'podPain',
    ],
};
type PostPainType = {
    day: number | '';
    evening: number | '';
    night: number | '';
};
export type checkListFormType = {
    [key: string]: 'YES' | 'NO' | '' | number | string | Date | undefined | PostPainType;

    explainedPreOp?: 'YES' | 'NO' | ''; // EAS 수술전 설명
    onsPreOp2hr?: 'YES' | 'NO' | ''; // 수술 2시간 전 ONS 복용여부
    onsPostBowelPrep?: 'YES' | 'NO' | ''; // Bowel preparation 후 ONS 경장영양액 복용여부
    dvtPrevention?: 'YES' | 'NO' | ''; // DVT 예방
    antibioticPreIncision?: 'YES' | 'NO' | ''; // 피부 절개 60분 전 예방적 항생제 투여
    painMedPreOp?: 'YES' | 'NO' | ''; // 수술 전 통증 조절약
    //-------------------------수술전

    maintainTemp?: 'YES' | 'NO' | ''; // 수술 중 환자 체온 유지
    fluidRestriction?: 'YES' | 'NO' | ''; //수술 중 수액  2-4cc/kg/hr 으로 제한 *별도 수치 디스플레이 필요
    antiNausea?: 'YES' | 'NO' | ''; //수술 중 구역구토 방지제 사용 여부
    painControl?: 'YES' | 'NO' | ''; //수술 중 통증 조절을 위한 처치 여부
    //-------------------------수술당일

    giStimulant?: 'YES' | 'NO' | ''; //위장관 촉진 약 복용
    gumChewing?: 'YES' | 'NO' | ''; //하루 3번 15분동안 껌씹기
    antiNauseaPostOp?: 'YES' | 'NO' | ''; //수술 후 구역구토방지제 사용 여부
    ivFluidRestrictionPostOp?: 'YES' | 'NO' | ''; //수술 후 IV fluid 제한
    nonOpioidPainControl?: 'YES' | 'NO' | ''; //수술 후 non-opioid pain control 여부
    jpDrainRemoval?: 'YES' | 'NO' | ''; //수술 후 3일이내 JP drain 제거 여부
    jpDrainRemovalDate?: Date | ''; //제거한날 기입 *비고
    catheterRemoval?: 'YES' | 'NO' | ''; //수술 후 수술장에서 소변줄 제거 여부
    catheterRemovalDate?: Date | ''; //제거한날 기입
    catheterReInsertion?: 'YES' | 'NO' | ''; //Foley cath 재삽입 여부
    ivLineRemoval?: 'YES' | 'NO' | ''; //수술 후 3일이내 IV line 제거 여부
    ivLineRemovalDate?: Date | ''; //제거한날 기입

    //-----------------비고
    explainedPreOp_remarks?: string;
    onsPreOp2hr_remarks?: string;
    onsPostBowelPrep_remarks?: string;
    dvtPrevention_remarks?: string;
    antibioticPreIncision_remarks?: string;
    painMedPreOp_remarks?: string;

    maintainTemp_remarks?: string;
    fluidRestriction_remarks?: string;
    antiNausea_remarks?: string;
    painControl_remarks?: string;

    giStimulant_remarks?: string;
    gumChewing_remarks?: string;
    antiNauseaPostOp_remarks?: string;
    ivFluidRestrictionPostOp_remarks?: string;
    nonOpioidPainControl_remarks?: string;
    jpDrainRemoval_remarks?: string;
    catheterRemoval_remarks?: string;
    ivLineRemoval_remarks?: string;
}; // 체크리스트 폼

export type DailyCheckListFormType = {
    [key: string]: 'YES' | 'NO' | '' | number | string | PostPainType | Date | undefined;
    postExercise?: 'YES' | 'NO' | ''; //Post OP day 운동
    podOneExercise?: 'YES' | 'NO' | ''; //POD 1day 운동
    podTwoExercise?: 'YES' | 'NO' | ''; //POD 2day 운동
    podThreeExercise?: 'YES' | 'NO' | ''; //POD 3day 운동
    postMeal?: 'YES' | 'NO' | ''; //Post OP day 식사
    podOneMeal?: 'YES' | 'NO' | ''; //POD 1day 식사
    podTwoMeal?: 'YES' | 'NO' | ''; //POD 2day 식사
    postPain?: PostPainType; //수술 후 통증
    podOnePain?: PostPainType; //POD 1day 통증
    podTwoPain?: PostPainType; //POD 2day 통증
    podThreePain?: PostPainType; //POD 3day 통증

    postExercise_remarks?: string;
    podOneExercise_remarks?: string;
    podTwoExercise_remarks?: string;
    podThreeExercise_remarks?: string;
    postMeal_remarks?: string;
    podOneMeal_remarks?: string;
    podTwoMeal_remarks?: string;

    dayOfCheckList?: Date;
}; //데일리 체크리스트 폼

export type CheckListsBeforeItemType = {
    patientId: number;
    patientName: string;
    patientNumber: number;
    checkListBeforeId: number;
    createAt: string;
    updatedAt: string;

    explainedPreOp?: 'YES' | 'NO';
    onsPreOp2hr?: 'YES' | 'NO';
    onsPostBowelPrep?: 'YES' | 'NO';
    dvtPrevention?: 'YES' | 'NO';
    antibioticPreIncision?: 'YES' | 'NO';
    painMedPreOp?: 'YES' | 'NO';

    explainedPreOp_remarks?: string;
    onsPreOp2hr_remarks?: string;
    onsPostBowelPrep_remarks?: string;
    dvtPrevention_remarks?: string;
    antibioticPreIncision_remarks?: string;
    painMedPreOp_remarks?: string;
    //-------------------------수술전
};
export type CheckListsDuringItemType = {
    patientId: number;
    patientName: string;
    patientNumber: number;
    checkListDuringId: number;
    createAt: string;
    updatedAt: string;

    maintainTemp?: 'YES' | 'NO';
    fluidRestriction?: 'YES' | 'NO';
    antiNausea?: 'YES' | 'NO';
    painControl?: 'YES' | 'NO';

    maintainTemp_remarks?: string;
    fluidRestriction_remarks?: string;
    antiNausea_remarks?: string;
    painControl_remarks?: string;

    //-------------------------수술당일
};

export type CheckListsAfterItemType = {
    patientId: number;
    patientName: string;
    patientNumber: number;
    checkListAfterId: number;
    createAt: string;
    updatedAt: string;

    giStimulant?: 'YES' | 'NO';
    gumChewing?: 'YES' | 'NO';
    antiNauseaPostOp?: 'YES' | 'NO';
    ivFluidRestrictionPostOp?: 'YES' | 'NO'; //수술 후 IV fluid 제한
    nonOpioidPainControl?: 'YES' | 'NO'; //수술 후 non-opioid pain control 여부
    jpDrainRemoval?: 'YES' | 'NO'; //수술 후 3일이내 JP drain 제거 여부
    jpDrainRemovalDate?: Date; //제거한날 기입 *비고
    catheterRemoval?: 'YES' | 'NO'; //수술 후 수술장에서 소변줄 제거 여부
    catheterRemovalDate?: Date; //제거한날 기입
    catheterReInsertion?: 'YES' | 'NO'; //Foley cath 재삽입 여부
    ivLineRemoval?: 'YES' | 'NO'; //수술 후 3일이내 IV line 제거 여부
    ivLineRemovalDate?: Date; //제거한날 기입

    giStimulant_remarks?: string;
    gumChewing_remarks?: string;
    antiNauseaPostOp_remarks?: string;
    ivFluidRestrictionPostOp_remarks?: string;
    nonOpioidPainControl_remarks?: string;
    jpDrainRemoval_remarks?: string;
    catheterRemoval_remarks?: string;
    ivLineRemoval_remarks?: string;
};
export type CheckListsDailyItemType = {
    patientId: number;
    patientName: string;
    patientNumber: number;
    checkListId: number;
    createAt: string;
    updatedAt: string;

    postExercise?: 'YES' | 'NO'; //Post OP day 운동
    podOneExercise?: 'YES' | 'NO'; //POD 1day 운동
    podTwoExercise?: 'YES' | 'NO'; //POD 2day 운동
    podThreeExercise?: 'YES' | 'NO'; //POD 3day 운동
    postMeal?: 'YES' | 'NO'; //Post OP day 식사
    podOneMeal?: 'YES' | 'NO'; //POD 1day 식사
    podTwoMeal?: 'YES' | 'NO'; //POD 2day 식사
    postPain?: PostPainType; //수술 후 통증
    podOnePain?: PostPainType; //POD 1day 통증
    podTwoPain?: PostPainType; //POD 2day 통증
    podThreePain?: PostPainType; //POD 3day 통증

    postExercise_remarks?: string;
    podOneExercise_remarks?: string;
    podTwoExercise_remarks?: string;
    podThreeExercise_remarks?: string;
    postMeal_remarks?: string;
    podOneMeal_remarks?: string;
    podTwoMeal_remarks?: string;
};

export type ResponseCheckListsType = {
    checkListBeforeDTO?: CheckListsBeforeItemType;
    checkListDuringDTO?: CheckListsDuringItemType;
    checkListAfterDTO?: CheckListsAfterItemType;
    checkListDTOs?: CheckListsDailyItemType[];
    checkListCreatedToday: boolean;
    operationDateDTO: {
        operationId: number;
        operationMethod: string[];
        customOperationMethod: string[];
        operationDate: string;
        hospitalizedDate: string;
        dischargedDate: string;
    };
}; // 체크리스트 응답
