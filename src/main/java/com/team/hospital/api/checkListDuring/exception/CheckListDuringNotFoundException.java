package com.team.hospital.api.checkListDuring.exception;

import com.team.hospital.exception.ErrorCode;
import com.team.hospital.exception.NotFoundException;

public class CheckListDuringNotFoundException extends NotFoundException {

    public CheckListDuringNotFoundException(String message) {
        super(ErrorCode.CHECKLIST_DURING_NOT_FOUND, message);
    }

    public CheckListDuringNotFoundException() {
        super(ErrorCode.CHECKLIST_DURING_NOT_FOUND);
    }
}
