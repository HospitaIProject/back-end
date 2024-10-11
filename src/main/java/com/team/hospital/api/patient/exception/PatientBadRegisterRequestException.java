package com.team.hospital.api.patient.exception;

import com.team.hospital.exception.BadRequestException;
import com.team.hospital.exception.ErrorCode;

public class PatientBadRegisterRequestException extends BadRequestException {

    public PatientBadRegisterRequestException(String message) {
        super(ErrorCode.BAD_REQUEST, message);
    }

    public PatientBadRegisterRequestException() {
        super(ErrorCode.BAD_REQUEST);
    }
}
