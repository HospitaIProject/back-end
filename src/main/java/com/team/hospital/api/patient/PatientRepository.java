package com.team.hospital.api.patient;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Long> {

    List<Patient> findByNameContaining(String name);

    List<Patient> findByPatientNumber(Long patientNumber);

    boolean existsByPatientNumber(Long patientNumber);
}
