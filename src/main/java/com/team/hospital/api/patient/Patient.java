package com.team.hospital.api.patient;

import com.team.hospital.api.base.BaseEntity;
import com.team.hospital.api.check.enumType.BooleanOption;
import com.team.hospital.api.patient.dto.RegisterPatient;
import com.team.hospital.api.patient.enumType.ASAScore;
import com.team.hospital.api.patient.enumType.Sex;
import com.team.hospital.api.patient.enumType.StomaFormation;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Patient extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patient_id")
    private Long id;

    private Long patientNumber;

    private String name;

    @Enumerated(EnumType.STRING)
    private Sex sex;

    private int age;

    private float height;

    private float weight;

    private float BMI;

    @Enumerated(EnumType.STRING)
    private ASAScore asaScore;      // 마취전 건강 상태 평가 점수

    private String location;        // 위치

    private String dignosis;        // 진단

    private Date opertationDate;    // 수술일

    private Date hospitalizedDate;  // 입원일

    private Date dischargedDate;    // 퇴원일

    private int totalHospitalizedDays;  // 총 재원일 수

    private String operationMethod;      // 수술 방법

    private String operationApproach;   // 수술 approach

    @Enumerated(EnumType.STRING)
    private StomaFormation stomaFormation;      // 장루 형성술

    private String AJCCStage;           // 암 진행도

    private int numberOfRetrievedLine;  // 제거된 림프절 개수

    private BooleanOption complicationOccurence;

    private String CDClassification;

    private BooleanOption reOperationWithIn30Days;

    private String reOperationCause;

    public static Patient buildPatient(RegisterPatient registerPatient) {
        return Patient.builder()
                .patientNumber(registerPatient.getPatientNumber())
                .name(registerPatient.getName())
                .sex(registerPatient.getSex())
                .age(registerPatient.getAge())
                .height(registerPatient.getHeight())
                .weight(registerPatient.getWeight())
                .BMI(registerPatient.getBMI())
                .asaScore(registerPatient.getAsaScore())
                .location(registerPatient.getLocation())
                .dignosis(registerPatient.getDignosis())
                .opertationDate(registerPatient.getOpertationDate())
                .hospitalizedDate(registerPatient.getHospitalizedDate())
                .dischargedDate(registerPatient.getDischargedDate())
                .totalHospitalizedDays(registerPatient.getTotalHospitalizedDays())
                .operationMethod(registerPatient.getOperationMethod())
                .operationApproach(registerPatient.getOperationApproach())
                .stomaFormation(registerPatient.getStomaFormation())
                .AJCCStage(registerPatient.getAJCCStage())
                .numberOfRetrievedLine(registerPatient.getNumberOfRetrievedLine())
                .complicationOccurence(registerPatient.getComplicationOccurence())
                .CDClassification(registerPatient.getCDClassification())
                .reOperationWithIn30Days(registerPatient.getReOperationWithIn30Days())
                .reOperationCause(registerPatient.getReOperationCause())
                .build();
    }
}