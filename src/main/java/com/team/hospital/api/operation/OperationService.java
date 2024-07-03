package com.team.hospital.api.operation;

import com.team.hospital.api.patient.Patient;
import com.team.hospital.api.patient.PatientService;
import com.team.hospital.api.operation.dto.RegisterOperation;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class OperationService {

    private final OperationRepository operationRepository;
    private final PatientService patientService;

    @Transactional
    public void save(RegisterOperation registerOperation, Long patientId){
        Patient patient = patientService.findPatientById(patientId);
        Operation operation = Operation.toEntity(registerOperation, patient);
        operationRepository.save(operation);
    }

    public Operation findOperationById(Long operationId){
        Optional<Operation> treatment = operationRepository.findById(operationId);
        if(treatment.isEmpty())
            throw new IllegalArgumentException("없는 진료 기록");
        return treatment.get();
    }
}
