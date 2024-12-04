package com.team.hospital.api.patient;

import com.team.hospital.api.apiResponse.SuccessResponse;
import com.team.hospital.api.checkList.CheckListService;
import com.team.hospital.api.operation.dto.OpSummary;
import com.team.hospital.api.operation.dto.QueryRepository;
import com.team.hospital.api.patient.dto.*;
import com.team.hospital.api.patient.enumType.CheckListStatus;
import com.team.hospital.api.patient.enumType.SearchType;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
        List<Patient> patients;
        if (year == null && month != null) throw new IllegalArgumentException("올바른 년과 월을 입력해주세요.");
        if (year == null) {
            patients = (opName != null)
                    ? patientService.findPatientsByOperationTypeNameContaining(opName)
                    : patientService.findAll();
        } else if (month == null) {
            patients = (opName != null)
                    ? patientService.findPatientsByOperationTypeNameContainingAndYear(opName, year)
                    : patientService.findPatientsByOperationYear(year);
        } else {
            patients = (opName != null)
                    ? patientService.findPatientsByOperationTypeNameContainingAndYearAndMonth(opName, year, month)
                    : patientService.findPatientsByOperationYearAndMonth(year, month);
        }

        patients = sortAndFilt(patients, searchType, query);
        Page<Patient> paginated = paginate(patients, page, size);
        List<PatientOpDTO> patientOps = paginated.stream()
                .map(this::toPatientOp)
                .toList();
        return SuccessResponse.createSuccess(PatientResponse.toEntity(patientOps, paginated));
    }

    private List<Patient> sortAndFilt(List<Patient> patients, SearchType searchType, String query) {
        if (searchType == null || query == null || query.isBlank()) {
            return patients.stream().sorted(Comparator.comparing(Patient::getCreatedAt).reversed()).toList();
        }
        return patients.stream()
                .filter(patient -> {
                    if (searchType == SearchType.PATIENT_NAME) return patient.getName().contains(query);
                    else return patient.getPatientNumber().toString().contains(query);
                })
                .sorted(Comparator.comparing(Patient::getCreatedAt).reversed())
                .toList();
    }

    private Page<Patient> paginate(List<Patient> patients, Integer page, Integer size) {
        int pageNumber = (page != null && page > 0 ? page : 1) - 1;
        int pageSize = (size != null && size > 0 ? size : 10);
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        int start = Math.min((int) pageable.getOffset(), patients.size());
        int end = Math.min(start + pageable.getPageSize(), patients.size());
        List<Patient> pagedPatients = patients.subList(start, end);
        return new PageImpl<>(pagedPatients, pageable, patients.size());
    }

    private PatientOpDTO toPatientOp(Patient patient) {
        OpSummary recentOp = OpSummary.toEntity(queryRepository.findRecentOpByPatientId(patient.getId()), PatientDTO.toEntity(patient));
        CheckListStatus checkListStatus = checkListService.checkListCreatedToday(recentOp.getOperationId(), patient.getOperationDate());
        return PatientOpDTO.toEntity(patient, recentOp, checkListStatus);
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


}


//@GetMapping("/patients")
//@io.swagger.v3.oas.annotations.Operation(summary = "필터 환자 조회", description = "필터를 이용해 환자를 조회합니다.")
//public SuccessResponse<?> findPatients(@RequestParam(required = false) SearchType searchType,
//                                       @RequestParam(required = false) String query,
//
//                                       @RequestParam(required = false) Integer page,
//                                       @RequestParam(required = false) Integer size,
//
//                                       @RequestParam(defaultValue = "DEFAULT") Opdate opDate,
//                                       @RequestParam(defaultValue = "ALL") CheckListStatus checkListStatus) {
//    Pageable pageable = getPageable(page, size);
//
//    List<PatientWithOperationDateDTO> patientDTOs;
//    boolean queryPresent = StringUtils.hasText(query) && searchType != null;
//
//    List<Patient> patients = queryPresent ? findFilteredPatients(searchType, query, pageable).getContent()
//            : patientService.findAll(pageable).getContent();
//
//    List<PatientWithOperationDateDTO> patientWithOperationDateDTOStream = patients.stream()
//            .sorted(patientComparator(opDate))
//            .map(this::convertToDto).toList();
//
//    patientDTOs = patients.stream()
//            .sorted(patientComparator(opDate))
//            .map(this::convertToDto)
//            .filter(dto -> filterByCheckListStatus(dto, checkListStatus))
//            .toList();
//
//    return SuccessResponse.createSuccess(patientDTOs);
//}
//
//
//private Comparator<Patient> patientComparator(Opdate opDate) {
//    Comparator<Patient> comparator;
//    if (opDate == Opdate.NEWER) comparator = Comparator.comparing(Patient::getOperationDate).reversed();
//    else if (opDate == Opdate.OLDER) comparator = Comparator.comparing(Patient::getOperationDate);
//    else comparator = Comparator.comparing(Patient::getUpdatedAt).reversed();
//
//    return comparator;
//}