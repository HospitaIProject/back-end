package com.team.hospital.api.checkList;

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
public class ComplianceCalculationService {

    private final CheckListService checkListService;
    private final CheckListItemService checkListItemService;
    private final CheckListBeforeService checkListBeforeService;
    private final CheckListDuringService checkListDuringService;
    private final CheckListAfterService checkListAfterService;



    // Compliance
    public double calculateScore(Long operationId) {
        Long checkListItemId = checkListItemService.findByOperationId(operationId).getId();
        boolean existsBefore = checkListBeforeService.existsByCheckListItemId(checkListItemId);
        boolean existsDuring = checkListDuringService.existsByCheckListItemId(checkListItemId);
        boolean existsAfter = checkListAfterService.existsByCheckListItemId(checkListItemId);

        int totalCheckListCount = 0;
        int totalCheckListCompleted = 0;

        boolean[] decrementedFlags = new boolean[5];

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

        totalCheckListCompleted += top(operationId, decrementedFlags);
        totalCheckListCount += bottom(operationId);

        log.info("Total check list completed: {}", totalCheckListCompleted);
        log.info("Total check list count: {}", totalCheckListCount);

        if (totalCheckListCount > 0) {
            return ((double) totalCheckListCompleted / totalCheckListCount) * 100;
        }

        return 0.0;
    }

    private int checkListCompletedCount(Long operationId, String stage, boolean[] decrementedFlags) {
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
                log.info("CheckListBefore ExplainedPreOP = {}", checkListBefore.getExplainedPreOp().toString());
                log.info("CheckListBefore getOnsPreOp2hr = {}", checkListBefore.getOnsPreOp2hr().toString());
                log.info("CheckListBefore getOnsPostBowelPrep = {}", checkListBefore.getOnsPostBowelPrep().toString());
                log.info("CheckListBefore getDvtPrevention = {}", checkListBefore.getDvtPrevention().toString());
                log.info("CheckListBefore getAntibioticPreIncision = {}", checkListBefore.getAntibioticPreIncision().toString());
                log.info("CheckListBefore getPainMedPreOp = {}", checkListBefore.getPainMedPreOp().toString());
                break;
            case "during":
                CheckListDuringDTO checkListDuring = checkListDuringService.findCheckListDuringByOperationId(operationId);
                if (checkListDuring.getMaintainTemp() == YES) count++;
                if (checkListDuring.getFluidRestriction() == YES) count++;
                if (checkListDuring.getAntiNausea() == YES) count++;
                if (checkListDuring.getPainControl() == YES) count++;
                log.info("CheckListBefore getMaintainTemp = {}", checkListDuring.getMaintainTemp().toString());
                log.info("CheckListBefore getFluidRestriction = {}", checkListDuring.getFluidRestriction().toString());
                log.info("CheckListBefore getAntiNausea = {}", checkListDuring.getAntiNausea().toString());
                log.info("CheckListBefore getPainControl = {}", checkListDuring.getPainControl().toString());
                break;
            case "after":
                CheckListAfterDTO checkListAfter = checkListAfterService.findCheckListAfterByOperationId(operationId);
                if (checkListAfter.getAntiNauseaPostOp() == YES) count++;
                if (checkListAfter.getCatheterRemoval() == YES) count++;

                if (checkListAfter.getIvFluidRestrictionPostOp() == YES) {
                    count++;
                } else {
                    decrementedFlags[1] = true;
                }
                if (checkListAfter.getNonOpioidPainControl() == YES) {
                    count++;
                } else {
                    decrementedFlags[2] = true;
                }
                if (checkListAfter.getJpDrainRemoval() == YES) {
                    count++;
                } else {
                    decrementedFlags[3] = true;
                }
                if (checkListAfter.getIvLineRemoval() == YES) {
                    count++;
                } else {
                    decrementedFlags[4] = true;
                }

                if (checkListAfter.getPostExercise() == YES) count++;
                if (checkListAfter.getPostMeal() == YES) count++;

                log.info("CheckListBefore getAntiNauseaPostOp = {}", checkListAfter.getAntiNauseaPostOp().toString());
                log.info("CheckListBefore getCatheterRemoval = {}", checkListAfter.getCatheterRemoval().toString());

                log.info("CheckListBefore getIvFluidRestrictionPostOp = {}", checkListAfter.getIvFluidRestrictionPostOp().toString());
                log.info("CheckListBefore getNonOpioidPainControl = {}", checkListAfter.getNonOpioidPainControl().toString());
                log.info("CheckListBefore getJpDrainRemoval = {}", checkListAfter.getJpDrainRemoval().toString());
                log.info("CheckListBefore getIvLineRemoval = {}", checkListAfter.getIvLineRemoval().toString());

                log.info("CheckListBefore getPostExercise = {}", checkListAfter.getPostExercise().toString());
                log.info("CheckListBefore getPostMeal = {}", checkListAfter.getPostMeal().toString());
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
                if (checkListItem.isGiStimulant()) count++;
                if (checkListItem.isAntiNauseaPostOp()) count++;
                if (checkListItem.isCatheterRemoval()) count++;

                if (checkListItem.isGumChewing()) count++;
                if (checkListItem.isIvFluidRestrictionPostOp()) count++;
                if (checkListItem.isNonOpioidPainControl()) count++;
                if (checkListItem.isJpDrainRemoval()) count++;
                if (checkListItem.isIvLineRemoval()) count++;

                if (checkListItem.isPodExercise()) count++;
                if (checkListItem.isPodMeal()) count++;
                break;
        }

        return count;
    }

    private int top(Long operationId, boolean[] decrementedFlags) {
        List<CheckList> checks = checkListService.checks(operationId);
        int top = 0;

        if (!checks.isEmpty() && checks.get(0) != null) {
            if (checks.get(0).getPodOneGumChewing() != null && checks.get(0).getPodOneGumChewing().getOption() == NO && !decrementedFlags[0]) {
                top--;
                decrementedFlags[0] = true;
            }if (checks.get(0).getPodOneIvFluidRestriction() != null && checks.get(0).getPodOneIvFluidRestriction().getOption() == NO && !decrementedFlags[1]) {
                top--;
                decrementedFlags[1] = true;
            }if (checks.get(0).getPodOneNonOpioidPainControl() != null && checks.get(0).getPodOneNonOpioidPainControl().getOption() == NO && !decrementedFlags[2]) {
                top--;
                decrementedFlags[2] = true;
            }if (checks.get(0).getPodOneJpDrainRemoval() != null && checks.get(0).getPodOneJpDrainRemoval().getOption() == NO && !decrementedFlags[3]) {
                top--;
                decrementedFlags[3] = true;
            }


            if (checks.get(0).getPodOneExercise() != null && checks.get(0).getPodOneExercise().getOption() == YES) top++;
            if (checks.get(0).getPodOneMeal() != null && checks.get(0).getPodOneMeal().getOption() == YES) top++;
        }
        if (checks.size() > 1 && checks.get(1) != null) {
            if (checks.get(1).getPodTwoGumChewing() != null && checks.get(1).getPodTwoGumChewing().getOption() == NO && !decrementedFlags[0]) {
                top--;
                decrementedFlags[0] = true;
            }if (checks.get(1).getPodTwoIvFluidRestriction() != null && checks.get(1).getPodTwoIvFluidRestriction().getOption() == NO && !decrementedFlags[1]) {
                top--;
                decrementedFlags[1] = true;
            }if (checks.get(1).getPodTwoNonOpioidPainControl() != null && checks.get(1).getPodTwoNonOpioidPainControl().getOption() == NO && !decrementedFlags[2]) {
                top--;
                decrementedFlags[2] = true;
            }if (checks.get(1).getPodTwoJpDrainRemoval() != null && checks.get(1).getPodTwoJpDrainRemoval().getOption() == NO && !decrementedFlags[3]) {
                top--;
                decrementedFlags[3] = true;
            }

            if (checks.get(1).getPodTwoExercise() != null && checks.get(1).getPodTwoExercise().getOption() == YES) top++;
            if (checks.get(1).getPodTwoMeal() != null && checks.get(1).getPodTwoMeal().getOption() == YES) top++;
        }
        if (checks.size() > 2 && checks.get(2) != null) {
            if (checks.get(2).getPodThreeGumChewing() != null && checks.get(2).getPodThreeGumChewing().getOption() == NO && !decrementedFlags[0]) {
                top--;
                decrementedFlags[0] = true;
            }if (checks.get(2).getPodThreeIvFluidRestriction() != null && checks.get(2).getPodThreeIvFluidRestriction().getOption() == NO && !decrementedFlags[1]) {
                top--;
                decrementedFlags[1] = true;
            }if (checks.get(2).getPodThreeNonOpioidPainControl() != null && checks.get(2).getPodThreeNonOpioidPainControl().getOption() == NO && !decrementedFlags[2]) {
                top--;
                decrementedFlags[2] = true;
            }if (checks.get(2).getPodThreeJpDrainRemoval() != null && checks.get(2).getPodThreeJpDrainRemoval().getOption() == NO && !decrementedFlags[3]) {
                top--;
                decrementedFlags[3] = true;
            }if (checks.get(2).getPodThreeIvLineRemoval() != null && checks.get(2).getPodThreeIvLineRemoval().getOption() == NO && !decrementedFlags[4]) {
                top--;
                decrementedFlags[4] = true;
            }

            if (checks.get(2).getPodThreeExercise() != null && checks.get(2).getPodThreeExercise().getOption() == YES) top++;
        }
        return top;
    }

    /**
     * CheckList의 각 필드 값에 따라 top을 감소시키는 로직을 처리
     */
    private int handleDecrement(CheckList checkList, int top, boolean[] flags) {
        if (checkList.getPodOneGumChewing() != null && checkList.getPodOneGumChewing().getOption() == NO && !flags[0]) {
            top--;
            flags[0] = true;
        }

        if (checkList.getPodOneIvFluidRestriction() != null && checkList.getPodOneIvFluidRestriction().getOption() == NO && !flags[1]) {
            top--;
            flags[1] = true;
        }

        if (checkList.getPodOneNonOpioidPainControl() != null && checkList.getPodOneNonOpioidPainControl().getOption() == NO && !flags[2]) {
            top--;
            flags[2] = true;
        }

        if (checkList.getPodOneJpDrainRemoval() != null && checkList.getPodOneJpDrainRemoval().getOption() == NO && !flags[3]) {
            top--;
            flags[3] = true;
        }

        return top;
    }

    /**
     * CheckList의 각 필드 값에 따라 top을 증가시키는 로직을 처리
     * @param podNumber 현재 POD (Day) 숫자 (1, 2, 3 등)
     */
    private int handleIncrement(CheckList checkList, int top, int podNumber) {
        switch (podNumber) {
            case 1:
                if (checkList.getPodOneExercise() != null && checkList.getPodOneExercise().getOption() == YES) top++;
                if (checkList.getPodOneMeal() != null && checkList.getPodOneMeal().getOption() == YES) top++;
                break;
            case 2:
                if (checkList.getPodTwoExercise() != null && checkList.getPodTwoExercise().getOption() == YES) top++;
                if (checkList.getPodTwoMeal() != null && checkList.getPodTwoMeal().getOption() == YES) top++;
                break;
            case 3:
                if (checkList.getPodThreeExercise() != null && checkList.getPodThreeExercise().getOption() == YES) top++;
                break;
            default:
                break;
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
}
