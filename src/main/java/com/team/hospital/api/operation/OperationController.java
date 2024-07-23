package com.team.hospital.api.operation;

import com.team.hospital.api.apiResponse.SuccessResponse;
import com.team.hospital.api.complication.ComplicationService;
import com.team.hospital.api.operation.dto.OperationDTO;
import com.team.hospital.api.operation.dto.RegisterOperation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@Tag(name = "수술 관리", description = "수술 관리 API")
public class OperationController {

    private final OperationService operationService;
    private final ComplicationService complicationService;

    @GetMapping("/api/operation/{operationId}")
    @io.swagger.v3.oas.annotations.Operation(summary = "특정 id값에 대한 operation 상세 조회", description = "입력한 operationID 값에 해당하는 operation 상세 조회")
    public SuccessResponse<OperationDTO> findByOperationId(@PathVariable Long operationId) {
        Operation operation = operationService.findOperationById(operationId);
        return SuccessResponse.createSuccess(OperationDTO.toEntity(operation));
    }

    @PostMapping("/api/operation/{patientId}")
    @io.swagger.v3.oas.annotations.Operation(summary = "특정 환자에 대한 operation 등록", description = "입력한 환자의 ID값에 해당한 환자의 operation 등록 후 Id 값 반환")
    public SuccessResponse<Long> save(@RequestBody RegisterOperation registerOperation,
                                      @PathVariable Long patientId) {
        return SuccessResponse.createSuccess(operationService.save(registerOperation, patientId));
    }

    @GetMapping("/api/operations/{patientId}")
    @io.swagger.v3.oas.annotations.Operation(summary = "특정 환자에 대한 operation 목록", description = "입력한 환자의 ID값에 해당하는 환자의 operation 목록")
    public SuccessResponse<List<OperationDTO>> findOperations(@PathVariable Long patientId) {
        List<OperationDTO> operationDTOS = operationService.findAllByPatient(patientId).stream()
                .map(operation -> OperationDTO.toEntity(operation, complicationService.existsByOperation(operation)))
                .toList();

        return SuccessResponse.createSuccess(operationDTOS);
    }

    @PutMapping("/api/operation/{operationId}")
    @io.swagger.v3.oas.annotations.Operation(summary = "operation 수정")
    public SuccessResponse<?> modifyOperation(@RequestBody RegisterOperation registerOperation,
                                              @PathVariable Long operationId) {
        operationService.modify(registerOperation, operationId);
        return SuccessResponse.createSuccess();
    }

    @DeleteMapping("/api/operation/{operationId}")
    @io.swagger.v3.oas.annotations.Operation(summary = "operation 삭제")
    public SuccessResponse<?> deleteOperation(@PathVariable Long operationId) {
        operationService.delete(operationId);
        return SuccessResponse.createSuccess();
    }
}
