package com.team.hospital.api.checkList;

import com.team.hospital.api.checkList.dto.CheckListDTO;
import com.team.hospital.api.checkList.dto.WriteCheckList;
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
public class CheckListService {

    private final CheckListRepository checkListRepository;
    private final CheckListItemService checkListItemService;

    @Transactional
    public void save(WriteCheckList write, Long checkListItemId) {
        CheckListItem checkListItem = checkListItemService.findCheckListItemById(checkListItemId);
        CheckList checkList = CheckList.toEntity(write, checkListItem);
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

    public List<CheckListDTO> findAllByOperationId(Long operationId) {
        List<CheckList> list = checkListRepository.findAllByOperationId(operationId);
        return CheckListDTO.buildComplianceDTOs(list);
    }

    public List<CheckListDTO> findAll() {
        List<CheckList> list = checkListRepository.findAll();
        return CheckListDTO.buildComplianceDTOs(list);
    }

    public CheckList findCheckListById(Long checkListId) {
        Optional<CheckList> checkList = checkListRepository.findById(checkListId);
        if (checkList.isEmpty()) throw new CheckListNotFoundException();
        return checkList.get();
    }

    public CheckList findRecentCheckListByOperationId(Long operationId) {
        List<CheckList> checkLists = checkListRepository.findAllByOperationId(operationId);
        if (!checkLists.isEmpty()) return checkLists.get(0);
        return null;
    }

}
