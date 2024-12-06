package com.team.hospital.api.patient.dto;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@Builder
public class PatientResponse {
    private List<PatientOpDTO> patients;
    private PageInfo pageInfo;

    public static PatientResponse toEntity(List<PatientOpDTO> patients, Page<PatientOpDTO> page) {
        return PatientResponse.builder()
                .patients(patients)
                .pageInfo(PageInfo.toEntity(page))
                .build();
    }
}
