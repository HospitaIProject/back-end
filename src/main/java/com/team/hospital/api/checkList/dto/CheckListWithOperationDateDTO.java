package com.team.hospital.api.checkList.dto;

import com.team.hospital.api.checkList.CheckList;
import com.team.hospital.api.checkListAfter.dto.CheckListAfterDTO;
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
    private CheckListAfterDTO checkListAfterDTO;
    private boolean checkListCreatedToday;
    private ComplianceScoreDTO complianceScoreDTO;

    public static CheckListWithOperationDateDTO toEntity(List<CheckList> checkLists, OperationDTO operationDTO, CheckListBeforeDTO checkListBeforeDTO, CheckListDuringDTO checkListDuringDTO, CheckListAfterDTO checkListAfterDTO, Patient patient, boolean checkListCreatedToday, ComplianceScoreDTO complianceScoreDTO) {
        return CheckListWithOperationDateDTO.builder()
                .checkListDTOs(checkLists.stream().map(CheckListDTO::toEntity).toList())
                .operationDateDTO(OperationDateDTO.toEntity(operationDTO, PatientDTO.toEntity(patient)))
                .checkListBeforeDTO(checkListBeforeDTO)
                .checkListDuringDTO(checkListDuringDTO)
                .checkListAfterDTO(checkListAfterDTO)
                .checkListCreatedToday(checkListCreatedToday)
                .complianceScoreDTO(complianceScoreDTO)
                .build();
    }

    public static CheckListWithOperationDateDTO toEntity(OperationDTO operationDTO, CheckListBeforeDTO checkListBeforeDTO, CheckListDuringDTO checkListDuringDTO, CheckListAfterDTO checkListAfterDTO, Patient patient, boolean checkListCreatedToday, ComplianceScoreDTO complianceScoreDTO) {
        return CheckListWithOperationDateDTO.builder()
                .operationDateDTO(OperationDateDTO.toEntity(operationDTO, PatientDTO.toEntity(patient)))
                .checkListBeforeDTO(checkListBeforeDTO)
                .checkListDuringDTO(checkListDuringDTO)
                .checkListAfterDTO(checkListAfterDTO)
                .checkListCreatedToday(checkListCreatedToday)
                .complianceScoreDTO(complianceScoreDTO)
                .build();
    }
}
