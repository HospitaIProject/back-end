package com.team.hospital.api.check;

import com.team.hospital.api.check.dto.ComplianceDTO;
import com.team.hospital.api.check.dto.WriteCompliance;
import com.team.hospital.api.patient.Patient;
import com.team.hospital.api.patient.PatientService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CheckListService {

    private final CheckListRepository checkListRepository;
    private final PatientService patientService;

    public List<ComplianceDTO> findAllByPatient(Long patientId){
        Patient patient = patientService.findPatientById(patientId);
        List<CheckList> list = checkListRepository.findAllByPatient(patient);
        return ComplianceDTO.buildComplianceDTOs(list);
    }

    public List<ComplianceDTO> findAll(){
        List<CheckList> list = checkListRepository.findAll();
        return ComplianceDTO.buildComplianceDTOs(list);
    }

    public CheckList findComplianceById(Long complianceId){
        Optional<CheckList> compliance = checkListRepository.findById(complianceId);
        if (compliance.isEmpty()) throw new IllegalArgumentException("Compliance x");
        return compliance.get();
    }

    @Transactional
    public void save(WriteCompliance write, Long patientId){
        Patient patient = patientService.findPatientById(patientId);
        CheckList checkList = CheckList.toEntity(write, patient);
        checkListRepository.save(checkList);
    }

    @Transactional
    public void modify(WriteCompliance write, Long complianceId){
        CheckList checkList = findComplianceById(complianceId);
        checkList.updateCompliance(write);
    }
}
