package com.team.hospital.api.complication.dto;

import com.team.hospital.api.complication.Complication;
import com.team.hospital.api.complication.enumType.CDClassification;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ComplicationDTO {

    private Long complicationId;

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

    // 기타 합병증
    private List<CustomComplication> customComplications;

    private String remarks;

    private double score;

    public static ComplicationDTO toEntity(Complication complication) {
        return ComplicationDTO.builder()
                .complicationId(complication.getId())

                // 문합부 관련
                .anastomosisBleeding(complication.getAnastomosisBleeding())
                .anastomosisLeakage(complication.getAnastomosisLeakage())
                .anastomosisStenosis(complication.getAnastomosisStenosis())
                .organSpaceSsi(complication.getOrganSpaceSsi())

                // 소화기계
                .ileus(complication.getIleus())
                .giBleeding(complication.getGiBleeding())
                .bowelIschemia(complication.getBowelIschemia())
                .chyleAscites(complication.getChyleAscites())
                .additionalEnteritis(complication.getAdditionalEnteritis())

                // 심혈관계
                .arrhythemia(complication.getArrhythemia())
                .coronaryIschemia(complication.getCoronaryIschemia())
                .dvt(complication.getDvt())
                .pulmonaryEmbolism(complication.getPulmonaryEmbolism())
                .phlebitis(complication.getPhlebitis())
                .dic(complication.getDic())

                // 호흡기계
                .atelectasis(complication.getAtelectasis())
                .pneumothorax(complication.getPneumothorax())
                .pneumonia(complication.getPneumonia())
                .ards(complication.getArds())
                .pleuralEffusion(complication.getPleuralEffusion())

                // 비뇨생식기계
                .urinaryDysfunctionRetension(complication.getUrinaryDysfunctionRetension())
                .arf(complication.getArf())
                .bladderLeakage(complication.getBladderLeakage())

                // 피부창상관련
                .superficialDeepSsi(complication.getSuperficialDeepSsi())
                .seroma(complication.getSeroma())
                .stomaCx(complication.getStomaCx())
                .incisionalHernia(complication.getIncisionalHernia())

                // 신경계
                .nervousSystem(complication.getNervousSystem())

                // 기타 합병증
                .customComplications(complication.getCustomComplications())

                // 비고
                .remarks(complication.getRemarks())

                .score(complication.getComplicationScore())
                .build();

    }
}
