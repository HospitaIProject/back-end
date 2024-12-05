package com.team.hospital.api.checkList.dto;

import com.team.hospital.api.checkList.CheckList;
import com.team.hospital.api.checkListAfter.dto.CheckListAfterDTO;
import com.team.hospital.api.checkListBefore.dto.CheckListBeforeDTO;
import com.team.hospital.api.checkListDuring.dto.CheckListDuringDTO;
import com.team.hospital.api.operation.dto.OperationDTO;
import com.team.hospital.api.operation.dto.OperationDateDTO;
import com.team.hospital.api.patient.Patient;
import com.team.hospital.api.patient.dto.PatientDTO;
import com.team.hospital.api.patient.enumType.CheckListStatus;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class CheckListOpDate {

    private OperationDateDTO operationDateDTO;
    private List<CheckListDTO> checkListDTOs;
    private CheckListStatus checkListCreatedToday;
    private CheckListBeforeDTO checkListBeforeDTO;
    private CheckListDuringDTO checkListDuringDTO;
    private CheckListAfterDTO checkListAfterDTO;
    private ComplianceScoreDTO complianceScoreDTO;

    public static CheckListOpDate toEntity(
            OperationDTO operationDTO, Patient patient, List<CheckList> checkLists, CheckListStatus checkListStatus,
            CheckListBeforeDTO checkListBeforeDTO, CheckListDuringDTO checkListDuringDTO, CheckListAfterDTO checkListAfterDTO,
            ComplianceScoreDTO complianceScoreDTO) {
        return CheckListOpDate.builder()
                .operationDateDTO(OperationDateDTO.toEntity(operationDTO, PatientDTO.toEntity(patient)))
                .checkListDTOs(checkLists.stream().map(CheckListDTO::toEntity).toList())
                .checkListCreatedToday(checkListStatus)
                .checkListBeforeDTO(checkListBeforeDTO)
                .checkListDuringDTO(checkListDuringDTO)
                .checkListAfterDTO(checkListAfterDTO)
                .complianceScoreDTO(complianceScoreDTO)
                .build();
    }

}
