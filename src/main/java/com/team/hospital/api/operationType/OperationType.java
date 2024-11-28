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

    @Column(nullable = false)
    @Builder.Default
    private boolean deleted = false; // 소프트 딜리트 플래그

    public static OperationType toEntity(WriteOperationType write) {
        CheckListItemDefault defaultChecklist = CheckListItemDefault.builder()
                // 수술 전
                .explainedPreOp(true)
                .onsPreOp2hr(true)
                .onsPostBowelPrep(true)
                .dvtPrevention(true)
                .antibioticPreIncision(true)
                .painMedPreOp(true)

                // 수술 중
                .maintainTemp(true)
                .fluidRestriction(true)
                .antiNausea(true)
                .painControl(true)
                .painControlMethod(true)

                // 수술 후
                .antiNauseaPostOp(true)
                .ivFluidRestrictionPostOp(true)
                .nonOpioidPainControl(true)
                .jpDrainRemoval(true)
                .catheterRemoval(true)

                // 데일리
                .giStimulant(true)
                .gumChewing(true)
                .ivLineRemoval(true)

                .podExercise(true)
                .podMeal(true)
                .podPain(true)
                .build();

        return OperationType.builder()
                .name(write.getName())
                .checkListItemDefault(defaultChecklist)
                .build();
    }

    public void update(WriteOperationType write) {
        this.name = write.getName();
    }

    public void softDelete() {
        this.deleted = true;
    }

    public void restore() {
        this.deleted = false; // 삭제 플래그 해제
    }
}