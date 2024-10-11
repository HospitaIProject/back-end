package com.team.hospital.api.checkListBefore;

import com.team.hospital.api.apiResponse.SuccessResponse;
import com.team.hospital.api.checkListBefore.dto.CheckListBeforeDTO;
import com.team.hospital.api.checkListBefore.dto.CheckListBeforeResponse;
import com.team.hospital.api.checkListBefore.dto.WriteCheckListBefore;
import com.team.hospital.api.checkListItem.CheckListItem;
import com.team.hospital.api.checkListItem.CheckListItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name = "수술 전 체크리스트 관리", description = "수술 전 체크리스트 관리 API")
public class CheckListBeforeController {

    private final CheckListBeforeService checkListBeforeService;
    private final CheckListItemService checkListItemService;

    @PostMapping("/api/checkListBefore/{checkListItemId}")
    @Operation(summary = "세팅한 수술 전 체크리스트에 대하여 수술 전 체크리스트 등록")
    public SuccessResponse<?> save(@RequestBody WriteCheckListBefore writeCheckListBefore, @PathVariable Long checkListItemId) {
        checkListBeforeService.save(writeCheckListBefore, checkListItemId);
        return SuccessResponse.createSuccess();
    }

    @PostMapping("/api/checkListBefore/operation/{operationId}")
    @Operation(summary = "operationId를 통해 세팅한 수술 전 체크리스트에 대하여 수술 전 체크리스트 등록")
    public SuccessResponse<?> saveWithOperationId(@RequestBody WriteCheckListBefore writeCheckListBefore, @PathVariable Long operationId) {
        CheckListItem checkListItem = checkListItemService.findCheckListItemByOperation(operationId);
        checkListBeforeService.save(writeCheckListBefore, checkListItem.getId());
        return SuccessResponse.createSuccess();
    }

    @GetMapping("/api/checkListBefore")
    @Operation(summary = "전체 수술 전 체크리스트 조회")
    public SuccessResponse<List<CheckListBeforeDTO>> findAllCheckListBefore() {
        List<CheckListBeforeDTO> list = checkListBeforeService.findAll().stream().map(CheckListBeforeDTO::toEntity).toList();
        return SuccessResponse.createSuccess(list);
    }

    @GetMapping("/api/checkListBefore/{checkListBeforeId}")
    @Operation(summary = "checkListBeforeId를 통해 수술 전 체크리스트 상세 조회")
    public SuccessResponse<CheckListBeforeResponse> findCheckList(@PathVariable Long checkListBeforeId) {
        CheckListBeforeDTO checkListBeforeDTO = CheckListBeforeDTO.toEntity(checkListBeforeService.findCheckListBeforeById(checkListBeforeId));
        return SuccessResponse.createSuccess(CheckListBeforeResponse.toEntity(checkListBeforeDTO));
    }

    @GetMapping("/api/checkListBeforeDetail/{operationId}")
    @Operation(summary = "operationId를 통해 수술 전 체크리스트 상세 조회")
    public SuccessResponse<CheckListBeforeResponse> findCheckListBeforeByOperationId(@PathVariable Long operationId) {
        CheckListBeforeDTO checkListBeforeDTO = checkListBeforeService.findCheckListBeforeByOperationId(operationId);
        return SuccessResponse.createSuccess(CheckListBeforeResponse.toEntity(checkListBeforeDTO));
    }

    @PutMapping("/api/checkListBefore/{checkListBeforeId}")
    @Operation(summary = "수술 전 체크리스트 수정")
    public SuccessResponse<?> modifyCheckList(@RequestBody WriteCheckListBefore writeCheckListBefore,
                                              @PathVariable Long checkListBeforeId) {
        checkListBeforeService.modify(writeCheckListBefore, checkListBeforeId);
        return SuccessResponse.createSuccess();
    }

    @DeleteMapping("/api/checkListBefore/{checkListBeforeId}")
    @Operation(summary = "수술 전 체크리스트 삭제")
    public SuccessResponse<?> deleteCheckList(@PathVariable Long checkListBeforeId) {
        checkListBeforeService.delete(checkListBeforeId);
        return SuccessResponse.createSuccess();
    }
}
