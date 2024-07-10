package com.team.hospital.api.operation;

import com.team.hospital.api.SuccessResponse;
import com.team.hospital.api.operation.dto.OperationDTO;
import com.team.hospital.api.operation.dto.RegisterOperation;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;

@RequiredArgsConstructor
@RestController
@Tag(name = "수술 관리", description = "수술 관리 API")
public class OperationController {

    private final OperationService operationService;

    @PostMapping("/api/operation/{patientId}")
    @Operation(summary = "특정 환자에 대한 operation 등록", description = "입력한 환자의 ID값에 해당한 환자의 operation 등록 후 Id 값 반환")
    public SuccessResponse<Long> save(@RequestBody RegisterOperation registerOperation,
                                      @PathVariable Long patientId) {
        return SuccessResponse.createSuccess(operationService.save(registerOperation, patientId));
    }

    @GetMapping("/api/operations/{patientId}")
    @Operation(summary = "특정 환자에 대한 operation 목록", description = "입력한 환자의 ID값에 해당하는 환자의 operation 목록")
    public SuccessResponse<List<OperationDTO>> findOperations(@PathVariable Long patientId) {
        List<OperationDTO> operationDTOS = operationService.findAllByPatient(patientId);

        // operationDate를 기준으로 내림차순 정렬
        operationDTOS.sort(Comparator.comparing(OperationDTO::getOperationDate).reversed());
        return SuccessResponse.createSuccess(operationDTOS);
    }

    @PutMapping("/api/operation/{operationId}")
    @Operation(summary = "operation 수정")
    public SuccessResponse<?> modifyOperation(@RequestBody RegisterOperation registerOperation,
                                              @PathVariable Long operationId) {
        operationService.modify(registerOperation, operationId);
        return SuccessResponse.createSuccess();
    }

    @DeleteMapping("/api/operation/{operationId}")
    @Operation(summary = "operation 삭제")
    public SuccessResponse<?> deleteOperation(@PathVariable Long operationId) {
        operationService.delete(operationId);
        return SuccessResponse.createSuccess();
    }
}
