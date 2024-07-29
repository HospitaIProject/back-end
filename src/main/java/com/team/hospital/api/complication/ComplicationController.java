package com.team.hospital.api.complication;

import com.team.hospital.api.apiResponse.SuccessResponse;
import com.team.hospital.api.checkList.enumType.BooleanOption;
import com.team.hospital.api.complication.dto.ComplicationDTO;
import com.team.hospital.api.complication.dto.WriteComplication;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Tag(name = "합병증 관리", description = "합병증 관리 API")
public class ComplicationController {

    private final ComplicationService complicationService;

    @GetMapping("/api/complication/{operationId}")
    @Operation(summary = "operation에 대한 complication 조회", description = "입력한 operation의 ID값에 해당하는 operation의 complication 조회")
    public SuccessResponse<?> findByOperationId(@PathVariable Long operationId) {
        Complication complication = complicationService.findComplicationByOperationId(operationId);
        double score = complicationService.calculateCDScore(complication);// 최대 점수 100점으로 제한
        complicationService.updateComplicationScore(complication, score);
        return SuccessResponse.createSuccess(ComplicationDTO.toEntity(complication));
    }

    @PostMapping("/api/complication/{operationId}")
    @Operation(summary = "operation에 대한 complication 세팅", description = "입력한 operation의 ID값에 해당하는 operation의 complication 등록")
    public SuccessResponse<?> save(@RequestBody WriteComplication writeComplication, @PathVariable Long operationId) {
        complicationService.save(writeComplication, operationId);
        return SuccessResponse.createSuccess();
    }

    @PutMapping("/api/complication/{operationId}")
    @Operation(summary = "operation에 대한 complication 변경", description = "입력한 operation의 ID값에 해당하는 operation의 complication 변경")
    public SuccessResponse<?> updateComplication(@RequestBody WriteComplication writeComplication, @PathVariable Long operationId) {
        complicationService.modify(writeComplication, operationId);
        return SuccessResponse.createSuccess();
    }

    @PostMapping("api/complication/status/{operationId}")
    @Operation(summary = "operation에 대한 complication status 세팅 (YES / NO)", description = "입력한 operation의 ID값에 해당하는 operation의 complication 여부 세팅")
    public SuccessResponse<?> setComplicationStatus(@PathVariable Long operationId, @RequestParam BooleanOption booleanOption) {
        complicationService.updateComplicationStatus(operationId, booleanOption);
        return SuccessResponse.createSuccess();
    }

    @DeleteMapping("/api/complication/{operationId}")
    @Operation(summary = "operation에 대한 complication 삭제", description = "입력한 operation의 ID값에 해당하는 operation의 complication 삭제")
    public SuccessResponse<?> deleteComplication(@PathVariable Long operationId) {
        complicationService.delete(operationId);
        return SuccessResponse.createSuccess();
    }
}
