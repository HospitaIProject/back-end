package com.team.hospital.api.checkList.enumType;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DailyPainScore {
    private int day;
    private int evening;
    private int night;
}
