package com.team.hospital.api.checkListItem.exception;

import com.team.hospital.exception.ConflictException;
import com.team.hospital.exception.ErrorCode;

public class CheckListItemAlreadyExistsException extends ConflictException {

    public CheckListItemAlreadyExistsException(String message) {
        super(ErrorCode.CHECK_LIST_ITEM_CONFLICT, message);
    }

    public CheckListItemAlreadyExistsException() {
        super(ErrorCode.CHECK_LIST_ITEM_CONFLICT);
    }
}
