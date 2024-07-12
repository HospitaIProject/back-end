package com.team.hospital.api.operation.dto;

import com.team.hospital.api.operation.enumType.OperationMethod;
import com.team.hospital.api.patient.Patient;
import com.team.hospital.api.patient.dto.PatientDTO;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Getter
@Builder
public class OperationDateDTO {

    private Long operationId;

    private List<OperationMethod> operationMethod;        // 수술 방법

    private Date operationDate;    // 수술일

    private Date hospitalizedDate;  // 입원일

    private Date dischargedDate;    // 퇴원일

    public static OperationDateDTO toEntity(OperationDTO operationDTO, PatientDTO patientDTO) {
        return OperationDateDTO.builder()
                .operationId(operationDTO.getOperationId())
                .operationMethod(operationDTO.getOperationMethod())
                .operationDate(patientDTO.getOperationDate())
                .hospitalizedDate(patientDTO.getHospitalizedDate())
                .dischargedDate(patientDTO.getDischargedDate())
                .build();
    }
}
