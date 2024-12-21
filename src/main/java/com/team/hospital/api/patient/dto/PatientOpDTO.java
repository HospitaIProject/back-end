package com.team.hospital.api.patient.dto;

import com.team.hospital.api.operation.dto.OpSummary;
import com.team.hospital.api.patient.Patient;
import com.team.hospital.api.patient.enumType.CheckListStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientOpDTO {

    private PatientDTO patientDTO;
    private OpSummary operationDateDTO;   // 가장 최근 수술 이름.
    private CheckListStatus checkListCreatedToday;

    public static PatientOpDTO toEntity(Patient patient, OpSummary opSummary, CheckListStatus checkListCreatedToday) {
        PatientDTO patientDTO = PatientDTO.toEntity(patient);
        return PatientOpDTO.builder()
                .patientDTO(patientDTO)
                .operationDateDTO(opSummary)
                .checkListCreatedToday(checkListCreatedToday)
                .build();
    }
}
