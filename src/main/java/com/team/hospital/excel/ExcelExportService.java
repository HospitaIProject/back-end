package com.team.hospital.excel;

import com.team.hospital.api.checkList.CheckList;
import com.team.hospital.api.checkList.CheckListRepository;
import com.team.hospital.api.checkList.CheckListService;
import com.team.hospital.api.checkListAfter.CheckListAfter;
import com.team.hospital.api.checkListAfter.CheckListAfterRepository;
import com.team.hospital.api.checkListAfter.CheckListAfterService;
import com.team.hospital.api.checkListBefore.CheckListBefore;
import com.team.hospital.api.checkListBefore.CheckListBeforeRepository;
import com.team.hospital.api.checkListBefore.CheckListBeforeService;
import com.team.hospital.api.checkListDuring.CheckListDuring;
import com.team.hospital.api.checkListDuring.CheckListDuringRepository;
import com.team.hospital.api.checkListItem.CheckListItem;
import com.team.hospital.api.checkListItem.CheckListItemRepository;
import com.team.hospital.api.complication.Complication;
import com.team.hospital.api.complication.ComplicationRepository;
import com.team.hospital.api.operation.Operation;
import com.team.hospital.api.operation.OperationService;
import com.team.hospital.api.operationMethod.OperationMethod;
import com.team.hospital.api.patient.Patient;
import com.team.hospital.api.patient.PatientService;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.Month;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ExcelExportService {

    private final PatientService patientService;
    private final OperationService operationService;
    private final CheckListBeforeService checkListBeforeService;
    private final CheckListAfterService checkListAfterService;
    private final CheckListService checkListService;

    private final CheckListItemRepository checkListItemRepository;
    private final CheckListBeforeRepository checkListBeforeRepository;
    private final CheckListDuringRepository checkListDuringRepository;
    private final CheckListAfterRepository checkListAfterRepository;
    private final ComplicationRepository complicationRepository;
    private final CheckListRepository checkListRepository;


    public ByteArrayInputStream exportToExcel() throws IOException {

        XSSFWorkbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("hospital_data");

        // Create a cell style with center alignment
        CellStyle cellStyle = workbook.createCellStyle();
        cellStyle.setAlignment(HorizontalAlignment.CENTER);
        cellStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        Row headerRow = sheet.createRow(0);

        //기본정보
        headerRow.createCell(0).setCellValue("환자이름");
        headerRow.createCell(1).setCellValue("등록번호");
        headerRow.createCell(2).setCellValue("입원일");
        headerRow.createCell(3).setCellValue("수술일");
        headerRow.createCell(4).setCellValue("퇴원일");
        headerRow.createCell(5).setCellValue("POD(일)");
        headerRow.createCell(6).setCellValue("진단명");
        headerRow.createCell(7).setCellValue("수술명");
        headerRow.createCell(8).setCellValue("Location");
        headerRow.createCell(9).setCellValue("적용한 CP");

        //수술전
        headerRow.createCell(10).setCellValue("ERAS설명");
        headerRow.createCell(11).setCellValue("수술전 ONS");
        headerRow.createCell(12).setCellValue("엔커버 복용");
        headerRow.createCell(13).setCellValue("DVT 예방");
        headerRow.createCell(14).setCellValue("예방적 항생제");
        headerRow.createCell(15).setCellValue("수술전 통증 조절약");

        //수술중
        headerRow.createCell(16).setCellValue("Hypothermia 예방(Air-warmer)");
        headerRow.createCell(17).setCellValue("수술중 volume 2-4cc/hr 였는지");
        headerRow.createCell(18).setCellValue("수술중 PONV");
        headerRow.createCell(19).setCellValue("수술중 pain control 유무");
        headerRow.createCell(20).setCellValue("수술중 통증 조절 종류 (서술)");

        //수술후
        headerRow.createCell(21).setCellValue("Laxatives");
        headerRow.createCell(22).setCellValue("chewing gum");
        headerRow.createCell(23).setCellValue("수술후 당일 PONV 예방");
        headerRow.createCell(24).setCellValue("fluid 제한");
        headerRow.createCell(25).setCellValue("postop pain control");
        headerRow.createCell(26).setCellValue("POD#3 이후 JP 제거했는지");
        headerRow.createCell(27).setCellValue("JP drain 제거일");
        headerRow.createCell(28).setCellValue("Urinary catheter 수술실에서 제거");
        headerRow.createCell(29).setCellValue("Urinary catheter 제거한 날짜 (서술)");
        headerRow.createCell(30).setCellValue("POD#3 이후 IV 라인제거");
        headerRow.createCell(31).setCellValue("IV 라인제거 날짜");
        headerRow.createCell(32).setCellValue("OP day 운동");
        headerRow.createCell(33).setCellValue("POD#1 운동");
        headerRow.createCell(34).setCellValue("POD#2 운동");
        headerRow.createCell(35).setCellValue("POD#3 운동");
        headerRow.createCell(36).setCellValue("OP day Diet");
        headerRow.createCell(37).setCellValue("POD#1 Diet");
        headerRow.createCell(38).setCellValue("POD#2 Diet");

        //compliance
        headerRow.createCell(39).setCellValue("ERAS 성공 항목수");
        headerRow.createCell(40).setCellValue("ERAS 적용한 항목수");
        headerRow.createCell(41).setCellValue("Compliance rate (성공수/적용수)*100");

        //기타정보
        headerRow.createCell(42).setCellValue("POD#1 VAS score(아침/점심/저녁)");
        headerRow.createCell(43).setCellValue("POD#2 VAS score(아침/점심/저녁)");
        headerRow.createCell(44).setCellValue("POD#3 VAS score(아침/점심/저녁)");
        headerRow.createCell(45).setCellValue("blood loss");
        headerRow.createCell(46).setCellValue("urine output");
        headerRow.createCell(47).setCellValue("op time");

        // Apply the cell style to the header row cells
        for (int i = 0; i < headerRow.getPhysicalNumberOfCells(); i++) {
            headerRow.getCell(i).setCellStyle(cellStyle);
        }

        List<Patient> patients = patientService.findAll();
        System.out.println(patients.size());

        int rowIndex = 1;

        for (Patient p : patients) {

            List<Operation> operations = operationService.findAllByPatient(p.getId());
            StringBuilder sb = new StringBuilder(); //수술명
            StringBuilder sb2 = new StringBuilder();    //적용 CP

            for (Operation op : operations) {
                List<OperationMethod> operationMethods = op.getOperationMethods();
                for (OperationMethod opm : operationMethods) {
                    sb.append(opm.getOperationType().getName()).append(", ");
                }
                sb2.append(op.getOperationApproach().name()).append(", ");
            }

            Row row = sheet.createRow(rowIndex);

            row.createCell(0).setCellValue(p.getName());                                   //환자이름
            row.createCell(1).setCellValue(p.getPatientNumber());                         //등록번호
            row.createCell(2).setCellValue(p.getHospitalizedDate());                     //입원일
            row.createCell(3).setCellValue(p.getOperationDate());                       //수술일
            row.createCell(4).setCellValue(p.getDischargedDate());                     //퇴원일
            row.createCell(5).setCellValue(p.getTotalHospitalizedDays());             //POD(일)
            row.createCell(6).setCellValue(p.getDiagnosis().name());                 //진단명
            row.createCell(7).setCellValue(sb.toString());                          //수술명
            row.createCell(8).setCellValue(p.getLocation().name());                //Location
            row.createCell(9).setCellValue(sb2.toString());                       //적용한 CP

            for (Operation op : operations) {

                CheckListItem checkListItem = checkListItemRepository.findCheckListItemByOperation(op);
                CheckListBefore checkListBefore = checkListBeforeRepository.findCheckListBeforeByCheckListItem(checkListItem);
                CheckListDuring checkListDuring = checkListDuringRepository.findCheckListDuringByCheckListItem(checkListItem);
                CheckListAfter checkListAfter = checkListAfterRepository.findCheckListAfterByCheckListItem(checkListItem);


                //수술전   ----
                try {
                    row.createCell(10).setCellValue(checkListBefore.getExplainedPreOp().getOption().name());                         //ERAS 설명
                } catch (Exception e) {
                    row.createCell(10).setCellValue("-");
                }
                try {
                    row.createCell(11).setCellValue(checkListBefore.getOnsPreOp2hr().getOption().name());                           //수술전 ONS
                } catch (Exception e) {
                    row.createCell(11).setCellValue("-");
                }
                try {
                    row.createCell(12).setCellValue(checkListBefore.getOnsPostBowelPrep().getOption().name());                      //엔커버 복용
                } catch (Exception e) {
                    row.createCell(12).setCellValue("-");
                }
                try {
                    row.createCell(13).setCellValue(checkListBefore.getDvtPrevention().getOption().name());                        //DVT 예방
                } catch (Exception e) {
                    row.createCell(13).setCellValue("-");
                }
                try {
                    row.createCell(14).setCellValue(checkListBefore.getAntibioticPreIncision().getOption().name());               //예방적 항생제
                } catch (Exception e) {
                    row.createCell(14).setCellValue("-");
                }
                try {
                    row.createCell(15).setCellValue(checkListBefore.getPainMedPreOp().getOption().name());                       //수술전 통증 조절약
                } catch (Exception e) {
                    row.createCell(15).setCellValue("-");
                }

                //수술중   ----
                try {
                    row.createCell(16).setCellValue(checkListDuring.getMaintainTemp().getOption().name());                     //Hypothermia 예방
                } catch (Exception e) {
                    row.createCell(16).setCellValue("-");
                }
                try {
                    row.createCell(17).setCellValue(checkListDuring.getFluidRestriction().getOption().name());               //수술중 volume 2-4cc/hr
                } catch (Exception e) {
                    row.createCell(17).setCellValue("-");
                }
                try {
                    row.createCell(18).setCellValue(checkListDuring.getAntiNausea().getOption().name());                   //수술중 PONV 예방
                } catch (Exception e) {
                    row.createCell(18).setCellValue("-");
                }
                try {
                    row.createCell(19).setCellValue(checkListDuring.getPainControl().getOption().name());                //수술중 pain control 유무
                } catch (Exception e) {
                    row.createCell(19).setCellValue("-");
                }
                try {
                    row.createCell(20).setCellValue(checkListDuring.getPainControl().getRemarks());                     //수술중 통증 조절 종류 (서술) -> 확실 x
                } catch (Exception e) {
                    row.createCell(20).setCellValue("-");
                }

                //수술후   ----
                try {
                    row.createCell(21).setCellValue(checkListAfter.getGiStimulant().getOption().name());                 //Laxatives
                } catch (Exception e) {
                    row.createCell(21).setCellValue("-");
                }
                try {
                    row.createCell(22).setCellValue(checkListAfter.getGumChewing().getOption().name());                 //chewing gum
                } catch (Exception e) {
                    row.createCell(22).setCellValue("-");
                }
                try {
                    row.createCell(23).setCellValue(checkListAfter.getAntiNauseaPostOp().getOption().name());          //수술후 PONV 예방
                } catch (Exception e) {
                    row.createCell(23).setCellValue("-");
                }
                try {
                    row.createCell(24).setCellValue(checkListAfter.getIvFluidRestrictionPostOp().getOption().name()); //fluid 제한
                } catch (Exception e) {
                    row.createCell(24).setCellValue("-");
                }
                try {
                    row.createCell(25).setCellValue(checkListAfter.getNonOpioidPainControl().getOption().name());   //postop pain control
                } catch (Exception e) {
                    row.createCell(25).setCellValue("-");
                }
                try {
                    row.createCell(26).setCellValue(checkListAfter.getJpDrainRemoval().getOption().name());       //JP 제거
                } catch (Exception e) {
                    row.createCell(26).setCellValue("-");
                }
                try {
                    row.createCell(27).setCellValue(checkListAfter.getJpDrainRemoval().getRemovedDate());       //JP 제거일
                } catch (Exception e) {
                    row.createCell(27).setCellValue("-");
                }
                try {
                    row.createCell(28).setCellValue(checkListAfter.getCatheterRemoval().getOption().name());   //Urinary catheter 제거
                } catch (Exception e) {
                    row.createCell(28).setCellValue("-");
                }
                try {
                    row.createCell(29).setCellValue(checkListAfter.getCatheterRemoval().getRemovedDate());   //Urinary catheter 제거일
                } catch (Exception e) {
                    row.createCell(29).setCellValue("-");
                }
                try {
                    row.createCell(30).setCellValue(checkListAfter.getIvLineRemoval().getOption().name()); //IV 라인제거
                } catch (Exception e) {
                    row.createCell(30).setCellValue("-");
                }
                try {
                    row.createCell(31).setCellValue(checkListAfter.getIvLineRemoval().getRemovedDate()); //IV 라인제거 날짜
                } catch (Exception e) {
                    row.createCell(31).setCellValue("-");
                }
                try {
                    row.createCell(32).setCellValue(checkListAfter.getPostExercise().getOption().name()); //OP day 운동
                } catch (Exception e) {
                    row.createCell(32).setCellValue("-");
                }

                List<CheckList> checkList = checkListRepository.findAllByCheckListItem(checkListItem);

                for (CheckList c : checkList) {
                    try {
                        row.createCell(33).setCellValue(c.getPodOneExercise().getOption().name());                       //POD#1 운동
                    } catch (Exception e) {
                        row.createCell(33).setCellValue("-");
                    }

                    try {
                        row.createCell(34).setCellValue(c.getPodTwoExercise().getOption().name());                       //POD#2 운동
                    } catch (Exception e) {
                        row.createCell(34).setCellValue("-");
                    }

                    try {
                        row.createCell(35).setCellValue(c.getPodThreeExercise().getOption().name());                      //POD#3 운동
                    } catch (Exception e) {
                        row.createCell(35).setCellValue("-");
                    }


                    try {
                        row.createCell(36).setCellValue("");                       //OP day Diet     -> 어떤 항목인지 모르겠음
                    } catch (Exception e) {
                        row.createCell(36).setCellValue("-");
                    }

                    try {
                        row.createCell(37).setCellValue(c.getPodOneMeal().getOption().name());                       //POD#1 Diet     -> 헷갈
                    } catch (Exception e) {
                        row.createCell(37).setCellValue("-");
                    }

                    try {
                        row.createCell(38).setCellValue(c.getPodTwoMeal().getOption().name());                       //POD#2 Diet     -> 헷갈
                    } catch (Exception e) {
                        row.createCell(38).setCellValue("-");
                    }

                    try {
                        row.createCell(42).setCellValue("아침: " + c.getPodOnePain().getDay() + "/점심: " + c.getPodOnePain().getEvening() + "/저녁: " + c.getPodOnePain().getNight());                       //POD#1 VAS score(아침/점심/저녁)    -> 헷갈
                    } catch (Exception e) {
                        row.createCell(42).setCellValue("-");
                    }

                    try {
                        row.createCell(43).setCellValue("아침: " + c.getPodTwoPain().getDay() + "/점심: " + c.getPodTwoPain().getEvening() + "/저녁: " + c.getPodTwoPain().getNight());                       //POD#2 VAS score(아침/점심/저녁)     -> 헷갈
                    } catch (Exception e) {
                        row.createCell(43).setCellValue("-");
                    }

                    try {
                        row.createCell(44).setCellValue("아침: " + c.getPodThreePain().getDay() + "/점심: " + c.getPodThreePain().getEvening() + "/저녁: " + c.getPodThreePain().getNight());                       //POD#3 VAS score(아침/점심/저녁)      -> 헷갈
                    } catch (Exception e) {
                        row.createCell(44).setCellValue("-");
                    }

                }

                //compliance
                Optional<Complication> complication = complicationRepository.findByOperationId(op.getId());
                if (complication.isPresent()) {
                    row.createCell(39).setCellValue(" ");                                                        //ERAS 성공 항목수 -> 어떤 항목인지 모르겠음
                    row.createCell(40).setCellValue(" ");                                                       //ERAS 적용한 항목수 -> 어떤 항목인지 모르겠음
                    row.createCell(41).setCellValue(complication.get().getComplicationScore());                //Compliance rate (성공수/적용수)*100
                }

                //기타정보
                row.createCell(45).setCellValue(op.getBloodLoss());                           //blood loss
                row.createCell(46).setCellValue(" ");                                        //urine output                        -> 어떤 항목인지 모르겠음
                row.createCell(47).setCellValue(op.getTotalOperationTime());                //op time

                rowIndex++;
            }
        }


//        int rowIndex = 1;
//        for (Patient patient : patients) {
//            List<Operation> operations = operationService.findAllByPatient(patient.getId());
//            if (operations.isEmpty()) {
//                continue; // 다음 환자 처리
//            }
//
//            Operation operation = operations.get(0);
//
//            // CheckListBefore
//            CheckListBeforeDTO checkListBeforeDTO;
//            try {
//                checkListBeforeDTO = checkListBeforeService.findCheckListBeforeByOperationId(operation.getId());
//            } catch (CheckListBeforeNotFoundException e) {
//                continue;
//            }
//            // CheckListBefore
//
//            // CheckListBefore
//            CheckListAfterDTO checkListAfterDTO;
//            try {
//                checkListAfterDTO = checkListAfterService.findCheckListAfterByOperationId(operation.getId());
//            } catch (CheckListAfterNotFoundException e) {
//                continue;
//            }
//            // CheckListBefore
//
//            // CheckList
//            List<CheckList> checkLists = checkListService.findAllByOperationId(operation.getId());
//            CheckList checkList;
//            checkList = checkLists.get(0);
//            // CheckList
//
//            Row row = sheet.createRow(rowIndex++);
//
//            // 0st Column
//            Cell nameCell = row.createCell(0);
//            nameCell.setCellValue(patient.getName());
//            nameCell.setCellStyle(cellStyle);
//            // 0st Column
//
//            // 1st Column
//            Cell patientNumberCell = row.createCell(1);
//            patientNumberCell.setCellValue(patient.getPatientNumber());
//            patientNumberCell.setCellStyle(cellStyle);
//            // 1st Column
//
//            // 2nd Column
//            Cell operationDateCell = row.createCell(2);
//            LocalDate operationDate = patient.getOperationDate();
//            operationDateCell.setCellValue(convertDateToString(operationDate));
//            operationDateCell.setCellStyle(cellStyle);
//            // 2nd Column
//
//            // 3rd Column
//            Cell diagnosisCell = row.createCell(3);
//            Diagnosis diagnosis = patient.getDiagnosis();
//            diagnosisCell.setCellValue(diagnosis.name());
//            diagnosisCell.setCellStyle(cellStyle);
//            // 3rd Column
//
//            // 4th Column
////            List<OperationMethod> operationMethod = operations.get(0).getOperationMethod();
////            StringJoiner operationMethods = new StringJoiner("\n");
////            for (OperationMethod method : operationMethod) {
////            }
////            Cell operationMethodCell = row.createCell(4);
////            operationMethodCell.setCellValue(operationMethods.toString());
////            operationMethodCell.setCellStyle(cellStyle);
//            // 4th Column
//
//            // 5th Column
//            Cell podCell = row.createCell(5);
//            int totalDays = patient.getTotalHospitalizedDays();
//            podCell.setCellValue(totalDays);
//            podCell.setCellStyle(cellStyle);
//            // 5th Column
//
//            // 6th Column
//            Cell locationCell = row.createCell(6);
//            locationCell.setCellValue("Location(임시)");
//            locationCell.setCellStyle(cellStyle);
//            // 6th Column
//
//            // 7th Column
//            Cell cpCell = row.createCell(7);
//            cpCell.setCellValue("CP(임시)");
//            cpCell.setCellStyle(cellStyle);
//            // 7th Column
//
//            // 8th Column
//            Cell erasCell = row.createCell(8);
//            erasCell.setCellValue(checkListBeforeDTO.getExplainedPreOp().name());
//            erasCell.setCellStyle(cellStyle);
//            // 8th Column
//
//            // 9th Column
//            Cell onsCell = row.createCell(9);
//            onsCell.setCellValue(checkListBeforeDTO.getOnsPreOp2hr().name());
//            onsCell.setCellStyle(cellStyle);
//            // 9th Column
//
//            // 10th Column
//            Cell nCoverCell = row.createCell(10);
//            nCoverCell.setCellValue(checkListBeforeDTO.getOnsPostBowelPrep().name());
//            nCoverCell.setCellStyle(cellStyle);
//            // 10th Column
//
//            // 11th Column
//            Cell dvtCell = row.createCell(11);
//            dvtCell.setCellValue(checkListBeforeDTO.getDvtPrevention().name());
//            dvtCell.setCellStyle(cellStyle);
//            // 11th Column
//
//            // 12th Column Laxatives
//            Cell laxCell = row.createCell(12);
//            laxCell.setCellValue("Laxatives(임시)");
//            laxCell.setCellStyle(cellStyle);
////            checkListBeforeDTO.getAntibioticPreIncision().name()
//            // 12th Column
//
//            // 13th Column chewing gum
//            Cell chewingGumCell = row.createCell(13);
//            chewingGumCell.setCellValue("Chewing gum(임시)");
//            chewingGumCell.setCellStyle(cellStyle);
//            // 13th Column
//
//            // 14th Col
//            Cell jpDateCell = row.createCell(14);
//            LocalDate jpRemovalDate = checkListAfterDTO.getJpDrainRemovalDate();
//            jpDateCell.setCellValue(convertDateToString(jpRemovalDate));
//            jpDateCell.setCellStyle(cellStyle);
//            // 14th Col
//
//            // 15th Col
//            Cell jpAfterPod3 = row.createCell(15);
//            jpAfterPod3.setCellValue("POD#3 이후 제거 여부(임시)");
//            jpAfterPod3.setCellStyle(cellStyle);
//            // 15th Col
//
//            // 16th Col
//            Cell urinCathCell = row.createCell(16);
//            urinCathCell.setCellValue(checkListAfterDTO.getCatheterRemoval().name());
//            urinCathCell.setCellStyle(cellStyle);
//            // 16th Col
//
//            // 17th col
//            Cell urinCathAfterPod1 = row.createCell(17);
//            urinCathAfterPod1.setCellValue("POD#1 이후 urin cath 제거(임시)");
//            urinCathAfterPod1.setCellStyle(cellStyle);
//            // 17th col
//
//            // 18th Col
//            Cell fluidCell = row.createCell(18);
//            fluidCell.setCellValue(checkListAfterDTO.getIvFluidRestrictionPostOp().name());
//            fluidCell.setCellStyle(cellStyle);
//            // 18th Col
//
//            // 19th Col
//            Cell ivRmvDateCell = row.createCell(19);
//            LocalDate ivRmvDate = checkListAfterDTO.getIvLineRemovalDate();
//            ivRmvDateCell.setCellValue(convertDateToString(ivRmvDate));
//            ivRmvDateCell.setCellStyle(cellStyle);
//            // 19th Col
//        }

        // Auto size columns
        for (int i = 0; i < headerRow.getPhysicalNumberOfCells(); i++) {
            sheet.autoSizeColumn(i);
        }

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        workbook.write(out);
        workbook.close();

        return new

                ByteArrayInputStream(out.toByteArray());
    }

    private static String convertDateToString(LocalDate localDate) {
        Month month = localDate.getMonth();
        int day = localDate.getDayOfMonth();
        return month.getValue() + "월 " + day + "일";
    }
}