package com.team.hospital.api.checkListItemDefault;

import com.team.hospital.api.checkListItemDefault.dto.WriteCheckListItemDefault;
import com.team.hospital.api.checkListItemDefault.exception.CheckListItemDefaultAlreadyExistsException;
import com.team.hospital.api.checkListItemDefault.exception.CheckListItemDefaultNotFoundException;
import com.team.hospital.api.operation.enumType.OperationMethod;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class CheckListItemDefaultService {

    private final CheckListItemDefaultRepository checkListItemDefaultRepository;

    @Transactional
    public void save(WriteCheckListItemDefault write) {
        if (existsByOperationMethod(write.getOperationMethod())) {
            throw new CheckListItemDefaultAlreadyExistsException("이미 해당 operationMethod로 등록된 수술 항목 기본 값이 존재합니다.");
        }
        CheckListItemDefault checkListItemDefault = CheckListItemDefault.toEntity(write);
        checkListItemDefaultRepository.save(checkListItemDefault);
    }

    @Transactional
    public void update(WriteCheckListItemDefault write) {
        CheckListItemDefault checkListItemDefault = findByOperationMethod(write.getOperationMethod());
        checkListItemDefault.update(write);
    }

    public CheckListItemDefault find(Long id) {
        if (checkListItemDefaultRepository.findById(id).isPresent()) return checkListItemDefaultRepository.findById(id).get();
        else throw new NoSuchElementException();
    }

    public CheckListItemDefault findByOperationMethod(OperationMethod operationMethod) {
        if (!existsByOperationMethod(operationMethod)) throw new CheckListItemDefaultNotFoundException("해당 operationMethod에 등록된 체크리스트 목록 기본값이 존재하지 않습니다.");
        return checkListItemDefaultRepository.findByOperationMethod(operationMethod);
    }

    private boolean existsByOperationMethod(OperationMethod operationMethod) {
        return checkListItemDefaultRepository.existsByOperationMethod(operationMethod);
    }
}
