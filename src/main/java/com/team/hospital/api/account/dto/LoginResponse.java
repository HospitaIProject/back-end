package com.team.hospital.api.account.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class LoginResponse {
    private TokenDTO tokenDTO;

    public static LoginResponse toEntity(TokenDTO tokenDTO){
        return LoginResponse.builder()
                .tokenDTO(tokenDTO)
                .build();
    }
}
