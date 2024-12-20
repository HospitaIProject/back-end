package com.team.hospital.api.patient;

import com.team.hospital.api.patient.dto.RegisterPatient;
import com.team.hospital.api.patient.exception.PatientAlreadyExistsException;
import com.team.hospital.api.patient.exception.PatientNotFoundException;
import com.team.hospital.api.patient.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;

    @Transactional
    public void save(RegisterPatient registerPatient) {
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

    public Page<Patient> findAll(Pageable pageable) {
        return patientRepository.findAll(pageable);
    }

    public List<Patient> findAll() {
        return patientRepository.findAll();
    }

    public List<Patient> findAllByLocalDate(LocalDate startDate, LocalDate endDate) {
        return patientRepository.findAllByLocalDate(startDate, endDate);
    }

    public Page<Patient> findPatientsByOperationYear(int year, Pageable pageable) {
        if (year <= 0) throw new IllegalArgumentException("올바른 년을 입력해주십시오");
        return patientRepository.findPatientsByOperationYear(year, pageable);
    }

    public List<Patient> findPatientsByOperationYear(int year) {
        if (year <= 0) throw new IllegalArgumentException("올바른 년을 입력해주십시오");
        return patientRepository.findPatientsByOperationYear(year);
    }

    public Page<Patient> findPatientsByOperationYearAndMonth(int year, int month, Pageable pageable) {
        if (year <= 0 || month <= 0 || month > 12) throw new IllegalArgumentException("올바른 년도와 월을 입력해주십시오");
        return patientRepository.findPatientsByOperationYearAndMonth(year, month, pageable);
    }

    public List<Patient> findPatientsByOperationYearAndMonth(int year, int month) {
        if (year <= 0 || month <= 0 || month > 12) throw new IllegalArgumentException("올바른 년도와 월을 입력해주십시오");
        return patientRepository.findPatientsByOperationYearAndMonth(year, month);
    }

    public Page<Patient> findPatientsByOperationTypeNameContaining(String operationName, Pageable pageable) {
        System.out.println("실행");
        return patientRepository.findPatientsByOperationTypeNameContaining(operationName, pageable);
    }

    public List<Patient> findPatientsByOperationTypeNameContaining(String operationName) {
        System.out.println("실행");
        return patientRepository.findPatientsByOperationTypeNameContaining(operationName);
    }

    public Page<Patient> findPatientsByOperationTypeNameContainingAndYear(String operationName, Integer year, Pageable pageable) {
        return patientRepository.findPatientsByOperationTypeNameContainingAndYear(operationName, year, pageable);
    }

    public List<Patient> findPatientsByOperationTypeNameContainingAndYear(String operationName, Integer year) {
        return patientRepository.findPatientsByOperationTypeNameContainingAndYear(operationName, year);
    }

    public Page<Patient> findPatientsByOperationTypeNameContainingAndYearAndMonth(String operationName, Integer year, Integer month, Pageable pageable) {
        return patientRepository.findPatientsByOperationTypeNameContainingAndYearAndMonth(operationName, year, month, pageable);
    }

    public List<Patient> findPatientsByOperationTypeNameContainingAndYearAndMonth(String operationName, Integer year, Integer month) {
        return patientRepository.findPatientsByOperationTypeNameContainingAndYearAndMonth(operationName, year, month);
    }

    boolean existsByPatientNumber(Long patientNumber) {
        return patientRepository.existsByPatientNumber(patientNumber);
    }
}
