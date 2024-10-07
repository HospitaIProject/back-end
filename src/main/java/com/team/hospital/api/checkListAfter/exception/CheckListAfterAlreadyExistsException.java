package com.team.hospital.api.checkListAfter.exception;

import com.team.hospital.exception.ConflictException;
import com.team.hospital.exception.ErrorCode;

public class CheckListAfterAlreadyExistsException extends ConflictException {
    public CheckListAfterAlreadyExistsException(String message) {
        super(ErrorCode.CHECKLIST_AFTER_CONFLICT, message);
    }

    public CheckListAfterAlreadyExistsException() {
        super(ErrorCode.CHECKLIST_AFTER_CONFLICT);
    }
}

