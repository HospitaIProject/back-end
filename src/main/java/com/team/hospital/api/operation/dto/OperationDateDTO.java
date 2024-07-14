package com.team.hospital.api.operation.dto;

import com.team.hospital.api.operation.enumType.OperationMethod;
import com.team.hospital.api.patient.dto.PatientDTO;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
public class OperationDateDTO {

    private Long operationId;

    private List<OperationMethod> operationMethod;        // 수술 방법

    private List<String> customOperationMethod;

    private LocalDate operationDate;    // 수술일

    private LocalDate hospitalizedDate;  // 입원일

    private LocalDate dischargedDate;    // 퇴원일

    public static OperationDateDTO toEntity(OperationDTO operationDTO, PatientDTO patientDTO) {
        return OperationDateDTO.builder()
                .operationId(operationDTO.getOperationId())
                .operationMethod(operationDTO.getOperationMethod())
                .customOperationMethod(operationDTO.getCustomOperationMethod())
                .operationDate(patientDTO.getOperationDate())
                .hospitalizedDate(patientDTO.getHospitalizedDate())
                .dischargedDate(patientDTO.getDischargedDate())
                .build();
    }
}
