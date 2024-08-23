package com.team.hospital.api.operationMethod;

import com.team.hospital.api.base.BaseEntity;
import com.team.hospital.api.operationType.OperationType;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class OperationMethod extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "operation_method_id")
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "operation_type_id")
    private OperationType operationType;

    public static List<OperationMethod> toEntity(List<String> operationMethodNames) {
        return operationMethodNames.stream()
                .map(OperationMethod::toEntity)
                .toList();
    }

    public static OperationMethod toEntity(String operationTypeName) {
        return OperationMethod.builder()
                .operationType(OperationType.toEntity(operationTypeName))
                .build();
    }

}