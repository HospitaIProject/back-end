package com.team.hospital.api.patient.dto;

import com.team.hospital.api.operation.enumType.ASAScore;
import com.team.hospital.api.operation.enumType.Dignosis;
import com.team.hospital.api.operation.enumType.Location;
import com.team.hospital.api.patient.enumType.Sex;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Date;

@Getter
@AllArgsConstructor
public class RegisterPatient {

    private Long patientNumber;     // 등록번호

    private String name;            // 환자이름

    @Enumerated(EnumType.STRING)
    private Sex sex;                // 성별

    private int age;                // 나이

    private float height;                       // 키(cm)

    private float weight;                       // 몸무게(kg)

    private float bmi;                          // BMI(kg/cm²)

    @Enumerated(EnumType.STRING)
    private ASAScore asaScore;                  // 마취전 건강 상태 평가 점수

    @Enumerated(EnumType.STRING)
    private Location location;                  // 위치

    @Enumerated(EnumType.STRING)
    private Dignosis dignosis;                  // 진단명

    private Date operationDate;         // 수술일

    private Date hospitalizedDate;      // 입원일

    private Date dischargedDate;        // 퇴원일

    private int totalHospitalizedDays;  // 총 재원 일수

}
