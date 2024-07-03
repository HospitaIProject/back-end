package com.team.hospital.api.checkList;

import com.team.hospital.api.checkList.dto.CheckListDTO;
import com.team.hospital.api.checkList.dto.WriteCheckList;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CheckListController {
    private final CheckListService checkListService;

    @PostMapping("/api/checkList/{checkListItemId}")
    public ResponseEntity<?> complianceSave(@RequestBody WriteCheckList writeCheckList,
                                            @PathVariable Long checkListItemId){
        checkListService.save(writeCheckList, checkListItemId);
        return ResponseEntity.status(HttpStatus.OK).body("success");
    }

    @GetMapping("/api/checkList/{operationId}")
    public ResponseEntity<?> findCheckListByOperationId(@PathVariable Long operationId){
        List<CheckListDTO> list = checkListService.findAllByOperation(operationId);
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @GetMapping("/api/checkList")
    public ResponseEntity<?> findAllCheckList(){
        List<CheckListDTO> list = checkListService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @GetMapping("/api/{checkListId}")
    public ResponseEntity<?> checkListInfo(@PathVariable Long checkListId){
        CheckList checkList = checkListService.findCheckListById(checkListId);
        return ResponseEntity.status(HttpStatus.OK).body(CheckListDTO.buildComplianceDTO(checkList));
    }

    @PutMapping("/api/{complianceId}")
    public ResponseEntity<?> checkListModify(@RequestBody WriteCheckList writeCheckList,
                                              @PathVariable Long complianceId){
        checkListService.modify(writeCheckList, complianceId);
        return ResponseEntity.status(HttpStatus.OK).body("success");
    }
}
