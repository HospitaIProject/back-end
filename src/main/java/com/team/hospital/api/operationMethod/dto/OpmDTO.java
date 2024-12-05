package com.team.hospital.api.operationMethod.dto;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.util.Arrays;
import java.util.List;

@Data
@ToString
public class OpmDTO {

    private List<String> operationTypeNames;        // 수술 방법

    @Builder
    public OpmDTO(String operationTypeNames) {

        List<String> list;
        if (operationTypeNames!=null) {
            list = Arrays.asList(operationTypeNames.split(", "));

        } else {
            list = List.of("테스트", "수술", "입니다");
        }

        this.operationTypeNames = list;
    }
}
