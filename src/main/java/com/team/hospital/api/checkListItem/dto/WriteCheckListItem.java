package com.team.hospital.api.checkListItem.dto;

import lombok.Getter;
@Getter
public class WriteCheckListItem {

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
}
