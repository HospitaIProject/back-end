package com.team.hospital.api.checkList;

import com.team.hospital.api.checkListItem.CheckListItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CheckListRepository extends JpaRepository<CheckList, Long> {

    @Query("SELECT ck FROM CheckList ck WHERE ck.checkListItem.operation.id = :operationId")
    List<CheckList> findAllByOperationId(@Param("operationId") Long operationId);

    List<CheckList> findAllByCheckListItem(CheckListItem checkListItem);

}
