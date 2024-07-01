package com.team.hospital.api.check.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ComplianceResponse {
    private ComplianceDTO complianceDTO;
}
