package com.team.hospital.api.checkList;

import com.team.hospital.api.CommonApiResponse;
import com.team.hospital.api.checkList.dto.CheckListDTO;
import com.team.hospital.api.checkList.dto.CheckListResponse;
import com.team.hospital.api.checkList.dto.WriteCheckList;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CheckListController {

    private final CheckListService checkListService;

    @PostMapping("/api/checkList/{checkListItemId}")
    @Operation(summary = "세팅한 체크리스트에 대하여 체크리스트 등록")
    public CommonApiResponse<?> save(@RequestBody WriteCheckList writeCheckList,
                                     @PathVariable Long checkListItemId) {
        checkListService.save(writeCheckList, checkListItemId);
        return CommonApiResponse.createSuccess();
    }

    @GetMapping("/api/checkLists/{operationId}")
    @Operation(summary = "operation에 해당하는 체크리스트 목록")
    public CommonApiResponse<List<CheckListDTO>> findCheckListByOperationId(@PathVariable Long operationId) {
        List<CheckListDTO> list = checkListService.findAllByOperation(operationId);
        return CommonApiResponse.createSuccess(list);
    }

    @GetMapping("/api/checkList")
    @Operation(summary = "전체 체크리스트 조회")
    public CommonApiResponse<List<CheckListDTO>> findAllCheckList() {
        List<CheckListDTO> list = checkListService.findAll();
        return CommonApiResponse.createSuccess(list);
    }

    @GetMapping("/api/checkList/{checkListId}")
    @Operation(summary = "체크리스트 상세 조회")
    public CommonApiResponse<CheckListResponse> findCheckList(@PathVariable Long checkListId) {
        CheckListDTO checkListDTO = CheckListDTO.toEntity(checkListService.findCheckListById(checkListId));
        return CommonApiResponse.createSuccess(CheckListResponse.toEntity(checkListDTO));
    }

    @PutMapping("/api/{checkListId}")
    @Operation(summary = "체크리스트 수정")
    public CommonApiResponse<?> modifyCheckList(@RequestBody WriteCheckList writeCheckList,
                                             @PathVariable Long checkListId) {
        checkListService.modify(writeCheckList, checkListId);
        return CommonApiResponse.createSuccess();
    }

    @DeleteMapping("/api/{checkListId}")
    @Operation(summary = "체크리스트 삭제")
    public CommonApiResponse<?> deleteCheckList(@PathVariable Long checkListId) {
        checkListService.delete(checkListId);
        return CommonApiResponse.createSuccess();
    }
}
