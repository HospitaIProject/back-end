//package com.team.hospital.api.operation.dto;
//
//import com.team.hospital.api.checkList.CheckListRepository;
//import com.team.hospital.api.checkList.CheckListService;
//import com.team.hospital.api.checkListAfter.CheckListAfterService;
//import com.team.hospital.api.checkListBefore.CheckListBeforeService;
//import com.team.hospital.api.checkListDuring.CheckListDuringService;
//import com.team.hospital.api.operation.Operation;
//import com.team.hospital.api.operation.OperationRepository;
//import com.team.hospital.api.operation.OperationService;
//import com.team.hospital.api.patient.Patient;
//import com.team.hospital.api.patient.PatientService;
//import com.team.hospital.api.patient.dto.PatientWithOperationDateDTO;
//import com.team.hospital.api.patient.enumType.Opdate;
//import com.team.hospital.api.patient.repository.PatientRepository;
//import jakarta.transaction.Transactional;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.data.domain.PageRequest;
//
//import java.time.LocalDate;
//import java.time.temporal.ChronoUnit;
//import java.util.Comparator;
//import java.util.List;
//import java.util.Optional;
//
//import static java.lang.System.nanoTime;
//
//@Transactional
//@SpringBootTest
//class QueryRepositoryTest {
//
//    @Autowired
//    QueryRepository queryRepository;
//    @Autowired
//    PatientService patientService;
//    @Autowired
//    OperationService operationService;
//    @Autowired
//    OperationRepository operationRepository;
//    @Autowired
//    CheckListService checkListService;
//
//    @Autowired
//    CheckListBeforeService checkListBeforeService;
//    @Autowired
//    CheckListDuringService checkListDuringService;
//    @Autowired
//    CheckListAfterService checkListAfterService;
//    @Autowired
//    private CheckListRepository checkListRepository;
//    @Autowired
//    private PatientRepository patientRepository;
//
//
//    @Test
//    void findAllOpDto() {
//        operationService.findAllByPatient(1L);
//
//    }
//
//    @Test
//    void find() {
//        long startTime1 = nanoTime();
//        List<OpDto> allOpDto = queryRepository.findAllOpDtoByPatientId(1L);
//        allOpDto.forEach(System.out::println);
//        long endTime1 = nanoTime();
//        long duration1 = endTime1 - startTime1;
//
//        System.out.println("첫 번째 호출 시간: " + duration1 + " 나노초");
//    }
//
//    @Test
//    void jpa() {
//        long startTime2 = nanoTime();
//        List<OperationDTO> operationDTOs = operationService.findAllByPatient(1L).stream()
//                .map(OperationDTO::toEntity)
//                .toList();
//        operationDTOs.forEach(System.out::println);
//        long endTime2 = nanoTime();
//        long duration2 = endTime2 - startTime2;
//        System.out.println("두 번째 호출 시간: " + duration2 + " 나노초");
//    }
//
//    @Test
//    void findRecentOperationByPatientId() {
//        long startTime2 = nanoTime();
//        Optional<Operation> firstOperationByPatientId = operationRepository.findFirstOperationByPatientId(1L);
//        firstOperationByPatientId.ifPresent(System.out::println);
//        long endTime2 = nanoTime();
//        long duration2 = endTime2 - startTime2;
//        System.out.println("두 번째 호출 시간: " + duration2 + " 나노초");
//    }
//
//    @Test
//    void findAll() {
//        PageRequest page = PageRequest.of(1, 1);
//        Patient patient = patientService.findPatientById(22L);
//        System.out.println(patient.getName());
//        List<Operation> allByPatient = operationService.findAllByPatient(22L);
//        Operation operation = allByPatient.get(0);
//        System.out.println(operation.getOperationNames());
//        checkListService.checkIfCheckListCreatedToday(operation.getId(), patient.getOperationDate());
//        checkListRepository.existsCheckListWithExactDaysBetween(operation.getId(), patient.getOperationDate());
//        int between = (int) ChronoUnit.DAYS.between(patient.getOperationDate(), LocalDate.now());
//        System.out.println(patient.getOperationDate() + " : patient operation Date");
//        System.out.println(LocalDate.now() + " : now Date");
//        System.out.println("between = " + between);
//    }
//
//    @Test
//    void nameTest() {
//        PageRequest page = PageRequest.of(0, 1);
//        List<Patient> content = patientRepository.findPatientsByOperationTypeNameContaining("LHC", page).getContent();
//        content.forEach(System.out::println);
//    }
//
//    private PatientWithOperationDateDTO convertToDto(Patient patient) {
//        List<OpDto> opDTOs = queryRepository.findAllOpDtoByPatientId(patient.getId());
//        Operation recentOperation = operationService.findRecentOperationByPatientId(patient.getId());
//        boolean checkListCreatedToday = recentOperation != null && checkListService.checkIfAnyCheckListCreatedToday(recentOperation.getId(), patient.getOperationDate());
//        return PatientWithOperationDateDTO.toEntity(patient, opDTOs, checkListCreatedToday);
//    }
//
//    private Comparator<Patient> patientComparator(Opdate opDate) {
//        Comparator<Patient> comparator;
//        if (opDate == Opdate.NEWER) comparator = Comparator.comparing(Patient::getOperationDate).reversed();
//        else if (opDate == Opdate.OLDER) comparator = Comparator.comparing(Patient::getOperationDate);
//        else comparator = Comparator.comparing(Patient::getUpdatedAt).reversed();
//
//        return comparator;
//    }
//}