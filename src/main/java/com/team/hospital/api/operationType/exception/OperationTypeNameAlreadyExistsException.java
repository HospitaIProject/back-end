package com.team.hospital.api.operationType.exception;

import com.team.hospital.exception.ConflictException;
import com.team.hospital.exception.ErrorCode;

public class OperationTypeNameAlreadyExistsException extends ConflictException {

    public OperationTypeNameAlreadyExistsException(String message) {
        super(ErrorCode.OPERATION_TYPE_NAME_CONFLICT, message);
    }

    public OperationTypeNameAlreadyExistsException() {
        super(ErrorCode.OPERATION_TYPE_NAME_CONFLICT);
    }
}