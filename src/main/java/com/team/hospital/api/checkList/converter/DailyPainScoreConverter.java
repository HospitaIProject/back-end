package com.team.hospital.api.checkList.converter;

import com.team.hospital.api.checkList.enumType.DailyPainScore;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class DailyPainScoreConverter implements AttributeConverter<DailyPainScore, String> {

    private static final String SPLIT_CHAR = ", ";

    @Override
    public String convertToDatabaseColumn(DailyPainScore dailyPainScore) {
        if (dailyPainScore == null) {
            return null;
        }
        return dailyPainScore.getDay() + SPLIT_CHAR +
                dailyPainScore.getEvening() + SPLIT_CHAR +
                dailyPainScore.getNight();
    }

    @Override
    public DailyPainScore convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isEmpty()) {
            return null;
        }

        String[] parts = dbData.split(SPLIT_CHAR);
        if (parts.length != 3) {
            throw new IllegalArgumentException("Invalid DailyPainScore value: " + dbData);
        }

        return new DailyPainScore(Integer.parseInt(parts[0]), Integer.parseInt(parts[1]), Integer.parseInt(parts[2]));
    }
}