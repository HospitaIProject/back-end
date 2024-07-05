package com.team.hospital.api.operation.dto;

import com.team.hospital.api.checkList.enumType.BooleanOption;
import com.team.hospital.api.operation.enumType.ASAScore;
import com.team.hospital.api.operation.enumType.StomaFormation;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Getter
@Builder
public class RegisterOperation {

    private float height;

    private float weight;

    private float BMI;

    private ASAScore asaScore;      // 마취전 건강 상태 평가 점수

    private String location;        // 위치

    private String dignosis;        // 진단

    private Date opertationDate;    // 수술일

    private Date hospitalizedDate;  // 입원일

    private Date dischargedDate;    // 퇴원일

    private int totalHospitalizedDays;  // 총 재원일 수

    private String operationMethod;      // 수술 방법

    private String operationApproach;   // 수술 approach

    private StomaFormation stomaFormation;      // 장루 형성술

    private String AJCCStage;           // 암 진행도

    private int numberOfRetrievedLine;  // 제거된 림프절 개수

    private BooleanOption complicationOccurence;

    private String CDClassification;

    private BooleanOption reOperationWithIn30Days;

    private String reOperationCause;
}
