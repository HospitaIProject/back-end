package com.team.hospital.api.complication.dto;

import com.team.hospital.api.complication.enumType.CDClassification;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomComplication {

    private String complicationName;

    @Enumerated(EnumType.STRING)
    private CDClassification cdClassification;
}
