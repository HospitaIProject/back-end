package com.team.hospital.api.checkList;

import com.team.hospital.api.apiResponse.SuccessResponse;
import com.team.hospital.api.checkList.dto.*;
import com.team.hospital.api.checkListAfter.CheckListAfterService;
import com.team.hospital.api.checkListAfter.dto.CheckListAfterDTO;
import com.team.hospital.api.checkListAfter.exception.CheckListAfterNotFoundException;
import com.team.hospital.api.checkListBefore.CheckListBeforeService;
import com.team.hospital.api.checkListBefore.dto.CheckListBeforeDTO;
import com.team.hospital.api.checkListBefore.exception.CheckListBeforeNotFoundException;
import com.team.hospital.api.checkListDuring.CheckListDuringService;
import com.team.hospital.api.checkListDuring.dto.CheckListDuringDTO;
import com.team.hospital.api.checkListDuring.exception.CheckListDuringNotFoundException;
import com.team.hospital.api.checkListItem.CheckListItem;
import com.team.hospital.api.checkListItem.CheckListItemService;
import com.team.hospital.api.operation.OperationService;
import com.team.hospital.api.operation.dto.OperationDTO;
import com.team.hospital.api.patient.Patient;
import com.team.hospital.api.patient.enumType.CheckListStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name = "체크리스트 관리", description = "체크리스트 관리 API")
@SecurityRequirement(name = "Bearer Authentication")
public class CheckListController {

    private final CheckListItemService checkListItemService;
    private final CheckListService checkListService;
    private final CheckListBeforeService checkListBeforeService;
    private final CheckListDuringService checkListDuringService;
    private final CheckListAfterService checkListAfterService;
    private final OperationService operationService;
    private final ComplianceService complianceService;

    @PostMapping("/api/checkList/{checkListItemId}")
    @Operation(summary = "세팅한 체크리스트에 대하여 체크리스트 등록")
    public SuccessResponse<?> save(@RequestBody WriteCheckList writeCheckList, @PathVariable Long checkListItemId) {
        checkListService.save(writeCheckList, checkListItemId);
        return SuccessResponse.createSuccess();
    }

    @PostMapping("/api/checkList/operation/{operationId}")
    @Operation(summary = "operationId를 통해 세팅한 체크리스트에 대하여 체크리스트 등록")
    public SuccessResponse<?> saveWithOperationId(@RequestBody WriteCheckList writeCheckList, @PathVariable Long operationId) {
        CheckListItem checkListItem = checkListItemService.findCheckListItemByOperation(operationId);
        checkListService.save(writeCheckList, checkListItem.getId());
        return SuccessResponse.createSuccess();
    }

    @GetMapping("/api/checkLists/{operationId}")
    @Operation(summary = "Operation Id 에 해당하는 체크리스트 목록")
    public SuccessResponse<CheckListOpDate> findCheckListByOperationId(@PathVariable Long operationId) {
        com.team.hospital.api.operation.Operation operation = operationService.findOperationById(operationId);
        Patient patient = operation.getPatient();
        List<CheckList> checkLists = checkListService.checks(operationId);
        CheckListStatus createdToday = checkListService.checkListCreatedToday(operationId, patient.getOperationDate());
        CheckListBeforeDTO checkListBeforeDTO = getCheckListBeforeDTO(operationId);
        CheckListDuringDTO checkListDuringDTO = getCheckListDuringDTO(operationId);
        CheckListAfterDTO checkListAfterDTO = getCheckListAfterDTO(operationId);
        ComplianceScoreDTO complianceScoreDTO = complianceService.calculateScore(operationId);

        CheckListOpDate checkListDTO = CheckListOpDate.toEntity(
                OperationDTO.toEntity(operation),
                patient,
                checkLists,
                createdToday,
                checkListBeforeDTO,
                checkListDuringDTO,
                checkListAfterDTO,
                complianceScoreDTO);

        return SuccessResponse.createSuccess(checkListDTO);
    }

    @GetMapping("/api/checkLists")
    @Operation(summary = "수술 후 체크리스트 전체 조회")
    public SuccessResponse<List<CheckListDTO>> findAllCheckList() {
        List<CheckListDTO> list = checkListService.findAll().stream().map(CheckListDTO::toEntity).toList();
        return SuccessResponse.createSuccess(list);
    }

    @GetMapping("/api/checkList/{checkListId}")
    @Operation(summary = "체크리스트 상세 조회")
    public SuccessResponse<CheckListResponse> findCheckList(@PathVariable Long checkListId) {
        CheckListDTO checkListDTO = CheckListDTO.toEntity(checkListService.findCheckListById(checkListId));
        return SuccessResponse.createSuccess(CheckListResponse.toEntity(checkListDTO));
    }

    @PutMapping("/api/checkList/{checkListId}")
    @Operation(summary = "체크리스트 수정")
    public SuccessResponse<?> modifyCheckList(@RequestBody WriteCheckList writeCheckList,
                                              @PathVariable Long checkListId) {
        checkListService.modify(writeCheckList, checkListId);
        return SuccessResponse.createSuccess();
    }

    @DeleteMapping("/api/checkList/{checkListId}")
    @Operation(summary = "체크리스트 삭제")
    public SuccessResponse<?> deleteCheckList(@PathVariable Long checkListId) {
        checkListService.delete(checkListId);
        return SuccessResponse.createSuccess();
    }

    @GetMapping("/api/checkList/pod/{operationId}")
    @Operation(summary = "POD 등록 여부")
    public SuccessResponse<?> checkPodRegistered(@PathVariable Long operationId) {
        return SuccessResponse.createSuccess(checkListService.testV2(operationId));
    }

    @PutMapping("/api/checkList/date/{checkListId}")
    @Operation(summary = "IV 제거 날짜 수정")
    public SuccessResponse<?> updateDate(@RequestParam LocalDate date, @PathVariable Long checkListId) {
        checkListService.updateRemovalDate(date, checkListId);
        return SuccessResponse.createSuccess();
    }

    private CheckListBeforeDTO getCheckListBeforeDTO(Long operationId) {
        try {
            return checkListBeforeService.findCheckListBeforeByOperationId(operationId);
        } catch (CheckListBeforeNotFoundException e) {
            return null;
        }
    }

    private CheckListDuringDTO getCheckListDuringDTO(Long operationId) {
        try {
            return checkListDuringService.findCheckListDuringByOperationId(operationId);
        } catch (CheckListDuringNotFoundException e) {
            return null;
        }
    }

    private CheckListAfterDTO getCheckListAfterDTO(Long operationId) {
        try {
            return checkListAfterService.findCheckListAfterByOperationId(operationId);
        } catch (CheckListAfterNotFoundException e) {
            return null;
        }
    }
}
