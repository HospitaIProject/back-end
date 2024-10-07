package com.team.hospital.api.checkListItemDefault.exception;

import com.team.hospital.exception.ConflictException;
import com.team.hospital.exception.ErrorCode;

public class CheckListItemDefaultAlreadyExistsException extends ConflictException {

    public CheckListItemDefaultAlreadyExistsException(String message) {
        super(ErrorCode.CHECKLIST_ITEM_CONFLICT, message);
    }

    public CheckListItemDefaultAlreadyExistsException() {
        super(ErrorCode.CHECKLIST_ITEM_CONFLICT);
    }
}
