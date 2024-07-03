package com.team.hospital.api.patient;

import com.team.hospital.api.base.BaseEntity;
import com.team.hospital.api.patient.dto.RegisterPatient;
import com.team.hospital.api.patient.enumType.Sex;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Patient extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patient_id")
    private Long id;

    private Long patientNumber;

    private String name;

    @Enumerated(EnumType.STRING)
    private Sex sex;

    private int age;

    private float height;

    private float weight;

    private float BMI;

    public static Patient buildPatient(RegisterPatient registerPatient) {
        return Patient.builder()
                .patientNumber(registerPatient.getPatientNumber())
                .name(registerPatient.getName())
                .sex(registerPatient.getSex())
                .age(registerPatient.getAge())
                .build();
    }
}
