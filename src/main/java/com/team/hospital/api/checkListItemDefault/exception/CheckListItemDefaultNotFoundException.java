package com.team.hospital.api.checkListItemDefault.exception;

import com.team.hospital.exception.ErrorCode;
import com.team.hospital.exception.NotFoundException;

public class CheckListItemDefaultNotFoundException extends NotFoundException {

    public CheckListItemDefaultNotFoundException(String message) {
        super(ErrorCode.CHECKLIST_ITEM_DEFAULT_NOT_FOUND, message);
    }

    public CheckListItemDefaultNotFoundException() {
        super(ErrorCode.CHECKLIST_ITEM_DEFAULT_NOT_FOUND);
    }
}
