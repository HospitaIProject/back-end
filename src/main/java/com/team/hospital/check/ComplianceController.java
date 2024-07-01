package com.team.hospital.check;

import com.team.hospital.check.dto.WriteCompliance;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
}
