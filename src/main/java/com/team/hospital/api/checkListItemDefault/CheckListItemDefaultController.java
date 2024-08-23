package com.team.hospital.api.checkListItemDefault;

import com.team.hospital.api.apiResponse.SuccessResponse;
import com.team.hospital.api.checkListItemDefault.dto.CheckListItemDefaultResponse;
import com.team.hospital.api.checkListItemDefault.dto.WriteCheckListItemDefault;
import com.team.hospital.api.operationType.OperationType;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Tag(name = "체크리스트 목록 기본값 관리", description = "체크리스트 목록 기본값 관리 API")
public class CheckListItemDefaultController {

    private final CheckListItemDefaultService checkListItemDefaultService;

    @GetMapping("/api/checkListItemDefault/{operationTypeName}")
    @Operation(summary = "operationType의 이름으로 해당 수술 타입의 checkListItemDefault를 불러옵니다.")
    public SuccessResponse<?> findByOperationTypeName(@PathVariable String operationTypeName) {
        CheckListItemDefault checkListItemDefault = checkListItemDefaultService.findByOperationTypeName(operationTypeName);
        return SuccessResponse.createSuccess(CheckListItemDefaultResponse.toEntity(checkListItemDefault));
    }

    @GetMapping("/api/checkListItemDefault")
    @Operation(summary = "해당 수술 방법에 따른 CheckListItemDefault 엔티티를 검색하는 엔드포인트입니다.")
    public SuccessResponse<?> find(@RequestParam OperationType operationType) {
        CheckListItemDefault checkListItemDefault = checkListItemDefaultService.findByOperationType(operationType);
        return SuccessResponse.createSuccess(CheckListItemDefaultResponse.toEntity(checkListItemDefault));
    }

    @PostMapping("/api/checkListItemDefault")
    @Operation(summary = "새로운 CheckListItemDefault 엔티티를 저장합니다.")
    public SuccessResponse<?> save(@RequestBody WriteCheckListItemDefault write) {
        checkListItemDefaultService.save(write);
        return SuccessResponse.createSuccess();
    }

    @PutMapping("/api/checkListItemDefault")
    @Operation(summary = "지정된 수술 방법에 따라 CheckListItemDefault 엔티티를 업데이트합니다.")
    public SuccessResponse<?> update(@RequestBody WriteCheckListItemDefault write) {
        checkListItemDefaultService.update(write);
        return SuccessResponse.createSuccess();
    }
}