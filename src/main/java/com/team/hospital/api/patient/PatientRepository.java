package com.team.hospital.api.patient;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PatientRepository extends JpaRepository<Patient, Long> {

    Slice<Patient> findByNameContaining(String name, Pageable pageable);

    @Query("SELECT p FROM Patient p WHERE CAST(p.patientNumber AS string) LIKE CONCAT('%', :patientNumber, '%')")
    Page<Patient> findAllByPatientNumberContaining(@Param("patientNumber") String patientNumber, Pageable pageable);

    boolean existsByPatientNumber(Long patientNumber);
}
