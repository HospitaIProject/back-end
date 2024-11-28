package com.team.hospital.api.checkListItem;

import com.team.hospital.api.operation.Operation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CheckListItemRepository extends JpaRepository<CheckListItem, Long> {
    Optional<CheckListItem> findCheckListItemByOperationId(Long operationId);

    CheckListItem findByOperationId(Long operationId);

    CheckListItem findCheckListItemByOperation(Operation operation);

    @Query("SELECT " +
            " (CASE WHEN c.explainedPreOp = true THEN 1 ELSE 0 END) + " +
            " (CASE WHEN c.onsPreOp2hr = true THEN 1 ELSE 0 END) + " +
            " (CASE WHEN c.onsPostBowelPrep = true THEN 1 ELSE 0 END) + " +
            " (CASE WHEN c.dvtPrevention = true THEN 1 ELSE 0 END) + " +
            " (CASE WHEN c.antibioticPreIncision = true THEN 1 ELSE 0 END) + " +
            " (CASE WHEN c.painMedPreOp = true THEN 1 ELSE 0 END) + " +
            " (CASE WHEN c.maintainTemp = true THEN 1 ELSE 0 END) + " +
            " (CASE WHEN c.fluidRestriction = true THEN 1 ELSE 0 END) + " +
            " (CASE WHEN c.antiNausea = true THEN 1 ELSE 0 END) + " +
            " (CASE WHEN c.painControl = true THEN 1 ELSE 0 END) + " +
            " (CASE WHEN c.painControlMethod = true THEN 1 ELSE 0 END) + " +
            " (CASE WHEN c.giStimulant = true THEN 1 ELSE 0 END) + " +
            " (CASE WHEN c.gumChewing = true THEN 1 ELSE 0 END) + " +
            " (CASE WHEN c.antiNauseaPostOp = true THEN 1 ELSE 0 END) + " +
            " (CASE WHEN c.ivFluidRestrictionPostOp = true THEN 1 ELSE 0 END) + " +
            " (CASE WHEN c.nonOpioidPainControl = true THEN 1 ELSE 0 END) + " +
            " (CASE WHEN c.jpDrainRemoval = true THEN 1 ELSE 0 END) + " +
            " (CASE WHEN c.catheterRemoval = true THEN 1 ELSE 0 END) + " +
            " (CASE WHEN c.ivLineRemoval = true THEN 1 ELSE 0 END) + " +
            " (CASE WHEN c.podExercise = true THEN 1 ELSE 0 END) + " +
            " (CASE WHEN c.podMeal = true THEN 1 ELSE 0 END) + " +
            " (CASE WHEN c.podPain = true THEN 1 ELSE 0 END) " +
            "FROM CheckListItem c WHERE c.operation = :operation")
    int countTrueFields(@Param("operation")Operation operation);
}
