package com.team.hospital.api.checkList.enumType;

public enum BooleanOption {
    YES(1), NO(2);

    final int num;
    BooleanOption(final int num) {
        this.num = num;
    }

    public int getNum() {
        return num;
    }
}
