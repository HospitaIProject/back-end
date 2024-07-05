package com.team.hospital.api.checkListItem;

import com.team.hospital.api.operation.Operation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CheckListItemRepository extends JpaRepository<CheckListItem, Long> {

    Optional<CheckListItem> findCheckListItemByOperation(Operation operation);
}
