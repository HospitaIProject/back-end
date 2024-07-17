package com.team.hospital.api.operation.exception;

import com.team.hospital.exception.ErrorCode;
import com.team.hospital.exception.NotFoundException;

public class OperationNotFoundException extends NotFoundException {

    public OperationNotFoundException(String message) {
        super(ErrorCode.OPERATION_NOT_FOUND, message);
    }

    public OperationNotFoundException() {
        super(ErrorCode.OPERATION_NOT_FOUND);
    }
}
