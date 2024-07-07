package com.team.hospital.api.operation;

import com.team.hospital.api.operation.dto.OperationDTO;
import com.team.hospital.api.patient.Patient;
import com.team.hospital.api.patient.PatientService;
import com.team.hospital.api.operation.dto.RegisterOperation;
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

    @Transactional
    public Long save(RegisterOperation registerOperation, Long patientId){
        Patient patient = patientService.findPatientById(patientId);
        Operation operation = Operation.createOperation(registerOperation, patient);
        operationRepository.save(operation);
        return operation.getId();
    }
    @Transactional
    public void modify(RegisterOperation registerOperation, Long operationId){
        Operation operation = findOperationById(operationId);
        operation.updateOperation(registerOperation);
    }

    @Transactional
    public void delete(Long operationId){
        Operation operation = findOperationById(operationId);
        operationRepository.delete(operation);
    }

    public Operation findOperationById(Long operationId){
        Optional<Operation> operation = operationRepository.findById(operationId);
        if(operation.isEmpty())
            throw new IllegalArgumentException("없는 진료 기록");
        return operation.get();
    }

    public List<OperationDTO> findAllByPatient(Long patientId){
        Patient patient = patientService.findPatientById(patientId);
        List<Operation> operations = operationRepository.findAllByPatient(patient);
        return OperationDTO.buildOperationDTOs(operations);
    }
}
