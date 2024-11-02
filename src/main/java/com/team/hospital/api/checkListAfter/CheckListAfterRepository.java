package com.team.hospital.api.checkListAfter;

import com.team.hospital.api.checkListItem.CheckListItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CheckListAfterRepository extends JpaRepository<CheckListAfter, Long> {

    @Query("SELECT ca From CheckListAfter ca where ca.checkListItem.operation.id = :operationId")
    Optional<CheckListAfter> findByOperationId(@Param("operationId") Long operationId);

    @Query("SELECT COUNT(ca) > 0 FROM CheckListAfter ca where ca.checkListItem.operation.id = :operationId")
    boolean existsByOperationId(@Param("operationId") Long operationId);

    boolean existsByCheckListItemId(Long checkListItemId);
    CheckListAfter findCheckListAfterByCheckListItem(CheckListItem checkListItem);

}
