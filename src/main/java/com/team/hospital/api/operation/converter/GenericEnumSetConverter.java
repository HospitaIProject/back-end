package com.team.hospital.api.operation.converter;

import jakarta.persistence.AttributeConverter;

import java.util.EnumSet;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public abstract class GenericEnumSetConverter<E extends Enum<E>> implements AttributeConverter<Set<E>, String> {

    private final Class<E> enumClass;
    private static final String SPLIT_CHAR = ", ";

    public GenericEnumSetConverter(Class<E> enumClass) {
        this.enumClass = enumClass;
    }

    @Override
    public String convertToDatabaseColumn(Set<E> enumSet) {
        if (enumSet == null || enumSet.isEmpty()) {
            return "";
        }
        return enumSet.stream()
                .map(Enum::name)
                .collect(Collectors.joining(SPLIT_CHAR));
    }

    @Override
    public Set<E> convertToEntityAttribute(String enumString) {
        if (enumString == null || enumString.isEmpty()) {
            return EnumSet.noneOf(enumClass);
        }
        return Stream.of(enumString.split(SPLIT_CHAR))
                .map(name -> Enum.valueOf(enumClass, name))
                .collect(Collectors.toCollection(() -> EnumSet.noneOf(enumClass)));
    }
}
