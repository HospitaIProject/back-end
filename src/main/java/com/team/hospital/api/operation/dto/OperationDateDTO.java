package com.team.hospital.api.operation.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Getter
@Builder
public class OperationDateDTO {

    private Long operationId;

    private String operationMethod;      // 수술 방법

    private Date operationDate;    // 수술일

    private Date hospitalizedDate;  // 입원일

    private Date dischargedDate;    // 퇴원일

    public static OperationDateDTO toEntity(OperationDTO operationDTO) {
        return OperationDateDTO.builder()
                .operationId(operationDTO.getOperationId())
                .operationMethod(operationDTO.getOperationMethod())
                .operationDate(operationDTO.getOperationDate())
                .hospitalizedDate(operationDTO.getHospitalizedDate())
                .dischargedDate(operationDTO.getDischargedDate())
                .build();
    }
}
