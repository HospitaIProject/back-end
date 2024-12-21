package com.team.hospital.excel;

import com.team.hospital.api.apiResponse.SuccessResponse;
import com.team.hospital.api.checkList.CheckList;
import com.team.hospital.api.checkList.CheckListRepository;
import com.team.hospital.api.checkListAfter.CheckListAfter;
import com.team.hospital.api.checkListAfter.CheckListAfterRepository;
import com.team.hospital.api.checkListBefore.CheckListBefore;
import com.team.hospital.api.checkListBefore.CheckListBeforeRepository;
import com.team.hospital.api.checkListDuring.CheckListDuring;
import com.team.hospital.api.checkListDuring.CheckListDuringRepository;
import com.team.hospital.api.checkListItem.CheckListItem;
import com.team.hospital.api.checkListItem.CheckListItemRepository;
import com.team.hospital.api.operation.Operation;
import com.team.hospital.api.operation.OperationService;
import com.team.hospital.api.operation.dto.QueryRepository;
import com.team.hospital.api.patient.Patient;
import com.team.hospital.api.patient.PatientService;
import com.team.hospital.excel.dto.PatientToExcelDTO;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Tag(name = "엑셀 조회 및 추출", description = "엑셀관련  API")
@SecurityRequirement(name = "Bearer Authentication")
@RestController
@RequiredArgsConstructor
public class ExcelExportController {

    private final ExcelExportService excelExportService;
    private final PatientService patientService;
    private final OperationService operationService;
    private final CheckListItemRepository checkListItemRepository;
    private final CheckListBeforeRepository checkListBeforeRepository;
    private final CheckListDuringRepository checkListDuringRepository;
    private final CheckListAfterRepository checkListAfterRepository;
    private final CheckListRepository checkListRepository;
    private final QueryRepository queryRepository;

    @GetMapping("/api/excel")
    public ResponseEntity<InputStreamResource> exportToExcel(@RequestParam List<Long> operationIds) throws IOException {
        // 엑셀 데이터를 생성
        ByteArrayInputStream in = excelExportService.exportToExcel(operationIds);

        // 파일명 설정 (예: 날짜 포함)
        String fileName = "hospital_data_" + LocalDate.now() + ".xlsx";

        // HTTP 헤더에 파일명 설정
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=\"" + fileName + "\"; filename*=UTF-8''" + URLEncoder.encode(fileName, StandardCharsets.UTF_8));
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");

        // 응답 반환
        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(new InputStreamResource(in));
    }

    @GetMapping("/api/excels")
    @io.swagger.v3.oas.annotations.Operation(summary = "엑셀화 가능한 환자 및 수술 모두 출력")
    public SuccessResponse<List<PatientToExcelDTO>> findPatientsForExcel(@RequestParam(value = "startDate", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
                                                   @RequestParam(value = "endDate", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate)  {
        List<PatientToExcelDTO> list = new ArrayList<>();

        List<Patient> patients = (startDate == null || endDate == null)
                ? patientService.findAll()
                : patientService.findAllByLocalDate(startDate, endDate);

        for (Patient p : patients) {
            // 한 환자당 여러 수술이 있을 수 있으므로 수술 정보마다 새 행을 생성
            List<Operation> operations = operationService.findAllByPatient(p.getId());
            for (Operation op : operations) {
                List<CheckList> checkList = checkListRepository.findAllByOperationId(op.getId());
                // CheckList 처리 (Before, During, After)
                CheckListItem checkListItem = checkListItemRepository.findCheckListItemByOperation(op);
                CheckListBefore checkListBefore = checkListBeforeRepository.findCheckListBeforeByCheckListItem(checkListItem);
                CheckListDuring checkListDuring = checkListDuringRepository.findCheckListDuringByCheckListItem(checkListItem);
                CheckListAfter checkListAfter = checkListAfterRepository.findCheckListAfterByCheckListItem(checkListItem);

                if (checkListBefore == null || checkListDuring == null || checkListAfter == null || checkList.size() < 3)
                    continue;

                list.add(PatientToExcelDTO.toEntity(p, op, queryRepository.findOpmByOperationId(op.getId())));
            }
        }

        return SuccessResponse.createSuccess(list);
    }

}
