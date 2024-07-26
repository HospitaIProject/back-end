package com.team.hospital.api.checkList;

import com.team.hospital.api.checkList.dto.WriteCheckList;
import com.team.hospital.api.checkList.enumType.BooleanOption;
import com.team.hospital.api.checkList.exception.CheckListNotFoundException;
import com.team.hospital.api.checkListBefore.dto.CheckListBeforeDTO;
import com.team.hospital.api.checkListBefore.CheckListBeforeService;
import com.team.hospital.api.checkListDuring.CheckListDuring;
import com.team.hospital.api.checkListDuring.CheckListDuringService;
import com.team.hospital.api.checkListItem.CheckListItem;
import com.team.hospital.api.checkListItem.CheckListItemService;
import com.team.hospital.api.operation.Operation;
import com.team.hospital.api.operation.OperationService;
import com.team.hospital.api.patient.Patient;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
@RequiredArgsConstructor
public class CheckListService {

    private final CheckListRepository checkListRepository;
    private final CheckListItemService checkListItemService;
    private final CheckListBeforeService checkListBeforeService;
    private final CheckListDuringService checkListDuringService;
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

    @Transactional
    public boolean checkIfCheckListCreatedToday(Long operationId) {
        Operation operation = operationService.findOperationById(operationId);
        Patient patient = operation.getPatient();
        List<CheckList> checks = checks(operationId);

        // 오늘 날짜와 수술 날짜 간의 일 수 계산
        int daysBetween = (int) ChronoUnit.DAYS.between(patient.getOperationDate(), LocalDate.now());

        // 체크리스트가 리스트의 범위 내에 있는지 확인
        if (daysBetween >= 1 && daysBetween <= checks.size()) {
            return checks.get(daysBetween - 1) != null; // -1을 통해 수술 다음 날을 인덱스 0으로 맞춤
        }

        // 범위를 초과한 경우 false 반환
        return false;
    }

    @Transactional
    public boolean checkIfAnyCheckListCreatedToday(Long operationId) {
        return checkIfCheckListCreatedToday(operationId) ||
                checkListBeforeService.checkIfCheckListBeforeCreatedToday(operationId) ||
                checkListDuringService.checkIfCheckListDuringCreatedToday(operationId);
    }

    @Transactional
    public List<CheckList> checks(Long operationId) {
        Operation operation = operationService.findOperationById(operationId);
        Patient patient = operation.getPatient();

        List<CheckList> checkLists = findAllByOperationId(operationId);
        int daysBetween = (int) ChronoUnit.DAYS.between(patient.getOperationDate(), patient.getDischargedDate());
        List<CheckList> checks = new ArrayList<>(Collections.nCopies(daysBetween, null)); // 수술 다음 날 부터 퇴원일까지의 일 수만큼 null list로 초기화.

        for (CheckList checkList : checkLists) {
            LocalDate dayOfCheckList = checkList.getDayOfCheckList();
            int betweenDay = (int) ChronoUnit.DAYS.between(patient.getOperationDate(), dayOfCheckList);
            checks.set(betweenDay - 1, checkList); // set 메서드로 변경
        }
        return checks;
    }

    // compliance percentage calculate
    private int countCheckListBefore(Long operationId) {
        CheckListBeforeDTO checkListBefore = checkListBeforeService.findCheckListBeforeByOperationId(operationId);
        int count = 0;

        if (checkListBefore.getExplainedPreOp() == BooleanOption.YES) count++;
        if (checkListBefore.getOnsPreOp2hr() == BooleanOption.YES) count++;
        if (checkListBefore.getOnsPostBowelPrep() == BooleanOption.YES) count++;
        if (checkListBefore.getDvtPrevention() == BooleanOption.YES) count++;
        if (checkListBefore.getAntibioticPreIncision() == BooleanOption.YES) count++;
        if (checkListBefore.getPainMedPreOp() == BooleanOption.YES) count++;

        return count;
    }

    private int countCheckListDuring(Long operationId) {
        CheckListDuring checkListDuring = checkListDuringService.findCheckListDuringById(operationId);
        int count = 0;

        if (checkListDuring.getMaintainTemp().getOption() == BooleanOption.YES) count++;
        if (checkListDuring.getFluidRestriction().getOption() == BooleanOption.YES) count++;
        if (checkListDuring.getAntiNausea().getOption() == BooleanOption.YES) count++;
        if (checkListDuring.getPainControl().getOption() == BooleanOption.YES) count++;

        return count;
    }

    private int countCheckedItems(CheckListItem checkListItem) {
        int count = 0;

        // pre op
        if (checkListItem.isExplainedPreOp()) count++;
        if (checkListItem.isOnsPreOp2hr()) count++;
        if (checkListItem.isOnsPostBowelPrep()) count++;
        if (checkListItem.isDvtPrevention()) count++;
        if (checkListItem.isAntibioticPreIncision()) count++;
        if (checkListItem.isPainMedPreOp()) count++;

        // during op
        if (checkListItem.isMaintainTemp()) count++;
        if (checkListItem.isFluidRestriction()) count++;
        if (checkListItem.isAntiNausea()) count++;
        if (checkListItem.isPainControl()) count++;

        // post op
        if (checkListItem.isGiStimulant()) count++;
        if (checkListItem.isGumChewing()) count++;
        if (checkListItem.isAntiNauseaPostOp()) count++;
        if (checkListItem.isIvFluidRestrictionPostOp()) count++;
        if (checkListItem.isNonOpioidPainControl()) count++;
        if (checkListItem.isJpDrainRemoval()) count++;
        if (checkListItem.isCatheterRemoval()) count++;
        if (checkListItem.isIvLineRemoval()) count++;

        if (checkListItem.isPodExercise()) count+=4;
        if (checkListItem.isPodMeal()) count+=3;

        return count;
    }

}
