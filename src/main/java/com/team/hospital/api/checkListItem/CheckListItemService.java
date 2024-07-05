package com.team.hospital.api.checkListItem;

import com.team.hospital.api.checkListItem.dto.WriteCheckListItem;
import com.team.hospital.api.operation.Operation;
import com.team.hospital.api.operation.OperationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CheckListItemService {

    private final CheckListItemRepository checkListItemRepository;
    private final OperationService operationService;


    @Transactional
    public void save(WriteCheckListItem writeCheckListItem, Long operationId){
        Operation operation = operationService.findOperationById(operationId);
        CheckListItem checkListItem = CheckListItem.createCheckListItem(writeCheckListItem, operation);
        checkListItemRepository.save(checkListItem);
    }

    @Transactional
    public void modify(WriteCheckListItem write, Long checkListItemId){
        CheckListItem checkListItem = findCheckListItemById(checkListItemId);
        checkListItem.updateCheckListItem(write);
    }

    @Transactional
    public void delete(Long checkListItemId){
        CheckListItem checkListItem = findCheckListItemById(checkListItemId);
        checkListItemRepository.delete(checkListItem);
    }

    public CheckListItem findCheckListItemById(Long checkListItemId){
        Optional<CheckListItem> checkListItem = checkListItemRepository.findById(checkListItemId);
        if (checkListItem.isEmpty())
            throw new IllegalArgumentException("존재하지 않는 체크리스트");
        return checkListItem.get();
    }

    public CheckListItem findCheckListItemByOperation(Long operationId){
        Operation operation = operationService.findOperationById(operationId);
        Optional<CheckListItem> checkListItem = checkListItemRepository.findCheckListItemByOperation(operation);
        if(checkListItem.isEmpty())
            throw new IllegalArgumentException("존재하지 않는 체크리스트");
        return checkListItem.get();
    }
}
