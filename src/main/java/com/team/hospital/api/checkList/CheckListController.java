package com.team.hospital.api.checkList;

import com.team.hospital.api.SuccessResponse;
import com.team.hospital.api.checkList.dto.CheckListDTO;
import com.team.hospital.api.checkList.dto.CheckListResponse;
import com.team.hospital.api.checkList.dto.CheckListWithOperationDateDTO;
import com.team.hospital.api.checkList.dto.WriteCheckList;
import com.team.hospital.api.checkListItem.CheckListItem;
import com.team.hospital.api.checkListItem.CheckListItemService;
import com.team.hospital.api.operation.OperationService;
import com.team.hospital.api.operation.dto.OperationDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name = "체크리스트 관리", description = "체크리스트 관리 API")
public class CheckListController {

    private final CheckListService checkListService;
    private final CheckListItemService checkListItemService;
    private final OperationService operationService;

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
    @Operation(summary = "operation에 해당하는 체크리스트 목록")
    public SuccessResponse<CheckListWithOperationDateDTO> findCheckListByOperationId(@PathVariable Long operationId) {
        List<CheckList> checkLists = checkListService.findAllByOperationId(operationId);
        com.team.hospital.api.operation.Operation operation = operationService.findOperationById(operationId);
        boolean checkListCreatedToday = checkListService.checkIfCheckListCreatedToday(operationId);
        return SuccessResponse.createSuccess(CheckListWithOperationDateDTO.toEntity(checkLists, OperationDTO.toEntity(operation), checkListCreatedToday));
    }

    @GetMapping("/api/checkList")
    @Operation(summary = "전체 체크리스트 조회")
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

    @PutMapping("/api/{checkListId}")
    @Operation(summary = "체크리스트 수정")
    public SuccessResponse<?> modifyCheckList(@RequestBody WriteCheckList writeCheckList,
                                              @PathVariable Long checkListId) {
        checkListService.modify(writeCheckList, checkListId);
        return SuccessResponse.createSuccess();
    }

    @DeleteMapping("/api/{checkListId}")
    @Operation(summary = "체크리스트 삭제")
    public SuccessResponse<?> deleteCheckList(@PathVariable Long checkListId) {
        checkListService.delete(checkListId);
        return SuccessResponse.createSuccess();
    }
}
