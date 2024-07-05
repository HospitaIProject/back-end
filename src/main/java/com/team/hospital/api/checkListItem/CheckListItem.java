package com.team.hospital.api.checkListItem;

import com.team.hospital.api.checkListItem.dto.WriteCheckListItem;
import com.team.hospital.api.operation.Operation;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CheckListItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "check_list_item")
    private Long id;

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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "operation_id")
    private Operation operation;

    public static CheckListItem toEntity(WriteCheckListItem write, Operation operation) {
        return CheckListItem.builder()
                .explainBeforeOperation(write.isExplainBeforeOperation())
                .takingONSBeforeOperationTwo_Hours(write.isTakingONSBeforeOperationTwo_Hours())
                .takingAfterBowelPreparation(write.isTakingAfterBowelPreparation())
                .preventionDVT(write.isPreventionDVT())
                .takingLaxatives(write.isTakingLaxatives())
                .chewingGum(write.isChewingGum())
                .dayOfRemoveJP_Drain(write.isDayOfRemoveJP_Drain())
                .reasonByRemoveJP_DrainDelay(write.isReasonByRemoveJP_DrainDelay())
                .dayOfRemoveUrinary_Catheter(write.isDayOfRemoveUrinary_Catheter())
                .reasonByRemoveUrinary_CatheterDelay(write.isReasonByRemoveUrinary_CatheterDelay())
                .afterOperationLimitIV_Fluid(write.isAfterOperationLimitIV_Fluid())
                .dayOfRemoveIV_Fluid(write.isDayOfRemoveIV_Fluid())
                .reasonByRemoveIV_FluidDelay(write.isReasonByRemoveIV_FluidDelay())
                .post_Nausea_Vomiting(write.isPost_Nausea_Vomiting())
                .postOpDayExercise(write.isPostOpDayExercise())
                .pod_Exercise(write.isPod_Exercise())
                .postOpDayMeal(write.isPostOpDayMeal())
                .pod_Meal(write.isPod_Meal())
                .beforeOperationMedicine(write.isBeforeOperationMedicine())
                .silt_Itm(write.isSilt_Itm())
                .postOpEffectivePainControl(write.isPostOpEffectivePainControl())
                .pod_PainScore(write.isPod_PainScore())
                .beforeSixtyMinute(write.isBeforeSixtyMinute())
                .maintainTemperature(write.isMaintainTemperature())
                .volumeOfIntraoperativeInfusion(write.isVolumeOfIntraoperativeInfusion())
                .bloodLoss(write.isBloodLoss())
                .urineOutput(write.isUrineOutput())
                .operationTime(write.isOperationTime())
                .isPost_Nausea_Vomiting(write.isPost_Nausea_Vomiting())
                .locate(write.isLocate())
                .operation(operation)
                .build();
    }
}
