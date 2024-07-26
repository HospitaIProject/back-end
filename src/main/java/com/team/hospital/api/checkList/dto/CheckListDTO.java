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

    private Long patientId;                                     //환자 ID
    private String patientName;                                 //환자 이름
    private Long patientNumber;                                 //환자 번호
    private Long checkListId;                                   //checkListId

    private LocalDateTime createAt;                             //생성 날짜
    private LocalDateTime updatedAt;                            //수정 날짜

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

    private LocalDate dayOfCheckList;                     // 몇 일차 체크리스트 작성

    // Pod Exercise
    private String postExercise_remarks;
    private String podOneExercise_remarks;
    private String podTwoExercise_remarks;
    private String podThreeExercise_remarks;

    // Pod Meal
    private String postMeal_remarks;
    private String podOneMeal_remarks;
    private String podTwoMeal_remarks;

    public static CheckListDTO toEntity(CheckList checkList) {
        if (checkList == null) return null;

        CheckListDTOBuilder checkListDTO = CheckListDTO.builder()
                .patientId(checkList.getCheckListItem().getOperation().getPatient().getId())
                .patientName(checkList.getCheckListItem().getOperation().getPatient().getName())
                .patientNumber(checkList.getCheckListItem().getOperation().getPatient().getPatientNumber())
                .checkListId(checkList.getId())
                .createAt(checkList.getCreatedAt())
                .updatedAt(checkList.getUpdatedAt());


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

        checkListDTO.dayOfCheckList(checkList.getDayOfCheckList());
        return checkListDTO.build();
    }

}
