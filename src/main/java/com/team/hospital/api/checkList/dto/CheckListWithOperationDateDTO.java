package com.team.hospital.api.checkList.dto;

import com.team.hospital.api.checkList.CheckList;
import com.team.hospital.api.checkListBefore.dto.CheckListBeforeDTO;
import com.team.hospital.api.checkListDuring.dto.CheckListDuringDTO;
import com.team.hospital.api.operation.dto.OperationDTO;
import com.team.hospital.api.operation.dto.OperationDateDTO;
import com.team.hospital.api.patient.Patient;
import com.team.hospital.api.patient.dto.PatientDTO;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class CheckListWithOperationDateDTO {

    private List<CheckListDTO> checkListDTOs;
    private OperationDateDTO operationDateDTO;
    private CheckListBeforeDTO checkListBeforeDTO;
    private CheckListDuringDTO checkListDuringDTO;
    private boolean checkListCreatedToday;

    public static CheckListWithOperationDateDTO toEntity(List<CheckList> checkLists, OperationDTO operationDTO, Patient patient, boolean checkListCreatedToday) {
        return CheckListWithOperationDateDTO.builder()
                .checkListDTOs(checkLists.stream().map(CheckListDTO::toEntity).toList())
                .operationDateDTO(OperationDateDTO.toEntity(operationDTO, PatientDTO.createPatientDTO(patient)))
                .checkListCreatedToday(checkListCreatedToday)
                .build();
    }

    public static CheckListWithOperationDateDTO toEntity(List<CheckList> checkLists, OperationDTO operationDTO, CheckListBeforeDTO checkListBeforeDTO, CheckListDuringDTO checkListDuringDTO, Patient patient, boolean checkListCreatedToday) {
        return CheckListWithOperationDateDTO.builder()
                .checkListDTOs(checkLists.stream().map(CheckListDTO::toEntity).toList())
                .operationDateDTO(OperationDateDTO.toEntity(operationDTO, PatientDTO.createPatientDTO(patient)))
                .checkListBeforeDTO(checkListBeforeDTO)
                .checkListDuringDTO(checkListDuringDTO)
                .checkListCreatedToday(checkListCreatedToday)
                .build();
    }
}
