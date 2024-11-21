package com.team.hospital.excel.dto;

import com.team.hospital.api.operation.Operation;
import com.team.hospital.api.operationMethod.OperationMethod;
import com.team.hospital.api.patient.Patient;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
public class PatientToExcelDTO {

    private Long patientId;
    private Long patientNumber;                 // 등록번호
    private String name;                        // 환자 이름
    private LocalDate operationDate;    //수술일

    private String operationMethod;     //수술명
    private Long operationId;

    public static String getOperationMethod(Operation operation) {
        List<OperationMethod> operationMethods = operation.getOperationMethods();

        return operationMethods.stream()
                .map(opm -> opm.getOperationType().getName())//이 부분 숫자 필요
                .collect(Collectors.joining(", "));
    }

    public static PatientToExcelDTO toEntity(Patient patient, Operation operation) {
        return PatientToExcelDTO.builder()
                .patientId(patient.getId())
                .patientNumber(patient.getPatientNumber())
                .name(patient.getName())
                .operationMethod(getOperationMethod(operation))
                .operationDate(patient.getOperationDate())
                .operationId(operation.getId())
                .build();
    }
}
