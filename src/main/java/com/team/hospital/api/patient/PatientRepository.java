package com.team.hospital.api.patient;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {

//    List<Patient> findByNameContaining(String name);

    Slice<Patient> findByNameContaining(String name, Pageable pageable);

//    List<Patient> findByPatientNumber(Long patientNumber);

    boolean existsByPatientNumber(Long patientNumber);
}
