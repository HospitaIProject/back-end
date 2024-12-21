package com.team.hospital.api.patient;

import com.team.hospital.api.apiResponse.SuccessResponse;
import com.team.hospital.api.checkList.CheckListService;
import com.team.hospital.api.operation.dto.OpSummary;
import com.team.hospital.api.operation.dto.QueryRepository;
import com.team.hospital.api.patient.dto.PatientDTO;
import com.team.hospital.api.patient.dto.PatientOpDTO;
import com.team.hospital.api.patient.dto.PatientResponse;
import com.team.hospital.api.patient.dto.RegisterPatient;
import com.team.hospital.api.patient.enumType.CheckListStatus;
import com.team.hospital.api.patient.enumType.OpDateOrder;
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

//    @CacheEvict(value = "patientCache", allEntries = true)
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

//    @CacheEvict(value = "patientCache", allEntries = true)
    @PutMapping("/patient/{patientId}")
    @io.swagger.v3.oas.annotations.Operation(summary = "환자 수정")
    public SuccessResponse<?> modifyPatientById(@RequestBody RegisterPatient registerPatient,
                                                @PathVariable Long patientId) {
        patientService.modify(registerPatient, patientId);
        return SuccessResponse.createSuccess();
    }

//    @CacheEvict(value = "patientCache", allEntries = true)
    @DeleteMapping("/patient/{patientId}")
    @io.swagger.v3.oas.annotations.Operation(summary = "환자 삭제")
    public SuccessResponse<?> deletePatientById(@PathVariable Long patientId) {
        patientService.delete(patientId);
        return SuccessResponse.createSuccess();
    }

//    @Cacheable(
//            value = "patientCache",  // 캐시 이름
//            key = "{#year, #month, #searchType, #status, #order, #opName, #query, #page, #size}", // 캐시 키
//            unless = "#result.data.patients == null || #result.data.patients.isEmpty()" // 캐시 조건
////            unless = "#result == null || #result.isEmpty()"
//    )
    @GetMapping("/patients/monthly")
    @io.swagger.v3.oas.annotations.Operation(summary = "특정 월의 환자 조회", description = "입력된 년, 월에 해당하는 환자 리스트를 조회합니다.")
    public SuccessResponse<PatientResponse> findPatientsByYearAndMonth(@RequestParam(required = false) Integer year,
                                                                       @RequestParam(required = false) Integer month,
                                                                       @RequestParam(required = false) SearchType searchType,
                                                                       @RequestParam(required = false) CheckListStatus status,
                                                                       @RequestParam(defaultValue = "NEWER") OpDateOrder order,
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

        patients = sortAndFilt(patients, searchType, query, order);
        List<PatientOpDTO> patientOps = patients.stream()
                .map(this::toPatientOp)
                .filter(patientOpDTO -> status == null || patientOpDTO.getCheckListCreatedToday() == status)
                .toList();
        Page<PatientOpDTO> paginate = paginate(patientOps, page, size);
        return SuccessResponse.createSuccess(PatientResponse.toEntity(paginate.toList(), paginate));
    }

    private List<Patient> sortAndFilt(List<Patient> patients, SearchType searchType, String query, OpDateOrder order) {
        Comparator<Patient> comparator = Comparator.comparing(Patient::getCreatedAt);
        if (order == OpDateOrder.NEWER) comparator = comparator.reversed();
        if (searchType == null || query == null || query.isBlank())
            return patients.stream().sorted(comparator).toList();

        return patients.stream()
                .filter(patient -> {
                    if (searchType == SearchType.PATIENT_NAME) return patient.getName().contains(query);
                    else return patient.getPatientNumber().toString().contains(query);
                })
                .sorted(comparator).toList();
    }

    private Page<PatientOpDTO> paginate(List<PatientOpDTO> patients, Integer page, Integer size) {
        int pageNumber = (page != null && page > 0 ? page : 1) - 1;
        int pageSize = (size != null && size > 0 ? size : 10);
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        int start = Math.min((int) pageable.getOffset(), patients.size());
        int end = Math.min(start + pageable.getPageSize(), patients.size());
        List<PatientOpDTO> pagedItems = patients.subList(start, end);
        return new PageImpl<>(pagedItems, pageable, patients.size());
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