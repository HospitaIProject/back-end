package com.team.hospital.api.patient;

import com.team.hospital.api.patient.dto.RegisterPatient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;

    @Transactional
    public void join(RegisterPatient registerPatient) {
        if (existsByPatientNumber(registerPatient.getPatientNumber()))
            throw new IllegalArgumentException("이미 있는 회원");
        Patient patient = Patient.buildPatient(registerPatient);
        patientRepository.save(patient);
    }

    public Patient findPatientById(Long patientId) {
        Optional<Patient> user = patientRepository.findById(patientId);
        if (user.isEmpty()) throw new IllegalArgumentException("회원 존재 x");

        return user.get();
    }

    public List<Patient> findAll() {
        return patientRepository.findAll();
    }

    boolean existsByPatientNumber(Long patientNumber) {
        return patientRepository.existsByPatientNumber(patientNumber);
    }
}
