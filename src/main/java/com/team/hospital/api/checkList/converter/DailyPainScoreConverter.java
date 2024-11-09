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
        String day = dailyPainScore.getDay() == null ? "" : String.valueOf(dailyPainScore.getDay());
        String evening = dailyPainScore.getEvening() == null ? "" : String.valueOf(dailyPainScore.getEvening());
        String night = dailyPainScore.getNight() == null ? "" : String.valueOf(dailyPainScore.getNight());

        return day + SPLIT_CHAR + evening + SPLIT_CHAR + night;
    }

    @Override
    public DailyPainScore convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isEmpty()) {
            return null;
        }

        String[] parts = dbData.split(SPLIT_CHAR, -1); // -1을 추가하여 빈 문자열도 배열에 포함

        if (parts.length != 3) {
            throw new IllegalArgumentException("Invalid DailyPainScore value: " + dbData);
        }

        Integer day = parts[0].isEmpty() ? null : Integer.parseInt(parts[0]);
        Integer evening = parts[1].isEmpty() ? null : Integer.parseInt(parts[1]);
        Integer night = parts[2].isEmpty() ? null : Integer.parseInt(parts[2]);

        return new DailyPainScore(day, evening, night);
    }
}