package com.team.hospital.check.enumType;

import lombok.Getter;

@Getter
public enum Pod {
    POD_1("POD#1"),
    POD_2("POD#2"),
    POD_3("POD#3"),
    POD_4("POD#4"),
    AFTER_POD_5("POD#5 이후");

    private String desc;

    Pod(String desc) {
        this.desc = desc;
    }
}
