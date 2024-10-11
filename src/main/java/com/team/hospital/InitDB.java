package com.team.hospital;

import com.team.hospital.api.checkListItemDefault.CheckListItemDefault;
import com.team.hospital.api.operation.enumType.ASAScore;
import com.team.hospital.api.operation.enumType.Diagnosis;
import com.team.hospital.api.operation.enumType.Location;
import com.team.hospital.api.operationType.OperationType;
import com.team.hospital.api.operationType.OperationTypeService;
import com.team.hospital.api.patient.Patient;
import com.team.hospital.api.patient.PatientRepository;
import com.team.hospital.api.patient.enumType.Sex;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
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

        private final OperationTypeService operationTypeService;
        private final PatientRepository patientRepository;

        public void dbInit() {
            List<String> operationTypess = Arrays.asList(
                    "RHC,ERHC",
                    "T-colectomy",
                    "LHC,ELHC",
                    "AR",
                    "LAR",
                    "ISR",
                    "APR",
                    "Subtotal, Total colectomy",
                    "Total Proctocolectomy"
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

            Patient patient = Patient.builder()
                    .patientNumber(123456L)
                    .name("정진혁")
                    .age(26)
                    .sex(Sex.MALE)
                    .height(180)
                    .weight(63)
                    .bmi(19.44F)
                    .asaScore(ASAScore.ASA_I)
                    .diagnosis(Diagnosis.ANUS)
                    .location(Location.RECTUM)
                    .operationDate(LocalDate.of(2024, 8, 22))
                    .hospitalizedDate(LocalDate.of(2024, 8, 21))
                    .dischargedDate(LocalDate.of(2024, 8, 29))
                    .totalHospitalizedDays(9)
                    .build();

            patientRepository.save(patient);

            System.out.println("Database initialized with operation methods.");
        }
    }
}