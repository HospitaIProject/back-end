package com.team.hospital.api.operation.dto;

import com.team.hospital.api.checkList.enumType.BooleanOption;
import com.team.hospital.api.operation.enumType.OperationApproach;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class WriteOperation {

    private List<String> operationTypeNames;        // 수술 방법

    private OperationApproach operationApproach;    // 수술 approach

    private BooleanOption stomaFormation;            // 장루 형성술

    private LocalDateTime operationStartTime;     // 수술 시작 시간

    private LocalDateTime operationEndTime;     // 수술 시작 시간

    private int totalOperationTime;             // 전체 수술 시간 (분)

    private double totalFluidsAmount;             // 수술 중 총 들어간 수액( crystalloid) 양 (cc)

    private double bloodLoss;             // 수술 중 실혈양 (cc)

}
