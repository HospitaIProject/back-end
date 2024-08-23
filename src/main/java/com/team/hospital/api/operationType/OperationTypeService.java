package com.team.hospital.api.operationType;

import com.team.hospital.api.operationType.dto.WriteOperationType;
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
        operationTypeRepository.save(operationType);
    }

    public List<OperationType> findAll() {
        return operationTypeRepository.findAll();
    }

    public OperationType findByOperationTypeName(String operationTypeName) {
        return operationTypeRepository.findByName(operationTypeName)
                .orElseThrow(() -> new NoSuchElementException("해당 operationTypeName으로 등록된 operationType이 존재하지 않습니다."));
    }

    @Transactional
    public void deleteByName(String operationTypeName) {
        operationTypeRepository.deleteByName(operationTypeName);
    }

    @Transactional
    public void update(String operationTypeName, WriteOperationType write) {
        OperationType operationType = findByOperationTypeName(operationTypeName);
        operationType.update(write);
    }
}
