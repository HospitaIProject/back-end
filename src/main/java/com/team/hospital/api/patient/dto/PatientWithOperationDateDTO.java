package com.team.hospital.api.patient.dto;

import com.team.hospital.api.operation.dto.OperationDTO;
import com.team.hospital.api.operation.dto.OperationDateDTO;
import com.team.hospital.api.patient.Patient;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
public class PatientWithOperationDateDTO {

    private PatientDTO patientDTO;
    private List<OperationDateDTO> operationDateDTOs;

    public static PatientWithOperationDateDTO toEntity(Patient patient, List<OperationDTO> operationDTOs) {
        PatientDTO patientDTO = PatientDTO.createPatientDTO(patient);
        List<OperationDateDTO> operationDateDTOs = operationDTOs.stream()
                .map(OperationDateDTO::toEntity)
                .collect(Collectors.toList());

        return PatientWithOperationDateDTO.builder()
                .patientDTO(patientDTO)
                .operationDateDTOs(operationDateDTOs)
                .build();
    }

}
