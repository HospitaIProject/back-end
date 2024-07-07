package com.team.hospital.api.checkListItem.exception;

import com.team.hospital.exception.ErrorCode;
import com.team.hospital.exception.NotFoundException;

public class CheckListItemNotFoundException extends NotFoundException {

    public CheckListItemNotFoundException(String message) {
        super(ErrorCode.CHECK_LIST_ITEM_NOT_FOUND, message);
    }

    public CheckListItemNotFoundException() {
        super(ErrorCode.CHECK_LIST_ITEM_NOT_FOUND);
    }
}
