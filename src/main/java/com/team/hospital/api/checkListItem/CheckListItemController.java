package com.team.hospital.api.checkListItem;

import com.team.hospital.api.checkListItem.dto.CheckListItemDTO;
import com.team.hospital.api.checkListItem.dto.WriteCheckListItem;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class CheckListItemController {

    private final CheckListItemService checkListItemService;

    @PostMapping("/api/checkListItem/{operationId}")
    public ResponseEntity<String> save(@RequestBody WriteCheckListItem writeCheckListItem,
                                       @PathVariable Long operationId){
        checkListItemService.save(writeCheckListItem, operationId);
        return ResponseEntity.ok().body("success");
    }

}
