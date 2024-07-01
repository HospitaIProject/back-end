package com.team.hospital.api.check.enumType;

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
public class ComplianceDetail_3 {

    @Enumerated(EnumType.STRING)
    private PainScore option;

    private String remarks;  // 비고

    public static ComplianceDetail_3 buildComplianceDetail(PainScore option, String remarks){
        return ComplianceDetail_3.builder().option(option).remarks(remarks).build();
    }

    public void update(PainScore option, String remarks){
        this.option = option;
        this.remarks = remarks;
    }
}
