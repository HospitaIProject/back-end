package com.team.hospital.api.checkListDuring.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CheckListDuringResponse {

    private CheckListDuringDTO checkListDuringDTO;

    public static CheckListDuringResponse toEntity(CheckListDuringDTO checkListDuringDTO){
        return CheckListDuringResponse.builder()
                .checkListDuringDTO(checkListDuringDTO)
                .build();

    }
}
