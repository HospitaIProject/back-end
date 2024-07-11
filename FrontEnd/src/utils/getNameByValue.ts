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
export function getValueLabel({ value, type }: { value: string; type: 'location' | 'dignosis' }) {
    let item = '';
    if (type === 'location') {
        item = MATCH_PATIENT_ITEMS[value as keyof typeof MATCH_PATIENT_ITEMS];
    }

    return item;
}
