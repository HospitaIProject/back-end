package com.team.hospital.api;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class SuccessResponse<T> {

    private LocalDateTime timeStamp;
    private int status;
    private T data;
    private String message;

    public static <T> SuccessResponse<T> createSuccess(T data, String message) {
        return new SuccessResponse<>(LocalDateTime.now(), HttpStatus.OK.value(), data, message);
    }

    public static <T> SuccessResponse<T> createSuccess(T data) {
        return new SuccessResponse<>(LocalDateTime.now(), HttpStatus.OK.value(), data, "요청이 성공적으로 처리되었습니다.");
    }

    public static SuccessResponse<?> createSuccess() {
        return new SuccessResponse<>(LocalDateTime.now(), HttpStatus.OK.value(), null, "요청이 성공적으로 처리되었습니다.");
    }

}