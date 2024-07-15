package com.team.hospital.api.account.dto;

import lombok.Getter;

@Getter
public class CreateAccountRequest {
    private String adminID;
    private String adminPW;
}
