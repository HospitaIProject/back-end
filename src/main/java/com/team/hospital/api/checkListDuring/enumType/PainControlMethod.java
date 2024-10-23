package com.team.hospital.api.checkListDuring.enumType;

import lombok.Getter;

@Getter
public enum PainControlMethod {
    TAPB(1),
    WI(2),
    ITM(3),
    OTHER(4);

    final int num;

    PainControlMethod(final int num) {
        this.num = num;
    }

}
