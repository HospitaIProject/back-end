package com.team.hospital.api.checkListAfter;

import com.team.hospital.api.checkListAfter.dto.CheckListAfterDTO;
import com.team.hospital.api.checkListAfter.dto.WriteCheckListAfter;
import com.team.hospital.api.checkListAfter.exception.CheckListAfterAlreadyExistsException;
import com.team.hospital.api.checkListAfter.exception.CheckListAfterNotFoundException;
import com.team.hospital.api.checkListItem.CheckListItem;
import com.team.hospital.api.checkListItem.CheckListItemService;
import com.team.hospital.api.operation.OperationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CheckListAfterService {

    private final CheckListAfterRepository checkListAfterRepository;
    private final CheckListItemService checkListItemService;
    private final OperationService operationService;

    @Transactional
    public void save(WriteCheckListAfter write, Long checkListItemId) {
        try {
            CheckListItem checkListItem = checkListItemService.findCheckListItemById(checkListItemId);
            CheckListAfter checkListAfter = CheckListAfter.toEntity(write, checkListItem);
            checkListAfter.updateRemovalDate(write);
            checkListAfterRepository.save(checkListAfter);
        } catch (DataIntegrityViolationException e) {
            throw new CheckListAfterAlreadyExistsException();
        }
    }

    @Transactional
    public void deleteByOperationId(Long operationId) {
        CheckListAfter checkListAfter = findCheckListAfterById(operationId);
        checkListAfterRepository.delete(checkListAfter);
    }

    @Transactional
    public void delete(Long checkListAfterId) {
        CheckListAfter checkListAfter = findCheckListAfterById(checkListAfterId);
        checkListAfterRepository.delete(checkListAfter);
    }

    @Transactional
    public void modify(WriteCheckListAfter write, Long checkListAfterId) {
        CheckListAfter checkListAfter = findCheckListAfterById(checkListAfterId);
        checkListAfter.updateCheckListAfter(write);

        System.out.println("JP removedDate = " + checkListAfter.getJpDrainRemoval().getRemovedDate());
        System.out.println("Catheter removedDate1 = " + checkListAfter.getCatheterRemoval().getRemovedDate());
    }

    @Transactional
    public void updateJpRemovalDate(LocalDate jpRemovalDate, Long checkListAfterId) {
        CheckListAfter checkListAfter = findCheckListAfterById(checkListAfterId);
        checkListAfter.updateJpRemovalDate(jpRemovalDate);
    }

    @Transactional
    public void updateCatheterRemovalDate(LocalDate catheterRemovalDate, Long checkListAfterId) {
        CheckListAfter checkListAfter = findCheckListAfterById(checkListAfterId);
        checkListAfter.updateCatheterRemovalDate(catheterRemovalDate);
    }

    public CheckListAfter findCheckListAfterById(Long checkListAfterId) {
        Optional<CheckListAfter> checkListAfter = checkListAfterRepository.findById(checkListAfterId);
        if (checkListAfter.isEmpty()) throw new CheckListAfterNotFoundException();
        return checkListAfter.get();
    }

    public CheckListAfterDTO findCheckListAfterByOperationId(Long operationId) {
        Optional<CheckListAfter> checkListAfter = checkListAfterRepository.findByOperationId(operationId);
        if (checkListAfter.isEmpty()) throw new CheckListAfterNotFoundException();
        return CheckListAfterDTO.toEntity(checkListAfter.get());
    }

    public List<CheckListAfter> findAll() {
        return checkListAfterRepository.findAll();
    }

    // 수술 D+1 일 때 수술후 체크리스트 작성 + D+1 체크리스트 작성 완료 되었을 시 true 반환.
    public boolean checkListAfterExistsByOperationId(Long operationId) {
        return checkListAfterRepository.existsByOperationId(operationId);
    }

    public boolean existsByCheckListItemId(Long checkListItemId) {
        return checkListAfterRepository.existsByCheckListItemId(checkListItemId);
    }

}
