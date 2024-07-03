package com.team.hospital.api.check;

import com.team.hospital.api.patient.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CheckListRepository extends JpaRepository<CheckList, Long> {

    List<CheckList> findAllByPatient(Patient patient);

}
