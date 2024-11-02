package com.team.hospital.api.patient;

import com.team.hospital.api.apiResponse.SuccessResponse;
import com.team.hospital.api.checkList.CheckListService;
import com.team.hospital.api.operation.Operation;
import com.team.hospital.api.operation.OperationService;
import com.team.hospital.api.operation.dto.OpDto;
import com.team.hospital.api.operation.dto.OpDtoString;
import com.team.hospital.api.operation.dto.QueryRepository;
import com.team.hospital.api.patient.dto.PatientDTO;
import com.team.hospital.api.patient.dto.PatientWithOperationDateDTO;
import com.team.hospital.api.patient.dto.PatientWithOperationDateDTOString;
import com.team.hospital.api.patient.dto.RegisterPatient;
import com.team.hospital.api.patient.enumType.CheckListStatus;
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

import java.util.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "환자 관리", description = "환자 정보를 관리하는 API")
@SecurityRequirement(name = "Bearer Authentication")
public class PatientController {

    private final PatientService patientService;
    private final OperationService operationService;
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
        List<Patient> patients = patientService.findAll(pageable).getContent();
        if (year == null && month != null) throw new IllegalArgumentException("올바른 년과 월을 입력해주세요.");
        if (year == null && month == null) {
            // 수술명으로 조회
            if (opName != null) {
                patients = patientService.findPatientsByOperationTypeName(opName, pageable).getContent();
            } else {
                patients = patientService.findAll(pageable).getContent();
            }
        }
        if (year != null && month == null) {
            if (opName != null) {
                patients = patientService.findPatientsByOperationTypeName(opName, pageable).stream()
                        .filter(patient -> patient.getOperationDate().getYear() == year)
                        .toList();
            } else {
                patients = patientService.findAll(pageable).stream().filter(patient -> patient.getOperationDate().getYear() == year).toList();
            }
        }
        if (year != null && month != null) {
            if (opName != null) {
                patients = patientService.findPatientsByOperationTypeName(opName, pageable).stream()
                        .filter(patient -> patient.getOperationDate().getYear() == year && patient.getOperationDate().getMonthValue() == month)
                        .toList();
            } else {
                patients = patientService.findAll(pageable).stream()
                        .filter(patient -> patient.getOperationDate().getYear() == year && patient.getOperationDate().getMonthValue() == month)
                        .toList();
            }
        }
        patients = filterBySearchType(patients, searchType, query);
//        List<PatientWithOperationDateDTO> list = patients.stream().map(this::convertToDto).toList();
        List<PatientWithOperationDateDTOString> list = patients.stream().map(this::convertToDtoString).toList();
        return SuccessResponse.createSuccess(list);
    }

    private List<Patient> filterBySearchType(List<Patient> patients, SearchType searchType, String query) {
        if (searchType == null || query == null || query.isBlank()) return patients;
        else if (searchType == SearchType.PATIENT_NAME) return patients.stream().filter(patient -> patient.getName().contains(query)).toList(); // 환자 이름 검색 필터
        else return patients.stream().filter(patient -> patient.getPatientNumber().toString().contains(query)).toList();                        // 환자 번호 검색 필터
    }

    private Slice<Patient> findFilteredPatients(SearchType searchType, String query, Pageable pageable) {
        if (searchType == null || query == null || query.isBlank()) return patientService.findAll(pageable);
        return switch (searchType) {
            case PATIENT_NAME -> patientService.findByNameContaining(query, pageable);
            case PATIENT_NUMBER -> patientService.findPatientsByPatientNumber(Long.parseLong(query), pageable);
//            case OPERATION_METHOD -> patientService.findPatientsByOperationTypeNameContaining(query, pageable);
        };
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

    @GetMapping("/patients")
    @io.swagger.v3.oas.annotations.Operation(summary = "필터 환자 조회", description = "필터를 이용해 환자를 조회합니다.")
    public SuccessResponse<?> findPatients(@RequestParam(required = false) SearchType searchType,
                                           @RequestParam(required = false) String query,

                                           @RequestParam(required = false) Integer page,
                                           @RequestParam(required = false) Integer size,

                                           @RequestParam(defaultValue = "DEFAULT") Opdate opDate,
                                           @RequestParam(defaultValue = "ALL") CheckListStatus checkListStatus) {
        Pageable pageable = getPageable(page, size);

        List<PatientWithOperationDateDTO> patientDTOs;
        boolean queryPresent = StringUtils.hasText(query) && searchType != null;

        List<Patient> patients = queryPresent ? findFilteredPatients(searchType, query, pageable).getContent()
                : patientService.findAll(pageable).getContent();

        List<PatientWithOperationDateDTO> patientWithOperationDateDTOStream = patients.stream()
                .sorted(patientComparator(opDate))
                .map(this::convertToDto).toList();

        patientDTOs = patients.stream()
                .sorted(patientComparator(opDate))
                .map(this::convertToDto)
                .filter(dto -> filterByCheckListStatus(dto, checkListStatus))
                .toList();

        return SuccessResponse.createSuccess(patientDTOs);
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

    private PatientWithOperationDateDTO convertToDto(Patient patient) {
        List<OpDto> opDTOs = queryRepository.findAllOpDtoByPatientId(patient.getId());
        Operation recentOperation = operationService.findRecentOperationByPatientId(patient.getId());
        boolean checkListCreatedToday = recentOperation != null && checkListService.checkIfAnyCheckListCreatedToday(recentOperation.getId(), patient.getOperationDate());
        return PatientWithOperationDateDTO.toEntity(patient, opDTOs, checkListCreatedToday);
    }

    private PatientWithOperationDateDTOString convertToDtoString(Patient patient) {
        List<OpDtoString> test = queryRepository.findAllOpDtoByPatientId(patient.getId()).stream().map(opDto -> OpDtoString.toEntity(opDto, PatientDTO.createPatientDTO(patient))).toList();
        Operation recentOperation = operationService.findRecentOperationByPatientId(patient.getId());
        boolean checkListCreatedToday = recentOperation != null && checkListService.checkIfAnyCheckListCreatedToday(recentOperation.getId(), patient.getOperationDate());
        return PatientWithOperationDateDTOString.toEntity(patient, test, checkListCreatedToday);
    }

    private static Pageable getPageable(Integer page, Integer size) {
        int pageNumber = (page != null && page > 0 ? page : 1) - 1;
        int pageSize = (size != null && size > 0 ? size : 10);

        return PageRequest.of(pageNumber, pageSize);
    }

}