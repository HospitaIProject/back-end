package com.team.hospital.api.checkListDuring.exception;

import com.team.hospital.exception.ConflictException;
import com.team.hospital.exception.ErrorCode;

public class CheckListDuringAlreadyExistsException extends ConflictException {
    public CheckListDuringAlreadyExistsException(String message) {
        super(ErrorCode.CHECKLIST_DURING_CONFLICT, message);
    }

    public CheckListDuringAlreadyExistsException() {
        super(ErrorCode.CHECKLIST_DURING_CONFLICT);
    }
}
