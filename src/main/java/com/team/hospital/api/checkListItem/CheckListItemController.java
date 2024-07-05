package com.team.hospital.api.checkListItem;

import com.team.hospital.api.CommonApiResponse;
import com.team.hospital.api.checkListItem.dto.CheckListItemDTO;
import com.team.hospital.api.checkListItem.dto.CheckListItemResponse;
import com.team.hospital.api.checkListItem.dto.WriteCheckListItem;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class CheckListItemController {

    private final CheckListItemService checkListItemService;

    @PostMapping("/api/checkListItem/{operationId}")
    @Operation(summary = "operation에 대한 checkList 세팅", description = "입력한 operation의 ID값에 해당한 operation의 checkListItem 등록")
    public CommonApiResponse<?> save(@RequestBody WriteCheckListItem writeCheckListItem,
                                          @PathVariable Long operationId){
        checkListItemService.save(writeCheckListItem, operationId);
        return CommonApiResponse.createSuccess();
    }

    @GetMapping("/api/checkListItem/{operationId}")
    @Operation(summary = "operation에 대한 checkList 세팅 조회")
    public CommonApiResponse<CheckListItemResponse> findByOperation(@PathVariable Long operationId){
        CheckListItemDTO checkListItemDTO = CheckListItemDTO.toEntity(checkListItemService.findCheckListItemByOperation(operationId));
        return CommonApiResponse.createSuccess(CheckListItemResponse.toEntity(checkListItemDTO));
    }

    @PutMapping("/api/{checkListItemId}")
    @Operation(summary = "세팅된 checkListItem 수정")
    public CommonApiResponse<?> modifyCheckListItem(@RequestBody WriteCheckListItem writeCheckListItem,
                                                 @PathVariable Long checkListItemId){
        checkListItemService.modify(writeCheckListItem, checkListItemId);
        return CommonApiResponse.createSuccess();
    }

    @DeleteMapping("/api/{checkListItemId}")
    @Operation(summary = "세팅된 checkListItem 세팅 삭제")
    public CommonApiResponse<?> deleteCheckListItem(@PathVariable Long checkListItemId){
        checkListItemService.delete(checkListItemId);
        return CommonApiResponse.createSuccess();
    }

}
