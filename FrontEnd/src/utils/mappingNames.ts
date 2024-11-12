export const CHECKLIST_ITEMS_NAME: {
    [key: string]: string;
} = {
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
    painControlMethod: '수술 중 통증 조절 종류',
    //-------------------------수술중

    antiNauseaPostOp: '수술 후 구역구토방지제 사용 여부',
    ivFluidRestrictionPostOp: '수술 후 IV fluid 제한',
    nonOpioidPainControl: '수술 후 non-opioid pain control 여부',
    jpDrainRemoval: '수술 후 1일이내 JP drain 제거 여부',
    catheterRemoval: '수술 후 수술장에서 소변줄 제거 여부',
    ivLineRemoval: '수술 후 3일이내 IV line 제거 여부',
    postExercise: 'Post OP day 운동',
    postMeal: 'Post OP day 식사',
    postPain: 'Post OP day 수술 후 통증',

    //-------------------------수술후
    gumChewing: '하루 3번 15분동안 껌씹기',
    giStimulant: '위장관 촉진약 복용 여부',
    podOneExercise: 'POD 1 day 운동',
    podTwoExercise: 'POD 2 day 운동',
    podThreeExercise: 'POD 3 day 운동',
    podOneMeal: 'POD 1 day 식사',
    podTwoMeal: 'POD 2 day 식사',
    podOnePain: 'POD 1 day 수술 후  통증',
    podTwoPain: 'POD 2 day 수술 후  통증',
    podThreePain: 'POD 3 day 수술 후 통증',
    podOneGumChewing: 'POD 1 day 껌씹기',

    //-------------------------데일리체크리스트

    podExercise: 'Post day 운동',
    podMeal: 'Post day 식사',
    podPain: '수술 후 통증',
    //*별도(모든 일일체크리스트를 통틀어)
};
interface ComplicationItems {
    [key: string]: string;
}

export const COMPLICATION_ITEMS_NAME: ComplicationItems = {
    anastomosisBleeding: 'Anastomosis bleeding',
    anastomosisLeakage: 'Anastomosis leakage',
    anastomosisStenosis: 'Anastomosis stenosis',
    organSpaceSsi: 'Organ/ Space SSI',

    ileus: 'Ileus',
    giBleeding: 'GI bleeding',
    bowelIschemia: 'Bowel ischemia',
    chyleAscites: 'Chyle ascites',
    additionalEnteritis: '그 외 enteritis',

    arrhythemia: 'Arrhythemia',
    coronaryIschemia: 'Coronary ischemia',
    dvt: 'DVT',
    pulmonaryEmbolism: 'Pulmonary embolism',
    phlebitis: 'Phlebitis',
    dic: 'DIC',

    atelectasis: 'Atelectasis',
    pneumothorax: 'Pneumothorax',
    pneumonia: 'Pneumonia',
    ards: 'ARDS',
    pleuralEffusion: 'Pleural effusion',

    urinaryDysfunctionRetension: 'Urinary dysfunction/retension',
    arf: 'ARF',
    bladderLeakage: 'Bladder leakage',

    superficialDeepSsi: 'Superficial/ Deep SSI',
    seroma: 'Seroma',
    stomaCx: 'Stoma CX',
    incisionalHernia: 'Incisional hernia',
};
