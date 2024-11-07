package com.team.hospital.api.patient.dto;

import com.team.hospital.api.operation.dto.OpDtoString;
import com.team.hospital.api.patient.Patient;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class PatientWithOperationDateDTOString {

    private PatientDTO patientDTO;
    private List<OpDtoString> operationDateDTOs;   // 가장 최근 수술 이름.
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

    public static PatientWithOperationDateDTOString toEntity(Patient patient, List<OpDtoString> opDtoStrings, boolean checkListCreatedToday) {
        PatientDTO patientDTO = PatientDTO.toEntity(patient);
        return PatientWithOperationDateDTOString.builder()
                .patientDTO(patientDTO)
                .operationDateDTOs(opDtoStrings)
                .checkListCreatedToday(checkListCreatedToday)
                .build();
    }
}
