package com.team.hospital.api.checkList.enumType;

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
public class CheckListDetail_4 {

    private float option;

    private String remarks;  // 비고

    public static CheckListDetail_4 buildComplianceDetail(float option, String remarks){
        return CheckListDetail_4.builder().option(option).remarks(remarks).build();
    }

    public void update(float option, String remarks){
        this.option = option;
        this.remarks = remarks;
    }
}
