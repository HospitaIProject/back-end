package com.team.hospital.api.patient.repository;

import com.team.hospital.api.patient.Patient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PatientRepository extends JpaRepository<Patient, Long>, PatientRepositoryCustom {

    Slice<Patient> findByNameContaining(String name, Pageable pageable);

    boolean existsByPatientNumber(Long patientNumber);

    @Query("SELECT p FROM Patient p WHERE CAST(p.patientNumber AS string) LIKE CONCAT('%', :patientNumber, '%')")
    Page<Patient> findAllByPatientNumberContaining(@Param("patientNumber") String patientNumber, Pageable pageable);

    @Query("SELECT DISTINCT p FROM Operation o " +
            "JOIN o.patient p " +
            "WHERE o.operationNames = :name")
    Page<Patient> findPatientsByOperationTypeName(@Param("name") String name, Pageable pageable);

    @Query("SELECT DISTINCT p FROM Operation o " +
            "JOIN o.patient p " +
            "WHERE o.operationNames LIKE CONCAT('%', :name, '%')")
    Page<Patient> findPatientsByOperationTypeNameContaining(@Param("name") String name, Pageable pageable);

    @Query("SELECT DISTINCT p FROM Operation o " +
            "JOIN o.patient p " +
            "WHERE o.operationNames LIKE CONCAT('%', :name, '%') " +
            "AND (:year IS NULL OR YEAR(p.operationDate) = :year)")
    Page<Patient> findPatientsByOperationTypeNameContainingAndYear(
            @Param("name") String name,
            @Param("year") Integer year,
            Pageable pageable);

    @Query("SELECT DISTINCT p FROM Operation o " +
            "JOIN o.patient p " +
            "WHERE o.operationNames LIKE CONCAT('%', :name, '%') " +
            "AND (:year IS NULL OR YEAR(p.operationDate) = :year) " +
            "AND (:month IS NULL OR MONTH(p.operationDate) = :month)")
    Page<Patient> findPatientsByOperationTypeNameContainingAndYearAndMonth(
            @Param("name") String name,
            @Param("year") Integer year,
            @Param("month") Integer month,
            Pageable pageable);

    @Query("SELECT p FROM Patient p WHERE YEAR(p.operationDate) = :year AND MONTH(p.operationDate) = :month")
    Page<Patient> findPatientsByOperationYearAndMonth(@Param("year") int year, @Param("month") int month, Pageable pageable);

    @Query("SELECT p FROM Patient p WHERE YEAR(p.operationDate) = :year")
    Page<Patient> findPatientsByOperationYear(@Param("year") int year, Pageable pageable);

    @Query("SELECT DISTINCT p FROM Operation o " +
            "JOIN o.patient p " +
            "JOIN o.operationMethods om " +
            "JOIN om.operationType ot " +
            "WHERE YEAR(p.operationDate) = :year " +
            "AND LOWER(ot.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    Page<Patient> findPatientsByYearAndOpNameContaining(
            @Param("year") int year,
            @Param("name") String name,
            Pageable pageable);

}
