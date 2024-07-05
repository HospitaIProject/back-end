package com.team.hospital.api;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommonApiResponse<T> {

    private boolean isSuccess;
    private T data;
    private String message;

    public static <T> CommonApiResponse<T> createSuccess(T data) {
        return new CommonApiResponse<>(true, data, "");
    }

    public static CommonApiResponse<?> createSuccess() {
        return new CommonApiResponse<>(true, "", "");
    }

    public static CommonApiResponse<?> createError(String message) {
        return new CommonApiResponse<>(false, "", message);
    }

    private CommonApiResponse(boolean isSuccess, T data, String message) {
        this.isSuccess = isSuccess;
        this.data = data;
        this.message = message;
    }
}