package com.team.hospital.api.patient;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Long> {

    List<Patient> findByNameContaining(String name);

    boolean existsByPatientNumber(Long patientNumber);

}
