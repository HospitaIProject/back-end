package com.team.hospital.exception;

public class ConflictException extends BaseException {

    public ConflictException(ErrorCode errorCode) { super(errorCode); }

    public ConflictException(ErrorCode errorCode, String message) {
        super(errorCode, message);
    }
}
