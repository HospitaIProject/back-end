package com.team.hospital.api.patient.repository;

import com.team.hospital.api.patient.Patient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

public interface PatientRepositoryCustom {
    Page<Patient> findByYear(@Param("year") int year, Pageable pageable);
    Page<Patient> findByYearAndMonth(@Param("year") int year, @Param("month") int month, Pageable pageable);
    Page<Patient> findPatientsByYearAndOpNameContaining(@Param("year") int year, @Param("name") String name, Pageable pageable);
}
