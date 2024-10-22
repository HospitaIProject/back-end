//package com.team.hospital.api.operation;
//
//import com.team.hospital.api.operationMethod.OperationMethod;
//import com.team.hospital.api.operationMethod.OperationMethodRepository;
//import com.team.hospital.api.operationType.OperationType;
//import com.team.hospital.api.operationType.OperationTypeRepository;
//import com.team.hospital.api.operationType.OperationTypeService;
//import com.team.hospital.api.operationType.dto.WriteOperationType;
//import com.team.hospital.api.operationType.exception.OperationTypeNameAlreadyExistsException;
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
//import java.util.List;
//import java.util.stream.Stream;
//
//import static org.junit.jupiter.api.Assertions.assertFalse;
//import static org.junit.jupiter.api.Assertions.assertThrows;
//
//@SpringBootTest
//class OperationServiceTest {
//
//    @Autowired OperationService operationService;
//    @Autowired OperationTypeRepository operationTypeRepository;
//    @Autowired OperationMethodRepository operationMethodRepository;
//    @Autowired OperationRepository operationRepository;
//    @Autowired
//    OperationTypeService operationTypeService;
//    @Autowired
//    PatientService patientService;
//    @Autowired
//    private PatientRepository patientRepository;
//
//    @Test
//    void findPatientsByOperationMethod() {
//        Pageable pageable = PageRequest.of(0, 1);
//        Slice<Patient> slice = operationService.findPatientsByOperationMethod("REC", pageable);
//        for (Patient patient : slice) {
//            System.out.println(patient.getName());
//        }
//    }
//
//    @Test
//    void findPatientsByOperation() {
//        List<OperationType> all = operationTypeRepository.findAll();
//        all.stream().map(OperationType::getName).forEach(System.out::println);
//
//    }
//
//    @Test
//    void method() {
//        List<Patient> patients = patientRepository.findPatientsByOperationTypeName("LAR");
//        patients.stream().map(Patient::getName).forEach(System.out::println);
//    }
//
//    @Test
//    void saveOrRestoreOperationTypeTest() {
//        // 소프트 딜리트된 OperationType 생성 및 저장
//        OperationType operationType = OperationType.toEntity(new WriteOperationType("TestType"));
//        operationTypeService.save(operationType);
//        operationTypeService.deleteByName("TestType"); // 소프트 딜리트
//
//        // 같은 이름으로 다시 저장 (복구)
//        operationTypeService.save(OperationType.toEntity(new WriteOperationType("TestType")));
//
//        // 정상적으로 복구되었는지 확인
//        OperationType restored = operationTypeService.findByOperationTypeName("TestType");
//        assertFalse(restored.isDeleted());
//
//        // 중복된 이름으로 저장 시도 (예외 발생)
//        assertThrows(OperationTypeNameAlreadyExistsException.class, () -> {
//            operationTypeService.save(OperationType.toEntity(new WriteOperationType("TestType")));
//        });
//    }
//
//}
