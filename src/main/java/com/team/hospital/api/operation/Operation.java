package com.team.hospital.api.operation;

import com.team.hospital.api.base.BaseEntity;
import com.team.hospital.api.checkList.enumType.BooleanOption;
import com.team.hospital.api.operation.dto.WriteOperation;
import com.team.hospital.api.operation.enumType.OperationApproach;
import com.team.hospital.api.operationMethod.OperationMethod;
import com.team.hospital.api.patient.Patient;
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

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "operation_id")
    private List<OperationMethod> operationMethods;

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
    @Builder.Default
    private BooleanOption complicationStatus = BooleanOption.NO;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id")
    private Patient patient;

    public static Operation createOperation(WriteOperation write, List<OperationMethod> operationMethods, Patient patient) {

        return Operation.builder()
                .operationMethods(operationMethods)
                .operationApproach(write.getOperationApproach())
                .stomaFormation(write.getStomaFormation())
                .operationStartTime(write.getOperationStartTime())
                .operationEndTime(write.getOperationEndTime())
                .totalOperationTime(write.getTotalOperationTime())
                .totalFluidsAmount(write.getTotalFluidsAmount())
                .bloodLoss(write.getBloodLoss())
                .patient(patient)
                .build();
    }

    public void updateOperation(WriteOperation register) {
//        this.operationMethods = operationMethods;
        this.operationApproach = register.getOperationApproach();
        this.stomaFormation = register.getStomaFormation();
        this.operationStartTime = register.getOperationStartTime();
        this.operationEndTime = register.getOperationEndTime();
        this.totalOperationTime = register.getTotalOperationTime();
        this.totalFluidsAmount = register.getTotalFluidsAmount();
        this.bloodLoss = register.getBloodLoss();
    }

    public void updateComplicationStatus(BooleanOption booleanOption) {
        this.complicationStatus = booleanOption;
    }
}
