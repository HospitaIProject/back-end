package com.team.hospital.check.enumType;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ComplianceDetail_4 {

    private float option;

    private String remarks;  // 비고

    public static ComplianceDetail_4 buildComplianceDetail(float option, String remarks){
        return ComplianceDetail_4.builder().option(option).remarks(remarks).build();
    }
}