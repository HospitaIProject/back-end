package com.team.hospital.excel;

import com.team.hospital.api.checkList.CheckList;
import com.team.hospital.api.checkList.CheckListRepository;
import com.team.hospital.api.checkListAfter.CheckListAfter;
import com.team.hospital.api.checkListAfter.CheckListAfterRepository;
import com.team.hospital.api.checkListBefore.CheckListBefore;
import com.team.hospital.api.checkListBefore.CheckListBeforeRepository;
import com.team.hospital.api.checkListDuring.CheckListDuring;
import com.team.hospital.api.checkListDuring.CheckListDuringRepository;
import com.team.hospital.api.checkListItem.CheckListItem;
import com.team.hospital.api.checkListItem.CheckListItemRepository;
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
import java.util.function.Supplier;

@Service
@RequiredArgsConstructor
public class ExcelExportService {

    private final PatientService patientService;
    private final OperationService operationService;

    private final CheckListItemRepository checkListItemRepository;
    private final CheckListBeforeRepository checkListBeforeRepository;
    private final CheckListDuringRepository checkListDuringRepository;
    private final CheckListAfterRepository checkListAfterRepository;
    private final ComplicationRepository complicationRepository;
    private final CheckListRepository checkListRepository;


    public ByteArrayInputStream exportToExcel() throws IOException {

        XSSFWorkbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("hospital_data");

        // Create a cell style with center alignment and bold font for header
        CellStyle headerStyle = workbook.createCellStyle();
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerStyle.setFont(headerFont);
        headerStyle.setAlignment(HorizontalAlignment.CENTER);
        headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        // Create a cell style with center alignment for regular cells
        CellStyle cellStyle = workbook.createCellStyle();
        cellStyle.setAlignment(HorizontalAlignment.CENTER);
        cellStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        Row headerRow = sheet.createRow(0);

        // Header names
        String[] headers = {
                "No", "환자이름", "등록번호", "입원일", "수술일", "퇴원일", "POD(일)", "진단명", "수술명",          // 기본 정보
                "Location\n1: colon\n2: rectum", "적용한 CP\n1: colon\n2: rectum",                      // 기본 정보

                "ERAS설명\n1 = YES\n0 = No", "수술전 ONS\n1 = YES\n0 = No", "엔커버 복용\n1 = YES\n0 = No",           // 수술 전
                "DVT 예방\n1 = YES\n0 = No", "예방적 항생제\n1 = YES\n0 = No", "수술전 통증\n조절약\n1 = YES\n0 = No",   // 수술 전

                "Hypothermia 예방(Air-warmer)\n1 = YES\n0 = No", "수술중 volume 2-4cc/hr였는지\n1 = YES\n0 = No", "수술중 PONV\n1 = YES\n0 = No",
                "수술중 pain control 유무", "수술중 통증 조절 종류 (서술)",

                "Laxatives\n1 = YES\n0 = No", "chewing gum\n1 = YES\n0 = No", "수술후 당일 PONV 예방\n1 = YES\n0 = No", "fluid 제한\n(C:500, R:2000)",


                "postop pain control\n1 = no opioid\n2 = opioid", "POD#3 이후 JP 제거했는지\n1 = YES\n0 = No", "JP drain 제거일\n(서술)", "Urinary catheter\n수술실에서 제거\n1 = YES\n0 = No",
                "Urinary catheter 제거한 날짜\n(서술)", "POD#3 이후\nIV 라인제거\n1 = YES\n0 = No", "IV 라인제거\n날짜\n(서술)", "OP day\n운동\n1 = YES\n0 = No",

                "POD#1\n운동\n1 = YES\n0 = No", "POD#2\n운동\n1 = YES\n0 = No", "POD#3\n운동\n1 = YES\n0 = No",
                "OP day Diet\n1 = YES\n0 = No", "POD#1 Diet\n1 = YES\n0 = No", "POD#2 Diet\n1 = YES\n0 = No",

                "ERAS 성공 항목수", "ERAS 적용한 항목수", "Compliance\nrate\n(성공수/적용수)*100",

                "POD#1 VAS score(아침/점심/저녁)", "POD#2 VAS score(아침/점심/저녁)", "POD#3 VAS score(아침/점심/저녁)",
                "blood loss", "urine output", "op time",

                "pre WBC", "pre Neu", "pre Lym", "pre CRP", "pre Alb",
                "D0 WBC", "D0 Neu", "D0 Lym", "D0 CRP", "D0 Alb",
                "D1 WBC", "D1 Neu", "D1 Lym", "D1 CRP", "D1 Alb",
                "D2 WBC", "D2 Neu", "D2 Lym", "D2 CRP", "D2 Alb",
                "D3 WBC", "D3 Neu", "D3 Lym", "D3 CRP", "D3 Alb",
                "D4 WBC", "D4 Neu", "D4 Lym", "D4 CRP", "D4 Alb"
        };

        // Create header cells and apply the header style
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
        }

        List<Patient> patients = patientService.findAll();
        System.out.println("전채 환자 명:" + patients.size());
        int rowIndex = 1;

        for (Patient p : patients) {
            // 한 환자당 여러 수술이 있을 수 있으므로 수술 정보마다 새 행을 생성
            List<Operation> operations = operationService.findAllByPatient(p.getId());
            for (Operation op : operations) {

                // CheckList 데이터 처리 (POD1, POD2, POD3)
                List<CheckList> checkList = checkListRepository.findAllByOperationId(op.getId());
//                System.out.println(p.getName() + "환자의 등록된 체크리스트 갯수는 :" +  checkList.size() +  "개 입니다.");
                if(checkList.size() < 3) continue;

                Row row = sheet.createRow(rowIndex); // 각 수술마다 새로운 행 생성

                StringBuilder sb = new StringBuilder(); // 수술명
                List<OperationMethod> operationMethods = op.getOperationMethods();

                for (OperationMethod opm : operationMethods) {
                    sb.append(opm.getOperationType().getName()).append(", ");
                }

                // CheckList 처리 (Before, During, After)
                CheckListItem checkListItem = checkListItemRepository.findCheckListItemByOperation(op);
                CheckListBefore checkListBefore = checkListBeforeRepository.findCheckListBeforeByCheckListItem(checkListItem);
                CheckListDuring checkListDuring = checkListDuringRepository.findCheckListDuringByCheckListItem(checkListItem);
                CheckListAfter checkListAfter = checkListAfterRepository.findCheckListAfterByCheckListItem(checkListItem);

                row.createCell(0).setCellValue(rowIndex);                                                                                  //NO
                row.createCell(1).setCellValue(p.getName());                                                                              //환자이름
                row.createCell(2).setCellValue(p.getPatientNumber());                                                                    //환자번호
                row.createCell(3).setCellValue(convertDateToString(p.getHospitalizedDate()));                                           //입원일
                row.createCell(4).setCellValue(convertDateToString(p.getOperationDate()));                                             //수술일
                setCellValueSafe(row, 4, () -> convertDateToString(p.getDischargedDate()));                                     //퇴원일
                row.createCell(6).setCellValue(p.getTotalHospitalizedDays());                                                        //POD(일)
                row.createCell(7).setCellValue(p.getDiagnosis().name());                                                            //진단명
                row.createCell(8).setCellValue(sb.toString());                                                                     //수술명
                row.createCell(9).setCellValue(p.getLocation().name());                                                           //Location 1: colon 2: rctum
                row.createCell(10).setCellValue(op.getOperationApproach().name());                                               //적용한 CP 1: colon 2: rectum

                // 수술 전 정보 처리
                setCellValueSafe(row, 11, () -> checkListBefore.getExplainedPreOp().getOption().name());                                //ERAS설명 1 = YES 0 = No
                setCellValueSafe(row, 12, () -> checkListBefore.getOnsPreOp2hr().getOption().name());                                   //수술전 ONS 1 = YES  0 = No
                setCellValueSafe(row, 13, () -> checkListBefore.getOnsPostBowelPrep().getOption().name());                              //엔커버 복용 1 = YES  0 = No
                setCellValueSafe(row, 14, () -> checkListBefore.getDvtPrevention().getOption().name());                                 //DVT 예방 1 = YES 0 = No
                setCellValueSafe(row, 15, () -> checkListBefore.getAntibioticPreIncision().getOption().name());                         //예방적 항생제 1 = YES  0 = No
                setCellValueSafe(row, 16, () -> checkListBefore.getPainMedPreOp().getOption().name());                                  //수술전 통증 조절약 1 = YES 0 = No

                // 수술 중 정보 처리
                setCellValueSafe(row, 17, () -> checkListDuring.getMaintainTemp().getOption().name());                  //Hypothermia 예방(Air-warmer) 1 = YES  0 = No
                setCellValueSafe(row, 18, () -> checkListDuring.getFluidRestriction().getOption().name());              //수술중 volume 2-4cc/hr였는지 1 = YES  0 = No
                setCellValueSafe(row, 19, () -> checkListDuring.getAntiNausea().getOption().name());                    //수술중 PONV 1 = YES  0 = No
                setCellValueSafe(row, 20, () -> checkListDuring.getPainControl().getOption().name());                   //수술중 pain control 유무
                setCellValueSafe(row, 21, () -> checkListDuring.getPainControl().getRemarks());                         //수술중 통증 조절 종류 (서술)

                // 수술 후 정보 처리
//                setCellValueSafe(row, 22, () -> checkListAfter.getGiStimulant().getOption().name());     // Laxatives //Laxatives 1 = YES  0 = No
//                setCellValueSafe(row, 23, () -> checkListAfter.getGumChewing().getOption().name());; //chewing gum 1 = YES 0 = No
                setCellValueSafe(row, 24, () -> checkListAfter.getAntiNauseaPostOp().getOption().name()); //수술후 당일 PONV 예방 1 = YES 0 = No
                setCellValueSafe(row, 25, () -> checkListAfter.getIvFluidRestrictionPostOp().getOption().name()); //fluid 제한 (C:500, R:2000)
                setCellValueSafe(row, 26, () -> checkListAfter.getNonOpioidPainControl().getOption().name()); //postop pain control 1 = no opioid 2 = opioid
                setCellValueSafe(row, 27, () -> checkListAfter.getJpDrainRemoval().getOption().name());  //POD#3 이후 JP 제거했는지 1 = YES 0 = No
                setCellValueSafe(row, 28, () -> convertDateToString(checkListAfter.getJpDrainRemoval().getRemovedDate())); //JP drain 제거일 (서술)
                setCellValueSafe(row, 29, () -> checkListAfter.getCatheterRemoval().getOption().name()); //Urinary catheter 수술실에서 제거 1 = YES 0 = No
                setCellValueSafe(row, 30, () -> convertDateToString(checkListAfter.getCatheterRemoval().getRemovedDate())); //Urinary catheter 제거한 날짜(서술)
                setCellValueSafe(row, 31, () -> checkListAfter.getIvLineRemoval().getOption().name()); //POD#3 이후 IV 라인제거 1 = YES 0 = No
                setCellValueSafe(row, 32, () -> convertDateToString(checkListAfter.getIvLineRemoval().getRemovedDate())); //IV 라인제거 (날짜 서술)
                setCellValueSafe(row, 33, () -> checkListAfter.getPostExercise().getOption().name()); //OP day 운동 1 = YES 0 = No

                for (CheckList c : checkList) {

                    if (c.getPodOneExercise() != null) {
                        setCellValueSafe(row, 34, () -> c.getPodOneExercise().getOption().name());
                    } ///POD#1 운동 1 = YES 0 = No

                    if (c.getPodTwoExercise() != null) {
                        setCellValueSafe(row, 35, () -> c.getPodTwoExercise().getOption().name());
                    } //POD#2 운동 1 = YES 0 = No

                    if (c.getPodThreeExercise() != null) {
                        setCellValueSafe(row, 36, () -> c.getPodThreeExercise().getOption().name());
                    } //POD#3 운동 1 = YES 0 = No

                    if (c.getPodOneMeal() != null) {
                        setCellValueSafe(row, 38, () -> c.getPodOneMeal().getOption().name());
                    } //POD#1 Diet 1 = YES 0 = No

                    if (c.getPodTwoMeal() != null) {
                        setCellValueSafe(row, 39, () -> c.getPodTwoMeal().getOption().name());
                    }; //POD#2 Diet 1 = YES 0 = No

                    if (c.getPodOnePain() != null) {
                        setCellValueSafe(row, 43, () -> "아침: " + c.getPodOnePain().getDay() + "/점심: "
                                + c.getPodOnePain().getEvening() + "/저녁: "
                                + c.getPodOnePain().getNight());
                    } //"POD#1 VAS score(아침/점심/저녁)

                    if (c.getPodTwoPain() != null) {
                        setCellValueSafe(row, 44, () -> "아침: " + c.getPodTwoPain().getDay() + "/점심: "
                                + c.getPodTwoPain().getEvening() + "/저녁: "
                                + c.getPodTwoPain().getNight());
                    } //"POD#2 VAS score(아침/점심/저녁)

                    if (c.getPodThreePain() != null) {
                        setCellValueSafe(row, 45, () -> "아침: " + c.getPodThreePain().getDay() + "/점심: "
                                + c.getPodThreePain().getEvening() + "/저녁: "
                                + c.getPodThreePain().getNight());
                    } //"POD#3 VAS score(아침/점심/저녁)
                }


                setCellValueSafe(row, 37, () -> checkListAfter.getPostMeal().getOption().name()); //OP day Diet 1 = YES 0 = No

                row.createCell(40).setCellValue("모름"); //ERAS 성공 항목수
                row.createCell(41).setCellValue("모름"); //ERAS 적용한 항목수

                row.createCell(46).setCellValue(op.getBloodLoss()); //blood loss
                row.createCell(47).setCellValue("모름"); //urine output
                row.createCell(48).setCellValue(op.getTotalOperationTime()); //op time

                // 합병증 정보 처리 (Complication)
                complicationRepository.findByOperationId(op.getId()).ifPresent(complication -> {
                    row.createCell(42).setCellValue(complication.getComplicationScore());  //Compliance rate (성공수/적용수)*100
                });

/*
                row.createCell(49).setCellValue(); //pre WBC
                row.createCell(50).setCellValue(); //pre Neu
                row.createCell(51).setCellValue(); //pre Lym
                row.createCell(52).setCellValue(); //pre CRP
                row.createCell(53).setCellValue(); //pre Alb

                row.createCell(54).setCellValue(); //D0 WBC
                row.createCell(55).setCellValue(); //D0 Neu
                row.createCell(56).setCellValue(); //D0 Lym
                row.createCell(57).setCellValue(); //D0 CRP
                row.createCell(58).setCellValue(); //D0 Alb

                row.createCell(59).setCellValue(); //D1 WBC
                row.createCell(60).setCellValue(); //D1 Neu
                row.createCell(61).setCellValue(); //D1 Lym
                row.createCell(62).setCellValue(); //D1 CRP
                row.createCell(63).setCellValue(); //D1 Alb

                row.createCell(64).setCellValue(); //D2 WBC
                row.createCell(65).setCellValue(); //D2 Neu
                row.createCell(66).setCellValue(); //D2 Lym
                row.createCell(67).setCellValue(); //D2 CRP
                row.createCell(68).setCellValue(); //D2 Alb

                row.createCell(69).setCellValue(); //D3 WBC
                row.createCell(70).setCellValue(); //D3 Neu
                row.createCell(71).setCellValue(); //D3 Lym
                row.createCell(72).setCellValue(); //D3 CRP
                row.createCell(73).setCellValue(); //D3 Alb

                row.createCell(74).setCellValue(); //D4 WBC
                row.createCell(75).setCellValue(); //D4 Neu
                row.createCell(76).setCellValue(); //D4 Lym
                row.createCell(77).setCellValue(); //D4 CRP
                row.createCell(78).setCellValue(); //D4 Alb
 */
                rowIndex++;
            }
        }

        // Auto size columns
        for (int i = 0; i < headerRow.getPhysicalNumberOfCells(); i++) {
            sheet.autoSizeColumn(i);
        }

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        workbook.write(out);
        workbook.close();

        return new ByteArrayInputStream(out.toByteArray());
    }

    private void setCellValueSafe(Row row, int cellIndex, Supplier<String> supplier) {
        try {
            String value = supplier.get();
            if (value != null) {
                row.createCell(cellIndex).setCellValue(value);
            }
        } catch (Exception e) {
            row.createCell(cellIndex).setCellValue("-");
        }
    }

    private static String convertDateToString(LocalDate localDate) {
        Month month = localDate.getMonth();
        int day = localDate.getDayOfMonth();
        return month.getValue() + "월 " + day + "일";
    }
}