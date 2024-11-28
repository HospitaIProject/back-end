package com.team.hospital.api.operation.dto;

import com.team.hospital.api.checkList.dto.ComplianceScoreDTO;
import com.team.hospital.api.operation.Operation;
import com.team.hospital.api.patient.dto.PatientDTO;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DeleteOperationDTO {

    private OperationDTO operationDTO;
    private PatientDTO patientDTO;
    private Long daysUntilDeletion; //자동 삭제까지 남은 시간
    public static DeleteOperationDTO toEntity(Operation operation, boolean complicationRegistered, double complicationScore, ComplianceScoreDTO complianceScoreDTO){
        return DeleteOperationDTO.builder()
                .operationDTO(OperationDTO.toEntity(operation, complicationRegistered, complicationScore, complianceScoreDTO))
                .patientDTO(PatientDTO.toEntity(operation.getPatient()))
                .daysUntilDeletion(operation.getDaysUntilDeletion())
                .build();
    }
}
