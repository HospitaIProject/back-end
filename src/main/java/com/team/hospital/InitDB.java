package com.team.hospital;

import com.team.hospital.api.checkListItemDefault.CheckListItemDefault;
import com.team.hospital.api.operationType.OperationType;
import com.team.hospital.api.operationType.OperationTypeService;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Component
@Transactional
@RequiredArgsConstructor
public class InitDB {

    private final InitService initService;

//    @PostConstruct
//    public void init() {
//        initService.dbInit();
//    }

    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService {

        private final EntityManager em;
        private final OperationTypeService operationTypeService;

        public void dbInit() {
            List<String> operationTypess = Arrays.asList(
                    "RHC_ERHC",
                    "T_COLECTOMY",
                    "LHC_ELHC",
                    "AR",
                    "LAR",
                    "ISR",
                    "APR",
                    "SUBTOTAL_TOTAL_COLECTOMY",
                    "TOTAL_PROCTOCOLECTOMY"
            );

            operationTypess.forEach(name -> {
                // CheckListItemDefault를 true로 설정된 상태로 생성
                CheckListItemDefault defaultChecklist = CheckListItemDefault.builder()
                        .explainedPreOp(true)
                        .onsPreOp2hr(true)
                        .onsPostBowelPrep(true)
                        .dvtPrevention(true)
                        .antibioticPreIncision(true)
                        .painMedPreOp(true)
                        .maintainTemp(true)
                        .fluidRestriction(true)
                        .antiNausea(true)
                        .painControl(true)
                        .giStimulant(true)
                        .gumChewing(true)
                        .antiNauseaPostOp(true)
                        .ivFluidRestrictionPostOp(true)
                        .nonOpioidPainControl(true)
                        .jpDrainRemoval(true)
                        .catheterRemoval(true)
                        .ivLineRemoval(true)
                        .podExercise(true)
                        .podMeal(true)
                        .podPain(true)
                        .build();

                // OperationType 생성 시 CheckListItemDefault를 설정
                OperationType operationType = OperationType.builder()
                        .name(name)
                        .checkListItemDefault(defaultChecklist)
                        .build();

                operationTypeService.save(operationType);
            });

            System.out.println("Database initialized with operation methods.");
        }
    }
}