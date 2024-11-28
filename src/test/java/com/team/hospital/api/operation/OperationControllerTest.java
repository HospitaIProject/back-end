//package com.team.hospital.api.operation;
//
//import com.team.hospital.api.operation.dto.RegisterOperation;
//import com.team.hospital.api.operation.enumType.ASAScore;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//class OperationControllerTest {
//
//    @Autowired OperationService operationService;
//
//    @Test
//    void save() {
//        RegisterOperation build = RegisterOperation.builder().height(174).weight(70).asaScore(ASAScore.ASA_III).build();
//        operationService.save(build, 1L);
//    }
//
//    @Test
//    void findOperations() {
//    }
//
//    @Test
//    void findOperation() {
//    }
//}