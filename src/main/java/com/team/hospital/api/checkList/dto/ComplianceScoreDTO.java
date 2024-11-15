package com.team.hospital.api.checkList.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ComplianceScoreDTO {
    private int totalCheckListCompleted;
    private int totalCheckListCount;
    private double compliancePercentage;
}
