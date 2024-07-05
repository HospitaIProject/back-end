//package com.team.hospital.api.patient;
//
//import com.team.hospital.api.patient.dto.RegisterPatient;
//import com.team.hospital.api.patient.enumType.Sex;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import java.time.LocalDate;
//import java.util.Date;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//class PatientServiceTest {
//
//    @Autowired PatientService patientService;
//
//    @Test
//    void join() {
//        LocalDate localDate = LocalDate.now();
//        RegisterPatient registerPatient = new RegisterPatient(12315425125L, "이종현", Sex.MALE, localDate);
//        patientService.join(registerPatient);
//    }
//
//    @Test
//    void findPatientById() {
//        Patient patientById = patientService.findPatientById(1L);
//        System.out.println(patientById);
//    }
//
//    @Test
//    void findAll() {
//    }
//
//}