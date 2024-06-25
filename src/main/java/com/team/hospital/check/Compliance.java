package com.team.hospital.check;

import com.team.hospital.check.enumType.BooleanOption;
import com.team.hospital.check.enumType.PainScore;
import com.team.hospital.check.enumType.Pod;
import com.team.hospital.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Compliance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "compliance_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private BooleanOption explainBeforeOperation;                 //ERAS 수술 전 설명

    @Enumerated(EnumType.STRING)
    private BooleanOption takingONSBeforeOperationTwo_Hours;      //수술 2시간 전 ONS 복용여뷰

    @Enumerated(EnumType.STRING)
    private BooleanOption takingAfterBowelPreparation;          //Bowel Preparation 후 경장영양액 복용여부

    @Enumerated(EnumType.STRING)
    private BooleanOption preventionDVT;                        //DVT 예방

    @Enumerated(EnumType.STRING)
    private BooleanOption takingLaxatives;                      //Laxatives 복용

    @Enumerated(EnumType.STRING)
    private BooleanOption chewingGum;                           //껌

    @Enumerated(EnumType.STRING)
    private Pod dayOfRemoveJP_Drain;                            //JP drain 제거일

    @Enumerated(EnumType.STRING)
    private BooleanOption reasonByRemoveJP_DrainDelay;          //JP drain 제거 지연 이유

    @Enumerated(EnumType.STRING)
    private BooleanOption dayOfRemoveUrinary_Catheter;          //Urinary catheter 제거일

    @Enumerated(EnumType.STRING)
    private BooleanOption reasonByRemoveUrinary_CatheterDelay;  //Urinary catheter 제거 지연 이유

    @Enumerated(EnumType.STRING)
    private BooleanOption afterOperationLimitIV_Fluid;            //수술 후 IV fluid 제한

    @Enumerated(EnumType.STRING)
    private BooleanOption dayOfRemoveIV_Fluid;                  //IV fluid 제거일

    @Enumerated(EnumType.STRING)
    private BooleanOption reasonByRemoveIV_FluidDelay;          //IV fluid 제거 지연 이유

    @Enumerated(EnumType.STRING)
    private BooleanOption post_Nausea_Vomiting;                 //Post OP Nausea & Vomiting prophylaxis

    @Enumerated(EnumType.STRING)
    private BooleanOption postOpDayExercise;                    //Post OP day 운동

    @Enumerated(EnumType.STRING)
    private BooleanOption pod_1Exercise;                        //POD#1 운동

    @Enumerated(EnumType.STRING)
    private BooleanOption pod_2Exercise;                        //POD#2 운동

    @Enumerated(EnumType.STRING)
    private BooleanOption pod_3Exercise;                        //POD#3 운동

    @Enumerated(EnumType.STRING)
    private BooleanOption postOpDayMeal;                        //Post OP day 식사

    @Enumerated(EnumType.STRING)
    private BooleanOption pod_1Meal;                            //POD#1 식사

    @Enumerated(EnumType.STRING)
    private BooleanOption pod_2Meal;                            //POD#2 식사

    @Enumerated(EnumType.STRING)
    private BooleanOption beforeOperationMedicine;                //수술 전 통증 조절약

    @Enumerated(EnumType.STRING)
    private String silt_Itm;                                    //수술 중 SILT or ITM

    @Enumerated(EnumType.STRING)
    private BooleanOption postOpEffectivePainControl;           //Post op Effective Pain Control

    @Enumerated(EnumType.STRING)
    private PainScore pod_1PainScore;                           //POD#1 pain score

    @Enumerated(EnumType.STRING)
    private PainScore pod_2PainScore;                           //POD#2 pain score

    @Enumerated(EnumType.STRING)
    private PainScore pod_3PainScore;                           //POD#3 pain score

    @Enumerated(EnumType.STRING)
    private BooleanOption beforeSixtyMinute;                    //피부 절개 60분 전 예방적 항생제 투어

    @Enumerated(EnumType.STRING)
    private BooleanOption maintainTemperature;                  //수술 중 환자 체온 유지

    @Enumerated(EnumType.STRING)
    private BooleanOption volumeOfIntraoperativeInfusion;       //Volume of intraoperative infusion(ml)

    @Enumerated(EnumType.STRING)
    private float bloodLoss;                                    //Blood loss(cc)

    @Enumerated(EnumType.STRING)
    private float urineOutput;                                  //Urine output(cc)

    @Enumerated(EnumType.STRING)
    private float operationTime;                                //Operation time (min)

    @Enumerated(EnumType.STRING)
    private BooleanOption isPost_Nausea_Vomiting;               //Pot OP Nausea & Vomiting prophylaxis 여부

    @Enumerated(EnumType.STRING)
    private String locate;                                      //입원 병동

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

}
