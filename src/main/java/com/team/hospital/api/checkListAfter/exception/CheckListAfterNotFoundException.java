package com.team.hospital.api.checkListAfter.exception;

import com.team.hospital.exception.ErrorCode;
import com.team.hospital.exception.NotFoundException;

public class CheckListAfterNotFoundException extends NotFoundException {

    public CheckListAfterNotFoundException(String message) {
        super(ErrorCode.CHECKLIST_AFTER_NOT_FOUND, message);
    }

    public CheckListAfterNotFoundException() {
        super(ErrorCode.CHECKLIST_AFTER_NOT_FOUND);
    }
}

