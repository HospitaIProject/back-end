package com.team.hospital.api.checkListItemDefault;

import com.team.hospital.api.operation.enumType.OperationMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CheckListItemDefaultRepository extends JpaRepository<CheckListItemDefault, Long> {

    CheckListItemDefault findByOperationMethod(OperationMethod operationMethod);

    boolean existsByOperationMethod(OperationMethod operationMethod);
}
