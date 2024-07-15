package com.team.hospital.api.account.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateAccountRequest {
    private String adminID;
    private String adminPW;
}
