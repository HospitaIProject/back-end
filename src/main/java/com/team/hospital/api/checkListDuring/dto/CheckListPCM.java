package com.team.hospital.api.checkListDuring.dto;

import com.team.hospital.api.checkListDuring.enumType.PainControlMethod;
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
public class CheckListPCM {

    @Enumerated(EnumType.STRING)
    private PainControlMethod painControlMethod;
    private String remarks;

    public static CheckListPCM of(PainControlMethod painControlMethod, String remarks){
        return CheckListPCM.builder().painControlMethod(painControlMethod).remarks(remarks).build();
    }

    public void update(PainControlMethod painControlMethod, String remarks){
        this.painControlMethod = painControlMethod;
        this.remarks = remarks;
    }

    public void update(PainControlMethod painControlMethod){
        this.painControlMethod = painControlMethod;
    }

    public void update(String remarks){
        this.remarks = remarks;
    }
}
