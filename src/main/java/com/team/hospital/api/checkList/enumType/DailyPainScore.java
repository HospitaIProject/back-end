package com.team.hospital.api.checkList.enumType;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DailyPainScore {
    private int morning;
    private int afternoon;
    private int evening;
}
