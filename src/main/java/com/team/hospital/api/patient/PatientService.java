package com.team.hospital.api.patient;

import com.team.hospital.api.patient.dto.RegisterPatient;
import com.team.hospital.api.patient.exception.PatientAlreadyExistsException;
import com.team.hospital.api.patient.exception.PatientNotFoundException;
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
        if (existsByPatientNumber(registerPatient.getPatientNumber())) throw new PatientAlreadyExistsException();
        Patient patient = Patient.createPatient(registerPatient);
        patientRepository.save(patient);
    }

    @Transactional
    public void modify(RegisterPatient registerPatient, Long patientId) {
        Patient patient = findPatientById(patientId);
        patient.updatePatient(registerPatient);
    }

    @Transactional
    public void delete(Long patientId) {
        Patient patient = findPatientById(patientId);
        patientRepository.delete(patient);
    }

    public Patient findPatientById(Long patientId) {
        Optional<Patient> patient = patientRepository.findById(patientId);
        if (patient.isEmpty()) throw new PatientNotFoundException();
        return patient.get();
    }

    public List<Patient> findAll() {
        return patientRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Patient> findPatientsByName(String name) {
        return patientRepository.findByNameContaining(name);
    }

    boolean existsByPatientNumber(Long patientNumber) {
        return patientRepository.existsByPatientNumber(patientNumber);
    }
}
