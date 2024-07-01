package com.team.hospital.check;

import com.team.hospital.check.dto.WriteCompliance;
import com.team.hospital.patient.Patient;
import com.team.hospital.patient.PatientService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ComplianceService {

    private final ComplianceRepository complianceRepository;
    private final PatientService patientService;

    public List<ComplianceDTO> findAllByPatient(Long patientId){
        Patient patient = patientService.findUserById(patientId);
        List<Compliance> list = complianceRepository.findAllByPatient(patient);
        return ComplianceDTO.toEntities(list);
    }

    public Compliance findComplianceById(Long complianceId){
        Optional<Compliance> compliance = complianceRepository.findById(complianceId);
        if (compliance.isEmpty()) throw new IllegalArgumentException("Compliance x");
        return compliance.get();
    }

    @Transactional
    public void save(WriteCompliance write, Long patientId){
        Patient patient = patientService.findUserById(patientId);
        Compliance compliance = Compliance.toEntity(write, patient);
        complianceRepository.save(compliance);
    }

    @Transactional
    public void modify(WriteCompliance write, Long complianceId){
        Compliance compliance = findComplianceById(complianceId);
        compliance.updateCompliance(write);
    }
}
