package com.team.hospital.api.operation.dto;

import com.team.hospital.api.checkList.enumType.BooleanOption;
import com.team.hospital.api.operation.Operation;
import com.team.hospital.api.operation.enumType.OperationApproach;
import com.team.hospital.api.operation.enumType.OperationMethod;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
public class OperationDTO {

    private Long operationId;

    private List<OperationMethod> operationMethod;        // 수술 방법

    private List<String> customOperationMethod;           // 사용자 정의 수술 방법

    private OperationApproach operationApproach;            // 수술 approach

    private BooleanOption stomaFormation;               // 장루 형성술

    private LocalDateTime operationStartTime;     // 수술 시작 시간

    private LocalDateTime operationEndTime;     // 수술 시작 시간

    private int totalOperationTime;             // 전체 수술 시간 (분)

    private double totalFluidsAmount;             // 수술 중 총 들어간 수액( crystalloid) 양 (cc)

    private double bloodLoss;             // 수술 중 실혈양 (cc)

    public static OperationDTO toEntity(Operation operation){
        return OperationDTO.builder()
                .operationId(operation.getId())
                .operationMethod(operation.getOperationMethod())
                .customOperationMethod(operation.getCustomOperationMethod())
                .operationApproach(operation.getOperationApproach())
                .stomaFormation(operation.getStomaFormation())
                .operationStartTime(operation.getOperationStartTime())
                .operationEndTime(operation.getOperationEndTime())
                .totalOperationTime(operation.getTotalOperationTime())
                .totalFluidsAmount(operation.getTotalFluidsAmount())
                .bloodLoss(operation.getBloodLoss())
                .build();
    }

    public static List<OperationDTO> buildOperationDTOs(List<Operation> operations){
        return operations.stream()
                .map(OperationDTO::toEntity)
                .collect(Collectors.toList());
    }
}
