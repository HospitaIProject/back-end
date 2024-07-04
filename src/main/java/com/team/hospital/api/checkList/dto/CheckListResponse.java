package com.team.hospital.api.checkList.dto;

import com.team.hospital.api.operation.dto.OperationDTO;
import com.team.hospital.api.operation.dto.OperationResponse;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CheckListResponse {
    private CheckListDTO checkListDTO;

    public static CheckListResponse buildCheckListResponse(CheckListDTO checkListDTO){
        return CheckListResponse.builder()
                .checkListDTO(checkListDTO)
                .build();
    }
}
