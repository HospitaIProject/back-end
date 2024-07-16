package com.team.hospital.api.checkListBefore;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CheckListBeforeRepository extends JpaRepository<CheckListBefore, Long> {

    @Query("SELECT cb From CheckListBefore cb where cb.checkListItem.operation.id = :operationId")
    Optional<CheckListBefore> findByOperationId(@Param("operationId") Long operationId);
}
