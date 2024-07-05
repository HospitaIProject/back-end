package com.team.hospital.api.patient.dto;

import com.team.hospital.api.operation.dto.OperationDateDTO;
import com.team.hospital.api.patient.Patient;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class PatientWithOperationDateDTO {

    private PatientDTO patientDTO;
    private List<OperationDateDTO> operationDTOs;

    public static PatientWithOperationDateDTO toEntity(Patient patient, List<OperationDateDTO> operationDTOs) {
        return PatientWithOperationDateDTO.builder()
                .patientDTO(PatientDTO.toEntity(patient))
                .operationDTOs(operationDTOs).build();
    }

}
