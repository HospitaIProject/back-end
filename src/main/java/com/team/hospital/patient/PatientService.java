package com.team.hospital.patient;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;

    public Patient findUserById(Long userId){
        Optional<Patient> user = patientRepository.findById(userId);
        if (user.isEmpty())
            throw new IllegalArgumentException("회원 존재 x");
        return user.get();
    }

    @Transactional
    public void join(){
        Patient patient = Patient.builder()
                .name("test")
                .build();

        patientRepository.save(patient);
    }
}
