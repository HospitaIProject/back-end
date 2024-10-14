package com.team.hospital.api.operationType;

import com.team.hospital.api.apiResponse.SuccessResponse;
import com.team.hospital.api.operationType.dto.WriteOperationType;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@SecurityRequirement(name = "Bearer Authentication")
public class OperationTypeController {

    private final OperationTypeService operationTypeService;

    @GetMapping("/api/operationTypes")
    @io.swagger.v3.oas.annotations.Operation(summary = "모든 operationType name 반환", description = "등록된 모든 operationType을 반환합니다.")
    public SuccessResponse<?> findAll() {
        List<String> operationTypeNames = operationTypeService.findAll().stream()
                .map(OperationType::getName)
                .toList();
        return SuccessResponse.createSuccess(operationTypeNames);
    }

    @PostMapping("/api/operationType")
    @io.swagger.v3.oas.annotations.Operation(summary = "operationType 등록", description = "새로운 operationType을 등록합니다.")
    public void save(@RequestBody WriteOperationType write) {
        OperationType operationType = OperationType.toEntity(write);
        operationTypeService.save(operationType);
    }

    @DeleteMapping("/api/operationType/{operationTypeName}")
    @io.swagger.v3.oas.annotations.Operation(summary = "operationType 삭제", description = "기존 등록된 operationType을 삭제합니다.")
    public void delete(@PathVariable String operationTypeName) {
        operationTypeService.deleteByName(operationTypeName);
    }

    @PutMapping("/api/operationType/{operationTypeName}")
    @io.swagger.v3.oas.annotations.Operation(summary = "operationType 수정", description = "기존 등록된 operationType을 수정합니다.")
    public void update(@PathVariable String operationTypeName, @RequestBody WriteOperationType write) {
        operationTypeService.update(operationTypeName, write);
    }


}
