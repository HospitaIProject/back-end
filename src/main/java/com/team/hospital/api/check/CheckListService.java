package com.team.hospital.api.check;

import com.team.hospital.api.check.dto.CheckListDTO;
import com.team.hospital.api.check.dto.WriteCheckList;
import com.team.hospital.api.patient.Patient;
import com.team.hospital.api.patient.PatientService;
import com.team.hospital.api.treatment.Treatment;
import com.team.hospital.api.treatment.TreatmentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CheckListService {

    private final CheckListRepository checkListRepository;
    private final TreatmentService treatmentService;
    private final PatientService patientService;

    public List<CheckListDTO> findAllByPatient(Long patientId){
        Patient patient = patientService.findPatientById(patientId);
        List<CheckList> list = checkListRepository.findAllByPatient(patient);
        return CheckListDTO.buildComplianceDTOs(list);
    }

    public List<CheckListDTO> findAll(){
        List<CheckList> list = checkListRepository.findAll();
        return CheckListDTO.buildComplianceDTOs(list);
    }

    public CheckList findComplianceById(Long complianceId){
        Optional<CheckList> compliance = checkListRepository.findById(complianceId);
        if (compliance.isEmpty()) throw new IllegalArgumentException("Compliance x");
        return compliance.get();
    }

    @Transactional
    public void save(WriteCheckList write, Long treatmentId){
        Treatment treatment = treatmentService.findTreatmentById(treatmentId);
        CheckList checkList = CheckList.toEntity(write, treatment);
        checkListRepository.save(checkList);
    }

    @Transactional
    public void modify(WriteCheckList write, Long complianceId){
        CheckList checkList = findComplianceById(complianceId);
        checkList.updateCompliance(write);
    }
}
