package com.team.hospital.api.complication;

import com.team.hospital.api.base.BaseEntity;
import com.team.hospital.api.complication.dto.CustomComplication;
import com.team.hospital.api.complication.dto.WriteComplication;
import com.team.hospital.api.complication.enumType.CDClassification;
import com.team.hospital.api.operation.Operation;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class Complication extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "complication_id")
    private Long id;

    // 문합부 관련
    @Enumerated(EnumType.STRING)
    private CDClassification anastomosisBleeding;
    @Enumerated(EnumType.STRING)
    private CDClassification anastomosisLeakage;
    @Enumerated(EnumType.STRING)
    private CDClassification anastomosisStenosis;
    @Enumerated(EnumType.STRING)
    private CDClassification organSpaceSsi;

    // 소화기계
    @Enumerated(EnumType.STRING)
    private CDClassification ileus;
    @Enumerated(EnumType.STRING)
    private CDClassification giBleeding;
    @Enumerated(EnumType.STRING)
    private CDClassification bowelIschemia;
    @Enumerated(EnumType.STRING)
    private CDClassification chyleAscites;
    @Enumerated(EnumType.STRING)
    private CDClassification additionalEnteritis;

    // 심혈관계
    @Enumerated(EnumType.STRING)
    private CDClassification arrhythemia;
    @Enumerated(EnumType.STRING)
    private CDClassification coronaryIschemia;
    @Enumerated(EnumType.STRING)
    private CDClassification dvt;
    @Enumerated(EnumType.STRING)
    private CDClassification pulmonaryEmbolism;
    @Enumerated(EnumType.STRING)
    private CDClassification phlebitis;
    @Enumerated(EnumType.STRING)
    private CDClassification dic;

    // 호흡기계
    @Enumerated(EnumType.STRING)
    private CDClassification atelectasis;
    @Enumerated(EnumType.STRING)
    private CDClassification pneumothorax;
    @Enumerated(EnumType.STRING)
    private CDClassification pneumonia;
    @Enumerated(EnumType.STRING)
    private CDClassification ards;
    @Enumerated(EnumType.STRING)
    private CDClassification pleuralEffusion;

    // 비뇨생식기계
    @Enumerated(EnumType.STRING)
    private CDClassification urinaryDysfunctionRetension;
    @Enumerated(EnumType.STRING)
    private CDClassification arf;
    @Enumerated(EnumType.STRING)
    private CDClassification bladderLeakage;

    // 피부창상관련
    @Enumerated(EnumType.STRING)
    private CDClassification superficialDeepSsi;
    @Enumerated(EnumType.STRING)
    private CDClassification seroma;
    @Enumerated(EnumType.STRING)
    private CDClassification stomaCx;
    @Enumerated(EnumType.STRING)
    private CDClassification incisionalHernia;

    // 신경계
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "complicationName", column = @Column(name = "nervousSystem_complicationName")),
            @AttributeOverride(name = "cdClassification", column = @Column(name = "nervousSystem_cdClassification"))
    })
    private CustomComplication nervousSystem;

    @ElementCollection
    @CollectionTable(name = "custom_complications", joinColumns = @JoinColumn(name = "complication_id"))
    private List<CustomComplication> customComplications;

    private String remarks;

    private double complicationScore;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "operation_id")
    private Operation operation;

    public static Complication createComplication(WriteComplication write, Operation operation) {
        ComplicationBuilder builder = Complication.builder();

        // 문합부 관련
        if (write.getAnastomosisBleeding() != null) {
            builder.anastomosisBleeding(write.getAnastomosisBleeding());
        }
        if (write.getAnastomosisLeakage() != null) {
            builder.anastomosisLeakage(write.getAnastomosisLeakage());
        }
        if (write.getAnastomosisStenosis() != null) {
            builder.anastomosisStenosis(write.getAnastomosisStenosis());
        }
        if (write.getOrganSpaceSsi() != null) {
            builder.organSpaceSsi(write.getOrganSpaceSsi());
        }

        // 소화기계
        if (write.getIleus() != null) {
            builder.ileus(write.getIleus());
        }
        if (write.getGiBleeding() != null) {
            builder.giBleeding(write.getGiBleeding());
        }
        if (write.getBowelIschemia() != null) {
            builder.bowelIschemia(write.getBowelIschemia());
        }
        if (write.getChyleAscites() != null) {
            builder.chyleAscites(write.getChyleAscites());
        }
        if (write.getAdditionalEnteritis() != null) {
            builder.additionalEnteritis(write.getAdditionalEnteritis());
        }

        // 심혈관계
        if (write.getArrhythemia() != null) {
            builder.arrhythemia(write.getArrhythemia());
        }
        if (write.getCoronaryIschemia() != null) {
            builder.coronaryIschemia(write.getCoronaryIschemia());
        }
        if (write.getDvt() != null) {
            builder.dvt(write.getDvt());
        }
        if (write.getPulmonaryEmbolism() != null) {
            builder.pulmonaryEmbolism(write.getPulmonaryEmbolism());
        }
        if (write.getPhlebitis() != null) {
            builder.phlebitis(write.getPhlebitis());
        }
        if (write.getDic() != null) {
            builder.dic(write.getDic());
        }

        // 호흡기계
        if (write.getAtelectasis() != null) {
            builder.atelectasis(write.getAtelectasis());
        }
        if (write.getPneumothorax() != null) {
            builder.pneumothorax(write.getPneumothorax());
        }
        if (write.getPneumonia() != null) {
            builder.pneumonia(write.getPneumonia());
        }
        if (write.getArds() != null) {
            builder.ards(write.getArds());
        }
        if (write.getPleuralEffusion() != null) {
            builder.pleuralEffusion(write.getPleuralEffusion());
        }

        // 비뇨생식기계
        if (write.getUrinaryDysfunctionRetension() != null) {
            builder.urinaryDysfunctionRetension(write.getUrinaryDysfunctionRetension());
        }
        if (write.getArf() != null) {
            builder.arf(write.getArf());
        }
        if (write.getBladderLeakage() != null) {
            builder.bladderLeakage(write.getBladderLeakage());
        }

        // 피부창상관련
        if (write.getSuperficialDeepSsi() != null) {
            builder.superficialDeepSsi(write.getSuperficialDeepSsi());
        }
        if (write.getSeroma() != null) {
            builder.seroma(write.getSeroma());
        }
        if (write.getStomaCx() != null) {
            builder.stomaCx(write.getStomaCx());
        }
        if (write.getIncisionalHernia() != null) {
            builder.incisionalHernia(write.getIncisionalHernia());
        }

        // 신경계
        if (write.getNervousSystem() != null) {
            builder.nervousSystem(write.getNervousSystem());
        }

        // 추가사항
        builder
                .customComplications(write.getCustomComplications())
                .remarks(write.getRemarks())
                .operation(operation);

        return builder.build();
    }

    public void updateComplication(WriteComplication write) {

        // 문합부 관련
        this.anastomosisBleeding = write.getAnastomosisBleeding();
        this.anastomosisLeakage = write.getAnastomosisLeakage();
        this.anastomosisStenosis = write.getAnastomosisStenosis();
        this.organSpaceSsi = write.getOrganSpaceSsi();

        // 소화기계
        this.ileus = write.getIleus();
        this.giBleeding = write.getGiBleeding();
        this.bowelIschemia = write.getBowelIschemia();
        this.chyleAscites = write.getChyleAscites();
        this.additionalEnteritis = write.getAdditionalEnteritis();

        // 심혈관계
        this.arrhythemia = write.getArrhythemia();
        this.coronaryIschemia = write.getCoronaryIschemia();
        this.dvt = write.getDvt();
        this.pulmonaryEmbolism = write.getPulmonaryEmbolism();
        this.phlebitis = write.getPhlebitis();
        this.dic = write.getDic();

        // 호흡기계
        this.atelectasis = write.getAtelectasis();
        this.pneumothorax = write.getPneumothorax();
        this.pneumonia = write.getPneumonia();
        this.ards = write.getArds();
        this.pleuralEffusion = write.getPleuralEffusion();

        // 비뇨생식기계
        this.urinaryDysfunctionRetension = write.getUrinaryDysfunctionRetension();
        this.arf = write.getArf();
        this.bladderLeakage = write.getBladderLeakage();

        // 피부창상관련
        this.superficialDeepSsi = write.getSuperficialDeepSsi();
        this.seroma = write.getSeroma();
        this.stomaCx = write.getStomaCx();
        this.incisionalHernia = write.getIncisionalHernia();

        // 신경계
        this.nervousSystem = write.getNervousSystem();

        this.customComplications = write.getCustomComplications();
        this.remarks = write.getRemarks();
    }

    public void updateComplicationScore(double score) {
        this.complicationScore = score;
    }
}
