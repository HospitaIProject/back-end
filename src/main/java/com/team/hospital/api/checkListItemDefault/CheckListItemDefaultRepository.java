package com.team.hospital.api.checkListItemDefault;

import com.team.hospital.api.operationType.OperationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CheckListItemDefaultRepository extends JpaRepository<CheckListItemDefault, Long> {

    CheckListItemDefault findByOperationType(OperationType operationType);

    boolean existsByOperationType(OperationType operationType);
}
