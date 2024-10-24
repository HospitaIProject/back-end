package com.team.hospital.api.checkListBefore;

import com.team.hospital.api.checkListBefore.dto.CheckListBeforeDTO;
import com.team.hospital.api.checkListBefore.dto.WriteCheckListBefore;
import com.team.hospital.api.checkListBefore.exception.CheckListBeforeAlreadyExistsException;
import com.team.hospital.api.checkListBefore.exception.CheckListBeforeNotFoundException;
import com.team.hospital.api.checkListItem.CheckListItem;
import com.team.hospital.api.checkListItem.CheckListItemService;
import com.team.hospital.api.operation.OperationService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CheckListBeforeService {

    private final CheckListBeforeRepository checkListBeforeRepository;
    private final CheckListItemService checkListItemService;
    private final OperationService operationService;

    @Transactional
    public void save(WriteCheckListBefore write, Long checkListItemId) {
        try {
            CheckListItem checkListItem = checkListItemService.findCheckListItemById(checkListItemId);
            CheckListBefore checkListBefore = CheckListBefore.toEntity(write, checkListItem);
            checkListBeforeRepository.save(checkListBefore);
        } catch (DataIntegrityViolationException e) {
            throw new CheckListBeforeAlreadyExistsException();
        }
    }

    @Transactional
    public void delete(Long checkListBeforeId) {
        CheckListBefore checkListBefore = findCheckListBeforeById(checkListBeforeId);
        checkListBeforeRepository.delete(checkListBefore);
    }

    @Transactional
    public void modify(WriteCheckListBefore write, Long checkListBeforeId) {
        CheckListBefore checkListBefore = findCheckListBeforeById(checkListBeforeId);
        checkListBefore.updateCheckListBefore(write);
    }

    public CheckListBefore findCheckListBeforeById(Long checkListBeforeId) {
        Optional<CheckListBefore> checkListBefore = checkListBeforeRepository.findById(checkListBeforeId);
        if (checkListBefore.isEmpty()) throw new CheckListBeforeNotFoundException();
        return checkListBefore.get();
    }

    public CheckListBeforeDTO findCheckListBeforeByOperationId(Long operationId) {
        Optional<CheckListBefore> checkListBefore = checkListBeforeRepository.findByOperationId(operationId);
        if (checkListBefore.isEmpty()) throw new CheckListBeforeNotFoundException();
        return CheckListBeforeDTO.toEntity(checkListBefore.get());
    }

    public List<CheckListBefore> findAll() {
        return checkListBeforeRepository.findAll();
    }

    public boolean checkIfCheckListBeforeCreatedToday(Long operationId) {
        LocalDate today = LocalDate.now();
        LocalDate operationDate = operationService.findOperationById(operationId).getPatient().getOperationDate();

        // 오늘 날짜가 수술 날짜보다 같거나 이후일 경우 false 반환
        return today.isBefore(operationDate) || checkListBeforeRepository.findByOperationId(operationId).isPresent();
    }

    public boolean existsByCheckListItemId(Long checkListItemId) {
        return checkListBeforeRepository.existsByCheckListItemId(checkListItemId);
    }

}
