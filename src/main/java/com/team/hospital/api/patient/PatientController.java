package com.team.hospital.api.patient;

import com.team.hospital.api.apiResponse.SuccessResponse;
import com.team.hospital.api.base.BaseEntity;
import com.team.hospital.api.checkList.CheckListService;
import com.team.hospital.api.operation.dto.OpDtoString;
import com.team.hospital.api.operation.dto.QueryRepository;
import com.team.hospital.api.patient.dto.*;
import com.team.hospital.api.patient.enumType.SearchType;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "환자 관리", description = "환자 정보를 관리하는 API")
@SecurityRequirement(name = "Bearer Authentication")
public class PatientController {

    private final PatientService patientService;
    private final CheckListService checkListService;
    private final QueryRepository queryRepository;

    @PostMapping("/patient")
    @io.swagger.v3.oas.annotations.Operation(summary = "환자 등록", description = "새로운 환자를 등록합니다.")
    public SuccessResponse<?> join(@RequestBody RegisterPatient registerPatient) {
        patientService.save(registerPatient);
        return SuccessResponse.createSuccess();
    }

    @GetMapping("/patient/{patientId}")
    @io.swagger.v3.oas.annotations.Operation(summary = "환자 조회", description = "ID로 환자를 조회합니다.")
    public SuccessResponse<PatientDTO> findPatientById(@PathVariable Long patientId) {
        PatientDTO patientDTO = PatientDTO.toEntity(patientService.findPatientById(patientId));
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

    @GetMapping("/patients/monthly")
    @io.swagger.v3.oas.annotations.Operation(summary = "특정 월의 환자 조회", description = "입력된 년, 월에 해당하는 환자 리스트를 조회합니다.")
    public SuccessResponse<?> findPatientsByYearAndMonth(@RequestParam(required = false) Integer year,
                                                         @RequestParam(required = false) Integer month,
                                                         @RequestParam(required = false) SearchType searchType,
                                                         @RequestParam(required = false) String opName,
                                                         @RequestParam(required = false) String query,
                                                         @RequestParam(required = false) Integer page,
                                                         @RequestParam(required = false) Integer size) {
        Pageable pageable = getPageable(page, size);
        Page<Patient> patients = new PageImpl<>(List.of());
        if (year == null && month != null) throw new IllegalArgumentException("올바른 년과 월을 입력해주세요.");
        if (year == null && month == null) {
            // 수술명으로 조회
            if (opName != null) {
                patients = patientService.findPatientsByOperationTypeNameContaining(opName, pageable);
            } else {
                patients = patientService.findAll(pageable);
            }
        }
        if (year != null && month == null) {
            if (opName != null) {
                patients = patientService.findPatientsByOperationTypeNameContainingAndYear(opName, year, pageable);
            } else {
                patients = patientService.findPatientsByOperationYear(year, pageable);
            }
        }
        if (year != null && month != null) {
            if (opName != null) {
                patients = patientService.findPatientsByOperationTypeNameContainingAndYearAndMonth(opName, year, month, pageable);
            } else {
                patients = patientService.findPatientsByOperationYearAndMonth(year, month, pageable);
            }
        }

        Page<Patient> content = searchFilterAndSortByCreatedAt(patients, searchType, query, pageable);
        PageInfo pageInfo = new PageInfo(pageable.getPageNumber() + 1, pageable.getPageSize(), (int) content.getTotalElements(), content.getTotalPages());
        List<PatientWithOperationDateDTOString> dtoList = content.stream()
                .map(this::convertToDtoString)
                .toList();
        return SuccessResponse.createSuccess(PatientResponse.toEntity(dtoList, pageInfo));
    }


    private PatientWithOperationDateDTOString convertToDtoString(Patient patient) {
        OpDtoString recentOperation = OpDtoString.toEntity(queryRepository.findLatestOpDtoByPatientId(patient.getId()), PatientDTO.toEntity(patient));
        boolean checkListCreatedToday = recentOperation != null && checkListService.checkIfAnyCheckListCreatedToday(recentOperation.getOperationId(), patient.getOperationDate());
        return PatientWithOperationDateDTOString.toEntity(patient, recentOperation, checkListCreatedToday);
    }

    public static Pageable getPageable(Integer page, Integer size) {
        int pageNumber = (page != null && page > 0 ? page : 1) - 1;
        int pageSize = (size != null && size > 0 ? size : 10);
        return PageRequest.of(pageNumber, pageSize, Sort.unsorted());
    }

    @GetMapping("/patients/operationDates")
    @io.swagger.v3.oas.annotations.Operation(
            summary = "연도 및 월별 환자 조회",
            description = "환자들의 수술 날짜를 기준으로 연도별로 그룹화된 월별 환자 수를 제공합니다. 연도와 월 모두 내림차순으로 정렬됩니다."
    )
    public SuccessResponse<?> findYearAndMonthList() {
        Map<Integer, Map<Integer, Integer>> result = new TreeMap<>(Comparator.reverseOrder());

        patientService.findAll().stream()
                .map(Patient::getOperationDate)
                .forEach(date -> {
                    Map<Integer, Integer> monthMap =
                            result.computeIfAbsent(date.getYear(), k -> new TreeMap<>(Comparator.reverseOrder()));
                    monthMap.merge(date.getMonthValue(), 1, Integer::sum);
                });

        return SuccessResponse.createSuccess(result);
    }

    private Page<Patient> searchFilterAndSortByCreatedAt(Page<Patient> patients, SearchType searchType, String query, Pageable pageable) {
        List<Patient> filteredPatients;
        if (searchType == null || query == null || query.isBlank()) {
            filteredPatients = patients.getContent().stream()
                    .sorted(Comparator.comparing(BaseEntity::getCreatedAt).reversed())
                    .toList();
        } else {
            filteredPatients = patients.getContent().stream()
                    .filter(patient -> {
                        if (searchType == SearchType.PATIENT_NAME) return patient.getName().contains(query);
                        else return patient.getPatientNumber().toString().contains(query);
                    })
                    .sorted(Comparator.comparing(BaseEntity::getCreatedAt).reversed())
                    .toList();
        }
        return new PageImpl<>(filteredPatients, pageable, filteredPatients.size());
    }

}