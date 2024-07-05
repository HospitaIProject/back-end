package com.team.hospital.api.checkListItem.dto;

import com.team.hospital.api.checkListItem.CheckListItem;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CheckListItemResponse {

    private CheckListItemDTO checkListItemDTO;

    public static CheckListItemResponse toEntity(CheckListItemDTO checkListItemDTO){
        return CheckListItemResponse.builder()
                .checkListItemDTO(checkListItemDTO)
                .build();
    }
}
