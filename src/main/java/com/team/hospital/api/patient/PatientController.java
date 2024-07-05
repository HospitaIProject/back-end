package com.team.hospital.api.patient;

import com.team.hospital.api.operation.OperationService;
import com.team.hospital.api.operation.dto.OperationDTO;
import com.team.hospital.api.operation.dto.OperationDateDTO;
import com.team.hospital.api.patient.dto.PatientDTO;
import com.team.hospital.api.patient.dto.RegisterPatient;
import com.team.hospital.api.patient.dto.PatientWithOperationDateDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/patient")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;
    private final OperationService operationService;

    @PostMapping
    public ResponseEntity<String> join(@RequestBody RegisterPatient registerPatient) {
        try {
            patientService.join(registerPatient);
            return ResponseEntity.status(HttpStatus.CREATED).body("Patient successfully registered.");
        } catch (Exception e) {
            // 에러 로그 출력 또는 다른 처리를 여기서 할 수 있습니다.
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to register patient.");
        }
    }

    @GetMapping
    public ResponseEntity<PatientDTO> findById(Long id) {
        PatientDTO patientDTO = PatientDTO.createPatientDTO(patientService.findPatientById(id));
        return ResponseEntity.ok(patientDTO);
    }

    @GetMapping("/all")
    public ResponseEntity<List<PatientWithOperationDateDTO>> findPatients() {
        List<Patient> all = patientService.findAll();

        List<PatientWithOperationDateDTO> finalList = all.stream()
                .map(patient -> {
                    List<OperationDTO> allByPatient = operationService.findAllByPatient(patient.getId());

                    List<OperationDateDTO> operationDateDTOList = allByPatient.stream()
                            .map(OperationDateDTO::createOperationDateDTO)
                            .sorted(Comparator.comparing(OperationDateDTO::getOperationDate))
                            .collect(Collectors.toList());

                    return PatientWithOperationDateDTO.toEntity(patient, operationDateDTOList);
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(finalList);
    }
}
