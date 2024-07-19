package com.team.hospital.api.operation;

import com.team.hospital.api.operation.dto.RegisterOperation;
import com.team.hospital.api.operation.enumType.OperationMethod;
import com.team.hospital.api.operation.exception.OperationNotFoundException;
import com.team.hospital.api.patient.Patient;
import com.team.hospital.api.patient.PatientService;
import lombok.RequiredArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class OperationService {

    private final OperationRepository operationRepository;
    private final PatientService patientService;

    @Transactional
    public Long save(RegisterOperation registerOperation, Long patientId) {
        Patient patient = patientService.findPatientById(patientId);
        Operation operation = Operation.createOperation(registerOperation, patient);
        operationRepository.save(operation);
        return operation.getId();
    }

    @Transactional
    public void modify(RegisterOperation registerOperation, Long operationId) {
        Operation operation = findOperationById(operationId);
        operation.updateOperation(registerOperation);
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

        List<Patient> patients = findAll().stream()
                .filter(operation -> {
                    String operationMethodsString = convertToDatabaseColumn(operation.getOperationMethod()).toLowerCase();
                    return operationMethodsString.contains(lowerCaseOperationMethod);
                })
                .map(operation -> {
                    Hibernate.initialize(operation.getPatient());
                    return operation.getPatient();
                })
                .toList();

        int pageSize = pageable.getPageSize();
        int currentPage = pageable.getPageNumber();
        int start = currentPage * pageSize;
        int end = Math.min(start + pageSize, patients.size());

        List<Patient> pageContent = patients.subList(start, end);
        boolean hasNext = patients.size() > end;

        return new SliceImpl<>(pageContent, pageable, hasNext);
    }

    private static String convertToDatabaseColumn(List<OperationMethod> operationMethods) {
        if (operationMethods == null || operationMethods.isEmpty()) {
            return "";
        }
        return operationMethods.stream()
                .map(Enum::name)
                .collect(Collectors.joining(", "));
    }

}
