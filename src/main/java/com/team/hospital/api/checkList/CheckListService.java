package com.team.hospital.api.checkList;

import com.team.hospital.api.checkList.dto.CheckListDailyDTO;
import com.team.hospital.api.checkList.dto.WriteCheckList;
import com.team.hospital.api.checkList.exception.CheckListNotFoundException;
import com.team.hospital.api.checkListAfter.CheckListAfterService;
import com.team.hospital.api.checkListBefore.CheckListBeforeService;
import com.team.hospital.api.checkListDuring.CheckListDuringService;
import com.team.hospital.api.checkListItem.CheckListItem;
import com.team.hospital.api.checkListItem.CheckListItemService;
import com.team.hospital.api.operation.Operation;
import com.team.hospital.api.operation.OperationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CheckListService {

    private final CheckListRepository checkListRepository;
    private final CheckListItemService checkListItemService;
    private final CheckListBeforeService checkListBeforeService;
    private final CheckListDuringService checkListDuringService;
    private final CheckListAfterService checkListAfterService;
    private final OperationService operationService;

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
    public void delete(Long checkListId) {
        CheckList checkList = findCheckListById(checkListId);
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

    public CheckListDailyDTO testV2(Long operationId) {
        List<CheckList> checkLists = findAllByOperationId(operationId);
        return CheckListDailyDTO.createCheckListDailyDTO(checkLists);
    }

    // D+2부터 적용되도록 수정
    public boolean checkIfCheckListCreatedToday(Long operationId, LocalDate operationDate) {
        // 오늘 날짜와 수술 날짜 간의 일 수 계산
        int daysBetween = (int) ChronoUnit.DAYS.between(operationDate, LocalDate.now());
        boolean createdToday = checkListRepository.existsCheckListWithExactDaysBetween(operationId, operationDate);
        // daysBetween 값이 1~3 범위에 있는지 확인하고 해당 index의 체크리스트가 존재하는지 확인
        return daysBetween >= 1 && daysBetween <= 3 && createdToday;
    }

    public boolean checkIfAnyCheckListCreatedToday(Long operationId, LocalDate operationDate) {
        return checkListBeforeService.checkIfCheckListBeforeCreatedToday(operationId, operationDate) ||
                (checkListDuringService.checkIfCheckListDuringCreatedToday(operationId, operationDate) && checkListAfterService.checkIfCheckListAfterCreatedToday(operationId, operationDate)) ||
                checkIfCheckListCreatedToday(operationId, operationDate);
    }

    public List<CheckList> checks(Long operationId) {
        Operation operation = operationService.findOperationById(operationId);
        LocalDate operationDate = operation.getPatient().getOperationDate();
        List<CheckList> checkLists = findAllByOperationId(operationId);
        List<CheckList> checks = new ArrayList<>(Collections.nCopies(3, null));

        for (CheckList checkList : checkLists) {
            int betweenDay = (int) ChronoUnit.DAYS.between(operationDate, checkList.getDayOfCheckList());
            if (betweenDay > 0 && betweenDay <= checks.size()) {
                checks.set(betweenDay - 1, checkList);
            }
        }
        return checks;
    }

}
