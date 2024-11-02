//package com.team.hospital.api.operation;
//
//import com.team.hospital.api.operationType.OperationTypeRepository;
//import com.team.hospital.api.operationType.OperationTypeService;
//import com.team.hospital.api.patient.PatientService;
//import jakarta.transaction.Transactional;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//
//import java.util.List;
//
//import static java.lang.System.nanoTime;
//
//@Transactional
//@SpringBootTest
//class OperationServiceTest {
//
//    @Autowired OperationTypeRepository operationTypeRepository;
//    @Autowired OperationTypeService operationTypeService;
//    @Autowired OperationService operationService;
//    @Autowired OperationRepository operationRepository;
//    @Autowired
//    private PatientService patientService;
//
//    @Test
//    void findPatientsByOperationMethod() {
//        Pageable pageable = PageRequest.of(0, 1);
////        List<Operation> all = operationRepository.findAll(pageable).getContent();
////        all.forEach(System.out::println);
//        List<Operation> all = operationRepository.findAll();
//        all.forEach(System.out::println);
//    }
//
//    @Test
//    void method() {
//        // 첫 번째 호출 시간 측정 시작
//        long startTime1 = nanoTime();
//        List<Operation> allByPatientId1 = operationService.findAllByPatient(1L);
//        long endTime1 = nanoTime();
//        long duration1 = endTime1 - startTime1;
//        System.out.println("첫 번째 호출 시간: " + duration1 + " 나노초");
//        System.out.println("======================================================");
//    }
//
//    @Test
//    void method1() {
//        // 두 번째 호출 시간 측정 시작
//        long startTime2 = nanoTime();
//        List<Operation> allByPatientId2 = operationRepository.findAllByPatientId(1L);
//        long endTime2 = nanoTime();
//        long duration2 = endTime2 - startTime2;
//
//        System.out.println("두 번째 호출 시간: " + duration2 + " 나노초");
//    }
//
//
////    @Test
////    void saveOrRestoreOperationTypeTest() {
////        // 소프트 딜리트된 OperationType 생성 및 저장
////        OperationType operationType = OperationType.toEntity(new WriteOperationType("TestType"));
////        operationTypeService.save(operationType);
////        operationTypeService.deleteByName("TestType"); // 소프트 딜리트
////
////        // 같은 이름으로 다시 저장 (복구)
////        operationTypeService.save(OperationType.toEntity(new WriteOperationType("TestType")));
////
////        // 정상적으로 복구되었는지 확인
////        OperationType restored = operationTypeService.findByOperationTypeName("TestType");
////        assertFalse(restored.isDeleted());
////
////        // 중복된 이름으로 저장 시도 (예외 발생)
////        assertThrows(OperationTypeNameAlreadyExistsException.class, () -> {
////            operationTypeService.save(OperationType.toEntity(new WriteOperationType("TestType")));
////        });
////    }
//
//}
