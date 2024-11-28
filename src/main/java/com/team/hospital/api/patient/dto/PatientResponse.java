package com.team.hospital.api.patient.dto;

import com.team.hospital.api.patient.Patient;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@Builder
public class PatientResponse {
    private List<PatientOpDTO> patients;
    private PageInfo pageInfo;

    public static PatientResponse toEntity(List<PatientOpDTO> patients, Page<Patient> page) {
        return PatientResponse.builder()
                .patients(patients)
                .pageInfo(PageInfo.toEntity(page))
                .build();
    }
}
