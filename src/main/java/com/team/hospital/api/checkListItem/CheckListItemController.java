package com.team.hospital.api.checkListItem;

import com.team.hospital.api.apiResponse.SuccessResponse;
import com.team.hospital.api.checkListItem.dto.CheckListItemDTO;
import com.team.hospital.api.checkListItem.dto.CheckListItemResponse;
import com.team.hospital.api.checkListItem.dto.WriteCheckListItem;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Tag(name = "체크리스트 목록 관리", description = "체크리스트 목록 관리 API")
public class CheckListItemController {

    private final CheckListItemService checkListItemService;

    @PostMapping("/api/checkListItem/{operationId}")
    @Operation(summary = "operation에 대한 checkListItem 세팅", description = "입력한 operation의 ID값에 해당한 operation의 checkListItem 등록")
    public SuccessResponse<?> save(@RequestBody WriteCheckListItem writeCheckListItem,
                                   @PathVariable Long operationId) {
        checkListItemService.save(writeCheckListItem, operationId);
        return SuccessResponse.createSuccess();
    }

    @GetMapping("/api/checkListItem/{operationId}")
    @Operation(summary = "operation에 대한 checkListItem 세팅 조회")
    public SuccessResponse<CheckListItemResponse> findByOperation(@PathVariable Long operationId){
        CheckListItemDTO checkListItemDTO = CheckListItemDTO.toEntity(checkListItemService.findCheckListItemByOperation(operationId));
        return SuccessResponse.createSuccess(CheckListItemResponse.toEntity(checkListItemDTO));
    }

    @PutMapping("/api/checkListItem/{operationId}")
    @Operation(summary = "세팅된 checkListItem 수정")
    public SuccessResponse<?> updateCheckListItem(@RequestBody WriteCheckListItem writeCheckListItem,
                                                  @PathVariable Long operationId){
        checkListItemService.update(writeCheckListItem, operationId);
        return SuccessResponse.createSuccess();
    }

    @DeleteMapping("/api/checkListItem/{operationId}")
    @Operation(summary = "세팅된 checkListItem 세팅 삭제")
    public SuccessResponse<?> deleteCheckListItem(@PathVariable Long operationId){
        checkListItemService.delete(operationId);
        return SuccessResponse.createSuccess();
    }

}
