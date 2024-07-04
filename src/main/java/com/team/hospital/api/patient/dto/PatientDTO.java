package com.team.hospital.api.patient.dto;

import com.team.hospital.api.patient.Patient;
import com.team.hospital.api.patient.enumType.Sex;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Builder
@Getter
public class PatientDTO {

    private Long id;

    private Long patientNumber;

    private String name;

    private Sex sex;

    private int age;

    private float height;

    private float weight;

    private float BMI;

    public static PatientDTO buildPatientDTO(Patient patient){
        return PatientDTO.builder()
                .id(patient.getId())
                .patientNumber(patient.getPatientNumber())
                .name(patient.getName())
                .sex(patient.getSex())
                .age(patient.getAge())
                .height(patient.getHeight())
                .weight(patient.getWeight())
                .BMI(patient.getBMI())
                .build();
    }

    public static List<PatientDTO> buildPatientDTOs(List<Patient> patients){
        return patients.stream()
                .map(PatientDTO::buildPatientDTO)
                .collect(Collectors.toList());
    }
}
