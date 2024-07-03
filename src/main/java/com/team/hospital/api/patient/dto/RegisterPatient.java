package com.team.hospital.api.patient.dto;

import com.team.hospital.api.patient.enumType.Sex;
import lombok.Getter;

import java.util.Date;

@Getter
public class RegisterPatient {

    private Long patientNumber;

    private String name;

    private Sex sex;

    private int age;

}
