package com.team.hospital.api.checkList.dto;

import com.team.hospital.api.checkList.CheckList;
import com.team.hospital.api.checkList.enumType.BooleanOption;
import com.team.hospital.api.checkList.enumType.DailyPainScore;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class CheckListDTO {

    private Long patientId;                                     //환자 ID
    private String patientName;                                 //환자 이름
    private Long patientNumber;                                 //환자 번호
    private Long checkListId;                                   //checkListId

    private LocalDateTime createAt;                             //생성 날짜
    private LocalDateTime updatedAt;                            //수정 날짜

    // 수술 전
    private BooleanOption explainedPreOp;                // EAS 수술전 설명
    private BooleanOption onsPreOp2hr;                   // 수술 2시간 전 ONS 복용여부
    private BooleanOption onsPostBowelPrep;              // Bowel preparation 후 ONS 경장영양액 복용여부
    private BooleanOption dvtPrevention;                 // DVT 예방
    private BooleanOption antibioticPreIncision;         // 피부 절개 60분전 예방적 항생제 투여
    private BooleanOption painMedPreOp;                  // 수술전 통증 조절약 복용 여부

    // 수술 중
    private BooleanOption maintainTemp;                  // 수술 중 환자 체온 유지 여부
    private BooleanOption fluidRestriction;              // 수술 중 수액 2-4cc/kg/hr 으로 제한 여부
    private BooleanOption antiNausea;                    // 수술 중 구역구토 방지제 사용 여부
    private BooleanOption painControl;                   // 수술 중 통증 조절을 위한 처치 여부

    // 수술 후
    private BooleanOption giStimulant;                   // 위장관 촉진 약 복용 여부
    private BooleanOption gumChewing;                    // 하루 3번 15분동안 껌씹기 여부
    private BooleanOption antiNauseaPostOp;              // 수술 후 구역구토방지제 사용 여부
    private BooleanOption ivFluidRestrictionPostOp;      // 수술 후 IV fluid 제한 여부
    private BooleanOption nonOpioidPainControl;          // 수술 후 non-opioid pain control 여부
    private BooleanOption jpDrainRemoval;                // 수술 후 3일이내 JP drain 제거 여부
    private BooleanOption catheterRemoval;               // 수술 후 수술장에서 소변줄 제거 여부
    private BooleanOption ivLineRemoval;                 // 수술 후 3일이내 IV line 제거 여부

    private BooleanOption postExercise;                  // 운동
    private BooleanOption podOneExercise;                // 식사
    private BooleanOption podTwoExercise;                // 통증
    private BooleanOption podThreeExercise;              // 통증

    private BooleanOption postMeal;                      // 운동
    private BooleanOption podOneMeal;                    // 식사
    private BooleanOption podTwoMeal;                    // 통증

    private DailyPainScore postPain;                      // 운동
    private DailyPainScore podOnePain;                    // 식사
    private DailyPainScore podTwoPain;                    // 통증
    private DailyPainScore podThreePain;                  // 통증

    // 수술 전
    private String explainedPreOp_remarks;                // EAS 수술전 설명
    private String onsPreOp2hr_remarks;                   // 수술 2시간 전 ONS 복용여부
    private String onsPostBowelPrep_remarks;              // Bowel preparation 후 ONS 경장영양액 복용여부
    private String dvtPrevention_remarks;                 // DVT 예방
    private String antibioticPreIncision_remarks;         // 피부 절개 60분전 예방적 항생제 투여
    private String painMedPreOp_remarks;                  // 수술전 통증 조절약 복용 여부

    // 수술 중
    private String maintainTemp_remarks;                  // 수술 중 환자 체온 유지 여부
    private String fluidRestriction_remarks;              // 수술 중 수액 2-4cc/kg/hr 으로 제한 여부
    private String antiNausea_remarks;                    // 수술 중 구역구토 방지제 사용 여부
    private String painControl_remarks;                   // 수술 중 통증 조절을 위한 처치 여부

    // 수술 후
    private String giStimulant_remarks;                   // 위장관 촉진 약 복용 여부
    private String gumChewing_remarks;                    // 하루 3번 15분동안 껌씹기 여부
    private String antiNauseaPostOp_remarks;              // 수술 후 구역구토방지제 사용 여부
    private String ivFluidRestrictionPostOp_remarks;      // 수술 후 IV fluid 제한 여부
    private String nonOpioidPainControl_remarks;          // 수술 후 non-opioid pain control 여부
    private String jpDrainRemoval_remarks;                // 수술 후 3일이내 JP drain 제거 여부
    private String catheterRemoval_remarks;               // 수술 후 수술장에서 소변줄 제거 여부
    private String ivLineRemoval_remarks;                 // 수술 후 3일이내 IV line 제거 여부

    // Pod Exercise
    private String postExercise_remarks;
    private String podOneExercise_remarks;
    private String podTwoExercise_remarks;
    private String podThreeExercise_remarks;

    // Pod Meal
    private String postMeal_remarks;
    private String podOneMeal_remarks;
    private String podTwoMeal_remarks;

    // Pod Pain
//    private String postPain_remarks;
//    private String podOnePain_remarks;
//    private String podTwoPain_remarks;
//    private String podThreePain_remarks;

    public static CheckListDTO toEntity(CheckList checkList) {
        CheckListDTOBuilder checkListDTO = CheckListDTO.builder()
                .patientId(checkList.getCheckListItem().getOperation().getPatient().getId())
                .patientName(checkList.getCheckListItem().getOperation().getPatient().getName())
                .patientNumber(checkList.getCheckListItem().getOperation().getPatient().getPatientNumber())
                .checkListId(checkList.getId())
                .createAt(checkList.getCreatedAt())
                .updatedAt(checkList.getUpdatedAt());

        if (checkList.getMaintainTemp() != null) {
            checkListDTO.maintainTemp(checkList.getMaintainTemp().getOption());
            checkListDTO.maintainTemp_remarks(checkList.getMaintainTemp().getRemarks());
        }
        if (checkList.getFluidRestriction() != null) {
            checkListDTO.fluidRestriction(checkList.getFluidRestriction().getOption());
            checkListDTO.fluidRestriction_remarks(checkList.getFluidRestriction().getRemarks());
        }
        if (checkList.getAntiNausea() != null) {
            checkListDTO.antiNausea(checkList.getAntiNausea().getOption());
            checkListDTO.antiNausea_remarks(checkList.getAntiNausea().getRemarks());
        }
        if (checkList.getPainControl() != null) {
            checkListDTO.painControl(checkList.getPainControl().getOption());
            checkListDTO.painControl_remarks(checkList.getPainControl().getRemarks());
        }
        if (checkList.getGiStimulant() != null) {
            checkListDTO.giStimulant(checkList.getGiStimulant().getOption());
            checkListDTO.giStimulant_remarks(checkList.getGiStimulant().getRemarks());
        }
        if (checkList.getGumChewing() != null) {
            checkListDTO.gumChewing(checkList.getGumChewing().getOption());
            checkListDTO.gumChewing_remarks(checkList.getGumChewing().getRemarks());
        }
        if (checkList.getAntiNauseaPostOp() != null) {
            checkListDTO.antiNauseaPostOp(checkList.getAntiNauseaPostOp().getOption());
            checkListDTO.antiNauseaPostOp_remarks(checkList.getAntiNauseaPostOp().getRemarks());
        }
        if (checkList.getIvFluidRestrictionPostOp() != null) {
            checkListDTO.ivFluidRestrictionPostOp(checkList.getIvFluidRestrictionPostOp().getOption());
            checkListDTO.ivFluidRestrictionPostOp_remarks(checkList.getIvFluidRestrictionPostOp().getRemarks());
        }
        if (checkList.getNonOpioidPainControl() != null) {
            checkListDTO.nonOpioidPainControl(checkList.getNonOpioidPainControl().getOption());
            checkListDTO.nonOpioidPainControl_remarks(checkList.getNonOpioidPainControl().getRemarks());
        }
        if (checkList.getJpDrainRemoval() != null) {
            checkListDTO.jpDrainRemoval(checkList.getJpDrainRemoval().getOption());
            checkListDTO.jpDrainRemoval_remarks(checkList.getJpDrainRemoval().getRemarks());
        }
        if (checkList.getCatheterRemoval() != null) {
            checkListDTO.catheterRemoval(checkList.getCatheterRemoval().getOption());
            checkListDTO.catheterRemoval_remarks(checkList.getCatheterRemoval().getRemarks());
        }
        if (checkList.getIvLineRemoval() != null) {
            checkListDTO.ivLineRemoval(checkList.getIvLineRemoval().getOption());
            checkListDTO.ivLineRemoval_remarks(checkList.getIvLineRemoval().getRemarks());
        }
        if (checkList.getPostExercise() != null) {
            checkListDTO.postExercise(checkList.getPostExercise().getOption());
            checkListDTO.postExercise_remarks(checkList.getPostExercise().getRemarks());
        }
        if (checkList.getPodOneExercise() != null) {
            checkListDTO.podOneExercise(checkList.getPodOneExercise().getOption());
            checkListDTO.podOneExercise_remarks(checkList.getPodOneExercise().getRemarks());
        }
        if (checkList.getPodTwoExercise() != null) {
            checkListDTO.podTwoExercise(checkList.getPodTwoExercise().getOption());
            checkListDTO.podTwoExercise_remarks(checkList.getPodTwoExercise().getRemarks());
        }
        if (checkList.getPodThreeExercise() != null) {
            checkListDTO.podThreeExercise(checkList.getPodThreeExercise().getOption());
            checkListDTO.podThreeExercise_remarks(checkList.getPodThreeExercise().getRemarks());
        }
        if (checkList.getPostMeal() != null) {
            checkListDTO.postMeal(checkList.getPostMeal().getOption());
            checkListDTO.postMeal_remarks(checkList.getPostMeal().getRemarks());
        }
        if (checkList.getPodOneMeal() != null) {
            checkListDTO.podOneMeal(checkList.getPodOneMeal().getOption());
            checkListDTO.podOneMeal_remarks(checkList.getPodOneMeal().getRemarks());
        }
        if (checkList.getPodTwoMeal() != null) {
            checkListDTO.podTwoMeal(checkList.getPodTwoMeal().getOption());
            checkListDTO.podTwoMeal_remarks(checkList.getPodTwoMeal().getRemarks());
        }
        if (checkList.getPostPain() != null) {
            checkListDTO.postPain(checkList.getPostPain());
        }
        if (checkList.getPodOnePain() != null) {
            checkListDTO.podOnePain(checkList.getPodOnePain());
        }
        if (checkList.getPodTwoPain() != null) {
            checkListDTO.podTwoPain(checkList.getPodTwoPain());
        }
        if (checkList.getPodThreePain() != null) {
            checkListDTO.podThreePain(checkList.getPodThreePain());
        }
        return checkListDTO.build();
    }

}
