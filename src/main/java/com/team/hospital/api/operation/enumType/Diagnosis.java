package com.team.hospital.api.operation.enumType;

public enum Diagnosis {

    ASCENDING_COLON(1),
    HF_COLON(2),
    T_COLON(3),
    SF_COLON(4),
    DS_COLON(5),
    SIGMOID_COLON(6),
    RS_COLON(7),
    RECTUM(8),
    CECUM(9),
    APPENDICEAL(10),
    ANUS(11);

    final int num;

    Diagnosis(int num) {
        this.num = num;
    }
}
