package com.team.hospital.api.checkListItemDefault;

import com.team.hospital.api.base.BaseEntity;
import com.team.hospital.api.checkList.enumType.BooleanOption;
import com.team.hospital.api.checkListItemDefault.dto.WriteCheckListItemDefault;
import com.team.hospital.api.operation.enumType.OperationMethod;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Entity
@Getter
@RequiredArgsConstructor
@Builder
@AllArgsConstructor
public class CheckListItemDefault extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(unique = true)  // 이 필드를 유니크 제약 조건으로 설정
    private OperationMethod operationMethod;

    // 수술 전
    @Enumerated(EnumType.STRING)
    private BooleanOption explainedPreOpDefault;
    @Enumerated(EnumType.STRING)
    private BooleanOption onsPreOp2hrDefault;
    @Enumerated(EnumType.STRING)
    private BooleanOption onsPostBowelPrepDefault;
    @Enumerated(EnumType.STRING)
    private BooleanOption dvtPreventionDefault;
    @Enumerated(EnumType.STRING)
    private BooleanOption antibioticPreIncisionDefault;
    @Enumerated(EnumType.STRING)
    private BooleanOption painMedPreOpDefault;

    // 수술 중
    @Enumerated(EnumType.STRING)
    private BooleanOption maintainTempDefault;
    @Enumerated(EnumType.STRING)
    private BooleanOption fluidRestrictionDefault;
    @Enumerated(EnumType.STRING)
    private BooleanOption antiNauseaDefault;
    @Enumerated(EnumType.STRING)
    private BooleanOption painControlDefault;

    // 수술 후
    @Enumerated(EnumType.STRING)
    private BooleanOption giStimulantDefault;
    @Enumerated(EnumType.STRING)
    private BooleanOption gumChewingDefault;
    @Enumerated(EnumType.STRING)
    private BooleanOption antiNauseaPostOpDefault;
    @Enumerated(EnumType.STRING)
    private BooleanOption ivFluidRestrictionPostOpDefault;
    @Enumerated(EnumType.STRING)
    private BooleanOption nonOpioidPainControlDefault;
    @Enumerated(EnumType.STRING)
    private BooleanOption jpDrainRemovalDefault;
    @Enumerated(EnumType.STRING)
    private BooleanOption catheterRemovalDefault;
    @Enumerated(EnumType.STRING)
    private BooleanOption ivLineRemovalDefault;

    // POD
    @Enumerated(EnumType.STRING)
    private BooleanOption podExerciseDefault;
    @Enumerated(EnumType.STRING)
    private BooleanOption podMealDefault;
    @Enumerated(EnumType.STRING)
    private BooleanOption podPainDefault;

    public static CheckListItemDefault toEntity(WriteCheckListItemDefault write) {
        return CheckListItemDefault.builder()
                .operationMethod(write.getOperationMethod())

                // 수술 전
                .explainedPreOpDefault(write.getExplainedPreOpDefault())
                .onsPreOp2hrDefault(write.getOnsPreOp2hrDefault())
                .onsPostBowelPrepDefault(write.getOnsPostBowelPrepDefault())
                .dvtPreventionDefault(write.getDvtPreventionDefault())
                .antibioticPreIncisionDefault(write.getAntibioticPreIncisionDefault())
                .painMedPreOpDefault(write.getPainMedPreOpDefault())

                // 수술 중
                .maintainTempDefault(write.getMaintainTempDefault())
                .fluidRestrictionDefault(write.getFluidRestrictionDefault())
                .antiNauseaDefault(write.getAntiNauseaDefault())
                .painControlDefault(write.getPainControlDefault())

                // 수술 후
                .giStimulantDefault(write.getGiStimulantDefault())
                .gumChewingDefault(write.getGumChewingDefault())
                .antiNauseaPostOpDefault(write.getAntiNauseaPostOpDefault())
                .ivFluidRestrictionPostOpDefault(write.getIvFluidRestrictionPostOpDefault())
                .nonOpioidPainControlDefault(write.getNonOpioidPainControlDefault())
                .jpDrainRemovalDefault(write.getJpDrainRemovalDefault())
                .catheterRemovalDefault(write.getCatheterRemovalDefault())
                .ivLineRemovalDefault(write.getIvLineRemovalDefault())

                // POD
                .podExerciseDefault(write.getPodExerciseDefault())
                .podMealDefault(write.getPodMealDefault())
                .podPainDefault(write.getPodPainDefault())

                .build();
    }

    public void update(WriteCheckListItemDefault write) {
        this.explainedPreOpDefault = write.getExplainedPreOpDefault();
    }
}
