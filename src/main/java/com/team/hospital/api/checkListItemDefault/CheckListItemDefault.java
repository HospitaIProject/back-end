package com.team.hospital.api.checkListItemDefault;

import com.team.hospital.api.base.BaseEntity;
import com.team.hospital.api.checkListItemDefault.dto.WriteCheckListItemDefault;
import com.team.hospital.api.operationType.OperationType;
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

    @OneToOne(mappedBy = "checkListItemDefault")
    private OperationType operationType;

    // 수술 전
    private boolean explainedPreOp;
    private boolean onsPreOp2hr;
    private boolean onsPostBowelPrep;
    private boolean dvtPrevention;
    private boolean antibioticPreIncision;
    private boolean painMedPreOp;

    // 수술 중
    private boolean maintainTemp;
    private boolean fluidRestriction;
    private boolean antiNausea;
    private boolean painControl;
    private boolean painControlMethod;

    // 수술 후
    private boolean antiNauseaPostOp;
    private boolean ivFluidRestrictionPostOp;
    private boolean nonOpioidPainControl;
    private boolean jpDrainRemoval;
    private boolean catheterRemoval;

    // 데일리
    private boolean giStimulant;
    private boolean gumChewing;
    private boolean ivLineRemoval;

    // POD
    private boolean podExercise;
    private boolean podMeal;
    private boolean podPain;

    public static CheckListItemDefault toEntity(WriteCheckListItemDefault write) {
        return CheckListItemDefault.builder()

                // 수술 전
                .explainedPreOp(write.isExplainedPreOp())
                .onsPreOp2hr(write.isOnsPreOp2hr())
                .onsPostBowelPrep(write.isOnsPostBowelPrep())
                .dvtPrevention(write.isDvtPrevention())
                .antibioticPreIncision(write.isAntibioticPreIncision())
                .painMedPreOp(write.isPainMedPreOp())

                // 수술 중
                .maintainTemp(write.isMaintainTemp())
                .fluidRestriction(write.isFluidRestriction())
                .antiNausea(write.isAntiNausea())
                .painControl(write.isPainControl())
                .painControlMethod(write.isPainControlMethod())

                // 수술 후
                .giStimulant(write.isGiStimulant())
                .gumChewing(write.isGumChewing())
                .antiNauseaPostOp(write.isAntiNauseaPostOp())
                .ivFluidRestrictionPostOp(write.isIvFluidRestrictionPostOp())
                .nonOpioidPainControl(write.isNonOpioidPainControl())
                .jpDrainRemoval(write.isJpDrainRemoval())
                .catheterRemoval(write.isCatheterRemoval())
                .ivLineRemoval(write.isIvLineRemoval())

                // POD
                .podExercise(write.isPodExercise())
                .podMeal(write.isPodMeal())
                .podPain(write.isPodPain())

                .build();
    }

    public void update(WriteCheckListItemDefault write) {
        // 수술 전
        this.explainedPreOp = write.isExplainedPreOp();
        this.onsPreOp2hr = write.isOnsPreOp2hr();
        this.onsPostBowelPrep = write.isOnsPostBowelPrep();
        this.dvtPrevention = write.isDvtPrevention();
        this.antibioticPreIncision = write.isAntibioticPreIncision();
        this.painMedPreOp = write.isPainMedPreOp();

        // 수술 중
        this.maintainTemp = write.isMaintainTemp();
        this.fluidRestriction = write.isFluidRestriction();
        this.antiNausea = write.isAntiNausea();
        this.painControl = write.isPainControl();
        this.painControlMethod = write.isPainControlMethod();

        // 수술 후
        this.antiNauseaPostOp = write.isAntiNauseaPostOp();
        this.ivFluidRestrictionPostOp = write.isIvFluidRestrictionPostOp();
        this.nonOpioidPainControl = write.isNonOpioidPainControl();
        this.jpDrainRemoval = write.isJpDrainRemoval();
        this.catheterRemoval = write.isCatheterRemoval();

        // 데일리
        this.giStimulant = write.isGiStimulant();
        this.gumChewing = write.isGumChewing();
        this.ivLineRemoval = write.isIvLineRemoval();

        // POD
        this.podExercise = write.isPodExercise();
        this.podMeal = write.isPodMeal();
        this.podPain = write.isPodPain();
    }
}
