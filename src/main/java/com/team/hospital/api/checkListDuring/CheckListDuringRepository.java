package com.team.hospital.api.checkListDuring;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CheckListDuringRepository extends JpaRepository<CheckListDuring, Long> {

    @Query("SELECT cd From CheckListDuring cd where cd.checkListItem.operation.id = :operationId")
    Optional<CheckListDuring> findByOperationId(@Param("operationId") Long operationId);

}
