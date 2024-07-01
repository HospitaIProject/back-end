package com.team.hospital.check.dto;

import com.team.hospital.check.Compliance;
import com.team.hospital.check.enumType.BooleanOption;
import com.team.hospital.check.enumType.PainScore;
import com.team.hospital.check.enumType.Pod;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Builder
public class ComplianceDTO {

    private Long patientId;                                       //환자 ID
    private String patientName;                                   //환자 이름
    private Long complianceId;                                    //complianceId

    private LocalDateTime createAt;                               //생성 날짜
    private LocalDateTime updatedAt;                              //수정 날짜

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

    public static ComplianceDTO toEntity(Compliance compliance){
        return ComplianceDTO.builder()
                .patientId(compliance.getPatient().getId())
                .patientName(compliance.getPatient().getName())
                .complianceId(compliance.getId())
                .createAt(compliance.getCreatedAt())
                .updatedAt(compliance.getUpdatedAt())
                .explainBeforeOperation(compliance.getExplainBeforeOperation().getOption())
                .explainBeforeOperation_remark(compliance.getExplainBeforeOperation().getRemarks())
                .takingONSBeforeOperationTwo_Hours(compliance.getTakingONSBeforeOperationTwo_Hours().getOption())
                .takingONSBeforeOperationTwo_Hours_remark(compliance.getTakingONSBeforeOperationTwo_Hours().getRemarks())
                .takingAfterBowelPreparation(compliance.getTakingAfterBowelPreparation().getOption())
                .takingAfterBowelPreparation_remark(compliance.getTakingAfterBowelPreparation().getRemarks())
                .preventionDVT(compliance.getPreventionDVT().getOption())
                .preventionDVT_remark(compliance.getPreventionDVT().getRemarks())
                .takingLaxatives(compliance.getTakingLaxatives().getOption())
                .takingLaxatives_remark(compliance.getTakingLaxatives().getRemarks())
                .chewingGum(compliance.getChewingGum().getOption())
                .chewingGum_remark(compliance.getChewingGum().getRemarks())
                .dayOfRemoveJP_Drain(compliance.getDayOfRemoveJP_Drain().getOption())
                .dayOfRemoveJP_Drain_remark(compliance.getDayOfRemoveJP_Drain().getRemarks())
                .reasonByRemoveJP_DrainDelay(compliance.getReasonByRemoveJP_DrainDelay().getOption())
                .reasonByRemoveJP_DrainDelay_remark(compliance.getReasonByRemoveJP_DrainDelay().getRemarks())
                .dayOfRemoveUrinary_Catheter(compliance.getDayOfRemoveUrinary_Catheter().getOption())
                .dayOfRemoveUrinary_Catheter_remark(compliance.getDayOfRemoveUrinary_Catheter().getRemarks())
                .reasonByRemoveUrinary_CatheterDelay(compliance.getReasonByRemoveUrinary_CatheterDelay().getOption())
                .reasonByRemoveUrinary_CatheterDelay_remark(compliance.getReasonByRemoveUrinary_CatheterDelay().getRemarks())
                .afterOperationLimitIV_Fluid(compliance.getAfterOperationLimitIV_Fluid().getOption())
                .afterOperationLimitIV_Fluid_remark(compliance.getAfterOperationLimitIV_Fluid().getRemarks())
                .dayOfRemoveIV_Fluid(compliance.getDayOfRemoveIV_Fluid().getOption())
                .dayOfRemoveIV_Fluid_remark(compliance.getDayOfRemoveIV_Fluid().getRemarks())
                .reasonByRemoveIV_FluidDelay(compliance.getReasonByRemoveIV_FluidDelay().getOption())
                .reasonByRemoveIV_FluidDelay_remark(compliance.getReasonByRemoveIV_FluidDelay().getRemarks())
                .post_Nausea_Vomiting(compliance.getPost_Nausea_Vomiting().getOption())
                .post_Nausea_Vomiting_remark(compliance.getPost_Nausea_Vomiting().getRemarks())
                .postOpDayExercise(compliance.getPostOpDayExercise().getOption())
                .postOpDayExercise_remark(compliance.getPostOpDayExercise().getRemarks())
                .pod_1Exercise(compliance.getPod_1Exercise().getOption())
                .pod_1Exercise_remark(compliance.getPod_1Exercise().getRemarks())
                .pod_2Exercise(compliance.getPod_2Exercise().getOption())
                .pod_2Exercise_remark(compliance.getPod_2Exercise().getRemarks())
                .pod_3Exercise(compliance.getPod_3Exercise().getOption())
                .pod_3Exercise_remark(compliance.getPod_3Exercise().getRemarks())
                .postOpDayMeal(compliance.getPostOpDayMeal().getOption())
                .postOpDayMeal_remark(compliance.getPostOpDayMeal().getRemarks())
                .pod_1Meal(compliance.getPod_1Meal().getOption())
                .pod_1Meal_remark(compliance.getPod_1Meal().getRemarks())
                .pod_2Meal(compliance.getPod_2Meal().getOption())
                .pod_2Meal_remark(compliance.getPod_2Meal().getRemarks())
                .beforeOperationMedicine(compliance.getBeforeOperationMedicine().getOption())
                .beforeOperationMedicine_remark(compliance.getBeforeOperationMedicine().getRemarks())
                .silt_Itm(compliance.getSilt_Itm().getOption())
                .silt_Itm_remark(compliance.getSilt_Itm().getRemarks())
                .postOpEffectivePainControl(compliance.getPostOpEffectivePainControl().getOption())
                .postOpEffectivePainControl_remark(compliance.getPostOpEffectivePainControl().getRemarks())
                .pod_1PainScore(compliance.getPod_1PainScore().getOption())
                .pod_1PainScore_remark(compliance.getPod_1PainScore().getRemarks())
                .pod_2PainScore(compliance.getPod_2PainScore().getOption())
                .pod_2PainScore_remark(compliance.getPod_2PainScore().getRemarks())
                .pod_3PainScore(compliance.getPod_3PainScore().getOption())
                .pod_3PainScore_remark(compliance.getPod_3PainScore().getRemarks())
                .beforeSixtyMinute(compliance.getBeforeSixtyMinute().getOption())
                .beforeSixtyMinute_remark(compliance.getBeforeSixtyMinute().getRemarks())
                .maintainTemperature(compliance.getMaintainTemperature().getOption())
                .maintainTemperature_remark(compliance.getMaintainTemperature().getRemarks())
                .volumeOfIntraoperativeInfusion(compliance.getVolumeOfIntraoperativeInfusion().getOption())
                .volumeOfIntraoperativeInfusion_remark(compliance.getVolumeOfIntraoperativeInfusion().getRemarks())
                .bloodLoss(compliance.getBloodLoss().getOption())
                .bloodLoss_remark(compliance.getBloodLoss().getRemarks())
                .urineOutput(compliance.getUrineOutput().getOption())
                .urineOutput_remark(compliance.getUrineOutput().getRemarks())
                .operationTime(compliance.getOperationTime().getOption())
                .operationTime_remark(compliance.getOperationTime().getRemarks())
                .isPost_Nausea_Vomiting(compliance.getIsPost_Nausea_Vomiting().getOption())
                .isPost_Nausea_Vomiting_remark(compliance.getIsPost_Nausea_Vomiting().getRemarks())
                .locate(compliance.getLocate().getOption())
                .locate_remark(compliance.getLocate().getRemarks())
                .build();
    }

    public static List<ComplianceDTO> toEntities(List<Compliance> list){
        return list.stream()
                .map(ComplianceDTO::toEntity)
                .collect(Collectors.toList());
    }
}
