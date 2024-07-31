package com.team.hospital.api.checkListItem;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CheckListItemRepository extends JpaRepository<CheckListItem, Long> {
    Optional<CheckListItem> findCheckListItemByOperationId(Long operationId);

    CheckListItem findByOperationId(Long operationId);
}
