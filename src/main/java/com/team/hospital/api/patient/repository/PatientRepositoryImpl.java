package com.team.hospital.api.patient.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.team.hospital.api.patient.Patient;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static com.team.hospital.api.operation.QOperation.operation;
import static com.team.hospital.api.operationMethod.QOperationMethod.operationMethod;
import static com.team.hospital.api.operationType.QOperationType.operationType;
import static com.team.hospital.api.patient.QPatient.patient;

@RequiredArgsConstructor
public class PatientRepositoryImpl implements PatientRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<Patient> findByYear(int year, Pageable pageable) {
        List<Patient> patients = queryFactory
                .selectFrom(patient)  // Q 클래스에서 selectFrom 사용
                .where(patient.operationDate.year().eq(year))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long total = Optional.ofNullable(queryFactory
                        .select(patient.id.countDistinct())
                        .from(patient)
                        .where(patient.operationDate.year().eq(year))
                        .fetchOne())
                .orElse(0L);

        return new PageImpl<>(patients, pageable, total);
    }

    @Override
    public Page<Patient> findByYearAndMonth(int year, int month, Pageable pageable) {
        // 해당 연도와 월의 시작일과 종료일 계산
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        // QueryDSL 쿼리 작성
        List<Patient> patients = queryFactory.selectFrom(patient)
                .where(patient.operationDate.between(startDate, endDate))  // 범위 쿼리 적용
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        // 총 개수 조회 (Page 객체 생성을 위해)
        long total = Optional.ofNullable(queryFactory
                        .select(patient.id.count())
                        .from(patient)
                        .where(patient.operationDate.between(startDate, endDate))  // 동일한 범위 조건 적용
                        .fetchOne())
                .orElse(0L);

        return new PageImpl<>(patients, pageable, total);
    }

    @Override
    public Page<Patient> findPatientsByYearAndOpNameContaining(int year, String name, Pageable pageable) {
        // QueryDSL 쿼리 작성
        List<Patient> patients = queryFactory.selectDistinct(patient)
                .from(operation)
                .join(operation.patient, patient)
                .join(operation.operationMethods, operationMethod)
                .join(operationMethod.operationType, operationType)
                .where(
                        patient.operationDate.year().eq(year)
                                .and(operationType.name.containsIgnoreCase(name))  // ESCAPE 처리 없이 검색
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        // 총 개수 조회 (Page 객체 생성을 위해)
        Long total = Optional.ofNullable(queryFactory
                        .select(patient.id.countDistinct())
                        .from(operation)
                        .join(operation.patient, patient)
                        .join(operation.operationMethods, operationMethod)
                        .join(operationMethod.operationType, operationType)
                        .where(
                                patient.operationDate.year().eq(year)
                                        .and(operationType.name.containsIgnoreCase(name))  // ESCAPE 없이 처리
                        )
                        .fetchOne())
                .orElse(0L);

        return new PageImpl<>(patients, pageable, total);
    }
}
