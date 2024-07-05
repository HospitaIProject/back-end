package com.team.hospital.api.patient;

import com.team.hospital.api.operation.OperationService;
import com.team.hospital.api.operation.dto.OperationDateDTO;
import com.team.hospital.api.patient.dto.PatientDTO;
import com.team.hospital.api.patient.dto.RegisterPatient;
import com.team.hospital.api.patient.dto.PatientWithOperationDateDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "환자 관리", description = "환자 정보를 관리하는 API")
public class PatientController {

    private final PatientService patientService;
    private final OperationService operationService;

    @PostMapping
    @Operation(summary = "환자 등록", description = "새로운 환자를 등록합니다.")
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
    @Operation(summary = "환자 조회", description = "ID로 환자를 조회합니다.")
    public ResponseEntity<PatientDTO> findById(Long id) {
        PatientDTO patientDTO = PatientDTO.createPatientDTO(patientService.findPatientById(id));
        return ResponseEntity.ok(patientDTO);
    }

    @GetMapping("/all")
    @Operation(summary = "전체 환자 조회", description = "전체 환자 목록을 조회하고 각 환자의 수술 정보를 포함합니다.")
    public ResponseEntity<List<PatientWithOperationDateDTO>> findPatients() {
        List<PatientWithOperationDateDTO> finalList = patientService.findAll().stream()
                .map(patient -> PatientWithOperationDateDTO.toEntity(
                        patient,
                        operationService.findAllByPatient(patient.getId()).stream()
                                .map(OperationDateDTO::createOperationDateDTO)
                                .sorted(Comparator.comparing(OperationDateDTO::getOperationDate))
                                .collect(Collectors.toList())
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(finalList);
    }
}