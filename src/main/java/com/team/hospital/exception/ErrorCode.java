package com.team.hospital.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    // 400, BadRequeset
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "E400001", "유효하지 않은 요청입니다."),

    // 404, NotFound
    PATIENT_NOT_FOUND(HttpStatus.NOT_FOUND, "E404001", "존재하지 않는 환자입니다."),
    OPERATION_NOT_FOUND(HttpStatus.NOT_FOUND, "E404002", "등록되지 않은 수술입니다."),
    CHECKLIST_NOT_FOUND(HttpStatus.NOT_FOUND, "E404003", "등록되지 않은 체크리스트입니다."),
    CHECKLIST_ITEM_NOT_FOUND(HttpStatus.NOT_FOUND, "E404004", "등록되지 않은 체크리스트 목록입니다."),
    CHECKLIST_BEFORE_NOT_FOUND(HttpStatus.NOT_FOUND, "E404005", "존재하지 않는 수술 전 체크리스트입니다."),
    CHECKLIST_DURING_NOT_FOUND(HttpStatus.NOT_FOUND, "E404006", "존재하지 않는 수술 중 체크리스트입니다."),

    // 409, Conflict
    PATIENT_CONFLICT(HttpStatus.CONFLICT, "E409001", "이미 등록된 환자 번호입니다."),
    CHECKLIST_ITEM_CONFLICT(HttpStatus.CONFLICT, "E409002", "이미 등록된 체크리스트 목록입니다."),
    CHECKLIST_BEFORE_CONFLICT(HttpStatus.CONFLICT, "E409003", "이미 등록된 수술 전 체크리스트가 존재합니다. 등록 대신 수정이 필요합니다."),
    CHECKLIST_DURING_CONFLICT(HttpStatus.CONFLICT, "E409004", "이미 등록된 수술 중 체크리스트가 존재합니다. 등록 대신 수정이 필요합니다."),

    // 422, UNPROCESSABLE_ENTITY
    UNPROCESSABLE_ENTITY(HttpStatus.UNPROCESSABLE_ENTITY, "E422001", "유효하지 않은 엔티티 등록 요청입니다."),
    PATIENT_UNPROCESSABLE_ENTITY(HttpStatus.UNPROCESSABLE_ENTITY, "E422002", "유효하지 않은 환자 등록 요청입니다."),

    //500
    SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "E500001", "서버 에러가 발생했습니다.");

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
}
