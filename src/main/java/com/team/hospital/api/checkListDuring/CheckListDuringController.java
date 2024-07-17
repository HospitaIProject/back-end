package com.team.hospital.api.checkListDuring;

import com.team.hospital.api.apiResponse.SuccessResponse;
import com.team.hospital.api.checkListBefore.CheckListBeforeDTO;
import com.team.hospital.api.checkListBefore.CheckListBeforeResponse;
import com.team.hospital.api.checkListItem.CheckListItem;
import com.team.hospital.api.checkListItem.CheckListItemService;
import com.team.hospital.api.operation.OperationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name = "수술 중 체크리스트 관리", description = "수술 중 체크리스트 관리 API")
public class CheckListDuringController {

    private final CheckListDuringService checkListDuringService;
    private final CheckListItemService checkListItemService;

    @PostMapping("/api/checkListDuring/{checkListItemId}")
    @Operation(summary = "세팅한 수술 중 체크리스트에 대하여 수술 중 체크리스트 등록")
    public SuccessResponse<?> save(@RequestBody WriteCheckListDuring writeCheckListDuring, @PathVariable Long checkListItemId) {
        checkListDuringService.save(writeCheckListDuring, checkListItemId);
        return SuccessResponse.createSuccess();
    }

    @PostMapping("/api/checkListDuring/operation/{operationId}")
    @Operation(summary = "operationId를 통해 세팅한 수술 중 체크리스트에 대하여 수술 중 체크리스트 등록")
    public SuccessResponse<?> saveWithOperationId(@RequestBody WriteCheckListDuring writeCheckListDuring, @PathVariable Long operationId) {
        CheckListItem checkListItem = checkListItemService.findCheckListItemByOperation(operationId);
        checkListDuringService.save(writeCheckListDuring, checkListItem.getId());
        return SuccessResponse.createSuccess();
    }

    @GetMapping("/api/checkListDuring")
    @Operation(summary = "수술 중 체크리스트 전체 조회")
    public SuccessResponse<List<CheckListDuringDTO>> findAllCheckList() {
        List<CheckListDuringDTO> list = checkListDuringService.findAll().stream().map(CheckListDuringDTO::toEntity).toList();
        return SuccessResponse.createSuccess(list);
    }

    @GetMapping("/api/checkListDuring/{checkListDuring}")
    @Operation(summary = "수술 중 체크리스트 상세 조회")
    public SuccessResponse<CheckListDuringResponse> findCheckList(@PathVariable Long checkListDuring) {
        CheckListDuringDTO checkListDuringDTO = CheckListDuringDTO.toEntity(checkListDuringService.findCheckListDuringById(checkListDuring));
        return SuccessResponse.createSuccess(CheckListDuringResponse.toEntity(checkListDuringDTO));
    }

    @GetMapping("/api/checkListDuringDetail/{operationId}")
    @Operation(summary = "operationId를 통해 수술  체크리스트 상세 조회")
    public SuccessResponse<CheckListDuringResponse> findCheckListDuringByOperationId(@PathVariable Long operationId) {
        CheckListDuringDTO checkListDuringDTO = checkListDuringService.findCheckListDuringByOperationId(operationId);
        return SuccessResponse.createSuccess(CheckListDuringResponse.toEntity(checkListDuringDTO));
    }


    @PutMapping("/api/{checkListDuringId}")
    @Operation(summary = "수술 중 체크리스트 수정")
    public SuccessResponse<?> modifyCheckList(@RequestBody WriteCheckListDuring writeCheckListDuring,
                                              @PathVariable Long checkListDuringId) {
        checkListDuringService.modify(writeCheckListDuring, checkListDuringId);
        return SuccessResponse.createSuccess();
    }

    @DeleteMapping("/api/{checkListDuringId}")
    @Operation(summary = "수술 중 체크리스트 삭제")
    public SuccessResponse<?> deleteCheckList(@PathVariable Long checkListDuringId) {
        checkListDuringService.delete(checkListDuringId);
        return SuccessResponse.createSuccess();
    }
}