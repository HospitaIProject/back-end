package com.team.hospital.api.operation;

import com.team.hospital.api.base.BaseEntity;
import com.team.hospital.api.checkList.enumType.BooleanOption;
import com.team.hospital.api.patient.Patient;
import com.team.hospital.api.operation.dto.RegisterOperation;
import com.team.hospital.api.operation.enumType.ASAScore;
import com.team.hospital.api.operation.enumType.StomaFormation;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Operation extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "operation_id")
    private Long id;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id")
    private Patient patient;

    public static Operation createOperation(RegisterOperation register, Patient patient){
        return Operation.builder()
                .height(register.getHeight())
                .weight(register.getWeight())
                .BMI(register.getBMI())
                .asaScore(register.getAsaScore())
                .location(register.getLocation())
                .dignosis(register.getDignosis())
                .opertationDate(register.getOpertationDate())
                .hospitalizedDate(register.getHospitalizedDate())
                .dischargedDate(register.getDischargedDate())
                .totalHospitalizedDays(register.getTotalHospitalizedDays())
                .operationMethod(register.getOperationMethod())
                .operationApproach(register.getOperationApproach())
                .stomaFormation(register.getStomaFormation())
                .AJCCStage(register.getAJCCStage())
                .numberOfRetrievedLine(register.getNumberOfRetrievedLine())
                .complicationOccurence(register.getComplicationOccurence())
                .CDClassification(register.getCDClassification())
                .reOperationWithIn30Days(register.getReOperationWithIn30Days())
                .reOperationCause(register.getReOperationCause())
                .patient(patient)
                .build();
    }

    public void updateOperation(RegisterOperation registerOperation) {
        height = registerOperation.getHeight();
        weight = registerOperation.getWeight();
        BMI = registerOperation.getBMI();
        asaScore = registerOperation.getAsaScore();
        location = registerOperation.getLocation();
        dignosis = registerOperation.getDignosis();
        opertationDate = registerOperation.getOpertationDate();
        hospitalizedDate = registerOperation.getHospitalizedDate();
        dischargedDate = registerOperation.getDischargedDate();
        totalHospitalizedDays = registerOperation.getTotalHospitalizedDays();
        operationMethod = registerOperation.getOperationMethod();
        operationApproach = registerOperation.getOperationApproach();;
        stomaFormation = registerOperation.getStomaFormation();
        AJCCStage = registerOperation.getAJCCStage();
        numberOfRetrievedLine = registerOperation.getNumberOfRetrievedLine();
        complicationOccurence = registerOperation.getComplicationOccurence();
        CDClassification = registerOperation.getCDClassification();
        reOperationWithIn30Days = registerOperation.getReOperationWithIn30Days();
        reOperationCause = registerOperation.getReOperationCause();
    }
}
