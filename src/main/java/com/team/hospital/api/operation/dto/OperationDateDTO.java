package com.team.hospital.api.operation.dto;

import com.team.hospital.api.patient.dto.PatientDTO;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
public class OperationDateDTO {

    private Long operationId;

    private List<String> operationTypeNames;        // 수술 방법

    private LocalDate operationDate;    // 수술일

    private LocalDate hospitalizedDate;  // 입원일

    private LocalDate dischargedDate;    // 퇴원일

    public static OperationDateDTO toEntity(OperationDTO operationDTO, PatientDTO patientDTO) {
        List<String> operationTypeNames = operationDTO.getOperationTypeNames();


        OperationDateDTOBuilder builder = OperationDateDTO.builder();

        builder
                .operationId(operationDTO.getOperationId())
                .operationTypeNames(operationTypeNames)
                .operationDate(patientDTO.getOperationDate());

        if (patientDTO.getOperationDate() != null) {
            builder.hospitalizedDate(patientDTO.getHospitalizedDate());
        }
        if (patientDTO.getDischargedDate() != null) {
            builder.hospitalizedDate(patientDTO.getDischargedDate());
        }

        return builder.build();
    }
}
