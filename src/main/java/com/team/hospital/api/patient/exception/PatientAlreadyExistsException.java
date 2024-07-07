package com.team.hospital.api.patient.exception;

import com.team.hospital.exception.ConflictException;
import com.team.hospital.exception.ErrorCode;

public class PatientAlreadyExistsException extends ConflictException {

    public PatientAlreadyExistsException(String message) {
        super(ErrorCode.PATIENT_CONFLICT, message);
    }

    public PatientAlreadyExistsException() {
        super(ErrorCode.PATIENT_CONFLICT);
    }
}
