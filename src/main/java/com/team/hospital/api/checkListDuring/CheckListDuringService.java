package com.team.hospital.api.checkListDuring;

import com.team.hospital.api.checkListDuring.exception.CheckListDuringNotFoundException;
import com.team.hospital.api.checkListItem.CheckListItem;
import com.team.hospital.api.checkListItem.CheckListItemService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CheckListDuringService {

    private final CheckListDuringRepository checkListDuringRepository;
    private final CheckListItemService checkListItemService;

    @Transactional
    public void save(WriteCheckListDuring write, Long checkListItemId) {
        try {
            CheckListItem checkListItem = checkListItemService.findCheckListItemById(checkListItemId);
            CheckListDuring checkListDuring = CheckListDuring.toEntity(write, checkListItem);
            checkListDuringRepository.save(checkListDuring);
        } catch (DataIntegrityViolationException e) {
            throw new CheckListDuringNotFoundException();
        }
    }

    @Transactional
    public void modify(WriteCheckListDuring write, Long checkListDuringId) {
        CheckListDuring checkListDuring = findCheckListDuringById(checkListDuringId);
        checkListDuring.updateCheckListDuring(write);
    }

    @Transactional
    public void delete(Long operationId) {
        CheckListDuring checkListDuring = findCheckListDuringById(operationId);
        checkListDuringRepository.delete(checkListDuring);
    }

    public CheckListDuring findCheckListDuringById(Long checkListDuringId) {
        Optional<CheckListDuring> checkListDuring = checkListDuringRepository.findById(checkListDuringId);
        if (checkListDuring.isEmpty()) throw new CheckListDuringNotFoundException();
        return checkListDuring.get();
    }

    public CheckListDuringDTO findCheckListDuringByOperationId(Long operationId) {
        Optional<CheckListDuring> checkListDuring = checkListDuringRepository.findByOperationId(operationId);
        if (checkListDuring.isEmpty()) throw new CheckListDuringNotFoundException();
        return CheckListDuringDTO.toEntity(checkListDuring.get());
    }

    public List<CheckListDuring> findAll() {
        return checkListDuringRepository.findAll();
    }

    public boolean checkIfCheckListDuringCreatedToday(Long operationId) {
        CheckListDuringDTO checkListDuringDTO = findCheckListDuringByOperationId(operationId);
        return checkListDuringDTO.getCreateAt().toLocalDate().equals(LocalDate.now());
    }

    boolean existsById(Long checkListDuringId) { return checkListDuringRepository.existsById(checkListDuringId);}
}
