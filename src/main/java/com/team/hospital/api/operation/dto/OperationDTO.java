package com.team.hospital.api.operation.dto;

import com.team.hospital.api.checkList.dto.ComplianceScoreDTO;
import com.team.hospital.api.checkList.enumType.BooleanOption;
import com.team.hospital.api.operation.Operation;
import com.team.hospital.api.operation.enumType.OperationApproach;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Getter
@Builder
public class OperationDTO {

    private Long operationId;

    private List<String> operationTypeNames;        // 수술 방법

    private OperationApproach operationApproach;            // 수술 approach

    private BooleanOption stomaFormation;               // 장루 형성술

    private LocalDateTime operationStartTime;     // 수술 시작 시간

    private LocalDateTime operationEndTime;     // 수술 시작 시간

    private int totalOperationTime;             // 전체 수술 시간 (분)

    private double totalFluidsAmount;             // 수술 중 총 들어간 수액( crystalloid) 양 (cc)

    private double bloodLoss;             // 수술 중 실혈양 (cc)

    private BooleanOption complicationStatus;        // 합병증 여부

    private boolean complicationRegistered;

    private double complicationScore;

    private ComplianceScoreDTO complianceScoreDTO;

    public static OperationDTO toEntity(Operation operation) {
        List<String> list;

        if (operation.getOperationNames() != null) {
            list = Arrays.asList(operation.getOperationNames().split(", "));
        } else {
            list = List.of();
        }


        return OperationDTO.builder()
                .operationId(operation.getId())
                .operationTypeNames(list)
                .operationApproach(operation.getOperationApproach())
                .stomaFormation(operation.getStomaFormation())
                .operationStartTime(operation.getOperationStartTime())
                .operationEndTime(operation.getOperationEndTime())
                .totalOperationTime(operation.getTotalOperationTime())
                .totalFluidsAmount(operation.getTotalFluidsAmount())
                .bloodLoss(operation.getBloodLoss())
                .complicationStatus(operation.getComplicationStatus())
                .build();
    }

    public static OperationDTO toEntity(Operation operation, boolean complicationRegistered, double complicationScore, ComplianceScoreDTO complianceScoreDTO) {
//        List<String> operationTypeNames = operation.getOperationMethods().stream()
//                .map(OperationMethod::getOperationType)
//                .map(OperationType::getName)
//                .toList();

        List<String> list;
        if (operation.getOperationNames() != null) {
            list = Arrays.asList(operation.getOperationNames().split(", "));
        } else {
            list = List.of();
        }

        return OperationDTO.builder()
                .operationId(operation.getId())
                .operationTypeNames(list)
                .operationApproach(operation.getOperationApproach())
                .stomaFormation(operation.getStomaFormation())
                .operationStartTime(operation.getOperationStartTime())
                .operationEndTime(operation.getOperationEndTime())
                .totalOperationTime(operation.getTotalOperationTime())
                .totalFluidsAmount(operation.getTotalFluidsAmount())
                .bloodLoss(operation.getBloodLoss())
                .complicationStatus(operation.getComplicationStatus())

                .complicationRegistered(complicationRegistered)
                .complicationScore(complicationScore)
                .complianceScoreDTO(complianceScoreDTO)

                .build();
    }

}
