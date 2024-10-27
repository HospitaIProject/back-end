package com.team.hospital.api.patient.enumType;

import lombok.Getter;

@Getter
public enum SearchType {
    PATIENT_NAME,       // 환자 이름
    PATIENT_NUMBER,     // 환자 번호
    OPERATION_METHOD    // 수술명
}
