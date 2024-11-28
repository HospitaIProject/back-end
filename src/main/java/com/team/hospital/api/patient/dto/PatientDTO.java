package com.team.hospital.api.patient.dto;

import com.team.hospital.api.operation.enumType.ASAScore;
import com.team.hospital.api.operation.enumType.Diagnosis;
import com.team.hospital.api.operation.enumType.Location;
import com.team.hospital.api.patient.Patient;
import com.team.hospital.api.patient.enumType.Sex;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class PatientDTO {

    private Long patientId;

    private Long patientNumber;                 // 등록번호

    private String name;                        // 환자이름

    private Sex sex;                            // 성별

    private int age;                            // 나이

    private float height;                       // 키(cm)

    private float weight;                       // 몸무게(kg)

    private float bmi;                          // BMI(kg/cm²)

    private ASAScore asaScore;                  // 마취전 건강 상태 평가 점수

    private Location location;                  // 위치

    private Diagnosis diagnosis;                  // 진단명

    private LocalDate operationDate;                 // 수술일

    private LocalDate hospitalizedDate;              // 입원일

    private LocalDate dischargedDate;                // 퇴원일

    private int totalHospitalizedDays;          // 총 재원 일수

    public static PatientDTO toEntity(Patient patient) {
        return PatientDTO.builder()
                .patientId(patient.getId())
                .patientNumber(patient.getPatientNumber())
                .name(patient.getName())
                .sex(patient.getSex())
                .age(patient.getAge())
                .height(patient.getHeight())
                .weight(patient.getWeight())
                .bmi(patient.getBmi())
                .asaScore(patient.getAsaScore())
                .location(patient.getLocation())
                .diagnosis(patient.getDiagnosis())
                .operationDate(patient.getOperationDate())
                .hospitalizedDate(patient.getHospitalizedDate())
                .dischargedDate(patient.getDischargedDate())
                .totalHospitalizedDays(patient.getTotalHospitalizedDays())
                .build();
    }
}
