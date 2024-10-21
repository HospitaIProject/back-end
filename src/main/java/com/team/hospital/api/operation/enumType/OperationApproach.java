package com.team.hospital.api.operation.enumType;

public enum OperationApproach {

    OPEN(1),
    LAPAROSCOPIC_MULTIPORT(2),
    LAPAROSCOPIC_SINGLEPORT(3),
    ROBOTIC_MULTIPORT(4),
    ROBOTIC_SINGLEPORT(5),
    OPEN_CONVERSION(6);

    final int num;
    OperationApproach(final int num) {
        this.num = num;
    }

    public int getNum() {
        return num;
    }
}
