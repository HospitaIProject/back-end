package com.team.hospital.api.checkList.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CheckListResponse {
    private CheckListDTO checkListDTO;

    public static CheckListResponse toEntity(CheckListDTO checkListDTO){
        return CheckListResponse.builder()
                .checkListDTO(checkListDTO)
                .build();
    }
}
