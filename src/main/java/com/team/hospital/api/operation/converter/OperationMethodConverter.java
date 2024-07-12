package com.team.hospital.api.operation.converter;

import com.team.hospital.api.operation.enumType.OperationMethod;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class OperationMethodConverter extends GenericEnumListConverter<OperationMethod> {

    public OperationMethodConverter() {
        super(OperationMethod.class);
    }
}
