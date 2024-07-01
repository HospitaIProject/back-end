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
public class ComplianceDetail_2 {

    @Enumerated(EnumType.STRING)
    private Pod option;

    private String remarks;  // 비고

    public static ComplianceDetail_2 buildComplianceDetail(Pod option, String remarks){
        return ComplianceDetail_2.builder().option(option).remarks(remarks).build();
    }

    public void update(Pod option, String remarks){
        this.option = option;
        this.remarks = remarks;
    }
}
