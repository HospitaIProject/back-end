package com.team.hospital.api.checkList.enumType;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DailyPainScore {
    private Integer day;
    private Integer evening;
    private Integer night;
}
