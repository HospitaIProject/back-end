package com.team.hospital.api.patient.dto;

import com.team.hospital.api.patient.Patient;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;

@Getter
@Builder
public class PageInfo {
    private int page;
    private int size;
    private int totalElements;
    private int totalPages;

    public static PageInfo toEntity(Page<Patient> page) {
        return PageInfo.builder()
                .page(page.getNumber() + 1)
                .size(page.getSize())
                .totalElements((int) page.getTotalElements())
                .totalPages(page.getTotalPages())
                .build();

    }
}
