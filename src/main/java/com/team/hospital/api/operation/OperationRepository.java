package com.team.hospital.api.operation;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface OperationRepository extends JpaRepository<Operation, Long>  {

    List<Operation> findAllByPatientId(Long patientId);

    Page<Operation> findAll(Pageable pageable);

    List<Operation> findAll();

    // @Query 사용 (선택 사항)
    @Query("SELECT o FROM Operation o WHERE o.id IN :ids AND o.isDeleted = false")
    List<Operation> findActiveOperationsByIds(List<Long> ids);

    @Query("SELECT o FROM Operation o WHERE o.patient.id = :patientId AND o.isDeleted = false ORDER BY o.createdAt DESC")
    List<Operation> findOrderedAllByPatientId(Long patientId);

    // 삭제 대기 상태의 Operation만 조회하는 메서드
//    @Query("SELECT o FROM Operation o WHERE o.isDeleted = true")
//    Slice<Operation> findAllMarkedForDeletion(Pageable pageable);
    @Query("SELECT o FROM Operation o WHERE o.isDeleted = true")
    List<Operation> findAllMarkedForDeletion();

    // 30일 이상 지난 Operation을 조회하여 삭제 대기 상태로 전환하기 위한 메서드
    @Query("SELECT o FROM Operation o WHERE o.updatedAt <= :date AND o.isDeleted = false")
    List<Operation> findAllByOperationDateBeforeAndIsDeletedFalse(LocalDate date);

    // 삭제 대기 상태로 변경된 후 30일 이상 지난 Operation을 조회하여 완전히 삭제하기 위한 메서드
    @Query("SELECT o FROM Operation o WHERE o.isDeleted = true AND o.deletionRequestDate <= :date")
    List<Operation> findAllByIsDeletedTrueAndDeletionRequestDateBefore(LocalDate date);

    @Query(value = "SELECT o.* FROM operation o " +
            "JOIN patient p ON o.patient_id = p.patient_id " +
            "WHERE p.patient_id = :patientId " +
            "ORDER BY o.created_at ASC LIMIT 1", nativeQuery = true)
    Optional<Operation> findFirstOperationByPatientId(@Param("patientId") Long patientId);
}
