package com.team.hospital.api.checkList.exception;

import com.team.hospital.exception.ErrorCode;
import com.team.hospital.exception.NotFoundException;

public class CheckListNotFoundException extends NotFoundException {

    public CheckListNotFoundException(String message) {
        super(ErrorCode.CHECK_LIST_NOT_FOUND, message);
    }

    public CheckListNotFoundException() {
        super(ErrorCode.CHECK_LIST_NOT_FOUND);
    }
}
