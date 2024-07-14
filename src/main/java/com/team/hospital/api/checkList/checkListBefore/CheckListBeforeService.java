package com.team.hospital.api.checkList.checkListBefore;

import com.team.hospital.api.checkList.exception.CheckListNotFoundException;
import com.team.hospital.api.checkListItem.CheckListItem;
import com.team.hospital.api.checkListItem.CheckListItemService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CheckListBeforeService {

    private final CheckListBeforeRepository checkListBeforeRepository;
    private final CheckListItemService checkListItemService;

    @Transactional
    public void save(WriteCheckListBefore write, Long checkListItemId) {
        CheckListItem checkListItem = checkListItemService.findCheckListItemById(checkListItemId);
        CheckListBefore checkListBefore = CheckListBefore.toEntity(write, checkListItem);
        checkListBeforeRepository.save(checkListBefore);
    }

    @Transactional
    public void delete(Long operationId) {
        CheckListBefore checkListBefore = findCheckListBeforeById(operationId);
        checkListBeforeRepository.delete(checkListBefore);
    }

    public CheckListBefore findCheckListBeforeById(Long checkListBeforeId) {
        Optional<CheckListBefore> checkListBefore = checkListBeforeRepository.findById(checkListBeforeId);
        if (checkListBefore.isEmpty()) throw new CheckListNotFoundException();
        return checkListBefore.get();
    }

    @Transactional
    public void modify(WriteCheckListBefore write, Long checkListBeforeId) {
        CheckListBefore checkListBefore = findCheckListBeforeById(checkListBeforeId);
        checkListBefore.updateCheckListBefore(write);
    }

    public List<CheckListBefore> findAll() {
        return checkListBeforeRepository.findAll();
    }
}
