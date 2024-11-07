package com.team.hospital.api.checkListItem;

import com.team.hospital.api.base.BaseEntity;
import com.team.hospital.api.checkListItem.dto.WriteCheckListItem;
import com.team.hospital.api.operation.Operation;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class CheckListItem extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "check_list_item_id")
    private Long id;

    // 수술 전
    private boolean explainedPreOp;                // EAS 수술전 설명
    private boolean onsPreOp2hr;                   // 수술 2시간 전 ONS 복용여부
    private boolean onsPostBowelPrep;              // Bowel preparation 후 ONS 경장영양액 복용여부
    private boolean dvtPrevention;                 // DVT 예방
    private boolean antibioticPreIncision;         // 피부 절개 60분전 예방적 항생제 투여
    private boolean painMedPreOp;                  // 수술전 통증 조절약 복용 여부

    // 수술 중
    private boolean maintainTemp;                  // 수술 중 환자 체온 유지 여부
    private boolean fluidRestriction;              // 수술 중 수액 2-4cc/kg/hr 으로 제한 여부
    private boolean antiNausea;                    // 수술 중 구역구토 방지제 사용 여부
    private boolean painControl;                   // 수술 중 통증 조절을 위한 처치 여부
    private boolean painControlMethod;             // 수술 중 통증 조절 종류

    // 수술 후
    private boolean giStimulant;                   // 위장관 촉진 약 복용 여부
    private boolean gumChewing;                    // 하루 3번 15분동안 껌씹기 여부
    private boolean antiNauseaPostOp;              // 수술 후 구역구토방지제 사용 여부
    private boolean ivFluidRestrictionPostOp;      // 수술 후 IV fluid 제한 여부
    private boolean nonOpioidPainControl;          // 수술 후 non-opioid pain control 여부
    private boolean jpDrainRemoval;                // 수술 후 3일이내 JP drain 제거 여부
    private boolean catheterRemoval;               // 수술 후 수술장에서 소변줄 제거 여부
    private boolean ivLineRemoval;                 // 수술 후 3일이내 IV line 제거 여부

    private boolean podExercise;                   // 운동
    private boolean podMeal;                       // 식사
    private boolean podPain;                       // 통증

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "operation_id")
    private Operation operation;

    public static CheckListItem createCheckListItem(WriteCheckListItem write, Operation operation) {
        return CheckListItem.builder()

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

                .podExercise(write.isPodExercise())
                .podMeal(write.isPodMeal())
                .podPain(write.isPodPain())
                .operation(operation)
                .build();
    }

    public void updateCheckListItem(WriteCheckListItem write) {
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
        this.giStimulant = write.isGiStimulant();
        this.gumChewing = write.isGumChewing();
        this.antiNauseaPostOp = write.isAntiNauseaPostOp();
        this.ivFluidRestrictionPostOp = write.isIvFluidRestrictionPostOp();
        this.nonOpioidPainControl = write.isNonOpioidPainControl();
        this.jpDrainRemoval = write.isJpDrainRemoval();
        this.catheterRemoval = write.isCatheterRemoval();
        this.ivLineRemoval = write.isIvLineRemoval();

        this.podExercise = write.isPodExercise();
        this.podMeal = write.isPodMeal();
        this.podPain = write.isPodPain();
    }

}
