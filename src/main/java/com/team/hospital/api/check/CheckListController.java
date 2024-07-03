package com.team.hospital.api.check;

import com.team.hospital.api.check.dto.ComplianceDTO;
import com.team.hospital.api.check.dto.WriteCompliance;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CheckListController {
    private final CheckListService checkListService;

    @PostMapping("/api/compliance/{patientId}")
    public ResponseEntity<?> complianceSave(@RequestBody WriteCompliance writeCompliance,
                                            @PathVariable Long patientId){
        checkListService.save(writeCompliance, patientId);
        return ResponseEntity.status(HttpStatus.OK).body("success");
    }

    @GetMapping("/api/compliance/{patientId}")
    public ResponseEntity<?> patientComplianceList(@PathVariable Long patientId){
        List<ComplianceDTO> list = checkListService.findAllByPatient(patientId);
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @GetMapping("/api/compliance")
    public ResponseEntity<?> complianceList(){
        List<ComplianceDTO> list = checkListService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @GetMapping("/api/{complianceId}")
    public ResponseEntity<?> complianceInfo(@PathVariable Long complianceId){
        CheckList checkList = checkListService.findComplianceById(complianceId);
        return ResponseEntity.status(HttpStatus.OK).body(ComplianceDTO.buildComplianceDTO(checkList));
    }

    @PutMapping("/api/{complianceId}")
    public ResponseEntity<?> complianceModify(@RequestBody WriteCompliance writeCompliance,
                                              @PathVariable Long complianceId){
        checkListService.modify(writeCompliance, complianceId);
        return ResponseEntity.status(HttpStatus.OK).body("success");
    }
}
