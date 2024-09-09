package com.team.hospital.api.checkListBefore.exception;

import com.team.hospital.exception.ConflictException;
import com.team.hospital.exception.ErrorCode;

public class CheckListBeforeAlreadyExistsException extends ConflictException {
    public CheckListBeforeAlreadyExistsException(String message) {
        super(ErrorCode.CHECKLIST_BEFORE_CONFLICT, message);
    }

    public CheckListBeforeAlreadyExistsException() {
        super(ErrorCode.CHECKLIST_BEFORE_CONFLICT);
    }
}
