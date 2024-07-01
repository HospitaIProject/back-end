package com.team.hospital.check;

import com.team.hospital.check.dto.WriteCompliance;
import com.team.hospital.patient.Patient;
import com.team.hospital.patient.PatientService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ComplianceService {

    private final ComplianceRepository complianceRepository;
    private final PatientService patientService;

    @Transactional
    public void save(WriteCompliance write, Long patientId){
        Patient patient = patientService.findUserById(patientId);
        Compliance compliance = Compliance.toEntity(write, patient);
        complianceRepository.save(compliance);
    }
}
