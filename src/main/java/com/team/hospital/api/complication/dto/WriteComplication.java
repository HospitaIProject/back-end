package com.team.hospital.api.complication.dto;

import com.team.hospital.api.complication.enumType.CDClassification;
import lombok.Getter;

import java.util.List;

@Getter
public class WriteComplication {

    // 문합부 관련
    private CDClassification anastomosisBleeding;
    private CDClassification anastomosisLeakage;
    private CDClassification anastomosisStenosis;
    private CDClassification organSpaceSsi;

    // 소화기계
    private CDClassification ileus;
    private CDClassification giBleeding;
    private CDClassification bowelIschemia;
    private CDClassification chyleAscites;
    private CDClassification additionalEnteritis;

    // 심혈관계
    private CDClassification arrhythemia;
    private CDClassification coronaryIschemia;
    private CDClassification dvt;
    private CDClassification pulmonaryEmbolism;
    private CDClassification phlebitis;
    private CDClassification dic;

    // 호흡기계
    private CDClassification atelectasis;
    private CDClassification pneumothorax;
    private CDClassification pneumonia;
    private CDClassification ards;
    private CDClassification pleuralEffusion;

    // 비뇨생식기계
    private CDClassification urinaryDysfunctionRetension;
    private CDClassification arf;
    private CDClassification bladderLeakage;

    // 피부창상관련
    private CDClassification superficialDeepSsi;
    private CDClassification seroma;
    private CDClassification stomaCx;
    private CDClassification incisionalHernia;

    // 신경계
    private CustomComplication nervousSystem;

    private List<CustomComplication> customComplications;

    private String remarks;
}
