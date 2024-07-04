package com.team.hospital.api.operation;

import com.team.hospital.api.patient.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OperationRepository extends JpaRepository<Operation, Long>  {

    List<Operation> findAllByPatient(Patient patient);
}
