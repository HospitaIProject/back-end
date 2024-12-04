package com.team.hospital.api.checkList;

import com.team.hospital.api.checkList.dto.ComplianceScoreDTO;
import com.team.hospital.api.checkList.enumType.BooleanOption;
import com.team.hospital.api.checkListAfter.CheckListAfterService;
import com.team.hospital.api.checkListAfter.dto.CheckListAfterDTO;
import com.team.hospital.api.checkListBefore.CheckListBeforeService;
import com.team.hospital.api.checkListBefore.dto.CheckListBeforeDTO;
import com.team.hospital.api.checkListDuring.CheckListDuringService;
import com.team.hospital.api.checkListDuring.dto.CheckListDuringDTO;
import com.team.hospital.api.checkListItem.CheckListItem;
import com.team.hospital.api.checkListItem.CheckListItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.team.hospital.api.checkList.enumType.BooleanOption.NO;
import static com.team.hospital.api.checkList.enumType.BooleanOption.YES;

@Service
@RequiredArgsConstructor
@Slf4j
public class ComplianceService {

    private final CheckListService checkListService;
    private final CheckListItemService checkListItemService;
    private final CheckListBeforeService checkListBeforeService;
    private final CheckListDuringService checkListDuringService;
    private final CheckListAfterService checkListAfterService;

    // Compliance
    public ComplianceScoreDTO calculateScore(Long operationId) {
        Long checkListItemId = checkListItemService.findByOperationId(operationId).getId();
        boolean existsBefore = checkListBeforeService.existsByCheckListItemId(checkListItemId);
        boolean existsDuring = checkListDuringService.existsByCheckListItemId(checkListItemId);
        boolean existsAfter = checkListAfterService.existsByCheckListItemId(checkListItemId);

        int totalCheckListCount = 0;
        int totalCheckListCompleted = 0;

        boolean[] decrementedFlags = new boolean[4];

        // 수술전이 등록 됐을 경우.
        if (existsBefore) {
            totalCheckListCompleted += checkListCompletedCount(operationId, "before", decrementedFlags);
            totalCheckListCount += countCheckListItems(operationId, "before");
        }
        if (existsDuring) {
            totalCheckListCompleted += checkListCompletedCount(operationId, "during", decrementedFlags);
            totalCheckListCount += countCheckListItems(operationId, "during");
        }
        if (existsAfter) {
            totalCheckListCompleted += checkListCompletedCount(operationId, "after", decrementedFlags);
            totalCheckListCount += countCheckListItems(operationId, "after");
        }

//        log.info("totalCheckListCompleted={}", totalCheckListCompleted);
        totalCheckListCompleted += top(operationId, decrementedFlags);
        totalCheckListCount += bottom(operationId);

//        log.info("Total check list completed: {}", totalCheckListCompleted);
//        log.info("Total check list count: {}", totalCheckListCount);

        if (totalCheckListCount > 0)
            return new ComplianceScoreDTO(totalCheckListCompleted, totalCheckListCount, Math.round(((double) totalCheckListCompleted / totalCheckListCount) * 100 * 100.0) / 100.0);
        return new ComplianceScoreDTO(totalCheckListCompleted, totalCheckListCount, (0.0));
    }

    private int checkListCompletedCount(Long operationId, String stage, boolean[] decrementedFlags) {
        int count = 0;

        switch (stage) {
            case "before":
                CheckListBeforeDTO checkListBefore = checkListBeforeService.findCheckListBeforeByOperationId(operationId);
                if (BooleanOption.YES.equals(checkListBefore.getExplainedPreOp())) count++;
                if (BooleanOption.YES.equals(checkListBefore.getOnsPreOp2hr())) count++;
                if (BooleanOption.YES.equals(checkListBefore.getOnsPostBowelPrep())) count++;
                if (BooleanOption.YES.equals(checkListBefore.getDvtPrevention())) count++;
                if (BooleanOption.YES.equals(checkListBefore.getAntibioticPreIncision())) count++;
                if (BooleanOption.YES.equals(checkListBefore.getPainMedPreOp())) count++;
                break;

            case "during":
                CheckListDuringDTO checkListDuring = checkListDuringService.findCheckListDuringByOperationId(operationId);
                if (BooleanOption.YES.equals(checkListDuring.getMaintainTemp())) count++;
                if (BooleanOption.YES.equals(checkListDuring.getFluidRestriction())) count++;
                if (BooleanOption.YES.equals(checkListDuring.getAntiNausea())) count++;
                if (BooleanOption.YES.equals(checkListDuring.getPainControl())) count++;
                break;

            case "after":
                CheckListAfterDTO checkListAfter = checkListAfterService.findCheckListAfterByOperationId(operationId);
                if (BooleanOption.YES.equals(checkListAfter.getAntiNauseaPostOp())) count++;
                if (BooleanOption.YES.equals(checkListAfter.getCatheterRemoval())) count++;
                if (BooleanOption.YES.equals(checkListAfter.getJpDrainRemoval())) count++;
                if (BooleanOption.YES.equals(checkListAfter.getPostExercise())) count++;
                if (BooleanOption.YES.equals(checkListAfter.getPostMeal())) count++;

                if (BooleanOption.YES.equals(checkListAfter.getIvFluidRestrictionPostOp())) {
                    count++;
                } else {
                    decrementedFlags[1] = true;
                }
                if (BooleanOption.YES.equals(checkListAfter.getNonOpioidPainControl())) {
                    count++;
                } else {
                    decrementedFlags[2] = true;
                }
                break;
        }

        return count;
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
                // POD0
                if (checkListItem.isAntiNauseaPostOp()) count++;
                if (checkListItem.isCatheterRemoval()) count++;
                if (checkListItem.isIvFluidRestrictionPostOp()) count++;
                if (checkListItem.isNonOpioidPainControl()) count++;
                if (checkListItem.isJpDrainRemoval()) count++;

                if (checkListItem.isPodExercise()) count++;
                if (checkListItem.isPodMeal()) count++;
                break;
        }

        log.info("stage={}, count={}", stage, count);
        return count;
    }

    private int top(Long operationId, boolean[] decrementedFlags) {
        List<CheckList> checks = checkListService.checks(operationId);
        int top = 0;

        if (!checks.isEmpty() && checks.get(0) != null) {
            if (checks.get(0).getPodOneGumChewing() != null && checks.get(0).getPodOneGumChewing().getOption() == YES) {
                top++;
            } else {
                decrementedFlags[0] = true;
            }
            if (checks.get(0).getPodOneGiStimulant() != null && checks.get(0).getPodOneGiStimulant().getOption() == YES) {
                top++;
            } else {
                decrementedFlags[3] = true; // 이거 인덱스 조심
            }

            if (checks.get(0).getPodOneIvFluidRestriction() != null && checks.get(0).getPodOneIvFluidRestriction().getOption() == NO && !decrementedFlags[1]) {
                top--;
                decrementedFlags[1] = true;
            }
            if (checks.get(0).getPodOneNonOpioidPainControl() != null && checks.get(0).getPodOneNonOpioidPainControl().getOption() == NO && !decrementedFlags[2]) {
                top--;
                decrementedFlags[2] = true;
            }

            if (checks.get(0).getPodOneExercise() != null && checks.get(0).getPodOneExercise().getOption() == YES) top++;
            if (checks.get(0).getPodOneMeal() != null && checks.get(0).getPodOneMeal().getOption() == YES) top++;
//            log.info("Day 1 checkList complete count={}", top);
        }
        if (checks.size() > 1 && checks.get(1) != null) {
            if (checks.get(1).getPodTwoGumChewing() != null && checks.get(1).getPodTwoGumChewing().getOption() == NO && !decrementedFlags[0]) {
                top--;
                decrementedFlags[0] = true;
            }
            if (checks.get(1).getPodOneGiStimulant() != null && checks.get(0).getPodOneGiStimulant().getOption() == YES) {
                top--;
            } else {
                decrementedFlags[3] = true; // 이거 인덱스 조심
            }
            if (checks.get(1).getPodTwoIvFluidRestriction() != null && checks.get(1).getPodTwoIvFluidRestriction().getOption() == NO && !decrementedFlags[1]) {
                top--;
                decrementedFlags[1] = true;
            }
            if (checks.get(1).getPodTwoNonOpioidPainControl() != null && checks.get(1).getPodTwoNonOpioidPainControl().getOption() == NO && !decrementedFlags[2]) {
                top--;
                decrementedFlags[2] = true;
            }

            if (checks.get(1).getPodTwoExercise() != null && checks.get(1).getPodTwoExercise().getOption() == YES)
                top++;
            if (checks.get(1).getPodTwoMeal() != null && checks.get(1).getPodTwoMeal().getOption() == YES) top++;
        }
        if (checks.size() > 2 && checks.get(2) != null) {
            if (checks.get(2).getPodThreeGumChewing() != null && checks.get(2).getPodThreeGumChewing().getOption() == NO && !decrementedFlags[0]) {
                top--;
                decrementedFlags[0] = true;
            }
            if (checks.get(2).getPodThreeIvFluidRestriction() != null && checks.get(2).getPodThreeIvFluidRestriction().getOption() == NO && !decrementedFlags[1]) {
                top--;
                decrementedFlags[1] = true;
            }
            if (checks.get(2).getPodThreeNonOpioidPainControl() != null && checks.get(2).getPodThreeNonOpioidPainControl().getOption() == NO && !decrementedFlags[2]) {
                top--;
                decrementedFlags[2] = true;
            }
            if (checks.get(2).getPodOneGiStimulant() != null && checks.get(0).getPodOneGiStimulant().getOption() == YES) {
                top--;
            } else {
                decrementedFlags[3] = true; // 이거 인덱스 조심
            }


            if (checks.get(2).getPodThreeExercise() != null && checks.get(2).getPodThreeExercise().getOption() == YES) top++;
            if (checks.get(2).getPodThreeIvLineRemoval() != null && checks.get(2).getPodThreeIvLineRemoval().getOption() == YES) top++;
        }
        return top;
    }
    private int bottom(Long operationId) {
        List<CheckList> checks = checkListService.checks(operationId);
        CheckListItem checkListItem = checkListItemService.findCheckListItemByOperation(operationId);

        int bottom = 0;

        if (!checks.isEmpty() && checks.get(0) != null) {
            if (checkListItem.isPodExercise()) bottom++;
            if (checkListItem.isPodMeal()) bottom++;
            if (checkListItem.isGumChewing()) bottom++;
            if (checkListItem.isGiStimulant()) bottom++;
        }
        if (checks.size() > 1 && checks.get(1) != null) {
            if (checkListItem.isPodExercise()) bottom++;
            if (checkListItem.isPodMeal()) bottom++;
        }
        if (checks.size() > 2 && checks.get(2) != null) {
            if (checkListItem.isPodExercise()) bottom++;
            if (checkListItem.isIvLineRemoval()) bottom++;
        }
        return bottom;
    }
}
