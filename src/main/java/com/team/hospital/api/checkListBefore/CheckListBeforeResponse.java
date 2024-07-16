package com.team.hospital.api.checkListBefore;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CheckListBeforeResponse {

    private CheckListBeforeDTO checkListBeforeDTO;

    public static CheckListBeforeResponse toEntity(CheckListBeforeDTO checkListBeforeDTO){
        return CheckListBeforeResponse.builder()
                .checkListBeforeDTO(checkListBeforeDTO)
                .build();

    }
}
