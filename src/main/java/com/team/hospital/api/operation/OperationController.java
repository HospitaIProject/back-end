package com.team.hospital.api.operation;

import com.team.hospital.api.apiResponse.SuccessResponse;
import com.team.hospital.api.checkList.ComplianceService;
import com.team.hospital.api.checkList.dto.ComplianceScoreDTO;
import com.team.hospital.api.complication.ComplicationService;
import com.team.hospital.api.operation.dto.CashOperationDTO;
import com.team.hospital.api.operation.dto.DeleteOperationDTO;
import com.team.hospital.api.operation.dto.OperationDTO;
import com.team.hospital.api.operation.dto.WriteOperation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;

@RequiredArgsConstructor
@RestController
@Tag(name = "수술 관리", description = "수술 관리 API")
@SecurityRequirement(name = "Bearer Authentication")
public class OperationController {

    private final OperationService operationService;
    private final ComplicationService complicationService;
    private final ComplianceService complianceService;;

    @GetMapping("/api/operation/{operationId}")
    @io.swagger.v3.oas.annotations.Operation(summary = "특정 id값에 대한 operation 상세 조회", description = "입력한 operationID 값에 해당하는 operation 상세 조회")
    public SuccessResponse<OperationDTO> findByOperationId(@PathVariable Long operationId) {
        Operation operation = operationService.findOperationById(operationId);
        return SuccessResponse.createSuccess(OperationDTO.toEntity(operation));
    }

    @PostMapping("/api/operation/{patientId}")
    @io.swagger.v3.oas.annotations.Operation(summary = "특정 환자에 대한 operation 등록", description = "입력한 환자의 ID값에 해당한 환자의 operation 등록 후 Id 값 반환")
    public SuccessResponse<Long> save(@RequestBody WriteOperation write,
                                      @PathVariable Long patientId) {
        return SuccessResponse.createSuccess(operationService.save(write, patientId));
    }

    @GetMapping("/api/operations/{patientId}")
    @io.swagger.v3.oas.annotations.Operation(summary = "특정 환자에 대한 operation 목록", description = "입력한 환자의 ID값에 해당하는 환자의 operation 목록")
    public SuccessResponse<List<OperationDTO>> findOperations(@PathVariable Long patientId) {
        List<OperationDTO> operationDTOS = operationService.findAllByPatient(patientId).stream()
                .map(operation -> {
                    double score = complicationService.calculateAndUpdateComplicationScore(operation.getId());
                    ComplianceScoreDTO complianceScoreDTO = complianceService.calculateScore(operation.getId());
                    return OperationDTO.toEntity(operation, complicationService.existsByOperation(operation), score, complianceScoreDTO);
                })
                .toList();

        return SuccessResponse.createSuccess(operationDTOS);
    }

    @PutMapping("/api/operation/{operationId}")
    @io.swagger.v3.oas.annotations.Operation(summary = "operation 수정")
    public SuccessResponse<?> modifyOperation(@RequestBody WriteOperation writeOperation,
                                              @PathVariable Long operationId) {
        operationService.modify(writeOperation, operationId);
        return SuccessResponse.createSuccess();
    }

    //Postmapping 으로 수정 필요
    @PostMapping("/api/operation/cash/{operationId}")
    @io.swagger.v3.oas.annotations.Operation(summary = "operation 삭제 -> 최근삭제 목록으로")
    public SuccessResponse<?> cashDeleteOperation(@PathVariable Long operationId) {
        operationService.cashDelete(operationId);
        return SuccessResponse.createSuccess();
    }

    //최근 삭제목록
    @GetMapping("/api/operation")
    @io.swagger.v3.oas.annotations.Operation(summary = "최근 삭제된 operation 목록")
    public SuccessResponse<List<DeleteOperationDTO>> findDeleteOperations() {
        //Pageable pageable = PatientController.getPageable(page, size);

        List<DeleteOperationDTO> deleteOperationDTOS = operationService.findAllMarkedForDeletion().stream()
                .map(operation -> {
                    double score = complicationService.calculateAndUpdateComplicationScore(operation.getId());
                    ComplianceScoreDTO complianceScoreDTO = complianceService.calculateScore(operation.getId());
                    return DeleteOperationDTO.toEntity(operation, complicationService.existsByOperation(operation), score, complianceScoreDTO);
                })
                .sorted(Comparator.comparing(DeleteOperationDTO::getDaysUntilDeletion, Comparator.reverseOrder())) // 남은 일수 내림차순 정렬
                .toList();

        return SuccessResponse.createSuccess(deleteOperationDTOS);
    }

    //최근 삭제 목록에서 진짜 삭제
    @DeleteMapping("/api/operation")
    @io.swagger.v3.oas.annotations.Operation(summary = "최근 삭제목록에서 operation 삭제")
    public SuccessResponse<?> deleteOperation(@RequestBody CashOperationDTO cashOperationDTO) {
        operationService.delete(cashOperationDTO);
        return SuccessResponse.createSuccess();
    }

    //최근 삭제 목록에서 복구
    @PostMapping("/api/operation")
    @io.swagger.v3.oas.annotations.Operation(summary = "최근 삭제목록에서 operation 복구")
    public SuccessResponse<?> restoreOperation(@RequestBody CashOperationDTO cashOperationDTO) {
        operationService.restore(cashOperationDTO);
        return SuccessResponse.createSuccess();
    }
}
