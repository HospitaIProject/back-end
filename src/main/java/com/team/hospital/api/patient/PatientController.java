package com.team.hospital.api.patient;

import com.team.hospital.api.patient.dto.RegisterPatient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/patient")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    @PostMapping
    public ResponseEntity<String> join(@RequestBody RegisterPatient registerPatient) {
        try {
            Patient patient = Patient.buildPatient(registerPatient);
            patientService.join(patient);
            return ResponseEntity.status(HttpStatus.CREATED).body("Patient successfully registered.");
        } catch (Exception e) {
            // 에러 로그 출력 또는 다른 처리를 여기서 할 수 있습니다.
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to register patient.");
        }
    }
}
