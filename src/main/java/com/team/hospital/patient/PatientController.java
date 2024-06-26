package com.team.hospital.patient;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    @PostMapping("/api")
    public String join(){
        patientService.join();
        return "ok";
    }
}
