package com.team.hospital.api.patient.dto;

import com.team.hospital.api.patient.enumType.Sex;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class RegisterPatient {

    private Long patientNumber;

    private String name;

    private Sex sex;

    private LocalDate birthday;

}
