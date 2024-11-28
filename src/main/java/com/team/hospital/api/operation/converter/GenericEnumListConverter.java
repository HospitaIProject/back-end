package com.team.hospital.api.operation.converter;

import jakarta.persistence.AttributeConverter;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public abstract class GenericEnumListConverter<E extends Enum<E>> implements AttributeConverter<List<E>, String> {

    private final Class<E> enumClass;
    private static final String SPLIT_CHAR = ", ";

    public GenericEnumListConverter(Class<E> enumClass) {
        this.enumClass = enumClass;
    }

    @Override
    public String convertToDatabaseColumn(List<E> enumList) {
        if (enumList == null || enumList.isEmpty()) {
            return "";
        }
        return enumList.stream()
                .map(Enum::name)
                .collect(Collectors.joining(SPLIT_CHAR));
    }

    @Override
    public List<E> convertToEntityAttribute(String enumString) {
        if (enumString == null || enumString.isEmpty()) {
            return List.of(); // 빈 리스트 반환
        }
        return Arrays.stream(enumString.split(SPLIT_CHAR))
                .map(name -> Enum.valueOf(enumClass, name))
                .collect(Collectors.toList());
    }
}
