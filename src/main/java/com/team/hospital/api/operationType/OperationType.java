package com.team.hospital.api.operationType;

import com.team.hospital.api.base.BaseEntity;
import com.team.hospital.api.checkListItemDefault.CheckListItemDefault;
import com.team.hospital.api.operationType.dto.WriteOperationType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class OperationType extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "operation_type_id")
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "check_list_item_default_id")
    private CheckListItemDefault checkListItemDefault;

    public static OperationType toEntity(String operationTypeName) {
        OperationTypeBuilder operationType = OperationType.builder();

        return operationType.name(operationTypeName).build();
    }

    public void update(WriteOperationType write) {
        this.name = write.getName();
    }

    public static OperationType toEntity(WriteOperationType register) {
        // 모든 값이 true로 설정된 CheckListItemDefault 생성
        CheckListItemDefault defaultChecklist = CheckListItemDefault.builder()
                .explainedPreOp(true)
                .onsPreOp2hr(true)
                .onsPostBowelPrep(true)
                .dvtPrevention(true)
                .antibioticPreIncision(true)
                .painMedPreOp(true)
                .maintainTemp(true)
                .fluidRestriction(true)
                .antiNausea(true)
                .painControl(true)
                .giStimulant(true)
                .gumChewing(true)
                .antiNauseaPostOp(true)
                .ivFluidRestrictionPostOp(true)
                .nonOpioidPainControl(true)
                .jpDrainRemoval(true)
                .catheterRemoval(true)
                .ivLineRemoval(true)
                .podExercise(true)
                .podMeal(true)
                .podPain(true)
                .build();

        // OperationType 생성 시 CheckListItemDefault를 함께 설정
        return OperationType.builder()
                .name(register.getName())
                .checkListItemDefault(defaultChecklist)
                .build();
    }

}
