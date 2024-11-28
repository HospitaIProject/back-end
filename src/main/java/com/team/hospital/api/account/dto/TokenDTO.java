package com.team.hospital.api.account.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class TokenDTO {
    private String accessToken;

    public static TokenDTO toEntity(String accessToken){
        return TokenDTO.builder()
                .accessToken(accessToken)
                .build();
    }
}
