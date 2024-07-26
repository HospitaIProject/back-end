package com.team.hospital.api.checkListAfter.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CheckListAfterResponse {

    private CheckListAfterDTO checkListAfterDTO;

    public static CheckListAfterResponse toEntity(CheckListAfterDTO checkListAfterDTO) {
        return CheckListAfterResponse.builder()
                .checkListAfterDTO(checkListAfterDTO)
                .build();
    }
}
