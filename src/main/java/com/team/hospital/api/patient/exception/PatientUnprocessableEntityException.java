package com.team.hospital.api.patient.exception;

import com.team.hospital.exception.ErrorCode;
import com.team.hospital.exception.UnprocessableEntityException;

public class PatientUnprocessableEntityException extends UnprocessableEntityException {

    public PatientUnprocessableEntityException(String message) {
        super(ErrorCode.PATIENT_UNPROCESSABLE_ENTITY, message);
    }

    public PatientUnprocessableEntityException() {
        super(ErrorCode.PATIENT_UNPROCESSABLE_ENTITY);
    }
}
