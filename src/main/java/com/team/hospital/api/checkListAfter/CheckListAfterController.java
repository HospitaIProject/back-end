package com.team.hospital.api.checkListAfter;

import com.team.hospital.api.apiResponse.SuccessResponse;
import com.team.hospital.api.checkListAfter.dto.CheckListAfterDTO;
import com.team.hospital.api.checkListAfter.dto.CheckListAfterResponse;
import com.team.hospital.api.checkListAfter.dto.WriteCheckListAfter;
import com.team.hospital.api.checkListItem.CheckListItem;
import com.team.hospital.api.checkListItem.CheckListItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name = "수술 후 체크리스트 관리", description = "수술 후 체크리스트 관리 API")
@SecurityRequirement(name = "Bearer Authentication")
public class CheckListAfterController {

    private final CheckListAfterService checkListAfterService;
    private final CheckListItemService checkListItemService;

    @PostMapping("/api/checkListAfter/{checkListItemId}")
    @Operation(summary = "세팅한 수술 후 체크리스트에 대하여 수술 후 체크리스트 등록")
    public SuccessResponse<?> save(@RequestBody WriteCheckListAfter write, @PathVariable Long checkListItemId) {
        checkListAfterService.save(write, checkListItemId);
        return SuccessResponse.createSuccess();
    }

    @PostMapping("/api/checkListAfter/operation/{operationId}")
    @Operation(summary = "operationId를 통해 세팅한 수술 후 체크리스트에 대하여 수술 전 체크리스트 등록")
    public SuccessResponse<?> saveWithOperationId(@RequestBody WriteCheckListAfter write, @PathVariable Long operationId) {
        CheckListItem checkListItem = checkListItemService.findCheckListItemByOperation(operationId);
        checkListAfterService.save(write, checkListItem.getId());
        return SuccessResponse.createSuccess();
    }

    @GetMapping("/api/checkListAfter")
    @Operation(summary = "전체 수술 후 체크리스트 조회")
    public SuccessResponse<List<CheckListAfterDTO>> findAllCheckListAfter() {
        List<CheckListAfterDTO> list = checkListAfterService.findAll().stream().map(CheckListAfterDTO::toEntity).toList();
        return SuccessResponse.createSuccess(list);
    }

    @GetMapping("/api/checkListAfter/{checkListAfterId}")
    @Operation(summary = "checkListAfterId를 통해 수술 후 체크리스트 상세 조회")
    public SuccessResponse<CheckListAfterResponse> findCheckList(@PathVariable Long checkListAfterId) {
        CheckListAfterDTO checkListAfterDTO = CheckListAfterDTO.toEntity(checkListAfterService.findCheckListAfterById(checkListAfterId));
        return SuccessResponse.createSuccess(CheckListAfterResponse.toEntity(checkListAfterDTO));
    }

    @GetMapping("/api/checkListAfterDetail/{operationId}")
    @Operation(summary = "operationId를 통해 수술 후 체크리스트 상세 조회")
    public SuccessResponse<CheckListAfterResponse> findCheckListAfterByOperationId(@PathVariable Long operationId) {
        CheckListAfterDTO checkListAfterDTO = checkListAfterService.findCheckListAfterByOperationId(operationId);
        return SuccessResponse.createSuccess(CheckListAfterResponse.toEntity(checkListAfterDTO));
    }

    @PutMapping("/api/checkListAfter/{checkListAfterId}")
    @Operation(summary = "수술 후 체크리스트 수정")
    public SuccessResponse<?> modifyCheckList(@RequestBody WriteCheckListAfter write,
                                              @PathVariable Long checkListAfterId) {
        checkListAfterService.modify(write, checkListAfterId);
        return SuccessResponse.createSuccess();
    }

    @DeleteMapping("/api/checkListAfter/{checkListAfterId}")
    @Operation(summary = "수술 후 체크리스트 삭제")
    public SuccessResponse<?> deleteCheckList(@PathVariable Long checkListAfterId) {
        checkListAfterService.delete(checkListAfterId);
        return SuccessResponse.createSuccess();
    }

    @PutMapping("/api/checkListAfter/jp/{checkListAfterId}")
    @Operation(summary = "JP 제거 날짜 수정")
    public SuccessResponse<?> updateJpRemovalDate(@RequestParam LocalDate jpRemovalDate, @PathVariable Long checkListAfterId) {
        checkListAfterService.updateJpRemovalDate(jpRemovalDate, checkListAfterId);
        return SuccessResponse.createSuccess();
    }

    @PutMapping("/api/checkListAfter/cath/{checkListAfterId}")
    @Operation(summary = "Catheter 제거 날짜 수정")
    public SuccessResponse<?> updateCatheterDate(@RequestParam LocalDate catheRemovalDate, @PathVariable Long checkListAfterId) {
        checkListAfterService.updateCatheterRemovalDate(catheRemovalDate, checkListAfterId);
        return SuccessResponse.createSuccess();
    }
}
