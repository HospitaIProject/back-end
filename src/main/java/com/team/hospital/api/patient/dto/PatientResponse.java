package com.team.hospital.api.patient.dto;

import lombok.*;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor // 전체 매개변수 생성자
@NoArgsConstructor
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
