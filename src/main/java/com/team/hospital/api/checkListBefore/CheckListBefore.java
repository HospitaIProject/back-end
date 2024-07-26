package com.team.hospital.api.checkListBefore;

import com.team.hospital.api.base.BaseEntity;
import com.team.hospital.api.checkList.enumType.CheckListFirst;
import com.team.hospital.api.checkListBefore.dto.WriteCheckListBefore;
import com.team.hospital.api.checkListItem.CheckListItem;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CheckListBefore extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "check_list_before_id")
    private Long id;

    // 수술 전
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "explained_pre_op")),
            @AttributeOverride(name = "remarks", column = @Column(name = "explained_pre_op_remarks"))
    })
    private CheckListFirst explainedPreOp; // ERAS 수술전 설명

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "ons_pre_op_2hr")),
            @AttributeOverride(name = "remarks", column = @Column(name = "ons_pre_op_2hr_remarks"))
    })
    private CheckListFirst onsPreOp2hr; // 수술 2시간 전 ONS 복용여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "ons_post_bowel_prep")),
            @AttributeOverride(name = "remarks", column = @Column(name = "ons_post_bowel_prep_remarks"))
    })
    private CheckListFirst onsPostBowelPrep; // Bowel preparation 후 ONS 경장영양액 복용여부

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "dvt_prevention")),
            @AttributeOverride(name = "remarks", column = @Column(name = "dvt_prevention_remarks"))
    })
    private CheckListFirst dvtPrevention; // DVT 예방

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "antibiotic_pre_incision")),
            @AttributeOverride(name = "remarks", column = @Column(name = "antibiotic_pre_incision_remarks"))
    })
    private CheckListFirst antibioticPreIncision; // 피부 절개 60분전 예방적 항생제 투여

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "option", column = @Column(name = "pain_med_pre_op")),
            @AttributeOverride(name = "remarks", column = @Column(name = "pain_med_pre_op_remarks"))
    })
    private CheckListFirst painMedPreOp; // 수술전 통증 조절약 복용 여부

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "check_list_item_id")
    private CheckListItem checkListItem;

    public static CheckListBefore toEntity(WriteCheckListBefore write, CheckListItem checkListItem) {
        return CheckListBefore.builder()

                // 수술 전
                .explainedPreOp(CheckListFirst.of(write.getExplainedPreOp(), write.getExplainedPreOp_remarks()))
                .onsPreOp2hr(CheckListFirst.of(write.getOnsPreOp2hr(), write.getOnsPreOp2hr_remarks()))
                .onsPostBowelPrep(CheckListFirst.of(write.getOnsPostBowelPrep(), write.getOnsPostBowelPrep_remarks()))
                .dvtPrevention(CheckListFirst.of(write.getDvtPrevention(), write.getDvtPrevention_remarks()))
                .antibioticPreIncision(CheckListFirst.of(write.getAntibioticPreIncision(), write.getAntibioticPreIncision_remarks()))
                .painMedPreOp(CheckListFirst.of(write.getPainMedPreOp(), write.getPainMedPreOp_remarks()))

                .checkListItem(checkListItem)
                .build();

    }

    public void updateCheckListBefore(WriteCheckListBefore write) {
        this.explainedPreOp.update(write.getExplainedPreOp(), write.getExplainedPreOp_remarks());
        this.onsPreOp2hr.update(write.getOnsPreOp2hr(), write.getOnsPreOp2hr_remarks());
        this.onsPostBowelPrep.update(write.getOnsPostBowelPrep(), write.getOnsPostBowelPrep_remarks());
        this.dvtPrevention.update(write.getDvtPrevention(), write.getDvtPrevention_remarks());
        this.antibioticPreIncision.update(write.getAntibioticPreIncision(), write.getAntibioticPreIncision_remarks());
        this.painMedPreOp.update(write.getPainMedPreOp(), write.getPainMedPreOp_remarks());
    }
}
