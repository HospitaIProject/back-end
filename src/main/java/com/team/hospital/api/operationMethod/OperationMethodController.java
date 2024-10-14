package com.team.hospital.api.operationMethod;

import com.team.hospital.api.apiResponse.SuccessResponse;
import com.team.hospital.api.operationMethod.dto.OperationMethodDTO;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@SecurityRequirement(name = "Bearer Authentication")
public class OperationMethodController {

    private final OperationMethodService operationMethodService;

    @GetMapping("/api/operationMethods")
    public SuccessResponse<?> findAll() {
        List<OperationMethod> all =
                operationMethodService.findAll();
        List<OperationMethodDTO> list = all.stream().map(OperationMethodDTO::toEntity).toList();

        return SuccessResponse.createSuccess(list);
    }
}
