package com.team.hospital.exception;

import com.team.hospital.api.apiResponse.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
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

    // 이넘 타입에 이넘이 아닌 데이터가 들어옴.
    @ExceptionHandler(HttpMessageNotReadableException.class)
    protected ResponseEntity<ErrorResponse> handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
        String message = e.getMostSpecificCause().getMessage();

        log.error("Exception Code: {}, Message: {}", BAD_REQUEST, e.getMessage(), e);
//        return ResponseEntity.status(BAD_REQUEST.getHttpStatus()).body(ErrorResponse.createError(BAD_REQUEST, message));
        return new ResponseEntity<>(ErrorResponse.createError(BAD_REQUEST), HttpStatus.BAD_REQUEST);
    }

    // One to one mapping인데 하나 더 등록 요청
    @ExceptionHandler(DataIntegrityViolationException.class)
    protected ResponseEntity<ErrorResponse> handleUnprocessableEntityException(DataIntegrityViolationException e) {
        log.error("Exception Code: {}, Message: {}", UNPROCESSABLE_ENTITY, e.getMessage(), e);
        return ResponseEntity.status(UNPROCESSABLE_ENTITY.getHttpStatus()).body(ErrorResponse.createError(UNPROCESSABLE_ENTITY));
    }

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<ErrorResponse> handleException(Exception e) {
        log.error("Exception Code: {}, Message: {}", SERVER_ERROR, e.getMessage(), e);
        return ResponseEntity.status(SERVER_ERROR.getHttpStatus()).body(ErrorResponse.createError(SERVER_ERROR));
    }

}
