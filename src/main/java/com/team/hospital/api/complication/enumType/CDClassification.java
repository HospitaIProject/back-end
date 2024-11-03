package com.team.hospital.api.complication.enumType;

// Clavien-Dindo Classification
public enum CDClassification {
    I,      // 수술 후 정상 과정의 variation / 진통제, 해열제, 이뇨제 사용, simple dressing 허용.
    II,     // 수혈, TPN 을 포함한 pharmacological treatment 를 요하는 경우.
    IIIa,   // 수술, 내시경, 혹은 영상의학에서의 intervention 을 요하는 경우, 부분마취.
    IIIb,   // 수술, 내시경, 혹은 영상의학에서의 intervention 을 요하는 경우, 전신마취.
    IVa,    // ICU care 를 요하는 life-threatening complication, 단일장기 부전.
    IVb     // ICU care 를 요하는 life-threatening complication, 다장기 부전.
}
