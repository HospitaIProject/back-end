package com.team.hospital.api.checkListAfter.dto;

import com.team.hospital.api.checkList.enumType.BooleanOption;
import com.team.hospital.api.checkList.enumType.DailyPainScore;
import com.team.hospital.api.checkListAfter.CheckListAfter;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@Getter
public class CheckListAfterDTO {

//    private Long patientId;                                     //환자 ID
//    private String patientName;                                 //환자 이름
//    private Long patientNumber;                                 //환자 번호
    private Long checkListAfterId;                             //checkListAfterId

    private LocalDateTime createAt;                             //생성 날짜
    private LocalDateTime updatedAt;                            //수정 날짜

    // 수술 후
    private BooleanOption antiNauseaPostOp;              // 수술 후 구역구토방지제 사용 여부
    private BooleanOption ivFluidRestrictionPostOp;      // 수술 후 IV fluid 제한 여부
    private BooleanOption nonOpioidPainControl;          // 수술 후 non-opioid pain control 여부

    private BooleanOption jpDrainRemoval;                // 수술 후 3일이내 JP drain 제거 여부
    private LocalDate jpDrainRemovalDate;

    private BooleanOption catheterRemoval;               // 수술 후 수술장에서 소변줄 제거 여부
    private LocalDate catheterRemovalDate;

    // Post
    private BooleanOption postExercise;                  // 운동
    private BooleanOption postMeal;                      // 운동
    private DailyPainScore postPain;                     // 운동

    // 수술 후
    private String antiNauseaPostOp_remarks;              // 수술 후 구역구토방지제 사용 여부
    private String ivFluidRestrictionPostOp_remarks;      // 수술 후 IV fluid 제한 여부
    private String nonOpioidPainControl_remarks;          // 수술 후 non-opioid pain control 여부
    private String jpDrainRemoval_remarks;                // 수술 후 3일이내 JP drain 제거 여부
    private String catheterRemoval_remarks;               // 수술 후 수술장에서 소변줄 제거 여부

    private String postExercise_remarks;
    private String postMeal_remarks;

    public static CheckListAfterDTO toEntity(CheckListAfter checkListAfter) {
        CheckListAfterDTOBuilder checkListAfterDTO = CheckListAfterDTO.builder()
//                .patientId(checkListAfter.getCheckListItem().getOperation().getPatient().getId())
//                .patientName(checkListAfter.getCheckListItem().getOperation().getPatient().getName())
//                .patientNumber(checkListAfter.getCheckListItem().getOperation().getPatient().getPatientNumber())
                .checkListAfterId(checkListAfter.getId())
                .createAt(checkListAfter.getCreatedAt())
                .updatedAt(checkListAfter.getUpdatedAt());

        if (checkListAfter.getAntiNauseaPostOp() != null) {
            checkListAfterDTO.antiNauseaPostOp(checkListAfter.getAntiNauseaPostOp().getOption());
            checkListAfterDTO.antiNauseaPostOp_remarks(checkListAfter.getAntiNauseaPostOp().getRemarks());
        }
        if (checkListAfter.getIvFluidRestrictionPostOp() != null) {
            checkListAfterDTO.ivFluidRestrictionPostOp(checkListAfter.getIvFluidRestrictionPostOp().getOption());
            checkListAfterDTO.ivFluidRestrictionPostOp_remarks(checkListAfter.getIvFluidRestrictionPostOp().getRemarks());
        }
        if (checkListAfter.getNonOpioidPainControl() != null) {
            checkListAfterDTO.nonOpioidPainControl(checkListAfter.getNonOpioidPainControl().getOption());
            checkListAfterDTO.nonOpioidPainControl_remarks(checkListAfter.getNonOpioidPainControl().getRemarks());
        }
        if (checkListAfter.getJpDrainRemoval() != null) {
            checkListAfterDTO.jpDrainRemoval(checkListAfter.getJpDrainRemoval().getOption());
            checkListAfterDTO.jpDrainRemoval_remarks(checkListAfter.getJpDrainRemoval().getRemarks());
            checkListAfterDTO.jpDrainRemovalDate(checkListAfter.getJpDrainRemoval().getRemovedDate());
        }

        if (checkListAfter.getCatheterRemoval() != null) {
            checkListAfterDTO.catheterRemoval(checkListAfter.getCatheterRemoval().getOption());
            checkListAfterDTO.catheterRemoval_remarks(checkListAfter.getCatheterRemoval().getRemarks());
            checkListAfterDTO.catheterRemovalDate(checkListAfter.getCatheterRemoval().getRemovedDate());
        }

        if (checkListAfter.getPostExercise() != null) {
            checkListAfterDTO.postExercise(checkListAfter.getPostExercise().getOption());
            checkListAfterDTO.postExercise_remarks(checkListAfter.getPostExercise().getRemarks());
        }
        if (checkListAfter.getPostMeal() != null) {
            checkListAfterDTO.postMeal(checkListAfter.getPostMeal().getOption());
            checkListAfterDTO.postMeal_remarks(checkListAfter.getPostMeal().getRemarks());
        }
        if (checkListAfter.getPostPain() != null) {
            checkListAfterDTO.postPain(checkListAfter.getPostPain());
        }

        return checkListAfterDTO.build();
    }
}
