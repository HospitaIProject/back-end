package com.team.hospital.excel.dto;

import com.team.hospital.api.operation.Operation;
import com.team.hospital.api.operationMethod.dto.OpmDTO;
import com.team.hospital.api.patient.Patient;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
public class PatientToExcelDTO {

    private Long patientId;
    private Long patientNumber;                 // 등록번호
    private String name;                        // 환자 이름
    private LocalDate operationDate;    //수술일

    private List<String> operationTypeNames;     //수술명
    private Long operationId;

    public static List<String> getOperationMethod(OpmDTO opmDTO) {
        return opmDTO.getOperationTypeNames();
    }

    public static PatientToExcelDTO toEntity(Patient patient, Operation operation, OpmDTO opmDTO) {
        return PatientToExcelDTO.builder()
                .patientId(patient.getId())
                .patientNumber(patient.getPatientNumber())
                .name(patient.getName())
                .operationTypeNames(getOperationMethod(opmDTO))
                .operationDate(patient.getOperationDate())
                .operationId(operation.getId())
                .build();
    }
}
