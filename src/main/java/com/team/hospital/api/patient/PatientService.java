package com.team.hospital.api.patient;

import com.team.hospital.api.patient.dto.RegisterPatient;
import com.team.hospital.api.patient.exception.PatientAlreadyExistsException;
import com.team.hospital.api.patient.exception.PatientNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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

    public List<Patient> findAll() {
        return patientRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Slice<Patient> findPatientsByName(String query, Pageable pageable) {
        return patientRepository.findByNameContaining(query, pageable);
    }

    public Slice<Patient> findPatientsByPatientNumber(Long patientNumber, Pageable pageable) {
        List<Patient> all = findAll();
        List<Patient> patients = new ArrayList<>();
        for (Patient patient : all) {
            if (patient.getPatientNumber().toString().contains(patientNumber.toString()))
                patients.add(patient);
        }

        int pageSize = pageable.getPageSize();
        int currentPage = pageable.getPageNumber();
        int start = currentPage * pageSize;
        int end = Math.min(start + pageSize, patients.size());

        List<Patient> pageContent = patients.subList(start, end);
        boolean hasNext = patients.size() > end;

        return new SliceImpl<>(pageContent, pageable, hasNext);
    }

    public Slice<Patient> findAll(Pageable pageable) {
        return patientRepository.findAll(pageable);
    }

    public Patient findPatientById(Long patientId) {
        Optional<Patient> patient = patientRepository.findById(patientId);
        if (patient.isEmpty()) throw new PatientNotFoundException();
        return patient.get();
    }

    boolean existsByPatientNumber(Long patientNumber) {
        return patientRepository.existsByPatientNumber(patientNumber);
    }
}
