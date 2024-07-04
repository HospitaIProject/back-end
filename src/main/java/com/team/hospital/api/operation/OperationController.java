package com.team.hospital.api.operation;

import com.team.hospital.api.operation.dto.OperationDTO;
import com.team.hospital.api.operation.dto.OperationResponse;
import com.team.hospital.api.operation.dto.RegisterOperation;
import com.team.hospital.api.patient.Patient;
import com.team.hospital.api.patient.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/api/operations/{patientId}")
    public ResponseEntity<List<OperationDTO>> findOperations(@PathVariable Long patientId){
        List<OperationDTO> operationDTOS = operationService.findAllByPatient(patientId);
        return ResponseEntity.status(HttpStatus.OK).body(operationDTOS);
    }

    @GetMapping("/api/operation/{operationId}")
    public ResponseEntity<OperationResponse> findOperation(@PathVariable Long operationId){
        OperationDTO operationDTO = OperationDTO.buildOperationDTO(operationService.findOperationById(operationId));
        return ResponseEntity.status(HttpStatus.OK).body(OperationResponse.buildOperationResponse(operationDTO));
    }
}
