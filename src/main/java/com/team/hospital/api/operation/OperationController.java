package com.team.hospital.api.operation;

import com.team.hospital.api.CommonApiResponse;
import com.team.hospital.api.operation.dto.OperationDTO;
import com.team.hospital.api.operation.dto.OperationResponse;
import com.team.hospital.api.operation.dto.RegisterOperation;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class OperationController {

    private final OperationService operationService;

    @PostMapping("/api/operation/{patientId}")
    @Operation(summary = "특정 환자에 대한 operation 등록", description = "입력한 환자의 ID값에 해당한 환자의 operation 등록")
    public CommonApiResponse<Long> save(@RequestBody RegisterOperation registerOperation,
                                     @PathVariable Long patientId){
        return CommonApiResponse.createSuccess(operationService.save(registerOperation, patientId));
    }

    @GetMapping("/api/operations/{patientId}")
    @Operation(summary = "특정 환자에 대한 operation 목록", description = "입력한 환자의 ID값에 해당하는 환자의 operation 목록")
    public CommonApiResponse<List<OperationDTO>> findOperations(@PathVariable Long patientId) {
        List<OperationDTO> operationDTOS = operationService.findAllByPatient(patientId);
        return CommonApiResponse.createSuccess(operationDTOS);
    }

    @PutMapping("/api/operation/{operationId}")
    @Operation(summary = "operation 수정")
    public CommonApiResponse<?> modifyOperation(@RequestBody RegisterOperation registerOperation,
                                                             @PathVariable Long operationId){
        operationService.modify(registerOperation, operationId);
        return CommonApiResponse.createSuccess();
    }

    @DeleteMapping("/api/operation/{operationId}")
    @Operation(summary = "operation 삭제")
    public CommonApiResponse<?> deleteOperation(@PathVariable Long operationId){
        operationService.delete(operationId);
        return CommonApiResponse.createSuccess();
    }
}
