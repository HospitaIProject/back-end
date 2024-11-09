package com.team.hospital.api.checkListAfter.dto;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class UpdateDateCheckListAfter {
    private LocalDate jpDrainRemovalDate;
    private LocalDate catheterRemovalDate;
}
