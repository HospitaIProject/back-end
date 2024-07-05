package com.team.hospital.api.operation.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OperationResponse {

    private OperationDTO operationDTO;

    public static OperationResponse toEntity(OperationDTO operationDTO){
        return OperationResponse.builder()
                .operationDTO(operationDTO)
                .build();
    }
}
