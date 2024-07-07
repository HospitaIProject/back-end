package com.team.hospital.api.patient.exception;


import com.team.hospital.exception.ErrorCode;
import com.team.hospital.exception.NotFoundException;

public class PatientNotFoundException extends NotFoundException {

    public PatientNotFoundException(String message) {
        super(ErrorCode.PATIENT_NOT_FOUND, message);
    }

    public PatientNotFoundException() {
        super(ErrorCode.PATIENT_NOT_FOUND);
    }
}
