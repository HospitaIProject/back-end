package com.team.hospital.api.patient;

import com.team.hospital.api.apiResponse.SuccessResponse;
import com.team.hospital.api.checkList.CheckListService;
import com.team.hospital.api.operation.Operation;
import com.team.hospital.api.operation.OperationService;
import com.team.hospital.api.operation.dto.OperationDTO;
import com.team.hospital.api.patient.dto.PatientDTO;
import com.team.hospital.api.patient.dto.PatientWithOperationDateDTO;
import com.team.hospital.api.patient.dto.RegisterPatient;
import com.team.hospital.api.patient.enumType.CheckListStatus;
import com.team.hospital.api.patient.enumType.FilterType;
import com.team.hospital.api.patient.enumType.Opdate;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.util.StringUtils;
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

    @GetMapping("/patients")
    @io.swagger.v3.oas.annotations.Operation(summary = "필터 환자 조회", description = "필터를 이용해 환자를 조회합니다.")
    public SuccessResponse<?> findPatients(@RequestParam(required = false) FilterType filterType,
                                           @RequestParam(required = false) String query,
                                           @RequestParam(required = false) Integer page,
                                           @RequestParam(required = false) Integer size,
                                           @RequestParam(defaultValue = "DEFAULT") Opdate opDate,
                                           @RequestParam(defaultValue = "ALL") CheckListStatus checkListStatus) {
        int pageNumber = (page != null ? page : 1) - 1;
        int pageSize = (size != null ? size : 10);

        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        List<PatientWithOperationDateDTO> patientDTOs;
        boolean queryPresent = StringUtils.hasText(query) && filterType != null;

        List<Patient> patients = queryPresent ? getFilteredPatients(filterType, query, pageable).getContent()
                : patientService.findAll(pageable).getContent();

        patientDTOs = patients.stream()
                .sorted(patientComparator(opDate))
                .map(this::convertToPatientWithOperationDateDTO)
                .filter(dto -> filterByCheckListStatus(dto, checkListStatus))
                .toList();

        return SuccessResponse.createSuccess(patientDTOs);
    }

    private Slice<Patient> getFilteredPatients(FilterType filterType, String query, Pageable pageable) {
        return switch (filterType) {
            case PATIENT_NAME -> patientService.findPatientsByName(query, pageable);
            case PATIENT_NUMBER -> patientService.findPatientsByPatientNumber(Long.parseLong(query), pageable);
//            case OPERATION_METHOD -> operationService.findPatientsByOperationMethod(query, pageable);
            case OPERATION_METHOD -> null;
        };
    }

    private Comparator<Patient> patientComparator(Opdate opDate) {
        Comparator<Patient> comparator;
        if (opDate == Opdate.NEWER) comparator = Comparator.comparing(Patient::getOperationDate).reversed();
        else if (opDate == Opdate.OLDER) comparator = Comparator.comparing(Patient::getOperationDate);
        else comparator = Comparator.comparing(Patient::getUpdatedAt).reversed();

        return comparator;
    }

    private boolean filterByCheckListStatus(PatientWithOperationDateDTO dto, CheckListStatus checkListStatus) {
        if (checkListStatus == CheckListStatus.WRITTEN) {
            return dto.isCheckListCreatedToday();
        } else if (checkListStatus == CheckListStatus.NOT_WRITTEN) {
            return !dto.isCheckListCreatedToday();
        }
        return true;
    }

    private PatientWithOperationDateDTO convertToPatientWithOperationDateDTO(Patient patient) {
        List<OperationDTO> operationDTOs = operationService.findAllByPatient(patient.getId()).stream()
                .map(OperationDTO::toEntity)
                .collect(Collectors.toList());

        Operation recentOperation = operationService.findRecentOperationByPatientId(patient.getId());
        boolean checkListCreatedToday = recentOperation != null && checkListService.checkIfAnyCheckListCreatedToday(recentOperation.getId());

        return PatientWithOperationDateDTO.toEntity(patient, operationDTOs, checkListCreatedToday);
    }

}