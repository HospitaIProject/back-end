//package com.team.hospital.patient;
//
//import com.team.hospital.api.patient.Patient;
//import com.team.hospital.api.patient.PatientService;
//import com.team.hospital.api.patient.repository.PatientRepository;
//import com.team.hospital.api.patient.repository.PatientRepositoryImpl;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.domain.Slice;
//
//import java.util.List;
//
//@SpringBootTest
//class PatientServiceTest {
//
//    @Autowired
//    PatientService patientService;
//
//    @Autowired
//    PatientRepositoryImpl patientRepositoryImpl;
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
//    void queryDSL() {
//        int pageNumber = 0;
//        int pageSize = 1;
//        Pageable pageable = PageRequest.of(pageNumber, pageSize);
////        List<Patient> patients = patientRepositoryImpl.findPatientsByYearAndOpNameContaining(2024, "LA", pageable).getContent();
////        patientRepositoryImpl.findByYear(2024, pageable);
//
//        long startTime = System.currentTimeMillis();
//        List<Patient> patients = patientRepositoryImpl.findByYearAndMonth(2024, 9, pageable).getContent();
//        Patient patient = patients.get(0);
//        System.out.println(patient);
//        long endTime = System.currentTimeMillis();
//        long duration = endTime - startTime;
//        System.out.println("쿼리 실행 시간: " + duration + " ms");
//
//
////        Patient patient = patients.get(0);
////        System.out.println(patient);
//    }
//
//    @Test
//    void jpa() {
//        int pageNumber = 0;
//        int pageSize = 1;
//        Pageable pageable = PageRequest.of(pageNumber, pageSize);
////        List<Patient> patients = patientRepository.findPatientsByYearAndOpNameContaining(2024, "LAR", pageable).getContent();
////        patientRepository.findByYear(2024, pageable);
//
//        long startTime = System.currentTimeMillis();
//        List<Patient> patients = patientRepository.findByYearAndMonth(2024, 9, pageable).getContent();
//        Patient patient = patients.get(0);
//        System.out.println(patient);
//        long endTime = System.currentTimeMillis();
//        long duration = endTime - startTime;
//        System.out.println("쿼리 실행 시간: " + duration + " ms");
//
////        Patient patient = patients.get(0);
////        System.out.println(patient);
//    }
//
//    @Test
//    void find() {
//        int pageNumber = 3;
//        int pageSize = 1;
//
//        Pageable pageable = PageRequest.of(pageNumber, pageSize);
//
//        Slice<Patient> all = patientService.findPatientsByPatientNumber(1L, pageable);
//        for (Patient patient : all) {
//            System.out.println("patient = " + patient);
//        }
//    }
//
//    @Test
//    void join() {
//    }
//}