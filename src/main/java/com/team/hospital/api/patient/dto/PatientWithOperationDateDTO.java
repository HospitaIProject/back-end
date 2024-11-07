package com.team.hospital.api.patient.dto;

import com.team.hospital.api.operation.dto.OpDto;
import com.team.hospital.api.patient.Patient;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class PatientWithOperationDateDTO {

    private PatientDTO patientDTO;
    private List<OpDto> operationDateDTOs;   // 가장 최근 수술 이름.
    private boolean checkListCreatedToday;

//    public static PatientWithOperationDateDTO toEntity(Patient patient, List<OperationDTO> operationDTOs, boolean checkListCreatedToday) {
//        PatientDTO patientDTO = PatientDTO.createPatientDTO(patient);
//        List<OperationDateDTO> operationDateDTOs = operationDTOs.stream()
//                .map(operationDTO -> OperationDateDTO.toEntity(operationDTO, patientDTO))
//                .toList();
//
//        return PatientWithOperationDateDTO.builder()
//                .patientDTO(patientDTO)
//                .operationDateDTOs(operationDateDTOs)
//                .checkListCreatedToday(checkListCreatedToday)
//                .build();
//    }

    public static PatientWithOperationDateDTO toEntity(Patient patient, List<OpDto> opDtos, boolean checkListCreatedToday) {
        PatientDTO patientDTO = PatientDTO.toEntity(patient);
        return PatientWithOperationDateDTO.builder()
                .patientDTO(patientDTO)
                .operationDateDTOs(opDtos)
                .checkListCreatedToday(checkListCreatedToday)
                .build();
    }


}
