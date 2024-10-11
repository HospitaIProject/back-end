package com.team.hospital.api.operation;

import com.team.hospital.api.operation.dto.WriteOperation;
import com.team.hospital.api.operation.exception.OperationNotFoundException;
import com.team.hospital.api.operationMethod.OperationMethod;
import com.team.hospital.api.operationMethod.OperationMethodRepository;
import com.team.hospital.api.operationType.OperationType;
import com.team.hospital.api.operationType.OperationTypeService;
import com.team.hospital.api.patient.Patient;
import com.team.hospital.api.patient.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
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
        Patient patient = patientService.findPatientById(patientId);
        List<Operation> operations = operationRepository.findAllByPatient(patient);
        operations.sort(Comparator.comparing((Operation operation) -> operation.getPatient().getOperationDate()).reversed());
        return operations;
    }

    public List<Operation> findAllByPatientV2(Long patientId) {
        Patient patient = patientService.findPatientById(patientId);
        return operationRepository.findAllByPatient(patient);
    }

    public Operation findRecentOperationByPatientId(Long patientId) {
        List<Operation> operations = findAllByPatientV2(patientId);
        if (!operations.isEmpty()) return operations.get(0);
        return null;
    }

    @Transactional(readOnly = true)
    public Slice<Patient> findPatientsByOperationMethod(String operationMethod, Pageable pageable) {
        String lowerCaseOperationMethod = operationMethod.toLowerCase();

        // 모든 Operation을 조회한 후 operationMethod와 customOperationMethod를 결합하여 필터링합니다.
        List<Patient> patients = findAll().stream()
                .filter(operation -> {
                    // operationMethod와 customOperationMethod를 하나의 리스트로 결합합니다.
                    List<String> combinedMethods = operation.getOperationMethods().stream()
                            .map(OperationMethod::getOperationType)
                            .map(OperationType::getName)
                            .toList();

                    // 결합된 리스트에서 검색어를 포함하는지 확인합니다.
                    return combinedMethods.stream()
                            .map(String::toLowerCase)
                            .anyMatch(methodName -> methodName.contains(lowerCaseOperationMethod));
                })
                .map(Operation::getPatient)
                .toList();

        // 페이징 처리
        int pageSize = pageable.getPageSize();
        int currentPage = pageable.getPageNumber();
        int start = currentPage * pageSize;
        int end = Math.min(start + pageSize, patients.size());

        List<Patient> pageContent = patients.subList(start, end);
        boolean hasNext = patients.size() > end;

        return new SliceImpl<>(pageContent, pageable, hasNext);
    }

}
