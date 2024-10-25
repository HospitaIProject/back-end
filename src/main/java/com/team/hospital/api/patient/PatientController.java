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
import com.team.hospital.api.patient.enumType.SearchType;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "환자 관리", description = "환자 정보를 관리하는 API")
@SecurityRequirement(name = "Bearer Authentication")
public class PatientController {

    private final PatientService patientService;
    private final OperationService operationService;
    private final CheckListService checkListService;

    @PostMapping("/patient")
    @io.swagger.v3.oas.annotations.Operation(summary = "환자 등록", description = "새로운 환자를 등록합니다.")
    public SuccessResponse<?> join(@RequestBody RegisterPatient registerPatient) {
        patientService.save(registerPatient);
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

    @GetMapping("/patients/monthly/{year}/{month}")
    @io.swagger.v3.oas.annotations.Operation(summary = "특정 월의 환자 조회", description = "입력된 년, 월에 해당하는 환자 리스트를 조회합니다.")
    public SuccessResponse<?> findPatientsByYearAndMonth(@PathVariable(required = false) int year, @PathVariable(required = false) int month,
                                                         @RequestParam(defaultValue = "BY_YEAR_MONTH") SearchType searchType, @RequestParam(required = false) String operationName,
                                                         @RequestParam(required = false) Integer page, @RequestParam(required = false) Integer size) {
        List<Patient> patients;
        Pageable pageable = getPageable(page, size);

        if (searchType == SearchType.BY_OPERATION) { patients = patientService.findPatientsByOperationTypeName(operationName, pageable).getContent(); }
        else { patients = patientService.findByYearAndMonth(year, month, pageable).getContent(); }

        return SuccessResponse.createSuccess(patients);
    }

    @GetMapping("/patients/operationDates")
    @io.swagger.v3.oas.annotations.Operation(
            summary = "연도 및 월별 환자 조회",
            description = "환자들의 수술 날짜를 기준으로 연도별로 그룹화된 월 리스트를 제공합니다. 월 중복은 제거되며, 연도와 월 모두 내림차순으로 정렬됩니다."
    )
    public SuccessResponse<?> findYearAndMonthList() {
        List<Patient> patients = patientService.findAll();

        Map<Integer, List<Integer>> result = patients.stream()
                .map(Patient::getOperationDate)
                .collect(Collectors.groupingBy(
                        LocalDate::getYear,
                        Collectors.mapping(LocalDate::getMonthValue, Collectors.collectingAndThen(Collectors.toSet(),  // 중복 제거
                                set -> set.stream()
                                        .sorted(Comparator.reverseOrder())  // 월 내림차순 정렬
                                        .collect(Collectors.toList()))
                        )
                ));

        return SuccessResponse.createSuccess(result);
    }

    @GetMapping("/patients")
    @io.swagger.v3.oas.annotations.Operation(summary = "필터 환자 조회", description = "필터를 이용해 환자를 조회합니다.")
    public SuccessResponse<?> findPatients(@RequestParam(required = false) FilterType filterType,
                                           @RequestParam(required = false) String query,

                                           @RequestParam(required = false) Integer page,
                                           @RequestParam(required = false) Integer size,

                                           @RequestParam(defaultValue = "DEFAULT") Opdate opDate,
                                           @RequestParam(defaultValue = "ALL") CheckListStatus checkListStatus) {
        Pageable pageable = getPageable(page, size);

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
            case OPERATION_METHOD -> operationService.findPatientsByOperationMethod(query, pageable);
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
                .toList();

        Operation recentOperation = operationService.findRecentOperationByPatientId(patient.getId());
        boolean checkListCreatedToday = recentOperation != null && checkListService.checkIfAnyCheckListCreatedToday(recentOperation.getId());

        return PatientWithOperationDateDTO.toEntity(patient, operationDTOs, checkListCreatedToday);
    }

    private static Pageable getPageable(Integer page, Integer size) {
        int pageNumber = (page != null && page > 0 ? page : 1) - 1;
        int pageSize = (size != null && size > 0 ? size : 10);

        return PageRequest.of(pageNumber, pageSize);
    }

}