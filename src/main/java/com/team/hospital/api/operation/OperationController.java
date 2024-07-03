package com.team.hospital.api.operation;

import com.team.hospital.api.operation.dto.RegisterOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class OperationController {

    private final OperationService operationService;
    @PostMapping("/api/operation/{patientId}")
    public ResponseEntity<?> save(@RequestBody RegisterOperation registerOperation,
                                  @PathVariable Long patientId){
        operationService.save(registerOperation, patientId);
        return ResponseEntity.status(HttpStatus.OK).body("success");
    }

    @GetMapping("/api/operation/{patientId}")
    public ResponseEntity<?> findOperation(@RequestBody RegisterOperation registerOperation,
                                           @PathVariable Long patientId){
        operationService.save(registerOperation, patientId);
        return ResponseEntity.status(HttpStatus.OK).body("success");
    }
}
