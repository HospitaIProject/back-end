package com.team.hospital.exception;

public class UnprocessableEntityException extends BaseException {

    public UnprocessableEntityException(ErrorCode errorCode) { super(errorCode); }

    public UnprocessableEntityException(ErrorCode errorCode, String message) {
        super(errorCode, message);
    }
}
