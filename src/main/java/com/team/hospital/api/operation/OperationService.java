package com.team.hospital.api.operation;

import com.team.hospital.api.operation.dto.OperationDTO;
import com.team.hospital.api.operation.exception.OperationNotFoundException;
import com.team.hospital.api.patient.Patient;
import com.team.hospital.api.patient.PatientService;
import com.team.hospital.api.operation.dto.RegisterOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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

    public Operation findOperationById(Long operationId) {
        Optional<Operation> operation = operationRepository.findById(operationId);
        if (operation.isEmpty()) throw new OperationNotFoundException();
        return operation.get();
    }

    public List<OperationDTO> findAllByPatient(Long patientId) {
        Patient patient = patientService.findPatientById(patientId);
        List<Operation> operations = operationRepository.findAllByPatient(patient);
        return OperationDTO.buildOperationDTOs(operations);
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

    public Slice<Patient> findPatientsByOperationMethod(String operationMethod, Pageable pageable) {
        return operationRepository.findOperationsByOperationMethod(operationMethod, pageable).map(Operation::getPatient);
    }

}
