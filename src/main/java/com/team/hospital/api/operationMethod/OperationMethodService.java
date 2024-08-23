package com.team.hospital.api.operationMethod;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OperationMethodService {

    private final OperationMethodRepository operationMethodRepository;

    public void save(OperationMethod operationMethod) {
        operationMethodRepository.save(operationMethod);
    }

    public List<OperationMethod> findAll() {
        return operationMethodRepository.findAll();
    }

    public Optional<OperationMethod> find(OperationMethod operationMethod) {
        Long id = operationMethod.getId();
        return operationMethodRepository.findById(id);
    }

}