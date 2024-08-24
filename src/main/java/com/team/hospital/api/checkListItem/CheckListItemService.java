package com.team.hospital.api.checkListItem;

import com.team.hospital.api.checkListItem.dto.WriteCheckListItem;
import com.team.hospital.api.checkListItem.exception.CheckListItemNotFoundException;
import com.team.hospital.api.operation.Operation;
import com.team.hospital.api.operation.OperationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
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
        CheckListItem checkListItem = CheckListItem.createCheckListItem(writeCheckListItem, operation);
        try {
            checkListItemRepository.save(checkListItem);
        } catch (DataIntegrityViolationException e) {
            // 중복된 항목이 있을 경우 예외 처리
            throw new CheckListItemNotFoundException("해당 수술에 등록된 체크리스트 목록이 존재합니다. 존재하는 체크리스트 목록을 수정하십시오.");
        }
    }

    @Transactional
    public void update(WriteCheckListItem write, Long operationId) {
        CheckListItem checkListItem = findCheckListItemByOperation(operationId);
        checkListItem.updateCheckListItem(write);
    }

    @Transactional
    public void delete(Long operationId) {
        CheckListItem checkListItem = findCheckListItemByOperation(operationId);
        checkListItemRepository.delete(checkListItem);
    }

//    @Transactional
    public CheckListItem findCheckListItemByOperation(Long operationId) {
        Optional<CheckListItem> checkListItem = checkListItemRepository.findCheckListItemByOperationId(operationId);
        if (checkListItem.isEmpty()) throw new CheckListItemNotFoundException("해당 수술에 체크리스트 목록이 등록되지 않았습니다.");
        return checkListItem.get();
    }

    public CheckListItem findCheckListItemById(Long checkListItemId) {
        Optional<CheckListItem> checkListItem = checkListItemRepository.findById(checkListItemId);
        if (checkListItem.isEmpty()) throw new CheckListItemNotFoundException();
        return checkListItem.get();
    }

    public CheckListItem findByOperationId(Long operationId) {
        return checkListItemRepository.findByOperationId(operationId);
    }

}
