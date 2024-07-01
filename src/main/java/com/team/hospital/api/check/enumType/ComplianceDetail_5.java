package com.team.hospital.api.check.enumType;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ComplianceDetail_5 {

    private String option;

    private String remarks;  // 비고

    public static ComplianceDetail_5 buildComplianceDetail(String option, String remarks){
        return ComplianceDetail_5.builder().option(option).remarks(remarks).build();
    }

    public void update(String option, String remarks){
        this.option = option;
        this.remarks = remarks;
    }
}
