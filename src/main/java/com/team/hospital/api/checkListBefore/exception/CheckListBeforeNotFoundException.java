package com.team.hospital.api.checkListBefore.exception;

import com.team.hospital.exception.ErrorCode;
import com.team.hospital.exception.NotFoundException;

public class CheckListBeforeNotFoundException extends NotFoundException {

    public CheckListBeforeNotFoundException(String message) {
        super(ErrorCode.CHECKLIST_BEFORE_NOT_FOUND, message);
    }

    public CheckListBeforeNotFoundException() {
        super(ErrorCode.CHECKLIST_BEFORE_NOT_FOUND);
    }
}
