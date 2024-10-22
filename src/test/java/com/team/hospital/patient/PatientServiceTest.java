//package com.team.hospital.patient;
//
//import com.team.hospital.api.patient.Patient;
//import com.team.hospital.api.patient.PatientRepository;
//import com.team.hospital.api.patient.PatientService;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.domain.Slice;
//
//@SpringBootTest
//class PatientServiceTest {
//
//    @Autowired
//    PatientService patientService;
//
//    @Autowired
//    PatientRepository patientRepository;
//
//    @Test
//    void findUserById() {
//        Patient patientById = patientService.findPatientById(1L);
//        System.out.println(patientById.getName());
//    }
//
//    @Test
//    void find() {
//        int pageNumber = 3;
//        int pageSize = 1;
//
//        Pageable pageable = PageRequest.of(pageNumber, pageSize);
//
//        Slice<Patient> all = patientService.findPatientsByPatientNumber(1L , pageable);
//        for (Patient patient : all) {
//            System.out.println("patient = " + patient);
//        }
//    }
//
//    @Test
//    void join() {
//    }
//}