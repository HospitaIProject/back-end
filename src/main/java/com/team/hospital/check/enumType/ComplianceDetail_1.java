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
public class ComplianceDetail_1 {

    @Enumerated(EnumType.STRING)
    private BooleanOption option;

    private String remarks;  // 비고

    public static ComplianceDetail_1 buildComplianceDetail(BooleanOption option, String remarks){
        return ComplianceDetail_1.builder().option(option).remarks(remarks).build();
    }

    public void update(BooleanOption option, String remarks){
        this.option = option;
        this.remarks = remarks;
    }
}
