package com.team.hospital.api.operation.dto;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class QueryRepository {
    private final EntityManager em;

    public List<OpDto> findAllOpDto() {
        return em.createQuery(
                        "select new com.team.hospital.api.operation.dto.OpDto(o.id, o.operationNames, p.operationDate, p.hospitalizedDate, p.dischargedDate, o.createdAt) " +
                                " from Operation o" +
                                " join o.patient p"
                        , OpDto.class)
                .getResultList();
    }

    public List<OpDto> findAllOpDtoByPatientId(Long patientId) {
        return em.createQuery(
                        "select new com.team.hospital.api.operation.dto.OpDto(o.id, o.operationNames, o.patient.operationDate, " +
                                "o.patient.hospitalizedDate, o.patient.dischargedDate, o.createdAt) " +
                                "from Operation o " +
                                "where o.patient.id = :patientId " +
                                "order by o.createdAt desc", OpDto.class)  // createdAt 내림차순 정렬
                .setParameter("patientId", patientId)
                .getResultList();
    }

    public OpDto findRecentOpByPatientId(Long patientId) {
        try {
            return em.createQuery(
                            "select new com.team.hospital.api.operation.dto.OpDto(o.id, o.operationNames, o.patient.operationDate, " +
                                    "o.patient.hospitalizedDate, o.patient.dischargedDate, o.createdAt) " +
                                    "from Operation o " +
                                    "where o.patient.id = :patientId " +
                                    "order by o.createdAt desc", OpDto.class)
                    .setParameter("patientId", patientId)
                    .setMaxResults(1)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null;  // 결과가 없을 경우 null 반환
        }
    }

    public List<OpDto> findFirstOperationByPatientId(Long patientId) {
        return em.createQuery(
                        "select new com.team.hospital.api.operation.dto.OpDto(o.id, o.operationNames, o.patient.operationDate, o.patient.hospitalizedDate, o.patient.dischargedDate, o.createdAt) " +
                                "from Operation o " +
                                "where o.patient.id = :patientId", OpDto.class)
                .setParameter("patientId", patientId)
                .getResultList();
    }


}
