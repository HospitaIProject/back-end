package com.team.hospital.api.checkListItem;

import com.team.hospital.api.checkListItem.dto.WriteCheckListItem;
import com.team.hospital.api.checkListItem.exception.CheckListItemAlreadyExistsException;
import com.team.hospital.api.checkListItem.exception.CheckListItemNotFoundException;
import com.team.hospital.api.operation.Operation;
import com.team.hospital.api.operation.OperationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CheckListItemService {

    private final CheckListItemRepository checkListItemRepository;
    private final OperationService operationService;


    @Transactional
    public void save(WriteCheckListItem writeCheckListItem, Long operationId) {
        Operation operation = operationService.findOperationById(operationId);

        // 해당 오퍼레이션에 이미 checkListItem이 등록되어있는지 확인 필요.
//        if (findCheckListItemByOperation(operationId) != null) throw new CheckListItemAlreadyExistsException("이미 해당 수술에 체크리스트 목록이 등록되어있습니다.");

        CheckListItem checkListItem = CheckListItem.createCheckListItem(writeCheckListItem, operation);
        checkListItemRepository.save(checkListItem);
    }

    @Transactional
    public void modify(WriteCheckListItem write, Long checkListItemId) {
        CheckListItem checkListItem = findCheckListItemById(checkListItemId);
        checkListItem.updateCheckListItem(write);
    }

    @Transactional
    public void delete(Long checkListItemId) {
        CheckListItem checkListItem = findCheckListItemById(checkListItemId);
        checkListItemRepository.delete(checkListItem);
    }

    public CheckListItem findCheckListItemById(Long checkListItemId) {
        Optional<CheckListItem> checkListItem = checkListItemRepository.findById(checkListItemId);
        if (checkListItem.isEmpty()) throw new CheckListItemNotFoundException();
        return checkListItem.get();
    }

    @Transactional
    public CheckListItem findCheckListItemByOperation(Long operationId) {
        Optional<CheckListItem> checkListItem = checkListItemRepository.findCheckListItemByOperationId(operationId);
        if (checkListItem.isEmpty()) throw new CheckListItemNotFoundException("해당 수술에 체크리스트 목록이 등록되지 않았습니다.");
        return checkListItem.get();
    }
}
