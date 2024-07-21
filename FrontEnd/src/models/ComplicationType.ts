type CdClassType = 'I' | 'II' | 'IIIa' | 'IIIb' | 'IVa' | 'IVb' | '';
type CustomType = {
    complicationName: string;
    cdClassification: CdClassType;
    //추가적으로 타입이 들어올수 있음.
};
export type ComplicationFormType = {
    [key: string]: CdClassType | CustomType | CustomType[] | string | undefined | number;

    // [문합부 관련]
    anastomosisBleeding: CdClassType; // Anastomosis bleeding
    anastomosisLeakage: CdClassType; // Anastomosis leakage
    anastomosisStenosis: CdClassType; // Anastomosis stenosis
    organSpaceSsi: CdClassType; // Organ/ Space SSI

    // [소화기계]
    ileus: CdClassType; // Ileus
    giBleeding: CdClassType; // GI bleeding
    bowelIschemia: CdClassType; // Bowel ischemia
    chyleAscites: CdClassType; // Chyle ascites
    additionalEnteritis: CdClassType; // 그 외 enteritis

    // [심혈관계]
    arrhythemia: CdClassType; // Arrhythemia
    coronaryIschemia: CdClassType; // Coronary ischemia
    dvt: CdClassType; // DVT
    pulmonaryEmbolism: CdClassType; // Pulmonary embolism
    phlebitis: CdClassType; // Phlebitis
    dic: CdClassType; // DIC

    // [호흡기계]
    atelectasis: CdClassType; // Atelectasis
    pneumothorax: CdClassType; // Pneumothorax
    pneumonia: CdClassType; // Pneumonia
    ards: CdClassType; // ARDS
    pleuralEffusion: CdClassType; // Pleural effusion

    // [비뇨생식기계]
    urinaryDysfunctionRetension: CdClassType; // Urinary dysfunction/retension
    arf: CdClassType; // ARF
    bladderLeakage: CdClassType; // Bladder leakage

    // [피부창상관련]
    superficialDeepSsi: CdClassType; // Superficial/ Deep SSI
    seroma: CdClassType; // Seroma
    stomaCx: CdClassType; // Stoma CX
    incisionalHernia: CdClassType; // Incisional hernia
    // Complications: {
    //     complicationName: string;
    //     cdClassification: CdClassType;
    //     //추가적으로 타입이 들어올수 있음.
    // };

    customComplications: CustomType[];
    remarks: string;
    score?: number;
};
