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
public class ComplianceController {
    private final ComplianceService complianceService;

    @PostMapping("/api/compliance/{patientId}")
    public ResponseEntity<?> complianceSave(@RequestBody WriteCompliance writeCompliance,
                                            @PathVariable Long patientId){
        complianceService.save(writeCompliance, patientId);
        return ResponseEntity.status(HttpStatus.OK).body("success");
    }

    @GetMapping("/api/compliance/{patientId}")
    public ResponseEntity<?> complianceList(@PathVariable Long patientId){
        List<ComplianceDTO> list = complianceService.findAllByPatient(patientId);
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @GetMapping("/api/{complianceId}")
    public ResponseEntity<?> complianceInfo(@PathVariable Long complianceId){
        Compliance compliance = complianceService.findComplianceById(complianceId);
        return ResponseEntity.status(HttpStatus.OK).body(ComplianceDTO.buildComplianceDTO(compliance));
    }

    @PutMapping("/api/{complianceId}")
    public ResponseEntity<?> complianceModify(@RequestBody WriteCompliance writeCompliance,
                                              @PathVariable Long complianceId){
        complianceService.modify(writeCompliance, complianceId);
        return ResponseEntity.status(HttpStatus.OK).body("success");
    }
}
