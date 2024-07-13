const MATCH_ITEMS = {
    COLOSTOMY: 'Colostomy',
    IlEOSTOMY: 'Ileostomy',
    UROSTOMY: 'Urostomy',
    GASTROSTOMY: 'Gastrostomy',
    JEJUNOSTOMY: 'Jejunostomy',
};

export function getNameByValue(value: string) {
    const item = MATCH_ITEMS[value as keyof typeof MATCH_ITEMS];
    return item;
}

const MATCH_PATIENT_ITEMS = {
    RT_SIDED_COLON: 'Rt. sided colon',
    LT_SIDED_COLON: 'Lt. sided colon',
    RECTUM: 'Rectum',
    MULTIPLE: 'Multiple',
    //location
    ASCENDING_COLON: 'Ascending colon',
    HF_COLON: 'HF colon',
    T_COLON: 'T colon',
    SF_COLON: 'SF colon',
    DS_COLON: 'DS colon',
    SIGMOID_COLON: 'Sigmoid colon',
    RS_COLON: 'RS colon',
    CECUM: 'Cecum',
    // *RECTUM: 'Rectum', 겹침*
    APPENDICEAL: 'Appendiceal',
    ANUS: 'Anus',
    //dignosis
};
const MATCH_OPETATION_ITEMS = {
    RHC_ERHC: 'RHC,ERHC',
    T_COLECTOMY: 'T-colectomy',
    LHC_ELHC: 'LHC,ELHC',
    AR: 'AR',
    LAR: 'LAR',
    ISR: 'ISR',
    APR: 'APR',
    SUBTOTAL_TOTAL_COLECTOMY: 'Subtotal, Total colectomy',
    TOTAL_PROCTOCOLECTOMY: 'Total Proctocolectomy',
    //-------------------------수술방법
    OPEN: 'Open',
    LAPAROSCOPIC_MULTIPORT: 'Laparoscopic_multiport',
    LAPAROSCOPIC_SINGLEPORT: 'Laparoscopic_Singleport',
    ROBOTIC_MULTIPORT: 'Robotic_multiport',
    ROBOTIC_SINGLEPORT: 'Robotic_Singleport',
    OPEN_CONVERSION: 'Open_Conversion',
};
const MATCH_CHECKLISTSETUP_ITEMS = {
    explainedPreOp: 'EAS 수술전 설명',
    onsPreOp2hr: '수술 2시간 전 ONS 복용여부',
    onsPostBowelPrep: 'Bowel preparation 후 경장영양액 복용여부',
    dvtPrevention: 'DVT 예방',
    antibioticPreIncision: '피부 절개 60분 전 예방적 항생제 투여',
    painMedPreOp: '수술전 통증 조절약 복용 여부',
    //-------------------------수술전

    maintainTemp: '수술 중 환자 체온 유지',
    fluidRestriction: '수술 중 수액  2-4cc/kg/hr 으로 제한',
    antiNausea: '수술 중 구역구토 방지제 사용 여부',
    painControl: '수술 중 통증 조절을 위한 처치 여부',
    //-------------------------수술당일

    giStimulant: ' 위장관 촉진 약 복용',
    gumChewing: '하루 3번 15분동안 껌씹기',
    antiNauseaPostOp: '수술 후 구역구토방지제 사용 여부',
    ivFluidRestrictionPostOp: '수술 후 IV fluid 제한',
    nonOpioidPainControl: '수술 후 non-opioid pain control 여부',
    jpDrainRemoval: '수술 후 3일이내 JP drain 제거 여부',
    catheterRemoval: '수술 후 수술장에서 소변줄 제거 여부',
    ivLineRemoval: '수술 후 3일이내 IV line 제거 여부',
    podExercise: 'Post day 운동',
    podMeal: 'Post day 식사',
    podPain: '수술 후 통증',
    //-------------------------수술후
};

export function getValueLabel({
    value,
    type,
}: {
    value: string | '';
    type: 'patient' | 'operation' | 'checkListSetup';
}) {
    let item = '';
    if (type === 'patient') {
        item = MATCH_PATIENT_ITEMS[value as keyof typeof MATCH_PATIENT_ITEMS];
    } else if (type === 'operation') {
        item = MATCH_OPETATION_ITEMS[value as keyof typeof MATCH_OPETATION_ITEMS];
    } else if (type === 'checkListSetup') {
        item = MATCH_CHECKLISTSETUP_ITEMS[value as keyof typeof MATCH_CHECKLISTSETUP_ITEMS];
    }
    if (!item) {
        item = value;
    }

    return item;
}
