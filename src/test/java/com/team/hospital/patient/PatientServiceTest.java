package com.team.hospital.patient;

import com.team.hospital.api.patient.PatientService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class PatientServiceTest {

    @Autowired
    PatientService patientService;

    @Test
    void findUserById() {
    }

    @Test
    void join() {
//        patientService.join();
    }
}