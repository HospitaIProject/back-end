package com.team.hospital.api.complication;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface ComplicationRepository extends JpaRepository<Complication, Long> {

    @Query("SELECT cl From Complication cl where cl.operation.id = :operationId")
    Optional<Complication> findByOperationId(@Param("operationId") Long operationId);
}
