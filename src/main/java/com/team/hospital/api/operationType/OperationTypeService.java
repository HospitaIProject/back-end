package com.team.hospital.api.operationType;

import com.team.hospital.api.operationType.dto.WriteOperationType;
import com.team.hospital.api.operationType.exception.OperationTypeNameAlreadyExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class OperationTypeService {

    private final OperationTypeRepository operationTypeRepository;

    public void save(OperationType operationType) {
        operationTypeRepository.findByNameIncludingDeleted(operationType.getName())
                .ifPresentOrElse(existing -> {
                    if (existing.isDeleted()) {
                        existing.restore();
                        operationTypeRepository.save(existing);
                    } else {
                        throw new OperationTypeNameAlreadyExistsException();
                    }
                }, () -> operationTypeRepository.save(operationType));
    }

    public List<OperationType> findAll() {
        return operationTypeRepository.findAllActive(); // 소프트 딜리트된 항목 제외
    }

    public OperationType findByOperationTypeName(String operationTypeName) {
        return operationTypeRepository.findByName(operationTypeName)
                .orElseThrow(() -> new NoSuchElementException("해당 operationTypeName으로 등록된 operationType이 존재하지 않습니다."));
    }

    @Transactional
    public void deleteByName(String operationTypeName) {
        OperationType operationType = findByOperationTypeName(operationTypeName);
        operationType.softDelete(); // 소프트 딜리트 수행
    }

    @Transactional
    public void update(String operationTypeName, WriteOperationType write) {
        OperationType operationType = findByOperationTypeName(operationTypeName);
        operationType.update(write);
    }

}
