package com.team.hospital.api.operation;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OperationRepository extends JpaRepository<Operation, Long>  {

    List<Operation> findAllByPatientId(Long patientId);

    Page<Operation> findAll(Pageable pageable);

    List<Operation> findAll();

    @Query("SELECT o FROM Operation o WHERE o.patient.id = :patientId ORDER BY o.createdAt DESC")
    List<Operation> findOrderedAllByPatientId(Long patientId);

    @Query(value = "SELECT o.* FROM operation o " +
            "JOIN patient p ON o.patient_id = p.patient_id " +
            "WHERE p.patient_id = :patientId " +
            "ORDER BY o.created_at ASC LIMIT 1", nativeQuery = true)
    Optional<Operation> findFirstOperationByPatientId(@Param("patientId") Long patientId);
}
