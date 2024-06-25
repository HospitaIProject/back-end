package com.team.hospital.user;

import com.team.hospital.user.enumType.ASAScore;
import com.team.hospital.user.enumType.Sex;
import com.team.hospital.user.enumType.StomaFormation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(nullable = false)
    private Long patientNumber;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Sex sex;

    @Column(nullable = false)
    private int age;

    @Column(nullable = false)
    private float height;

    @Column(nullable = false)
    private float weight;

    @Column(nullable = false)
    private float BMI;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ASAScore asaScore;      // 마취전 건강 상태 평가 점수

    @Column(nullable = false)
    private String location;        // 위치

    @Column(nullable = false)
    private String dignosis;        // 진단

    @Column(nullable = false)
    private Date opertationDate;    // 수술일

    @Column(nullable = false)
    private Date hospitalizedDate;  // 입원일

    @Column(nullable = false)
    private Date dischargedDate;    // 퇴원일

    @Column(nullable = false)
    private int totalHospitalizedDays;  // 총 재원일 수

    @Column(nullable = false)
    private String operationMethod;      // 수술 방법

    @Column(nullable = false)
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
