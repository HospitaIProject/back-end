package com.team.hospital.api.operation;

import com.team.hospital.api.base.BaseEntity;
import com.team.hospital.api.checkList.enumType.BooleanOption;
import com.team.hospital.api.operation.dto.WriteOperation;
import com.team.hospital.api.operation.enumType.OperationApproach;
import com.team.hospital.api.operationMethod.OperationMethod;
import com.team.hospital.api.patient.Patient;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Entity
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class Operation extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "operation_id")
    private Long id;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
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

//    @Convert(converter = StringListConverter.class)
//    @Column(name = "operation_names", columnDefinition = "TEXT")
//    private List<String> operationNames;

    private String operationNames;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @Setter
    @Column(nullable = false)
    private boolean isDeleted; // 삭제 여부

    @Setter
    private LocalDate deletionRequestDate; // 등록 후 30일 경과 여부를 위한 필드

    public static Operation createOperation(WriteOperation write, List<OperationMethod> operationMethods, Patient patient) {
        String operationNames = String.join(", ", write.getOperationTypeNames());

        return Operation.builder()
                .operationMethods(operationMethods)
                .operationApproach(write.getOperationApproach())
                .stomaFormation(write.getStomaFormation())
                .operationStartTime(write.getOperationStartTime())
                .operationEndTime(write.getOperationEndTime())
                .totalOperationTime(write.getTotalOperationTime())
                .totalFluidsAmount(write.getTotalFluidsAmount())
                .bloodLoss(write.getBloodLoss())
                .operationNames(operationNames)
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

    //최근 삭제목록에서 자동 삭제까지 남은 일수 계산
    public Long getDaysUntilDeletion() {
        if (isDeleted && deletionRequestDate != null) {
            return ChronoUnit.DAYS.between(LocalDate.now(), deletionRequestDate.plusDays(30));
        }
        return null;
    }

}
