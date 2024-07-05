package com.team.hospital.api.checkList;

import com.team.hospital.api.checkList.dto.CheckListDTO;
import com.team.hospital.api.checkList.dto.WriteCheckList;
import com.team.hospital.api.checkListItem.CheckListItem;
import com.team.hospital.api.checkListItem.CheckListItemService;
import com.team.hospital.api.operation.OperationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CheckListService {

    private final CheckListRepository checkListRepository;
    private final OperationService operationService;
    private final CheckListItemService checkListItemService;

    public List<CheckListDTO> findAllByOperation(Long operationId){
        List<CheckList> list = checkListRepository.findAllByOperation(operationId);
        return CheckListDTO.buildComplianceDTOs(list);
    }

    public List<CheckListDTO> findAll(){
        List<CheckList> list = checkListRepository.findAll();
        return CheckListDTO.buildComplianceDTOs(list);
    }

    public CheckList findCheckListById(Long complianceId){
        Optional<CheckList> compliance = checkListRepository.findById(complianceId);
        if (compliance.isEmpty()) throw new IllegalArgumentException("Compliance x");
        return compliance.get();
    }

    @Transactional
    public void save(WriteCheckList write, Long checkListItemId){
        CheckListItem checkListItem = checkListItemService.findCheckListItemById(checkListItemId);
        CheckList checkList = CheckList.toEntity(write, checkListItem);
        checkListRepository.save(checkList);
    }

    @Transactional
    public void modify(WriteCheckList write, Long checkListId){
        CheckList checkList = findCheckListById(checkListId);
        checkList.updateCheckList(write);
    }

    @Transactional
    public void delete(Long operationId){
        CheckList checkList = findCheckListById(operationId);
        checkListRepository.delete(checkList);
    }
}
