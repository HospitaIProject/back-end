package com.team.hospital.api.checkList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface CheckListRepository extends JpaRepository<CheckList, Long> {

    @Query("SELECT ck FROM CheckList ck WHERE ck.checkListItem.operation.id = :operationId")
    List<CheckList> findAllByOperationId(@Param("operationId") Long operationId);

    @Query("SELECT COUNT(cl) > 0 FROM CheckList cl " +
            "JOIN cl.checkListItem ci " +
            "JOIN ci.operation o " +
            "WHERE o.id = :operationId " +
            "AND FUNCTION('DATEDIFF', cl.dayOfCheckList, :operationDate) = FUNCTION('DATEDIFF', CURRENT_DATE, :operationDate)")
    boolean existsCheckListWithExactDaysBetween(
            @Param("operationId") Long operationId,
            @Param("operationDate") LocalDate operationDate);

    @Query("SELECT cl.dayOfCheckList FROM CheckList cl " +
            "JOIN cl.checkListItem ci " +
            "JOIN ci.operation o " +
            "WHERE o.id = :operationId " +
            "AND FUNCTION('DATEDIFF', cl.dayOfCheckList, :operationDate) IN (1, 2, 3)")
    List<LocalDate> findCheckListsForNextThreeDays(
            @Param("operationId") Long operationId,
            @Param("operationDate") LocalDate operationDate);

}
