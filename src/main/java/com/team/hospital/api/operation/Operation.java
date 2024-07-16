package com.team.hospital.api.operation;

import com.team.hospital.api.base.BaseEntity;
import com.team.hospital.api.checkList.enumType.BooleanOption;
import com.team.hospital.api.operation.converter.CustomOperationMethodConverter;
import com.team.hospital.api.operation.converter.OperationMethodConverter;
import com.team.hospital.api.operation.enumType.*;
import com.team.hospital.api.patient.Patient;
import com.team.hospital.api.operation.dto.RegisterOperation;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Operation extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "operation_id")
    private Long id;

    @Convert(converter = OperationMethodConverter.class)
    @Column(nullable = false)
    private List<OperationMethod> operationMethod;              // 수술 방법

    @Convert(converter = CustomOperationMethodConverter.class)
    @Column(nullable = true)
    private List<String> customOperationMethod;                 // 사용자 정의 수술 방법

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OperationApproach operationApproach;            // 수술 approach

    @Column(nullable = false)
    private BooleanOption stomaFormation;                   // 장루 형성술

    @Column(nullable = false)
    private LocalDateTime operationStartTime;           // 수술 시작 시간

    @Column(nullable = false)
    private LocalDateTime operationEndTime;             // 수술 시작 시간

    @Column(nullable = false)
    private int totalOperationTime;                     // 전체 수술 시간 (분)

    @Column(nullable = false)
    private double totalFluidsAmount;                   // 수술 중 총 들어간 수액( crystalloid) 양 (cc)

    @Column(nullable = false)
    private double bloodLoss;                                   // 수술 중 실혈양 (cc)

    @Enumerated(EnumType.STRING)
    private BooleanOption complicationStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id")
    private Patient patient;

    public static Operation createOperation(RegisterOperation register, Patient patient) {
        return Operation.builder()
                .operationMethod(register.getOperationMethod())
                .customOperationMethod(register.getCustomOperationMethod())
                .operationApproach(register.getOperationApproach())
                .stomaFormation(register.getStomaFormation())
                .operationStartTime(register.getOperationStartTime())
                .operationEndTime(register.getOperationEndTime())
                .totalOperationTime(register.getTotalOperationTime())
                .totalFluidsAmount(register.getTotalFluidsAmount())
                .bloodLoss(register.getBloodLoss())
                .patient(patient)
                .build();
    }

    public void updateOperation(RegisterOperation registerOperation) {
        this.operationMethod = registerOperation.getOperationMethod();
        this.customOperationMethod = registerOperation.getCustomOperationMethod();
        this.operationApproach = registerOperation.getOperationApproach();
        this.stomaFormation = registerOperation.getStomaFormation();
        this.operationStartTime = registerOperation.getOperationStartTime();
        this.operationEndTime = registerOperation.getOperationEndTime();
        this.totalOperationTime = registerOperation.getTotalOperationTime();
        this.totalFluidsAmount = registerOperation.getTotalFluidsAmount();
        this.bloodLoss = registerOperation.getBloodLoss();
    }

    public void updateComplicationStatus(BooleanOption booleanOption) {
        this.complicationStatus = booleanOption;
    }
}
