package com.team.hospital.api.operationMethod.dto;

import com.team.hospital.api.operationMethod.OperationMethod;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OperationMethodDTO {

    private String operationMethodName;

    public static OperationMethodDTO toEntity(OperationMethod operationMethod) {
        OperationMethodDTOBuilder operationMethodDTO = OperationMethodDTO.builder();
        operationMethodDTO.operationMethodName(operationMethod.getOperationType().getName());

        return operationMethodDTO.build();
    }
}
