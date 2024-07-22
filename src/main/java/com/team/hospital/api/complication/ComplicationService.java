package com.team.hospital.api.complication;

import com.team.hospital.api.checkList.enumType.BooleanOption;
import com.team.hospital.api.complication.dto.CustomComplication;
import com.team.hospital.api.complication.dto.WriteComplication;
import com.team.hospital.api.complication.enumType.CDClassification;
import com.team.hospital.api.complication.exception.ComplicationNotFoundException;
import com.team.hospital.api.operation.Operation;
import com.team.hospital.api.operation.OperationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ComplicationService {

    private final ComplicationRepository complicationRepository;
    private final OperationService operationService;

    @Transactional
    public void save(WriteComplication write, Long operationId) {
        Operation operation = operationService.findOperationById(operationId);
        Complication complication = Complication.createComplication(write, operation);
        complicationRepository.save(complication);
    }

    @Transactional
    public void modify(WriteComplication write, Long operationId) {
        Complication complication = findComplicationByOperationId(operationId);
        complication.updateComplication(write);
    }

    @Transactional
    public void delete(Long operationId) {
        Complication complication = findComplicationByOperationId(operationId);
        complicationRepository.delete(complication);
    }

    @Transactional
    public void updateComplicationStatus(Long operationId, BooleanOption booleanOptionq) {
        Operation operation = operationService.findOperationById(operationId);
        operation.updateComplicationStatus(booleanOptionq);
    }

    @Transactional
    public void updateComplicationScore(Complication complication, double score) {
        complication.updateComplicationScore(score);
    }

    public Complication findComplicationByOperationId(Long operationId) {
        Optional<Complication> complication = complicationRepository.findByOperationId(operationId);
        if (complication.isEmpty()) throw new ComplicationNotFoundException("해당 operationId에 등록된 합병증이 존재하지 않습니다.");
        return complication.get();
    }

    public boolean existsByOperation(Operation operation) {
        return complicationRepository.existsByOperation(operation);
    }

    public double calculateCDScore(Complication complication) {
        double score = 0.0;

        // CustomComplications 점수 계산
        for (CustomComplication customComplication : complication.getCustomComplications()) {
            score += calculateScoreIfNotNull(customComplication.getCdClassification());
        }

        // 문합부 관련 점수 계산
        score += calculateScoreIfNotNull(complication.getAnastomosisBleeding());
        score += calculateScoreIfNotNull(complication.getAnastomosisLeakage());
        score += calculateScoreIfNotNull(complication.getAnastomosisStenosis());
        score += calculateScoreIfNotNull(complication.getOrganSpaceSsi());

        // 소화기계 점수 계산
        score += calculateScoreIfNotNull(complication.getIleus());
        score += calculateScoreIfNotNull(complication.getGiBleeding());
        score += calculateScoreIfNotNull(complication.getBowelIschemia());
        score += calculateScoreIfNotNull(complication.getChyleAscites());
        score += calculateScoreIfNotNull(complication.getAdditionalEnteritis());

        // 심혈관계 점수 계산
        score += calculateScoreIfNotNull(complication.getArrhythemia());
        score += calculateScoreIfNotNull(complication.getCoronaryIschemia());
        score += calculateScoreIfNotNull(complication.getDvt());
        score += calculateScoreIfNotNull(complication.getPulmonaryEmbolism());
        score += calculateScoreIfNotNull(complication.getPhlebitis());
        score += calculateScoreIfNotNull(complication.getDic());

        // 호흡기계 점수 계산
        score += calculateScoreIfNotNull(complication.getAtelectasis());
        score += calculateScoreIfNotNull(complication.getPneumothorax());
        score += calculateScoreIfNotNull(complication.getPneumonia());
        score += calculateScoreIfNotNull(complication.getArds());
        score += calculateScoreIfNotNull(complication.getPleuralEffusion());

        // 비뇨생식기계 점수 계산
        score += calculateScoreIfNotNull(complication.getUrinaryDysfunctionRetension());
        score += calculateScoreIfNotNull(complication.getArf());
        score += calculateScoreIfNotNull(complication.getBladderLeakage());

        // 피부창상관련 점수 계산
        score += calculateScoreIfNotNull(complication.getSuperficialDeepSsi());
        score += calculateScoreIfNotNull(complication.getSeroma());
        score += calculateScoreIfNotNull(complication.getStomaCx());
        score += calculateScoreIfNotNull(complication.getIncisionalHernia());

        return score;
    }

    private double calculateScoreIfNotNull(CDClassification classification) {
        if (classification == null) return 0.0;

        return switch (classification) {
            case I -> 300;
            case II -> 1750;
            case IIIa -> 2750;
            case IIIb -> 4550;
            case IVa -> 7200;
            case IVb -> 8550;
        };
    }
}
