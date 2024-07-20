package com.team.hospital.api.complication;

import com.team.hospital.api.checkList.enumType.BooleanOption;
import com.team.hospital.api.complication.dto.WriteComplication;
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

    public Complication findComplicationByOperationId(Long operationId) {
        Optional<Complication> complication = complicationRepository.findByOperationId(operationId);
        if (complication.isEmpty()) throw new ComplicationNotFoundException("해당 operationId에 등록된 합병증이 존재하지 않습니다.");
        return complication.get();
    }

    public boolean existsByOperation(Operation operation) {
        return complicationRepository.existsByOperation(operation);
    }
}
