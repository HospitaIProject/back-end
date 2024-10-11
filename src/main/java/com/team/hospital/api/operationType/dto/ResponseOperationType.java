package com.team.hospital.api.operationType.dto;

import com.team.hospital.api.operationType.OperationType;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ResponseOperationType {

    private String name;

    public static ResponseOperationType toEntity(OperationType operationType) {
        ResponseOperationTypeBuilder builder = ResponseOperationType.builder();
        builder.name(operationType.getName());

        return builder.build();
    }
}
