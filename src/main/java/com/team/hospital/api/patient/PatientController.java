package com.team.hospital.api.patient;

import com.team.hospital.api.apiResponse.SuccessResponse;
import com.team.hospital.api.checkList.CheckListService;
import com.team.hospital.api.operation.Operation;
import com.team.hospital.api.operation.OperationService;
import com.team.hospital.api.operation.dto.OperationDTO;
import com.team.hospital.api.patient.dto.PatientDTO;
import com.team.hospital.api.patient.dto.RegisterPatient;
import com.team.hospital.api.patient.dto.PatientWithOperationDateDTO;
import com.team.hospital.api.patient.enumType.FilterType;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "환자 관리", description = "환자 정보를 관리하는 API")
public class PatientController {

    private final PatientService patientService;
    private final OperationService operationService;
    private final CheckListService checkListService;

    @PostMapping("/patient")
    @io.swagger.v3.oas.annotations.Operation(summary = "환자 등록", description = "새로운 환자를 등록합니다.")
    public SuccessResponse<?> join(@RequestBody RegisterPatient registerPatient) {
        patientService.join(registerPatient);
        return SuccessResponse.createSuccess();
    }

    @GetMapping("/patient/{patientId}")
    @io.swagger.v3.oas.annotations.Operation(summary = "환자 조회", description = "ID로 환자를 조회합니다.")
    public SuccessResponse<PatientDTO> findPatientById(@PathVariable Long patientId) {
        PatientDTO patientDTO = PatientDTO.createPatientDTO(patientService.findPatientById(patientId));
        return SuccessResponse.createSuccess(patientDTO);
    }

    @GetMapping("/patients")
    @io.swagger.v3.oas.annotations.Operation(summary = "필터 환자 조회", description = "필터를 이용해 환자를 조회합니다.")
    public SuccessResponse<?> findPatients(@RequestParam(required = false) FilterType filterType,
                                           @RequestParam(required = false) String query,
                                           @RequestParam(required = false) Integer page,
                                           @RequestParam(required = false) Integer size) {
        Pageable pageable = PageRequest.of(page != null ? page - 1 : 0, size != null ? size : 10);

        List<PatientWithOperationDateDTO> patientDTOs;
        boolean queryPresent = StringUtils.hasText(query) && filterType != null;
        Slice<Patient> filteredPatients = queryPresent ? getFilteredPatients(filterType, query, pageable) : null;

        if (queryPresent && !filteredPatients.isEmpty()) {
            patientDTOs = filteredPatients.getContent().stream()
                    .sorted(Comparator.comparing(Patient::getUpdatedAt).reversed())
                    .map(this::convertToPatientWithOperationDateDTO)
                    .toList();
        } else {
            patientDTOs = patientService.findAll(pageable).stream()
                    .sorted(Comparator.comparing(Patient::getUpdatedAt).reversed())
                    .map(this::convertToPatientWithOperationDateDTO)
                    .toList();
        }

        return SuccessResponse.createSuccess(patientDTOs);
    }

    @PutMapping("/patient/{patientId}")
    @io.swagger.v3.oas.annotations.Operation(summary = "환자 수정")
    public SuccessResponse<?> modifyPatientById(@RequestBody RegisterPatient registerPatient,
                                                @PathVariable Long patientId) {
        patientService.modify(registerPatient, patientId);
        return SuccessResponse.createSuccess();
    }

    @DeleteMapping("/patient/{patientId}")
    @io.swagger.v3.oas.annotations.Operation(summary = "환자 삭제")
    public SuccessResponse<?> deletePatientById(@PathVariable Long patientId) {
        patientService.delete(patientId);
        return SuccessResponse.createSuccess();
    }

    private PatientWithOperationDateDTO convertToPatientWithOperationDateDTO(Patient patient) {
        List<Operation> operations = operationService.findAllByPatient(patient.getId());
        List<OperationDTO> operationDTOs = operations.stream()
                .map(OperationDTO::toEntity)
                .collect(Collectors.toList());

        Operation recentOperation = operationService.findRecentOperationByPatientId(patient.getId());
        boolean checkListCreatedToday = recentOperation != null && checkListService.checkIfAnyCheckListCreatedToday(recentOperation.getId());

        return PatientWithOperationDateDTO.toEntity(patient, operationDTOs, checkListCreatedToday);
    }

    private Slice<Patient> getFilteredPatients(FilterType filterType, String query, Pageable pageable) {
        return switch (filterType) {
            case PATIENT_NAME -> patientService.findPatientsByName(query, pageable);
            case PATIENT_NUMBER -> patientService.findPatientsByPatientNumber(Long.parseLong(query), pageable);
            case OPERATION_METHOD -> operationService.findPatientsByOperationMethod(query, pageable);
        };
    }

    @GetMapping("/patients/v2")
    @io.swagger.v3.oas.annotations.Operation(summary = "전체 환자 조회", description = "전체 환자 목록을 조회하고 각 환자의 수술 정보를 포함합니다.")
    public SuccessResponse<List<PatientWithOperationDateDTO>> findPatientsV2(@RequestParam(required = false) String query,
                                                                             @RequestParam(required = false) Integer page,
                                                                             @RequestParam(required = false) Integer size) {
        Pageable pageable = PageRequest.of(page != null ? page - 1 : 0, size != null ? size : 10);
        Set<Patient> patientsSet = new HashSet<>();

        if (query != null && !query.isEmpty()) {
            try {
                Long patientNumber = Long.parseLong(query);
                patientsSet.addAll(patientService.findPatientsByPatientNumber(patientNumber, pageable).getContent());
            } catch (NumberFormatException e) {
                // query가 숫자가 아닐 경우 이름과 수술 방법으로 검색을 계속 진행합니다.
                patientsSet.addAll(patientService.findPatientsByName(query, pageable).getContent());
                patientsSet.addAll(operationService.findPatientsByOperationMethod(query, pageable).getContent());
            }
        }

        // 모든 환자를 조회한 후 중복 제거 및 정렬
        List<PatientWithOperationDateDTO> patientDTOs = patientsSet.stream()
                .sorted(Comparator.comparing(Patient::getUpdatedAt).reversed())
                .map(this::convertToPatientWithOperationDateDTO)
                .toList();

        return SuccessResponse.createSuccess(patientDTOs);
    }

}