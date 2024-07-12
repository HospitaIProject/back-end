package com.team.hospital.exception;

import com.team.hospital.api.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static com.team.hospital.exception.ErrorCode.*;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    protected ResponseEntity<ErrorResponse> handleNotFoundException(NotFoundException e) {
        log.error("Exception Code: {}, Message: {}", e.getErrorCode(), e.getMessage(), e);
        return ResponseEntity.status(e.getErrorCode().getHttpStatus()).body(ErrorResponse.createError(e.getErrorCode()));
    }

    @ExceptionHandler(ConflictException.class)
    protected ResponseEntity<ErrorResponse> handleConflictException(ConflictException e) {
        log.error("Exception Code: {}, Message: {}", e.getErrorCode(), e.getMessage(), e);
        return ResponseEntity.status(e.getErrorCode().getHttpStatus()).body(ErrorResponse.createError(e.getErrorCode()));
    }

    @ExceptionHandler(BaseException.class)
    protected ResponseEntity<ErrorResponse> handleBaseException(BaseException e) {
        log.error("Exception Code: {}, Message: {}", e.getErrorCode(), e.getMessage(), e);
        return ResponseEntity.status(e.getErrorCode().getHttpStatus()).body(ErrorResponse.createError(e.getErrorCode()));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    protected ResponseEntity<ErrorResponse> handleUnprocessableEntityException(HttpMessageNotReadableException e) {
        log.error("Exception Code: {}, Message: {}", UNPROCESSABLE_ENTITY, e.getMessage(), e);
        return ResponseEntity.status(UNPROCESSABLE_ENTITY.getHttpStatus()).body(ErrorResponse.createError(UNPROCESSABLE_ENTITY));
    }

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<ErrorResponse> handleException(Exception e) {
        log.error("Exception Code: {}, Message: {}", SERVER_ERROR, e.getMessage(), e);
        return ResponseEntity.status(SERVER_ERROR.getHttpStatus()).body(ErrorResponse.createError(SERVER_ERROR));
    }

}
