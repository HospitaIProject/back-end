package com.team.hospital.api.operation.enumType;

public enum Location {
    RT_SIDED_COLON(1),
    LT_SIDED_COLON(2),
    RECTUM(3),
    MULTIPLE(4);

    final int num;
    Location(final int num) {
        this.num = num;
    }

}
