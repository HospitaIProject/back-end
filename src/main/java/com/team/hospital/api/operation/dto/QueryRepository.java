package com.team.hospital.api.operation.dto;

import jakarta.persistence.EntityManager;
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

//    public List<OpDto> findAllOpDtoByPatientId(Long patientId) {
//        return em.createQuery(
//                        "select new com.team.hospital.api.operation.dto.OpDto(o.id, o.operationNames, o.patient.operationDate, " +
//                                "o.patient.hospitalizedDate, o.patient.dischargedDate, o.createdAt) " +
//                                "from Operation o " +
//                                "where o.patient.id = :patientId " +
//                                "order by o.createdAt desc", OpDto.class)  // createdAt 내림차순 정렬
//                .setParameter("patientId", patientId)
//                .getResultList();
//    }

    public List<OpDto> findFirstOperationByPatientId(Long patientId) {
        return em.createQuery(
                        "select new com.team.hospital.api.operation.dto.OpDto(o.id, o.operationNames, o.patient.operationDate, o.patient.hospitalizedDate, o.patient.dischargedDate, o.createdAt) " +
                                "from Operation o " +
                                "where o.patient.id = :patientId", OpDto.class)
                .setParameter("patientId", patientId)
                .getResultList();
    }


}
