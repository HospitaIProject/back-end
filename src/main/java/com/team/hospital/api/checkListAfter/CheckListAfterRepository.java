package com.team.hospital.api.checkListAfter;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CheckListAfterRepository extends JpaRepository<CheckListAfter, Long> {

    @Query("SELECT ca From CheckListAfter ca where ca.checkListItem.operation.id = :operationId")
    Optional<CheckListAfter> findByOperationId(@Param("operationId") Long operationId);

    boolean existsByCheckListItemId(Long checkListItemId);
}
