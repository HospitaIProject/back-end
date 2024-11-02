package com.team.hospital.api.operation;

import com.team.hospital.api.operation.dto.WriteOperation;
import com.team.hospital.api.operation.exception.OperationNotFoundException;
import com.team.hospital.api.operationMethod.OperationMethod;
import com.team.hospital.api.operationMethod.OperationMethodRepository;
import com.team.hospital.api.operationType.OperationTypeService;
import com.team.hospital.api.patient.Patient;
import com.team.hospital.api.patient.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class OperationService {

    private final OperationRepository operationRepository;
    private final PatientService patientService;
    private final OperationTypeService operationTypeService;
    private final OperationMethodRepository operationMethodRepository;

    @Transactional
    public Long save(WriteOperation write, Long patientId) {
        Patient patient = patientService.findPatientById(patientId);

        List<OperationMethod> operationMethods = write.getOperationTypeNames().stream()
                .map(operationTypeService::findByOperationTypeName)
                .map(operationType -> {
                    // OperationMethod를 조회하고, 존재하지 않으면 새로 생성
                    return operationMethodRepository.findByOperationTypeId(operationType.getId())
                            .orElse(OperationMethod.toEntity(operationType));
                })
                .toList();

        String result = String.join(", ", write.getOperationTypeNames());  // 구분자는 ", "
        Operation operation = Operation.createOperation(write, operationMethods, patient);
        operationRepository.save(operation);
        return operation.getId();
    }

    @Transactional
    public void modify(WriteOperation writeOperation, Long operationId) {
        Operation operation = findOperationById(operationId);
        operation.updateOperation(writeOperation);
    }

    @Transactional
    public void delete(Long operationId) {
        Operation operation = findOperationById(operationId);
        operationRepository.delete(operation);
    }

    public List<Operation> findAll() {
        return operationRepository.findAll();
    }


    public Operation findOperationById(Long operationId) {
        Optional<Operation> operation = operationRepository.findById(operationId);
        if (operation.isEmpty()) throw new OperationNotFoundException();
        return operation.get();
    }

    public List<Operation> findAllByPatient(Long patientId) {
        return operationRepository.findOrderedAllByPatientId(patientId);
    }

    public Operation findRecentOperationByPatientId(Long patientId) {
        return operationRepository.findFirstOperationByPatientId(patientId)
                .orElse(null);
    }

}
