package com.team.hospital.patient;

import com.team.hospital.patient.enumType.ASAScore;
import com.team.hospital.patient.enumType.Sex;
import com.team.hospital.patient.enumType.StomaFormation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Patient {

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

    private boolean complicationOccurence;

    private String CDClassification;

    private boolean reOperationWithIn30Days;

    private String reOperationCause;

}
