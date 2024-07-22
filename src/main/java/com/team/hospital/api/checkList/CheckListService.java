package com.team.hospital.api.checkList;

import com.team.hospital.api.checkList.dto.WriteCheckList;
import com.team.hospital.api.checkList.enumType.BooleanOption;
import com.team.hospital.api.checkList.exception.CheckListNotFoundException;
import com.team.hospital.api.checkListBefore.CheckListBeforeDTO;
import com.team.hospital.api.checkListBefore.CheckListBeforeService;
import com.team.hospital.api.checkListDuring.CheckListDuring;
import com.team.hospital.api.checkListDuring.CheckListDuringService;
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
    private final CheckListBeforeService checkListBeforeService;
    private final CheckListDuringService checkListDuringService;

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

    public boolean checkIfAnyCheckListCreatedToday(Long operationId) {
        return checkIfCheckListCreatedToday(operationId) ||
                checkListBeforeService.checkIfCheckListBeforeCreatedToday(operationId) ||
                checkListDuringService.checkIfCheckListDuringCreatedToday(operationId);
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

    private int countCheckList(Long operationId) {
        List<CheckList> checkLists = findAllByOperationId(operationId);
        CheckList checkList = checkLists.get(0);
        int count = 0;

        if (checkList.getGiStimulant().getOption() == BooleanOption.YES) count++;
        if (checkList.getGumChewing().getOption() == BooleanOption.YES) count++;
        if (checkList.getAntiNauseaPostOp().getOption() == BooleanOption.YES) count++;
        if (checkList.getIvFluidRestrictionPostOp().getOption() == BooleanOption.YES) count++;
        if (checkList.getNonOpioidPainControl().getOption() == BooleanOption.YES) count++;
        if (checkList.getJpDrainRemoval().getOption() == BooleanOption.YES) count++;
        if (checkList.getCatheterRemoval().getOption() == BooleanOption.YES) count++;
        if (checkList.getIvLineRemoval().getOption() == BooleanOption.YES) count++;

        return count;
    }



    private int countCheckedItems(CheckListItem checkListItem) {
        int count = 0;

        if (checkListItem.isExplainedPreOp()) count++;
        if (checkListItem.isOnsPreOp2hr()) count++;
        if (checkListItem.isOnsPostBowelPrep()) count++;
        if (checkListItem.isDvtPrevention()) count++;
        if (checkListItem.isAntibioticPreIncision()) count++;
        if (checkListItem.isPainMedPreOp()) count++;
        if (checkListItem.isMaintainTemp()) count++;
        if (checkListItem.isFluidRestriction()) count++;
        if (checkListItem.isAntiNausea()) count++;
        if (checkListItem.isPainControl()) count++;
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
