package com.team.hospital.exception;

import com.team.hospital.api.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    protected ErrorResponse handleNotFoundException(NotFoundException e) {
        log.error("Exception Code: {}, Message: {}", e.getErrorCode(), e.getMessage(), e);
        return ErrorResponse.createError(e.getErrorCode());
    }

    @ExceptionHandler(ConflictException.class)
    protected ErrorResponse handleConflictException(ConflictException e) {
        log.error("Exception Code: {}, Message: {}", e.getErrorCode(), e.getMessage(), e);
        return ErrorResponse.createError(e.getErrorCode());
    }

    @ExceptionHandler(BaseException.class)
    protected ErrorResponse handleBaseException(BaseException e) {
        log.error("Exception Code: {}, Message: {}", e.getErrorCode(), e.getMessage(), e);
        return ErrorResponse.createError(e.getErrorCode());
    }

    @ExceptionHandler(Exception.class)
    protected ErrorResponse handleException(Exception e) {
        log.error("Exception Code: {}, Message: {}", ErrorCode.SERVER_ERROR, e.getMessage(), e);
        return ErrorResponse.createError(ErrorCode.SERVER_ERROR);
    }
}
