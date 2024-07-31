package com.team.hospital.api.checkListDuring;

import com.team.hospital.api.checkListDuring.dto.CheckListDuringDTO;
import com.team.hospital.api.checkListDuring.dto.WriteCheckListDuring;
import com.team.hospital.api.checkListDuring.exception.CheckListDuringNotFoundException;
import com.team.hospital.api.checkListItem.CheckListItem;
import com.team.hospital.api.checkListItem.CheckListItemService;
import com.team.hospital.api.operation.Operation;
import com.team.hospital.api.operation.OperationService;
import com.team.hospital.api.patient.Patient;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CheckListDuringService {

    private final CheckListDuringRepository checkListDuringRepository;
    private final CheckListItemService checkListItemService;
    private final OperationService operationService;

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
    public void deleteByOperationId(Long operationId) {
        CheckListDuring checkListDuring = findCheckListDuringById(operationId);
        checkListDuringRepository.delete(checkListDuring);
    }

    @Transactional
    public void delete(Long checkListDuringId) {
        CheckListDuring checkListDuring = findCheckListDuringById(checkListDuringId);
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
        try {
            Operation operation = operationService.findOperationById(operationId);
            Patient patient = operation.getPatient();
            LocalDate operationDate = patient.getOperationDate();
            CheckListDuringDTO checkListDuringDTO = findCheckListDuringByOperationId(operationId);
            return Objects.equals(LocalDate.now(), operationDate) && checkListDuringDTO.getCreateAt().toLocalDate().equals(LocalDate.now());
        } catch (CheckListDuringNotFoundException e) {
            return false;
        }
    }

}
