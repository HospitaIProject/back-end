package com.team.hospital.api.checkList.dto;

import com.team.hospital.api.checkList.CheckList;
import com.team.hospital.api.checkList.enumType.BooleanOption;
import com.team.hospital.api.checkList.enumType.DailyPainScore;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@Getter
public class CheckListDTO {

//    private Long patientId;                                     //환자 ID
//    private String patientName;                                 //환자 이름
//    private Long patientNumber;                                 //환자 번호
    private Long checkListId;                                   //checkListId

    private LocalDateTime createAt;                             //생성 날짜
    private LocalDateTime updatedAt;                            //수정 날짜

    // Newly added.
    private BooleanOption podOneGiStimulant; // POD 1day 위장관 촉진약 복용 여부
    private BooleanOption podTwoGiStimulant; // POD 2day 위장관 촉진약 복용 여부
    private BooleanOption podThreeGiStimulant; // POD 3day 위장관 촉진약 복용 여부

    private BooleanOption podOneGumChewing;
    private BooleanOption podTwoGumChewing;
    private BooleanOption podThreeGumChewing;

    private BooleanOption podOneIvFluidRestriction;
    private BooleanOption podTwoIvFluidRestriction;
    private BooleanOption podThreeIvFluidRestriction;

    private BooleanOption podOneNonOpioidPainControl;
    private BooleanOption podTwoNonOpioidPainControl;
    private BooleanOption podThreeNonOpioidPainControl;

//    private BooleanOption podOneJpDrainRemoval;
//    private BooleanOption podTwoJpDrainRemoval;
//    private BooleanOption podThreeJpDrainRemoval;

    private BooleanOption podThreeIvLineRemoval;
    private LocalDate podThreeIvLineRemovalDate;

    // POD Exercise
    private BooleanOption podOneExercise;                // 식사
    private BooleanOption podTwoExercise;                // 통증
    private BooleanOption podThreeExercise;              // 통증

    private BooleanOption podOneMeal;                    // 식사
    private BooleanOption podTwoMeal;                    // 통증

    private DailyPainScore podOnePain;                    // 식사
    private DailyPainScore podTwoPain;                    // 통증
    private DailyPainScore podThreePain;                  // 통증

    private LocalDate dayOfCheckList;                     // 몇 일차 체크리스트 작성

    // Remarks
    private String podOneGiStimulant_remarks; // POD 1day 위장관 촉진약 복용 여부
    private String podTwoGiStimulant_remarks; // POD 2day 위장관 촉진약 복용 여부
    private String podThreeGiStimulant_remarks; // POD 3day 위장관 촉진약 복용 여부

    private String podOneGumChewing_remarks;
    private String podTwoGumChewing_remarks;
    private String podThreeGumChewing_remarks;

    private String podOneIvFluidRestriction_remarks;
    private String podTwoIvFluidRestriction_remarks;
    private String podThreeIvFluidRestriction_remarks;

    private String podOneNonOpioidPainControl_remarks;
    private String podTwoNonOpioidPainControl_remarks;
    private String podThreeNonOpioidPainControl_remarks;

//    private String podOneJpDrainRemoval_remarks;
//    private String podTwoJpDrainRemoval_remarks;
//    private String podThreeJpDrainRemoval_remarks;

    private String podThreeIvLineRemoval_remarks;

    // Pod Exercise
    private String podOneExercise_remarks;
    private String podTwoExercise_remarks;
    private String podThreeExercise_remarks;

    // Pod Meal
    private String podOneMeal_remarks;
    private String podTwoMeal_remarks;

    public static CheckListDTO toEntity(CheckList checkList) {
        if (checkList == null) return null;

        CheckListDTOBuilder checkListDTO = CheckListDTO.builder()
//                .patientId(checkList.getCheckListItem().getOperation().getPatient().getId())
//                .patientName(checkList.getCheckListItem().getOperation().getPatient().getName())
//                .patientNumber(checkList.getCheckListItem().getOperation().getPatient().getPatientNumber())
                .checkListId(checkList.getId())
                .createAt(checkList.getCreatedAt())
                .updatedAt(checkList.getUpdatedAt());

        // 추가된 GumChewing 속성
        if (checkList.getPodOneGiStimulant() != null) {
            checkListDTO.podOneGiStimulant(checkList.getPodOneGiStimulant().getOption());
            checkListDTO.podOneGiStimulant_remarks(checkList.getPodOneGiStimulant().getRemarks());
        }
        if (checkList.getPodTwoGiStimulant() != null) {
            checkListDTO.podTwoGiStimulant(checkList.getPodTwoGiStimulant().getOption());
            checkListDTO.podTwoGiStimulant_remarks(checkList.getPodTwoGiStimulant().getRemarks());
        }
        if (checkList.getPodThreeGiStimulant() != null) {
            checkListDTO.podThreeGiStimulant(checkList.getPodThreeGiStimulant().getOption());
            checkListDTO.podThreeGiStimulant_remarks(checkList.getPodThreeGiStimulant().getRemarks());
        }

        // 추가된 GumChewing 속성
        if (checkList.getPodOneGumChewing() != null) {
            checkListDTO.podOneGumChewing(checkList.getPodOneGumChewing().getOption());
            checkListDTO.podOneGumChewing_remarks(checkList.getPodOneGumChewing().getRemarks());
        }
        if (checkList.getPodTwoGumChewing() != null) {
            checkListDTO.podTwoGumChewing(checkList.getPodTwoGumChewing().getOption());
            checkListDTO.podTwoGumChewing_remarks(checkList.getPodTwoGumChewing().getRemarks());
        }
        if (checkList.getPodThreeGumChewing() != null) {
            checkListDTO.podThreeGumChewing(checkList.getPodThreeGumChewing().getOption());
            checkListDTO.podThreeGumChewing_remarks(checkList.getPodThreeGumChewing().getRemarks());
        }

        // 추가된 IvFluidRestriction 속성
        if (checkList.getPodOneIvFluidRestriction() != null) {
            checkListDTO.podOneIvFluidRestriction(checkList.getPodOneIvFluidRestriction().getOption());
            checkListDTO.podOneIvFluidRestriction_remarks(checkList.getPodOneIvFluidRestriction().getRemarks());
        }
        if (checkList.getPodTwoIvFluidRestriction() != null) {
            checkListDTO.podTwoIvFluidRestriction(checkList.getPodTwoIvFluidRestriction().getOption());
            checkListDTO.podTwoIvFluidRestriction_remarks(checkList.getPodTwoIvFluidRestriction().getRemarks());
        }
        if (checkList.getPodThreeIvFluidRestriction() != null) {
            checkListDTO.podThreeIvFluidRestriction(checkList.getPodThreeIvFluidRestriction().getOption());
            checkListDTO.podThreeIvFluidRestriction_remarks(checkList.getPodThreeIvFluidRestriction().getRemarks());
        }

        // 추가된 NonOpioidPainControl 속성
        if (checkList.getPodOneNonOpioidPainControl() != null) {
            checkListDTO.podOneNonOpioidPainControl(checkList.getPodOneNonOpioidPainControl().getOption());
            checkListDTO.podOneNonOpioidPainControl_remarks(checkList.getPodOneNonOpioidPainControl().getRemarks());
        }
        if (checkList.getPodTwoNonOpioidPainControl() != null) {
            checkListDTO.podTwoNonOpioidPainControl(checkList.getPodTwoNonOpioidPainControl().getOption());
            checkListDTO.podTwoNonOpioidPainControl_remarks(checkList.getPodTwoNonOpioidPainControl().getRemarks());
        }
        if (checkList.getPodThreeNonOpioidPainControl() != null) {
            checkListDTO.podThreeNonOpioidPainControl(checkList.getPodThreeNonOpioidPainControl().getOption());
            checkListDTO.podThreeNonOpioidPainControl_remarks(checkList.getPodThreeNonOpioidPainControl().getRemarks());
        }

        // 추가된 JpDrainRemoval 속성
//        if (checkList.getPodOneJpDrainRemoval() != null) {
//            checkListDTO.podOneJpDrainRemoval(checkList.getPodOneJpDrainRemoval().getOption());
//            checkListDTO.podOneJpDrainRemoval_remarks(checkList.getPodOneJpDrainRemoval().getRemarks());
//        }
//        if (checkList.getPodTwoJpDrainRemoval() != null) {
//            checkListDTO.podTwoJpDrainRemoval(checkList.getPodTwoJpDrainRemoval().getOption());
//            checkListDTO.podTwoJpDrainRemoval_remarks(checkList.getPodTwoJpDrainRemoval().getRemarks());
//        }
//        if (checkList.getPodThreeJpDrainRemoval() != null) {
//            checkListDTO.podThreeJpDrainRemoval(checkList.getPodThreeJpDrainRemoval().getOption());
//            checkListDTO.podThreeJpDrainRemoval_remarks(checkList.getPodThreeJpDrainRemoval().getRemarks());
//        }

        // 추가된 IvLineRemoval 속성
        if (checkList.getPodThreeIvLineRemoval() != null) {
            checkListDTO.podThreeIvLineRemoval(checkList.getPodThreeIvLineRemoval().getOption());
            checkListDTO.podThreeIvLineRemoval_remarks(checkList.getPodThreeIvLineRemoval().getRemarks());
            if (checkList.getPodThreeIvLineRemoval().getRemovedDate() != null) {
                checkListDTO.podThreeIvLineRemovalDate(checkList.getPodThreeIvLineRemoval().getRemovedDate());
            }
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

        if (checkList.getPodOneMeal() != null) {
            checkListDTO.podOneMeal(checkList.getPodOneMeal().getOption());
            checkListDTO.podOneMeal_remarks(checkList.getPodOneMeal().getRemarks());
        }
        if (checkList.getPodTwoMeal() != null) {
            checkListDTO.podTwoMeal(checkList.getPodTwoMeal().getOption());
            checkListDTO.podTwoMeal_remarks(checkList.getPodTwoMeal().getRemarks());
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

        checkListDTO.dayOfCheckList(checkList.getDayOfCheckList());
        return checkListDTO.build();
    }

}
