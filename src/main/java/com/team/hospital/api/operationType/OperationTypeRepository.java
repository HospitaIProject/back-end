package com.team.hospital.api.operationType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OperationTypeRepository extends JpaRepository<OperationType, Long> {
    @Query("SELECT o FROM OperationType o WHERE o.name = :name AND o.deleted = false")
    Optional<OperationType> findByName(@Param("name") String name);

    @Query("SELECT o FROM OperationType o WHERE o.deleted = false")
    List<OperationType> findAllActive();

    @Query("SELECT o FROM OperationType o WHERE o.name = :name")
    Optional<OperationType> findByNameIncludingDeleted(@Param("name") String name);

}
