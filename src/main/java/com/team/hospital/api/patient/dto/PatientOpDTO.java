package com.team.hospital.api.patient.dto;

import com.team.hospital.api.operation.dto.OpSummary;
import com.team.hospital.api.patient.Patient;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PatientOpDTO {

    private PatientDTO patientDTO;
    private OpSummary operationDateDTO;   // 가장 최근 수술 이름.
    private boolean checkListCreatedToday;

    public static PatientOpDTO toEntity(Patient patient, OpSummary opSummary, boolean checkListCreatedToday) {
        PatientDTO patientDTO = PatientDTO.toEntity(patient);
        return PatientOpDTO.builder()
                .patientDTO(patientDTO)
                .operationDateDTO(opSummary)
                .checkListCreatedToday(checkListCreatedToday)
                .build();
    }
}
