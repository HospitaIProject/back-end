package com.team.hospital.api.checkList;

import com.team.hospital.api.checkList.dto.WriteCheckList;
import com.team.hospital.api.checkList.exception.CheckListNotFoundException;
import com.team.hospital.api.checkListItem.CheckListItem;
import com.team.hospital.api.checkListItem.CheckListItemService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CheckListService {

    private final CheckListRepository checkListRepository;
    private final CheckListItemService checkListItemService;

    @Transactional
    public void save(WriteCheckList write, Long checkListItemId) {
        CheckListItem checkListItem = checkListItemService.findCheckListItemById(checkListItemId);
        CheckList checkList = CheckList.createCheckList(write, checkListItem);
        checkListRepository.save(checkList);
    }

    @Transactional
    public void modify(WriteCheckList write, Long checkListId) {
        CheckList checkList = findCheckListById(checkListId);
        checkList.updateCheckList(write);
    }

    @Transactional
    public void delete(Long operationId) {
        CheckList checkList = findCheckListById(operationId);
        checkListRepository.delete(checkList);
    }

    public List<CheckList> findAllByOperationId(Long operationId) {
        return checkListRepository.findAllByOperationId(operationId);
    }

    public List<CheckList> findAll() {
        return checkListRepository.findAll();
    }

    public CheckList findCheckListById(Long checkListId) {
        Optional<CheckList> checkList = checkListRepository.findById(checkListId);
        if (checkList.isEmpty()) throw new CheckListNotFoundException();
        return checkList.get();
    }

    public CheckList findRecentCheckListByOperationId(Long operationId) {
        List<CheckList> checkLists = checkListRepository.findAllByOperationId(operationId);
        checkLists.sort(Comparator.comparing(CheckList::getUpdatedAt).reversed());
        if (!checkLists.isEmpty()) return checkLists.get(0);
        return null;
    }

    public boolean checkIfCheckListCreatedToday(Long operationId) {
        CheckList recentCheckList = findRecentCheckListByOperationId(operationId);
        return recentCheckList != null && recentCheckList.getCreatedAt().toLocalDate().equals(LocalDate.now());
    }

}
