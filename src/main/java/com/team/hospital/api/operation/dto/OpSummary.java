package com.team.hospital.api.operation.dto;

import com.team.hospital.api.patient.dto.PatientDTO;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@ToString
public class OpSummary {

    private Long operationId;

    private String operationTypeNames;        // 수술 방법

    private LocalDate operationDate;    // 수술일

    private LocalDate hospitalizedDate;  // 입원일

    private LocalDate dischargedDate;    // 퇴원일

    private LocalDateTime created_at;

    public OpSummary(Long operationId, String operationTypeNames, LocalDate operationDate, LocalDate hospitalizedDate, LocalDate dischargedDate, LocalDateTime created_at) {
//        String result = String.join(", ", operationTypeNames);

        this.operationId = operationId;
        this.operationTypeNames = operationTypeNames;
        this.operationDate = operationDate;
        this.hospitalizedDate = hospitalizedDate;
        this.dischargedDate = dischargedDate;
        this.created_at = created_at;
    }

    public static OpSummary toEntity(OpDto opDto, PatientDTO patientDTO) {
        if (opDto == null) {
            return OpSummary.builder()
                    .operationDate(patientDTO.getOperationDate())
                    .hospitalizedDate(patientDTO.getHospitalizedDate())
                    .dischargedDate(patientDTO.getDischargedDate() != null ? patientDTO.getDischargedDate() : null)
                    .build();
        }
        String result = String.join(", ", opDto.getOperationTypeNames());
        return OpSummary.builder()
                .operationId(opDto.getOperationId())
                .operationTypeNames(result)
                .operationDate(patientDTO.getOperationDate())
                .hospitalizedDate(patientDTO.getHospitalizedDate())
                .dischargedDate(patientDTO.getDischargedDate() != null ? patientDTO.getDischargedDate() : null)
                .created_at(opDto.getCreated_at())
                .build();


    }
}
