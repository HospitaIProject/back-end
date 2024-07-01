package com.team.hospital.patient;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class PatientServiceTest {

    @Autowired PatientService patientService;

    @Test
    void findUserById() {
        Patient patientById = patientService.findPatientById(1L);
        System.out.println(patientById.getName());
    }

    @Test
    void join() {
    }
}