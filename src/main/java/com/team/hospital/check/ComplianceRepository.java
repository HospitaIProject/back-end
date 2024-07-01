package com.team.hospital.check;

import com.team.hospital.patient.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplianceRepository extends JpaRepository<Compliance, Long> {

    List<Compliance> findAllByPatient(Patient patient);

}
