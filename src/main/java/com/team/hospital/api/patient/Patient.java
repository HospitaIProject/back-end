package com.team.hospital.api.patient;

import com.team.hospital.api.base.BaseEntity;
import com.team.hospital.api.operation.enumType.ASAScore;
import com.team.hospital.api.operation.enumType.Diagnosis;
import com.team.hospital.api.operation.enumType.Location;
import com.team.hospital.api.patient.dto.RegisterPatient;
import com.team.hospital.api.patient.enumType.Sex;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class Patient extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patient_id")
    private Long id;

    @Column(nullable = false)
    private Long patientNumber;                 // 등록번호

    @Column(nullable = false)
    private String name;                        // 환자이름

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Sex sex;                            // 성별

    @Column(nullable = false)
    private int age;                            // 나이

    @Column(nullable = false)
    private float height;                       // 키(cm)

    @Column(nullable = false)
    private float weight;                       // 몸무게(kg)

    @Column(nullable = false)
    private float bmi;                          // BMI(kg/cm²)

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ASAScore asaScore;                  // 마취전 건강 상태 평가 점수

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Location location;                  // 위치

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Diagnosis diagnosis;                  // 진단명

    @Column(nullable = false)
    private LocalDate operationDate;                 // 수술일

    @Column(nullable = false)
    private LocalDate hospitalizedDate;              // 입원일

    @Column(nullable = false)
    private LocalDate dischargedDate;                // 퇴원일

    @Column(nullable = false)
    private int totalHospitalizedDays;          // 총 재원 일수

    public static Patient createPatient(RegisterPatient registerPatient) {
        return Patient.builder()
                .patientNumber(registerPatient.getPatientNumber())
                .name(registerPatient.getName())
                .sex(registerPatient.getSex())
                .age(registerPatient.getAge())
                .height(registerPatient.getHeight())
                .weight(registerPatient.getWeight())
                .bmi(registerPatient.getBmi())
                .asaScore(registerPatient.getAsaScore())
                .location(registerPatient.getLocation())
                .diagnosis(registerPatient.getDiagnosis())
                .operationDate(registerPatient.getOperationDate())
                .hospitalizedDate(registerPatient.getHospitalizedDate())
                .dischargedDate(registerPatient.getDischargedDate())
                .totalHospitalizedDays(registerPatient.getTotalHospitalizedDays())
                .build();
    }

    public void updatePatient(RegisterPatient registerPatient) {
        this.patientNumber = registerPatient.getPatientNumber();
        this.name = registerPatient.getName();
        this.sex = registerPatient.getSex();
        this.age = registerPatient.getAge();
        this.height = registerPatient.getHeight();
        this.weight = registerPatient.getWeight();
        this.bmi = registerPatient.getBmi();
        this.asaScore = registerPatient.getAsaScore();
        this.location = registerPatient.getLocation();
        this.diagnosis = registerPatient.getDiagnosis();
        this.operationDate = registerPatient.getOperationDate();
        this.hospitalizedDate = registerPatient.getHospitalizedDate();
        this.dischargedDate = registerPatient.getDischargedDate();
        this.totalHospitalizedDays = registerPatient.getTotalHospitalizedDays();
    }
}
