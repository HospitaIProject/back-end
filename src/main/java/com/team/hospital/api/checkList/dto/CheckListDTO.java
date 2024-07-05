package com.team.hospital.api.checkList.dto;

import com.team.hospital.api.checkList.CheckList;
import com.team.hospital.api.checkList.enumType.BooleanOption;
import com.team.hospital.api.checkList.enumType.PainScore;
import com.team.hospital.api.checkList.enumType.Pod;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Builder
@Getter
public class CheckListDTO {

    private Long patientId;                                     //환자 ID
    private String patientName;                                 //환자 이름
    private Long patientNumber;                                 //환자 번호
    private Long checkListId;                                   //checkListId

    private LocalDateTime createAt;                             //생성 날짜
    private LocalDateTime updatedAt;                            //수정 날짜

    private BooleanOption explainBeforeOperation;                 //ERAS 수술 전 설명
    private BooleanOption takingONSBeforeOperationTwo_Hours;      //수술 2시간 전 ONS 복용여뷰
    private BooleanOption takingAfterBowelPreparation;           //Bowel Preparation 후 경장영양액 복용여부
    private BooleanOption preventionDVT;                         //DVT 예방

    private BooleanOption takingLaxatives;                       //Laxatives 복용
    private BooleanOption chewingGum;                            //껌
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
    private BooleanOption isPost_Nausea_Vomiting;               //Pot OP Nausea & Vomiting prophylaxis 여부
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
    private String isPost_Nausea_Vomiting_remark;               //Pot OP Nausea & Vomiting prophylaxis 여부
    private String locate_remark;                               //입원 병동

    public static CheckListDTO toEntity(CheckList checkList){
        return CheckListDTO.builder()
                .patientId(checkList.getCheckListItem().getOperation().getPatient().getId())
                .patientName(checkList.getCheckListItem().getOperation().getPatient().getName())
                .patientNumber(checkList.getCheckListItem().getOperation().getPatient().getPatientNumber())
                .checkListId(checkList.getId())
                .createAt(checkList.getCreatedAt())
                .updatedAt(checkList.getUpdatedAt())
                .explainBeforeOperation(checkList.getExplainBeforeOperation().getOption())
                .explainBeforeOperation_remark(checkList.getExplainBeforeOperation().getRemarks())
                .takingONSBeforeOperationTwo_Hours(checkList.getTakingONSBeforeOperationTwo_Hours().getOption())
                .takingONSBeforeOperationTwo_Hours_remark(checkList.getTakingONSBeforeOperationTwo_Hours().getRemarks())
                .takingAfterBowelPreparation(checkList.getTakingAfterBowelPreparation().getOption())
                .takingAfterBowelPreparation_remark(checkList.getTakingAfterBowelPreparation().getRemarks())
                .preventionDVT(checkList.getPreventionDVT().getOption())
                .preventionDVT_remark(checkList.getPreventionDVT().getRemarks())
                .takingLaxatives(checkList.getTakingLaxatives().getOption())
                .takingLaxatives_remark(checkList.getTakingLaxatives().getRemarks())
                .chewingGum(checkList.getChewingGum().getOption())
                .chewingGum_remark(checkList.getChewingGum().getRemarks())
                .dayOfRemoveJP_Drain(checkList.getDayOfRemoveJP_Drain().getOption())
                .dayOfRemoveJP_Drain_remark(checkList.getDayOfRemoveJP_Drain().getRemarks())
                .reasonByRemoveJP_DrainDelay(checkList.getReasonByRemoveJP_DrainDelay().getOption())
                .reasonByRemoveJP_DrainDelay_remark(checkList.getReasonByRemoveJP_DrainDelay().getRemarks())
                .dayOfRemoveUrinary_Catheter(checkList.getDayOfRemoveUrinary_Catheter().getOption())
                .dayOfRemoveUrinary_Catheter_remark(checkList.getDayOfRemoveUrinary_Catheter().getRemarks())
                .reasonByRemoveUrinary_CatheterDelay(checkList.getReasonByRemoveUrinary_CatheterDelay().getOption())
                .reasonByRemoveUrinary_CatheterDelay_remark(checkList.getReasonByRemoveUrinary_CatheterDelay().getRemarks())
                .afterOperationLimitIV_Fluid(checkList.getAfterOperationLimitIV_Fluid().getOption())
                .afterOperationLimitIV_Fluid_remark(checkList.getAfterOperationLimitIV_Fluid().getRemarks())
                .dayOfRemoveIV_Fluid(checkList.getDayOfRemoveIV_Fluid().getOption())
                .dayOfRemoveIV_Fluid_remark(checkList.getDayOfRemoveIV_Fluid().getRemarks())
                .reasonByRemoveIV_FluidDelay(checkList.getReasonByRemoveIV_FluidDelay().getOption())
                .reasonByRemoveIV_FluidDelay_remark(checkList.getReasonByRemoveIV_FluidDelay().getRemarks())
                .post_Nausea_Vomiting(checkList.getPost_Nausea_Vomiting().getOption())
                .post_Nausea_Vomiting_remark(checkList.getPost_Nausea_Vomiting().getRemarks())
                .postOpDayExercise(checkList.getPostOpDayExercise().getOption())
                .postOpDayExercise_remark(checkList.getPostOpDayExercise().getRemarks())
                .pod_1Exercise(checkList.getPod_1Exercise().getOption())
                .pod_1Exercise_remark(checkList.getPod_1Exercise().getRemarks())
                .pod_2Exercise(checkList.getPod_2Exercise().getOption())
                .pod_2Exercise_remark(checkList.getPod_2Exercise().getRemarks())
                .pod_3Exercise(checkList.getPod_3Exercise().getOption())
                .pod_3Exercise_remark(checkList.getPod_3Exercise().getRemarks())
                .postOpDayMeal(checkList.getPostOpDayMeal().getOption())
                .postOpDayMeal_remark(checkList.getPostOpDayMeal().getRemarks())
                .pod_1Meal(checkList.getPod_1Meal().getOption())
                .pod_1Meal_remark(checkList.getPod_1Meal().getRemarks())
                .pod_2Meal(checkList.getPod_2Meal().getOption())
                .pod_2Meal_remark(checkList.getPod_2Meal().getRemarks())
                .beforeOperationMedicine(checkList.getBeforeOperationMedicine().getOption())
                .beforeOperationMedicine_remark(checkList.getBeforeOperationMedicine().getRemarks())
                .silt_Itm(checkList.getSilt_Itm().getOption())
                .silt_Itm_remark(checkList.getSilt_Itm().getRemarks())
                .postOpEffectivePainControl(checkList.getPostOpEffectivePainControl().getOption())
                .postOpEffectivePainControl_remark(checkList.getPostOpEffectivePainControl().getRemarks())
                .pod_1PainScore(checkList.getPod_1PainScore().getOption())
                .pod_1PainScore_remark(checkList.getPod_1PainScore().getRemarks())
                .pod_2PainScore(checkList.getPod_2PainScore().getOption())
                .pod_2PainScore_remark(checkList.getPod_2PainScore().getRemarks())
                .pod_3PainScore(checkList.getPod_3PainScore().getOption())
                .pod_3PainScore_remark(checkList.getPod_3PainScore().getRemarks())
                .beforeSixtyMinute(checkList.getBeforeSixtyMinute().getOption())
                .beforeSixtyMinute_remark(checkList.getBeforeSixtyMinute().getRemarks())
                .maintainTemperature(checkList.getMaintainTemperature().getOption())
                .maintainTemperature_remark(checkList.getMaintainTemperature().getRemarks())
                .volumeOfIntraoperativeInfusion(checkList.getVolumeOfIntraoperativeInfusion().getOption())
                .volumeOfIntraoperativeInfusion_remark(checkList.getVolumeOfIntraoperativeInfusion().getRemarks())
                .bloodLoss(checkList.getBloodLoss().getOption())
                .bloodLoss_remark(checkList.getBloodLoss().getRemarks())
                .urineOutput(checkList.getUrineOutput().getOption())
                .urineOutput_remark(checkList.getUrineOutput().getRemarks())
                .operationTime(checkList.getOperationTime().getOption())
                .operationTime_remark(checkList.getOperationTime().getRemarks())
                .isPost_Nausea_Vomiting(checkList.getIsPost_Nausea_Vomiting().getOption())
                .isPost_Nausea_Vomiting_remark(checkList.getIsPost_Nausea_Vomiting().getRemarks())
                .locate(checkList.getLocate().getOption())
                .locate_remark(checkList.getLocate().getRemarks())
                .build();
    }

    public static List<CheckListDTO> buildComplianceDTOs(List<CheckList> list){
        return list.stream()
                .map(CheckListDTO::toEntity)
                .collect(Collectors.toList());
    }
}
