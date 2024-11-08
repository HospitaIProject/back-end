package com.team.hospital.api.operation.dto;

import com.team.hospital.api.patient.dto.PatientDTO;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Data
@ToString
public class OpDto {

    private Long operationId;

    private List<String> operationTypeNames;        // 수술 방법
//    private String operationTypeNames;        // 수술 방법

    private LocalDate operationDate;    // 수술일

    private LocalDate hospitalizedDate;  // 입원일

    private LocalDate dischargedDate;    // 퇴원일

    private LocalDateTime created_at;

    @Builder
    public OpDto(Long operationId, String operationTypeNames, LocalDate operationDate, LocalDate hospitalizedDate, LocalDate dischargedDate, LocalDateTime created_at) {
//        String result = String.join(", ", operationTypeNames);
        List<String> list;
        if (operationTypeNames!=null) {
            list = Arrays.asList(operationTypeNames.split(", "));

        } else {
            list = List.of("테스트", "수술", "입니다");
        }

        this.operationId = operationId;
        this.operationTypeNames = list;
        this.operationDate = operationDate;
        this.hospitalizedDate = hospitalizedDate;
        this.dischargedDate = dischargedDate;
        this.created_at = created_at;
    }

    public static OpDto toEntity(OpDto opDto, PatientDTO patientDTO) {
        String result = String.join(", ", opDto.getOperationTypeNames());
//        List<String> list = Arrays.asList(operationTypeNames.split(", "));
        OpDto.OpDtoBuilder builder = OpDto.builder();

        builder
                .operationId(opDto.getOperationId())
                .operationTypeNames(result)
                .operationDate(patientDTO.getOperationDate())
                .created_at(opDto.getCreated_at());

        if (patientDTO.getOperationDate() != null) builder.hospitalizedDate(patientDTO.getHospitalizedDate());
        if (patientDTO.getDischargedDate() != null) builder.hospitalizedDate(patientDTO.getDischargedDate());

        return builder.build();
    }
}
