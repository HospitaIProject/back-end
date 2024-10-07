package com.team.hospital.api.complication.exception;

import com.team.hospital.exception.ErrorCode;
import com.team.hospital.exception.NotFoundException;

public class ComplicationNotFoundException extends NotFoundException {

    public ComplicationNotFoundException(String message) {
        super(ErrorCode.COMPLICATION_NOT_FOUND, message);
    }

    public ComplicationNotFoundException() {
        super(ErrorCode.COMPLICATION_NOT_FOUND);
    }
}
