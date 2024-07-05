package com.team.hospital.api.checkListItem.dto;

import com.team.hospital.api.checkListItem.CheckListItem;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CheckListItemDTO {

    private Long checkListItemId;

    private boolean explainBeforeOperation;                       //EAS 수술전 설명
    private boolean takingONSBeforeOperationTwo_Hours;            //수술 2시간 전 ONS 복용여부
    private boolean takingAfterBowelPreparation;                  //Bowel preparation 후 ONS 경장영양액 복용여부

    private boolean preventionDVT;                                //DVT 예방
    private boolean takingLaxatives;                              //Laxatives 복용
    private boolean chewingGum;                                   //Chewing gum
    private boolean dayOfRemoveJP_Drain;                          //JP Drain 제거일
    private boolean reasonByRemoveJP_DrainDelay;                  //JP Drain 제거 지연 사유
    private boolean dayOfRemoveUrinary_Catheter;                  //Urinary catheter 제거일
    private boolean reasonByRemoveUrinary_CatheterDelay;          //Urinary catheter 제거 지연 사유
    private boolean afterOperationLimitIV_Fluid;                  //수술 후 IV fluid 제한
    private boolean dayOfRemoveIV_Fluid;                          //IV fluid 제거일
    private boolean reasonByRemoveIV_FluidDelay;                  //IV fluid 제거 지연 이유
    private boolean post_Nausea_Vomiting;                         //Post OP Nausea & Vomiting prophylaxis
    private boolean postOpDayExercise;                            //Post OP day 운동
    private boolean pod_Exercise;                                //POD#1 운동
    private boolean postOpDayMeal;                                //Post OP day 식사
    private boolean pod_Meal;                                    //POD#1 식사
    private boolean beforeOperationMedicine;                      //수술 전 통증 조절약
    private boolean silt_Itm;
    private boolean postOpEffectivePainControl;
    private boolean pod_PainScore;
    private boolean beforeSixtyMinute;
    private boolean maintainTemperature;
    private boolean volumeOfIntraoperativeInfusion;
    private boolean bloodLoss;
    private boolean urineOutput;
    private boolean operationTime;
    private boolean isPost_Nausea_Vomiting;
    private boolean locate;

    public static CheckListItemDTO toEntity(CheckListItem checkListItem) {
        return CheckListItemDTO.builder()
                .checkListItemId(checkListItem.getId())
                .explainBeforeOperation(checkListItem.isExplainBeforeOperation())
                .takingONSBeforeOperationTwo_Hours(checkListItem.isTakingONSBeforeOperationTwo_Hours())
                .takingAfterBowelPreparation(checkListItem.isTakingAfterBowelPreparation())
                .preventionDVT(checkListItem.isPreventionDVT())
                .takingLaxatives(checkListItem.isTakingLaxatives())
                .chewingGum(checkListItem.isChewingGum())
                .dayOfRemoveJP_Drain(checkListItem.isDayOfRemoveJP_Drain())
                .reasonByRemoveJP_DrainDelay(checkListItem.isReasonByRemoveJP_DrainDelay())
                .dayOfRemoveUrinary_Catheter(checkListItem.isDayOfRemoveUrinary_Catheter())
                .reasonByRemoveUrinary_CatheterDelay(checkListItem.isReasonByRemoveUrinary_CatheterDelay())
                .afterOperationLimitIV_Fluid(checkListItem.isAfterOperationLimitIV_Fluid())
                .dayOfRemoveIV_Fluid(checkListItem.isDayOfRemoveIV_Fluid())
                .reasonByRemoveIV_FluidDelay(checkListItem.isReasonByRemoveIV_FluidDelay())
                .post_Nausea_Vomiting(checkListItem.isPost_Nausea_Vomiting())
                .postOpDayExercise(checkListItem.isPostOpDayExercise())
                .pod_Exercise(checkListItem.isPod_Exercise())
                .postOpDayMeal(checkListItem.isPostOpDayMeal())
                .pod_Meal(checkListItem.isPod_Meal())
                .beforeOperationMedicine(checkListItem.isBeforeOperationMedicine())
                .silt_Itm(checkListItem.isSilt_Itm())
                .postOpEffectivePainControl(checkListItem.isPostOpEffectivePainControl())
                .pod_PainScore(checkListItem.isPod_PainScore())
                .beforeSixtyMinute(checkListItem.isBeforeSixtyMinute())
                .maintainTemperature(checkListItem.isMaintainTemperature())
                .volumeOfIntraoperativeInfusion(checkListItem.isVolumeOfIntraoperativeInfusion())
                .bloodLoss(checkListItem.isBloodLoss())
                .urineOutput(checkListItem.isUrineOutput())
                .operationTime(checkListItem.isOperationTime())
                .isPost_Nausea_Vomiting(checkListItem.isPost_Nausea_Vomiting())
                .locate(checkListItem.isLocate())
                .build();
    }
}
