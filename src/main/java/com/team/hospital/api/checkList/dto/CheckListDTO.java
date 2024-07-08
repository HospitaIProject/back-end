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
    private BooleanOption pod_Exercise;                        //POD#1 운동
    private BooleanOption postOpDayMeal;                        //Post OP day 식사
    private BooleanOption pod_Meal;                            //POD#1 식사
    private BooleanOption beforeOperationMedicine;              //수술 전 통증 조절약
    private String silt_Itm;                                    //수술 중 SILT or ITM
    private BooleanOption postOpEffectivePainControl;           //Post op Effective Pain Control
    private PainScore pod_PainScore;                           //POD#1 pain score
    private BooleanOption beforeSixtyMinute;                    //피부 절개 60분 전 예방적 항생제 투어
    private BooleanOption maintainTemperature;                  //수술 중 환자 체온 유지
    private BooleanOption volumeOfIntraoperativeInfusion;       //Volume of intraoperative infusion(ml)
    private float bloodLoss;                                    //Blood loss(cc)
    private float urineOutput;                                  //Urine output(cc)
    private float operationTime;                                //Operation time (min)
    private BooleanOption hasPost_Nausea_Vomiting;               //Pot OP Nausea & Vomiting prophylaxis 여부
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
    private String pod_Exercise_remark;                        //POD#1 운동
    private String postOpDayMeal_remark;                        //Post OP day 식사
    private String pod_Meal_remark;                            //POD#1 식사
    private String beforeOperationMedicine_remark;              //수술 전 통증 조절약
    private String silt_Itm_remark;                             //수술 중 SILT or ITM
    private String postOpEffectivePainControl_remark;           //Post op Effective Pain Control
    private String pod_PainScore_remark;                       //POD#1 pain score
    private String beforeSixtyMinute_remark;                    //피부 절개 60분 전 예방적 항생제 투어
    private String maintainTemperature_remark;                  //수술 중 환자 체온 유지
    private String volumeOfIntraoperativeInfusion_remark;       //Volume of intraoperative infusion(ml)
    private String bloodLoss_remark;                            //Blood loss(cc)
    private String urineOutput_remark;                          //Urine output(cc)
    private String operationTime_remark;                        //Operation time (min)
    private String hasPost_Nausea_Vomiting_remark;               //Pot OP Nausea & Vomiting prophylaxis 여부
    private String locate_remark;                               //입원 병동

    public static CheckListDTO toEntity(CheckList checkList) {
        CheckListDTOBuilder checkListDTO = CheckListDTO.builder().patientId(checkList.getCheckListItem().getOperation().getPatient().getId())
                .patientName(checkList.getCheckListItem().getOperation().getPatient().getName())
                .patientNumber(checkList.getCheckListItem().getOperation().getPatient().getPatientNumber())
                .checkListId(checkList.getId())
                .createAt(checkList.getCreatedAt())
                .updatedAt(checkList.getUpdatedAt());

        if (checkList.getExplainBeforeOperation() != null) {
            checkListDTO.explainBeforeOperation(checkList.getExplainBeforeOperation().getOption());
            checkListDTO.explainBeforeOperation_remark(checkList.getExplainBeforeOperation().getRemarks());
        }
        if (checkList.getTakingONSBeforeOperationTwo_Hours() != null) {
            checkListDTO.takingONSBeforeOperationTwo_Hours(checkList.getTakingONSBeforeOperationTwo_Hours().getOption());
            checkListDTO.takingONSBeforeOperationTwo_Hours_remark(checkList.getTakingONSBeforeOperationTwo_Hours().getRemarks());
        }
        if (checkList.getTakingAfterBowelPreparation() != null) {
            checkListDTO.takingAfterBowelPreparation(checkList.getTakingAfterBowelPreparation().getOption());
            checkListDTO.takingAfterBowelPreparation_remark(checkList.getTakingAfterBowelPreparation().getRemarks());
        }
        if (checkList.getPreventionDVT() != null) {
            checkListDTO.preventionDVT(checkList.getPreventionDVT().getOption());
            checkListDTO.preventionDVT_remark(checkList.getPreventionDVT().getRemarks());
        }
        if (checkList.getTakingLaxatives() != null) {
            checkListDTO.takingLaxatives(checkList.getTakingLaxatives().getOption());
            checkListDTO.takingLaxatives_remark(checkList.getTakingLaxatives().getRemarks());
        }
        if (checkList.getChewingGum() != null) {
            checkListDTO.chewingGum(checkList.getChewingGum().getOption());
            checkListDTO.chewingGum_remark(checkList.getChewingGum().getRemarks());
        }
        if (checkList.getDayOfRemoveJP_Drain() != null) {
            checkListDTO.dayOfRemoveJP_Drain(checkList.getDayOfRemoveJP_Drain().getOption());
            checkListDTO.dayOfRemoveJP_Drain_remark(checkList.getDayOfRemoveJP_Drain().getRemarks());
        }
        if (checkList.getReasonByRemoveJP_DrainDelay() != null) {
            checkListDTO.reasonByRemoveJP_DrainDelay(checkList.getReasonByRemoveJP_DrainDelay().getOption());
            checkListDTO.reasonByRemoveJP_DrainDelay_remark(checkList.getReasonByRemoveJP_DrainDelay().getRemarks());
        }
        if (checkList.getDayOfRemoveUrinary_Catheter() != null) {
            checkListDTO.dayOfRemoveUrinary_Catheter(checkList.getDayOfRemoveUrinary_Catheter().getOption());
            checkListDTO.dayOfRemoveUrinary_Catheter_remark(checkList.getDayOfRemoveUrinary_Catheter().getRemarks());
        }
        if (checkList.getReasonByRemoveUrinary_CatheterDelay() != null) {
            checkListDTO.reasonByRemoveUrinary_CatheterDelay(checkList.getReasonByRemoveUrinary_CatheterDelay().getOption());
            checkListDTO.reasonByRemoveUrinary_CatheterDelay_remark(checkList.getReasonByRemoveUrinary_CatheterDelay().getRemarks());
        }
        if (checkList.getAfterOperationLimitIV_Fluid() != null) {
            checkListDTO.afterOperationLimitIV_Fluid(checkList.getAfterOperationLimitIV_Fluid().getOption());
            checkListDTO.afterOperationLimitIV_Fluid_remark(checkList.getAfterOperationLimitIV_Fluid().getRemarks());
        }
        if (checkList.getDayOfRemoveIV_Fluid() != null) {
            checkListDTO.dayOfRemoveIV_Fluid(checkList.getDayOfRemoveIV_Fluid().getOption());
            checkListDTO.dayOfRemoveIV_Fluid_remark(checkList.getDayOfRemoveIV_Fluid().getRemarks());
        }
        if (checkList.getReasonByRemoveIV_FluidDelay() != null) {
            checkListDTO.reasonByRemoveIV_FluidDelay(checkList.getReasonByRemoveIV_FluidDelay().getOption());
            checkListDTO.reasonByRemoveIV_FluidDelay_remark(checkList.getReasonByRemoveIV_FluidDelay().getRemarks());
        }
        if (checkList.getPost_Nausea_Vomiting() != null) {
            checkListDTO.post_Nausea_Vomiting(checkList.getPost_Nausea_Vomiting().getOption());
            checkListDTO.post_Nausea_Vomiting_remark(checkList.getPost_Nausea_Vomiting().getRemarks());
        }
        if (checkList.getPostOpDayExercise() != null) {
            checkListDTO.postOpDayExercise(checkList.getPostOpDayExercise().getOption());
            checkListDTO.postOpDayExercise_remark(checkList.getPostOpDayExercise().getRemarks());
        }
        if (checkList.getPod_Exercise() != null) {
            checkListDTO.pod_Exercise(checkList.getPod_Exercise().getOption());
            checkListDTO.pod_Exercise_remark(checkList.getPod_Exercise().getRemarks());
        }
        if (checkList.getPostOpDayMeal() != null) {
            checkListDTO.postOpDayMeal(checkList.getPostOpDayMeal().getOption());
            checkListDTO.postOpDayMeal_remark(checkList.getPostOpDayMeal().getRemarks());
        }
        if (checkList.getPod_Meal() != null) {
            checkListDTO.pod_Meal(checkList.getPod_Meal().getOption());
            checkListDTO.pod_Meal_remark(checkList.getPod_Meal().getRemarks());
        }
        if (checkList.getBeforeOperationMedicine() != null) {
            checkListDTO.beforeOperationMedicine(checkList.getBeforeOperationMedicine().getOption());
            checkListDTO.beforeOperationMedicine_remark(checkList.getBeforeOperationMedicine().getRemarks());
        }
        if (checkList.getSilt_Itm() != null) {
            checkListDTO.silt_Itm(checkList.getSilt_Itm().getOption());
            checkListDTO.silt_Itm_remark(checkList.getSilt_Itm().getRemarks());
        }
        if (checkList.getPostOpEffectivePainControl() != null) {
            checkListDTO.postOpEffectivePainControl(checkList.getPostOpEffectivePainControl().getOption());
            checkListDTO.postOpEffectivePainControl_remark(checkList.getPostOpEffectivePainControl().getRemarks());
        }
        if (checkList.getPod_PainScore() != null) {
            checkListDTO.pod_PainScore(checkList.getPod_PainScore().getOption());
            checkListDTO.pod_PainScore_remark(checkList.getPod_PainScore().getRemarks());
        }
        if (checkList.getBeforeSixtyMinute() != null) {
            checkListDTO.beforeSixtyMinute(checkList.getBeforeSixtyMinute().getOption());
            checkListDTO.beforeSixtyMinute_remark(checkList.getBeforeSixtyMinute().getRemarks());
        }
        if (checkList.getMaintainTemperature() != null) {
            checkListDTO.maintainTemperature(checkList.getMaintainTemperature().getOption());
            checkListDTO.maintainTemperature_remark(checkList.getMaintainTemperature().getRemarks());
        }
        if (checkList.getVolumeOfIntraoperativeInfusion() != null) {
            checkListDTO.volumeOfIntraoperativeInfusion(checkList.getVolumeOfIntraoperativeInfusion().getOption());
            checkListDTO.volumeOfIntraoperativeInfusion_remark(checkList.getVolumeOfIntraoperativeInfusion().getRemarks());
        }
        if (checkList.getBloodLoss() != null) {
            checkListDTO.bloodLoss(checkList.getBloodLoss().getOption());
            checkListDTO.bloodLoss_remark(checkList.getBloodLoss().getRemarks());
        }
        if (checkList.getUrineOutput() != null) {
            checkListDTO.urineOutput(checkList.getUrineOutput().getOption());
            checkListDTO.urineOutput_remark(checkList.getUrineOutput().getRemarks());
        }
        if (checkList.getOperationTime() != null) {
            checkListDTO.operationTime(checkList.getOperationTime().getOption());
            checkListDTO.operationTime_remark(checkList.getOperationTime().getRemarks());
        }
        if (checkList.getHasPost_Nausea_Vomiting() != null) {
            checkListDTO.hasPost_Nausea_Vomiting(checkList.getHasPost_Nausea_Vomiting().getOption());
            checkListDTO.hasPost_Nausea_Vomiting_remark(checkList.getHasPost_Nausea_Vomiting().getRemarks());
        }
        if (checkList.getLocate() != null) {
            checkListDTO.locate(checkList.getLocate().getOption());
            checkListDTO.locate_remark(checkList.getLocate().getRemarks());
        }

        return checkListDTO.build();
    }

    public static List<CheckListDTO> buildComplianceDTOs(List<CheckList> list) {
        return list.stream()
                .map(CheckListDTO::toEntity)
                .collect(Collectors.toList());
    }
}
