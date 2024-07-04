package com.team.hospital.api.patient.dto;

import com.team.hospital.api.patient.Patient;
import com.team.hospital.api.patient.enumType.Sex;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PatientDTO {

    private Long patientNumber;

    private String name;

    @Enumerated(EnumType.STRING)
    private Sex sex;

    private int age;    // 생년월일로 수정 예정

    public static PatientDTO createPatientDTO(Patient patient) {
        return PatientDTO.builder()
                .patientNumber(patient.getPatientNumber())
                .name(patient.getName())
                .sex(patient.getSex())
                .age(patient.getAge())
                .build();
    }
}