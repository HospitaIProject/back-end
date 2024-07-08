package com.team.hospital.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    // 404, NotFound
    PATIENT_NOT_FOUND(HttpStatus.NOT_FOUND, "E404001", "존재하지 않는 환자입니다."),
    OPERATION_NOT_FOUND(HttpStatus.NOT_FOUND, "E404002", "등록되지 않은 수술입니다."),
    CHECK_LIST_NOT_FOUND(HttpStatus.NOT_FOUND, "E404003", "등록되지 않은 체크리스트입니다."),
    CHECK_LIST_ITEM_NOT_FOUND(HttpStatus.NOT_FOUND, "E404004", "등록되지 않은 체크리스트 목록입니다."),

    // 409, Conflict
    PATIENT_CONFLICT(HttpStatus.CONFLICT, "E409001", "이미 등록된 환자 번호입니다."),
    CHECK_LIST_ITEM_CONFLICT(HttpStatus.CONFLICT, "E409002", "이미 등록된 체크리스트 목록입니다."),

    //500
    SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "E500001", "서버 에러가 발생했습니다.");

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
}
