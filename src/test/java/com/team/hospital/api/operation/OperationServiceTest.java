//package com.team.hospital.api.operation;
//
//import com.team.hospital.api.patient.Patient;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.domain.Slice;
//
//@SpringBootTest
//class OperationServiceTest {
//
//    @Autowired OperationService operationService;
//
//    @Test
//    void findPatientsByOperationMethod() {
//        Pageable pageable = PageRequest.of(0, 10);
//        Slice<Patient> slice = operationService.findPatientsByOperationMethod("RHC", pageable);
//        for (Patient patient : slice) {
//            System.out.println(patient.getName());
//        }
//    }
//
//}