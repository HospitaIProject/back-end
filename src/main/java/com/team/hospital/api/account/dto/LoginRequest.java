package com.team.hospital.api.account.dto;

import lombok.Getter;

@Getter
public class LoginRequest {
    private String adminID;
    private String adminPW;
}
