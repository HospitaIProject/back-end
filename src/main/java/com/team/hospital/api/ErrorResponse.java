package com.team.hospital.api;

import com.team.hospital.exception.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ErrorResponse {

    private LocalDateTime timeStamp;
    private int status;
    private ErrorCode errorCode;
    private String message;

    public static ErrorResponse createError(ErrorCode errorCode) {
        return new ErrorResponse(LocalDateTime.now(), errorCode.getHttpStatus().value(), errorCode, errorCode.getMessage());
    }

    public static ErrorResponse createError(ErrorCode errorCode, String message) {
        return new ErrorResponse(LocalDateTime.now(), errorCode.getHttpStatus().value(), errorCode, message);
    }
}
