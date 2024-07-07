package com.team.hospital.api.checkList.dto;

import com.team.hospital.api.checkList.enumType.BooleanOption;
import com.team.hospital.api.checkList.enumType.PainScore;
import com.team.hospital.api.checkList.enumType.Pod;
import lombok.Getter;

@Getter
public class WriteCheckList {

    private BooleanOption explainBeforeOperation;               //ERAS 수술 전 설명
    private BooleanOption takingONSBeforeOperationTwo_Hours;    //수술 2시간 전 ONS 복용여뷰
    private BooleanOption takingAfterBowelPreparation;          //Bowel Preparation 후 경장영양액 복용여부
    private BooleanOption preventionDVT;                        //DVT 예방
    private BooleanOption takingLaxatives;                      //Laxatives 복용
    private BooleanOption chewingGum;                           //껌
    private Pod dayOfRemoveJP_Drain;                            //JP drain 제거일
    private BooleanOption reasonByRemoveJP_DrainDelay;          //JP drain 제거 지연 이유
    private BooleanOption dayOfRemoveUrinary_Catheter;          //Urinary catheter 제거일
    private BooleanOption reasonByRemoveUrinary_CatheterDelay;  //Urinary catheter 제거 지연 이유
    private BooleanOption afterOperationLimitIV_Fluid;          //수술 후 IV fluid 제한
    private BooleanOption dayOfRemoveIV_Fluid;                  //IV fluid 제거일
    private BooleanOption reasonByRemoveIV_FluidDelay;          //IV fluid 제거 지연 이유
    private BooleanOption post_Nausea_Vomiting;                 //Post OP Nausea & Vomiting prophylaxis
    private BooleanOption postOpDayExercise;                    //Post OP day 운동
    private BooleanOption pod_1Exercise;                        //POD#1 운동
    private BooleanOption pod_2Exercise;                        //POD#2 운동
    private BooleanOption pod_3Exercise;                        //POD#3 운동
    private BooleanOption postOpDayMeal;                        //Post OP day 식사
    private BooleanOption pod_1Meal;                            //POD#1 식사
    private BooleanOption pod_2Meal;                            //POD#2 식사
    private BooleanOption beforeOperationMedicine;              //수술 전 통증 조절약
    private String silt_Itm;                                    //수술 중 SILT or ITM
    private BooleanOption postOpEffectivePainControl;           //Post op Effective Pain Control
    private PainScore pod_1PainScore;                           //POD#1 pain score
    private PainScore pod_2PainScore;                           //POD#2 pain score
    private PainScore pod_3PainScore;                           //POD#3 pain score
    private BooleanOption beforeSixtyMinute;                    //피부 절개 60분 전 예방적 항생제 투어
    private BooleanOption maintainTemperature;                  //수술 중 환자 체온 유지
    private BooleanOption volumeOfIntraoperativeInfusion;       //Volume of intraoperative infusion(ml)
    private float bloodLoss;                                    //Blood loss(cc)
    private float urineOutput;                                  //Urine output(cc)
    private float operationTime;                                //Operation time (min)
    private BooleanOption isPost_Nausea_Vomiting_2;               //Pot OP Nausea & Vomiting prophylaxis 여부
    private String locate;                                      //입원 병동

    //비고 필드
    private String explainBeforeOperation_remark;               //ERAS 수술 전 설명
    private String takingONSBeforeOperationTwo_Hours_remark;    //수술 2시간 전 ONS 복용여뷰
    private String takingAfterBowelPreparation_remark;          //Bowel Preparation 후 경장영양액 복용여부
    private String preventionDVT_remark;                        //DVT 예방
    private String takingLaxatives_remark;                      //Laxatives 복용
    private String chewingGum_remark;                           //껌
    private String dayOfRemoveJP_Drain_remark;                  //JP drain 제거일
    private String reasonByRemoveJP_DrainDelay_remark;          //JP drain 제거 지연 이유
    private String dayOfRemoveUrinary_Catheter_remark;          //Urinary catheter 제거일
    private String reasonByRemoveUrinary_CatheterDelay_remark;  //Urinary catheter 제거 지연 이유
    private String afterOperationLimitIV_Fluid_remark;          //수술 후 IV fluid 제한
    private String dayOfRemoveIV_Fluid_remark;                  //IV fluid 제거일
    private String reasonByRemoveIV_FluidDelay_remark;          //IV fluid 제거 지연 이유
    private String post_Nausea_Vomiting_remark;                 //Post OP Nausea & Vomiting prophylaxis
    private String postOpDayExercise_remark;                    //Post OP day 운동
    private String pod_1Exercise_remark;                        //POD#1 운동
    private String pod_2Exercise_remark;                        //POD#2 운동
    private String pod_3Exercise_remark;                        //POD#3 운동
    private String postOpDayMeal_remark;                        //Post OP day 식사
    private String pod_1Meal_remark;                            //POD#1 식사
    private String pod_2Meal_remark;                            //POD#2 식사
    private String beforeOperationMedicine_remark;              //수술 전 통증 조절약
    private String silt_Itm_remark;                             //수술 중 SILT or ITM
    private String postOpEffectivePainControl_remark;           //Post op Effective Pain Control
    private String pod_1PainScore_remark;                       //POD#1 pain score
    private String pod_2PainScore_remark;                       //POD#2 pain score
    private String pod_3PainScore_remark;                       //POD#3 pain score
    private String beforeSixtyMinute_remark;                    //피부 절개 60분 전 예방적 항생제 투어
    private String maintainTemperature_remark;                  //수술 중 환자 체온 유지
    private String volumeOfIntraoperativeInfusion_remark;       //Volume of intraoperative infusion(ml)
    private String bloodLoss_remark;                            //Blood loss(cc)
    private String urineOutput_remark;                          //Urine output(cc)
    private String operationTime_remark;                        //Operation time (min)
    private String isPost_Nausea_Vomiting_remark_2;               //Pot OP Nausea & Vomiting prophylaxis 여부
    private String locate_remark;                               //입원 병동

}
