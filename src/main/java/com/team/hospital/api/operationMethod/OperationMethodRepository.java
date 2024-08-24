package com.team.hospital.api.operationMethod;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OperationMethodRepository extends JpaRepository<OperationMethod, Long> {
    // 기본 CRUD 메서드는 JpaRepository에서 제공됩니다.
    // 필요한 경우 추가적인 쿼리 메서드를 정의할 수 있습니다.
    Optional<OperationMethod> findByOperationTypeId(Long operationTypeId);
}