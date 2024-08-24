package com.team.hospital.api.operationMethod.dto;

import com.team.hospital.api.operationMethod.OperationMethod;
import com.team.hospital.api.operationType.OperationType;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OperationMethodDTO {

    private OperationType operationType;

    public static OperationMethodDTO toEntity(OperationMethod operationMethod) {
        OperationMethodDTOBuilder operationMethodDTO = OperationMethodDTO.builder();
        operationMethodDTO.operationType(operationMethod.getOperationType());

        return operationMethodDTO.build();
    }
}
