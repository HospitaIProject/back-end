package com.team.hospital.api.operation;

import com.team.hospital.api.operation.dto.WriteOperation;
import com.team.hospital.api.operation.exception.OperationNotFoundException;
import com.team.hospital.api.operationMethod.OperationMethod;
import com.team.hospital.api.operationMethod.OperationMethodRepository;
import com.team.hospital.api.operationType.OperationTypeService;
import com.team.hospital.api.patient.Patient;
import com.team.hospital.api.patient.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class OperationService {

    private final OperationRepository operationRepository;
    private final PatientService patientService;
    private final OperationTypeService operationTypeService;
    private final OperationMethodRepository operationMethodRepository;

    // 30일 지난 Operation을 삭제 대기 상태로 전환
    @Transactional
    public void markForDeletion() {
        LocalDate thirtyDaysAgo = LocalDate.now().minusDays(30);
        List<Operation> operationsToMark = operationRepository.findAllByOperationDateBeforeAndIsDeletedFalse(thirtyDaysAgo);

        for (Operation operation : operationsToMark) {
            operation.setDeleted(true);
            operation.setDeletionRequestDate(LocalDate.now());
        }
    }

    // 최근 삭제 목록에 있는 Operation 중 30일 이상 지난 항목을 완전히 삭제
    @Transactional
    public void deletePermanently() {
        LocalDate thirtyDaysAgo = LocalDate.now().minusDays(30);
        List<Operation> operationsToDelete = operationRepository.findAllByIsDeletedTrueAndDeletionRequestDateBefore(thirtyDaysAgo);

        operationRepository.deleteAll(operationsToDelete);
    }

    @Transactional
    public Long save(WriteOperation write, Long patientId) {
        Patient patient = patientService.findPatientById(patientId);

        List<OperationMethod> operationMethods = write.getOperationTypeNames().stream()
                .map(operationTypeService::findByOperationTypeName)
                .map(operationType -> {
                    // OperationMethod를 조회하고, 존재하지 않으면 새로 생성
                    return operationMethodRepository.findByOperationTypeId(operationType.getId())
                            .orElse(OperationMethod.toEntity(operationType));
                })
                .toList();

        String result = String.join(", ", write.getOperationTypeNames());  // 구분자는 ", "
        Operation operation = Operation.createOperation(write, operationMethods, patient);
        operationRepository.save(operation);
        return operation.getId();
    }

    @Transactional
    public void modify(WriteOperation writeOperation, Long operationId) {
        Operation operation = findOperationById(operationId);
        operation.updateOperation(writeOperation);
    }

    //삭제시 최근 삭제 목록으로
    @Transactional
    public void cashDelete(Long operationId) {
        Operation operation = findOperationById(operationId);
        operation.setDeleted(true);
//        operationRepository.delete(operation);
    }

    //최근 삭제 목록에 있는 항목 진짜 삭제
    @Transactional
    public void delete(Long operationId) {
        Operation operation = findOperationById(operationId);
        operationRepository.delete(operation);
    }

    //삭제 복구
    @Transactional
    public void restore(Long operationId) {
        Operation operation = findOperationById(operationId);
        operation.setDeleted(false);;
        operation.setUpdatedAt();
    }

    public List<Operation> findAll() {
        return operationRepository.findAll();
    }


    public Operation findOperationById(Long operationId) {
        Optional<Operation> operation = operationRepository.findById(operationId);
        if (operation.isEmpty()) throw new OperationNotFoundException();
        return operation.get();
    }

    public List<Operation> findAllByPatient(Long patientId) {
        return operationRepository.findOrderedAllByPatientId(patientId);
    }

    public Operation findRecentOperationByPatientId(Long patientId) {
        return operationRepository.findFirstOperationByPatientId(patientId)
                .orElse(null);
    }


    //최근 삭제목록
    public List<Operation> findAllMarkedForDeletion() {
        return operationRepository.findAllMarkedForDeletion();
    }
}
