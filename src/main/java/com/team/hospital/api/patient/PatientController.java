package com.team.hospital.api.patient;

import com.team.hospital.api.SuccessResponse;
import com.team.hospital.api.operation.OperationService;
import com.team.hospital.api.operation.dto.OperationDateDTO;
import com.team.hospital.api.patient.dto.PatientDTO;
import com.team.hospital.api.patient.dto.RegisterPatient;
import com.team.hospital.api.patient.dto.PatientWithOperationDateDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "환자 관리", description = "환자 정보를 관리하는 API")
public class PatientController {

    private final PatientService patientService;
    private final OperationService operationService;

    @PostMapping("/patient")
    @Operation(summary = "환자 등록", description = "새로운 환자를 등록합니다.")
    public SuccessResponse<?> join(@RequestBody RegisterPatient registerPatient) {
            patientService.join(registerPatient);
            return SuccessResponse.createSuccess();
    }

    @GetMapping("/patient/{patientId}")
    @Operation(summary = "환자 조회", description = "ID로 환자를 조회합니다.")
    public SuccessResponse<PatientDTO> findPatientById(@PathVariable Long patientId) {
        PatientDTO patientDTO = PatientDTO.toEntity(patientService.findPatientById(patientId));
        return SuccessResponse.createSuccess(patientDTO);
    }

    @GetMapping("/patients")
    @Operation(summary = "전체 환자 조회", description = "전체 환자 목록을 조회하고 각 환자의 수술 정보를 포함합니다.")
    public SuccessResponse<List<PatientWithOperationDateDTO>> findPatients() {
        List<PatientWithOperationDateDTO> finalList = patientService.findAll().stream()
                .sorted(Comparator.comparing(Patient::getUpdatedAt).reversed())
                .map(patient -> PatientWithOperationDateDTO.toEntity(
                        patient,
                        operationService.findAllByPatient(patient.getId()).stream()
                                .map(OperationDateDTO::toEntity)
                                .sorted(Comparator.comparing(OperationDateDTO::getOperationDate))
                                .collect(Collectors.toList())
                ))
                .collect(Collectors.toList());

        return SuccessResponse.createSuccess(finalList);
    }

    @PutMapping("/patient/{patientId}")
    @Operation(summary = "환자 수정")
    public SuccessResponse<?> modifyPatientById(@RequestBody RegisterPatient registerPatient,
                                                @PathVariable Long patientId) {
        patientService.modify(registerPatient, patientId);
        return SuccessResponse.createSuccess();
    }

    @DeleteMapping("/patient/{patientId}")
    @Operation(summary = "환자 삭제")
    public SuccessResponse<?> deletePatientById(@PathVariable Long patientId) {
        patientService.delete(patientId);
        return SuccessResponse.createSuccess();
    }
}