package com.team.hospital.api.checkList.dto;

import com.team.hospital.api.checkList.CheckList;
import com.team.hospital.api.operation.dto.OperationDTO;
import com.team.hospital.api.operation.dto.OperationDateDTO;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class CheckListWithOperationDateDTO {

    private List<CheckListDTO> checkListDTOs;
    private OperationDateDTO operationDateDTO;
    private boolean checkListCreatedToday;

    public static CheckListWithOperationDateDTO toEntity(List<CheckList> checkLists, OperationDTO operationDTO, boolean checkListCreatedToday) {
        return CheckListWithOperationDateDTO.builder()
                .checkListDTOs(checkLists.stream().map(CheckListDTO::toEntity).toList())
                .operationDateDTO(OperationDateDTO.toEntity(operationDTO))
                .checkListCreatedToday(checkListCreatedToday)
                .build();
    }
}
