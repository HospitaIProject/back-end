package com.team.hospital.api.patient;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {

    boolean existsByPatientNumber(Long patientNumber);
}
