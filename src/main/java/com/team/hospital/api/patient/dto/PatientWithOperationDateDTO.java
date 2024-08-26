package com.team.hospital.api.patient.dto;

import com.team.hospital.api.operation.dto.OperationDTO;
import com.team.hospital.api.operation.dto.OperationDateDTO;
import com.team.hospital.api.patient.Patient;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class PatientWithOperationDateDTO {

    private PatientDTO patientDTO;
    private List<OperationDateDTO> operationDateDTOs;
    private boolean checkListCreatedToday;

    public static PatientWithOperationDateDTO toEntity(Patient patient, List<OperationDTO> operationDTOs, boolean checkListCreatedToday) {
        PatientDTO patientDTO = PatientDTO.createPatientDTO(patient);
        List<OperationDateDTO> operationDateDTOs = operationDTOs.stream()
                .map(operationDTO -> OperationDateDTO.toEntity(operationDTO, patientDTO))
                .toList();

        return PatientWithOperationDateDTO.builder()
                .patientDTO(patientDTO)
                .operationDateDTOs(operationDateDTOs)
                .checkListCreatedToday(checkListCreatedToday)
                .build();
    }

}
