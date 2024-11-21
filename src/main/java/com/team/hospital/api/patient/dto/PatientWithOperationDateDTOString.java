package com.team.hospital.api.patient.dto;

import com.team.hospital.api.operation.dto.OpDtoString;
import com.team.hospital.api.patient.Patient;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PatientWithOperationDateDTOString {

    private PatientDTO patientDTO;
    private OpDtoString operationDateDTO;   // 가장 최근 수술 이름.
    private boolean checkListCreatedToday;

    public static PatientWithOperationDateDTOString toEntity(Patient patient, OpDtoString opDtoString, boolean checkListCreatedToday) {
        PatientDTO patientDTO = PatientDTO.toEntity(patient);
        return PatientWithOperationDateDTOString.builder()
                .patientDTO(patientDTO)
                .operationDateDTO(opDtoString)
                .checkListCreatedToday(checkListCreatedToday)
                .build();
    }
}
