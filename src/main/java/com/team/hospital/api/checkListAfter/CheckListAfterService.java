package com.team.hospital.api.checkListAfter;

import com.team.hospital.api.checkListAfter.dto.CheckListAfterDTO;
import com.team.hospital.api.checkListAfter.dto.WriteCheckListAfter;
import com.team.hospital.api.checkListAfter.exception.CheckListAfterAlreadyExistsException;
import com.team.hospital.api.checkListAfter.exception.CheckListAfterNotFoundException;
import com.team.hospital.api.checkListItem.CheckListItem;
import com.team.hospital.api.checkListItem.CheckListItemService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CheckListAfterService {

    private final CheckListAfterRepository checkListAfterRepository;
    private final CheckListItemService checkListItemService;

    @Transactional
    public void save(WriteCheckListAfter write, Long checkListItemId) {
        try {
            CheckListItem checkListItem = checkListItemService.findCheckListItemById(checkListItemId);
            CheckListAfter checkListAfter = CheckListAfter.toEntity(write, checkListItem);
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
    }

    public CheckListAfter findCheckListAfterById(Long checkListAfterId) {
        Optional<CheckListAfter> checkListAfter = checkListAfterRepository.findById(checkListAfterId);
        if (checkListAfter.isEmpty()) throw new CheckListAfterNotFoundException();
        return checkListAfter.get();
    }

    public Optional<CheckListAfter> findCheckListAfterByOpId(Long operationId) {
        return checkListAfterRepository.findByOperationId(operationId);
    }

    public CheckListAfterDTO findCheckListAfterByOperationId(Long operationId) {
        Optional<CheckListAfter> checkListAfter = checkListAfterRepository.findByOperationId(operationId);
        if (checkListAfter.isEmpty()) throw new CheckListAfterNotFoundException();
        return CheckListAfterDTO.toEntity(checkListAfter.get());
    }

    public List<CheckListAfter> findAll() {
        return checkListAfterRepository.findAll();
    }

    public boolean existsByCheckListItemId(Long checkListItemId) {
        return checkListAfterRepository.existsByCheckListItemId(checkListItemId);
    }

}
