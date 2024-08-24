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

    // D+2부터 적용되도록 수정
    public boolean checkIfCheckListCreatedToday(Long operationId) {
        Operation operation = operationService.findOperationById(operationId);
        Patient patient = operation.getPatient();
        if (checks(operationId) == null) return false;

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
        Operation operation = operationService.findOperationById(operationId);
        Patient patient = operation.getPatient();

        // 수술 후 D+1인지 확인
        if (ChronoUnit.DAYS.between(patient.getOperationDate(), LocalDate.now()) == 1) {
            List<CheckList> checks = checks(operationId);
            Optional<CheckListAfter> checkListAfter = checkListAfterService.findCheckListAfterByOpId(operationId);

            // 수술 후 D+1 체크리스트가 존재하고 D+1 체크리스트가 작성 완료되었는지 확인
            return checks.get(0) != null && checkListAfter.isPresent();
        }

        return false;
    }

    public boolean checkIfAnyCheckListCreatedToday(Long operationId) {
        return checkIfCheckListCreatedToday(operationId) ||
//                checkIfCheckListAfterCreatedToday(operationId) ||
                checkListBeforeService.checkIfCheckListBeforeCreatedToday(operationId) ||
                checkListDuringService.checkIfCheckListDuringCreatedToday(operationId);
    }

    // 에러 뜬다 고쳐야댐, 시간 차 공격 때문에 오류 발생. 한국, 미국 같은 날짜일 때 다시 테스트.
    public List<CheckList> checks(Long operationId) {
        Operation operation = operationService.findOperationById(operationId);
        Patient patient = operation.getPatient();

        if (patient.getDischargedDate() == null) return null;

        // patient.getTotalHospitalizedDays();

        List<CheckList> checkLists = findAllByOperationId(operationId);
        int checkListCount = (int) ChronoUnit.DAYS.between(patient.getOperationDate(), patient.getDischargedDate());
        List<CheckList> checks = new ArrayList<>(Collections.nCopies(checkListCount, null)); // 수술 다음 날 부터 퇴원일까지의 일 수만큼 null list로 초기화.

        for (CheckList checkList : checkLists) {
            LocalDate dayOfCheckList = checkList.getDayOfCheckList();
            int betweenDay = (int) ChronoUnit.DAYS.between(patient.getOperationDate(), dayOfCheckList);
            System.out.println("betweenDay = " + betweenDay);
            if (betweenDay == 0) {
                checks.set(betweenDay, checkList);
            } else {
                checks.set(betweenDay - 1, checkList); // set 메서드로 변경
            }
        }
        return checks;
    }

    // compilance
    public double test(Long operationId) {
        Long checkListItemId = checkListItemService.findByOperationId(operationId).getId();
        boolean existsBefore = checkListBeforeService.existsByCheckListItemId(checkListItemId);
        boolean existsDuring = checkListDuringService.existsByCheckListItemId(checkListItemId);
        boolean existsAfter = checkListAfterService.existsByCheckListItemId(checkListItemId);

        int totalCheckListCount = 0;
        int totalCheckListCompleted = 0;

        if (existsBefore) {
            totalCheckListCount += countCheckListItems(operationId, "before");
            totalCheckListCompleted += checkListCompletedCount(operationId, "before");
        }
        if (existsDuring) {
            totalCheckListCount += countCheckListItems(operationId, "during");
            totalCheckListCompleted += checkListCompletedCount(operationId, "during");
        }
        if (existsAfter) {
            totalCheckListCount += countCheckListItems(operationId, "after");
            totalCheckListCompleted += checkListCompletedCount(operationId, "after");
        }

        totalCheckListCompleted += top(operationId);
        totalCheckListCount += bottom(operationId);

        if (totalCheckListCount > 0) {
            return ((double) totalCheckListCompleted / totalCheckListCount) * 100;
        }

        return 0.0;
    }

    private int countCheckListItems(Long operationId, String stage) {
        CheckListItem checkListItem = checkListItemService.findCheckListItemByOperation(operationId);
        int count = 0;

        switch (stage) {
            case "before":
                if (checkListItem.isExplainedPreOp()) count++;
                if (checkListItem.isOnsPreOp2hr()) count++;
                if (checkListItem.isOnsPostBowelPrep()) count++;
                if (checkListItem.isDvtPrevention()) count++;
                if (checkListItem.isAntibioticPreIncision()) count++;
                if (checkListItem.isPainMedPreOp()) count++;
                break;
            case "during":
                if (checkListItem.isMaintainTemp()) count++;
                if (checkListItem.isFluidRestriction()) count++;
                if (checkListItem.isAntiNausea()) count++;
                if (checkListItem.isPainControl()) count++;
                break;
            case "after":
                if (checkListItem.isGiStimulant()) count++;
                if (checkListItem.isGumChewing()) count++;
                if (checkListItem.isAntiNauseaPostOp()) count++;
                if (checkListItem.isIvFluidRestrictionPostOp()) count++;
                if (checkListItem.isNonOpioidPainControl()) count++;
                if (checkListItem.isJpDrainRemoval()) count++;
                if (checkListItem.isCatheterRemoval()) count++;
                if (checkListItem.isIvLineRemoval()) count++;
                if (checkListItem.isPodExercise()) count++;
                if (checkListItem.isPodMeal()) count++;
                break;
        }

        return count;
    }

    private int checkListCompletedCount(Long operationId, String stage) {
        int count = 0;

        switch (stage) {
            case "before":
                CheckListBeforeDTO checkListBefore = checkListBeforeService.findCheckListBeforeByOperationId(operationId);
                if (checkListBefore.getExplainedPreOp() == YES) count++;
                if (checkListBefore.getOnsPreOp2hr() == YES) count++;
                if (checkListBefore.getOnsPostBowelPrep() == YES) count++;
                if (checkListBefore.getDvtPrevention() == YES) count++;
                if (checkListBefore.getAntibioticPreIncision() == YES) count++;
                if (checkListBefore.getPainMedPreOp() == YES) count++;
                break;
            case "during":
                CheckListDuringDTO checkListDuring = checkListDuringService.findCheckListDuringByOperationId(operationId);
                if (checkListDuring.getMaintainTemp() == YES) count++;
                if (checkListDuring.getFluidRestriction() == YES) count++;
                if (checkListDuring.getAntiNausea() == YES) count++;
                if (checkListDuring.getPainControl() == YES) count++;
                break;
            case "after":
                CheckListAfterDTO checkListAfter = checkListAfterService.findCheckListAfterByOperationId(operationId);
                if (checkListAfter.getGiStimulant() == YES) count++;
                if (checkListAfter.getGumChewing() == YES) count++;
                if (checkListAfter.getAntiNauseaPostOp() == YES) count++;
                if (checkListAfter.getIvFluidRestrictionPostOp() == YES) count++;
                if (checkListAfter.getNonOpioidPainControl() == YES) count++;
                if (checkListAfter.getJpDrainRemoval() == YES) count++;
                if (checkListAfter.getCatheterRemoval() == YES) count++;
                if (checkListAfter.getIvLineRemoval() == YES) count++;
                if (checkListAfter.getPostExercise() == YES) count++;
                if (checkListAfter.getPostMeal() == YES) count++;
                break;
        }

        return count;
    }

    private int bottom(Long operationId) {
        List<CheckList> checks = checks(operationId);
        CheckListItem checkListItem = checkListItemService.findCheckListItemByOperation(operationId);

        int bottom = 0;

        if (!checks.isEmpty() && checks.get(0) != null) {
            if (checkListItem.isPodExercise()) bottom++;
            if (checkListItem.isPodMeal()) bottom++;
        }
        if (checks.size() > 1 && checks.get(1) != null) {
            if (checkListItem.isPodExercise()) bottom++;
            if (checkListItem.isPodMeal()) bottom++;
        }
        if (checks.size() > 2 && checks.get(2) != null) {
            if (checkListItem.isPodExercise()) bottom++;
        }
        return bottom;
    }

    private int top(Long operationId) {
        List<CheckList> checks = checks(operationId);
        int top = 0;

        if (!checks.isEmpty() && checks.get(0) != null) {
            if (checks.get(0).getPodOneExercise() != null && checks.get(0).getPodOneExercise().getOption() == YES) top++;
            if (checks.get(0).getPodOneMeal() != null && checks.get(0).getPodOneMeal().getOption() == YES) top++;
        }
        if (checks.size() > 1 && checks.get(1) != null) {
            if (checks.get(1).getPodTwoExercise() != null && checks.get(1).getPodTwoExercise().getOption() == YES) top++;
            if (checks.get(1).getPodTwoMeal() != null && checks.get(1).getPodTwoMeal().getOption() == YES) top++;
        }
        if (checks.size() > 2 && checks.get(2) != null) {
            if (checks.get(2).getPodThreeExercise() != null && checks.get(2).getPodThreeExercise().getOption() == YES) top++;
        }
        return top;
    }

}
