package com.team.hospital.api.checkList;

import com.team.hospital.api.checkList.dto.WriteCheckList;
import com.team.hospital.api.checkList.exception.CheckListNotFoundException;
import com.team.hospital.api.checkListAfter.CheckListAfter;
import com.team.hospital.api.checkListAfter.CheckListAfterService;
import com.team.hospital.api.checkListAfter.dto.CheckListAfterDTO;
import com.team.hospital.api.checkListBefore.CheckListBeforeService;
import com.team.hospital.api.checkListBefore.dto.CheckListBeforeDTO;
import com.team.hospital.api.checkListDuring.CheckListDuringService;
import com.team.hospital.api.checkListDuring.dto.CheckListDuringDTO;
import com.team.hospital.api.checkListItem.CheckListItem;
import com.team.hospital.api.checkListItem.CheckListItemService;
import com.team.hospital.api.operation.Operation;
import com.team.hospital.api.operation.OperationService;
import com.team.hospital.api.patient.Patient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static com.team.hospital.api.checkList.enumType.BooleanOption.YES;

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

    // D+2부터 적용되도록 수정
    public boolean checkIfCheckListCreatedToday(Long operationId) {
        Operation operation = operationService.findOperationById(operationId);
        Patient patient = operation.getPatient();
        List<CheckList> checks = checks(operationId);

        // 오늘 날짜와 수술 날짜 간의 일 수 계산
        int daysBetween = (int) ChronoUnit.DAYS.between(patient.getOperationDate(), LocalDate.now());

        // 체크리스트가 리스트의 범위 내에 있는지 확인
        if (daysBetween > 1 && daysBetween <= checks.size()) {
            return checks.get(daysBetween - 1) != null; // -1을 통해 수술 다음 날을 인덱스 0으로 맞춤
        }

        // 범위를 초과한 경우 false 반환
        return false;
    }

    // 수술 D+1 일 때 수술후 체크리스트 작성 + D+1 체크리스트 작성 완료 되었을 시 true 반환.
    public boolean checkIfCheckListAfterCreatedToday(Long operationId) {
        List<CheckList> checks = checks(operationId);
        Optional<CheckListAfter> checkListAfter = checkListAfterService.findCheckListAfterByOpId(operationId);
        return checks.get(0) != null && checkListAfter.isPresent();
    }

    public boolean checkIfAnyCheckListCreatedToday(Long operationId) {
        return checkIfCheckListCreatedToday(operationId) ||
                checkIfCheckListAfterCreatedToday(operationId) ||
                checkListBeforeService.checkIfCheckListBeforeCreatedToday(operationId) ||
                checkListDuringService.checkIfCheckListDuringCreatedToday(operationId);
    }

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

        if (checkListBefore.getExplainedPreOp() == YES) count++;
        if (checkListBefore.getOnsPreOp2hr() == YES) count++;
        if (checkListBefore.getOnsPostBowelPrep() == YES) count++;
        if (checkListBefore.getDvtPrevention() == YES) count++;
        if (checkListBefore.getAntibioticPreIncision() == YES) count++;
        if (checkListBefore.getPainMedPreOp() == YES) count++;

        return count;
    }

    private int countCheckListDuring(Long operationId) {
        CheckListDuringDTO checkListDuringDTO = checkListDuringService.findCheckListDuringByOperationId(operationId);
        int count = 0;

        if (checkListDuringDTO.getMaintainTemp() == YES) count++;
        if (checkListDuringDTO.getFluidRestriction()== YES) count++;
        if (checkListDuringDTO.getAntiNausea() == YES) count++;
        if (checkListDuringDTO.getPainControl() == YES) count++;

        return count;
    }

    private int countCheckListAfter(Long operationId) {
        CheckListAfterDTO checkListAfterDTO = checkListAfterService.findCheckListAfterByOperationId(operationId);
        int count = 0;

        if (checkListAfterDTO.getGiStimulant() == YES) count++;
        if (checkListAfterDTO.getGumChewing() == YES) count++;
        if (checkListAfterDTO.getAntiNauseaPostOp() == YES) count++;
        if (checkListAfterDTO.getIvFluidRestrictionPostOp() == YES) count++;
        if (checkListAfterDTO.getNonOpioidPainControl() == YES) count++;
        if (checkListAfterDTO.getJpDrainRemoval() == YES) count++;
        if (checkListAfterDTO.getCatheterRemoval() == YES) count++;
        if (checkListAfterDTO.getIvLineRemoval() == YES) count++;

        return count;
    }
    /// count checkListItem YES

    public int countCheckList(Long operationId) {
        List<CheckList> checks = checks(operationId);
        int count = 0;

        if (checks.get(0) != null && checks.get(1) != null && checks.get(2) != null && checks.get(3) != null) {
            if (checks.get(0).getPostExercise().getOption() == YES) count++;
            if (checks.get(0).getPostMeal().getOption() == YES) count++;
            if (checks.get(1).getPodOneExercise().getOption() == YES) count++;
            if (checks.get(1).getPodOneMeal().getOption() == YES) count++;
            if (checks.get(2).getPodTwoExercise().getOption() == YES) count++;
            if (checks.get(2).getPodTwoMeal().getOption() == YES) count++;
            if (checks.get(3).getPodThreeExercise().getOption() == YES) count++;
        }

        return count;
    }

    // maximum return 25.
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
