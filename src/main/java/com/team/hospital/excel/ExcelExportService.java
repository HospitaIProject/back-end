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
                "환자이름", "등록번호", "입원일", "수술일", "퇴원일", "POD(일)", "진단명", "수술명", "Location", "적용한 CP",
                "ERAS설명", "수술전 ONS", "엔커버 복용", "DVT 예방", "예방적 항생제", "수술전 통증 조절약",
                "Hypothermia 예방(Air-warmer)", "수술중 volume 2-4cc/hr", "수술중 PONV", "수술중 pain control",
                "수술중 통증 조절 종류 (서술)", "Laxatives", "chewing gum", "수술후 당일 PONV 예방", "fluid 제한",
                "postop pain control", "POD#3 이후 JP 제거했는지", "JP drain 제거일", "Urinary catheter 수술실에서 제거",
                "Urinary catheter 제거한 날짜 (서술)", "POD#3 이후 IV 라인제거", "IV 라인제거 날짜", "OP day 운동",
                "POD#1 운동", "POD#2 운동", "POD#3 운동", "OP day Diet", "POD#1 Diet", "POD#2 Diet",
                "ERAS 성공 항목수", "ERAS 적용한 항목수", "Compliance rate (성공수/적용수)*100",
                "POD#1 VAS score(아침/점심/저녁)", "POD#2 VAS score(아침/점심/저녁)", "POD#3 VAS score(아침/점심/저녁)",
                "blood loss", "urine output", "op time"
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
                Row row = sheet.createRow(rowIndex); // 각 수술마다 새로운 행 생성

                StringBuilder sb = new StringBuilder(); // 수술명
                List<OperationMethod> operationMethods = op.getOperationMethods();

                for (OperationMethod opm : operationMethods) {
                    sb.append(opm.getOperationType().getName()).append(", ");
                }

                // 기본 환자 및 수술 정보 채우기
                row.createCell(0).setCellValue(p.getName());                                   // 환자이름
                row.createCell(1).setCellValue(p.getPatientNumber());                         // 등록번호
                row.createCell(2).setCellValue(convertDateToString(p.getHospitalizedDate()));                         // 입원일
                row.createCell(3).setCellValue(convertDateToString(p.getOperationDate()));                         // 수술일

                setCellValueSafe(row, 4, () -> convertDateToString(p.getDischargedDate()));  // 퇴원일

                row.createCell(5).setCellValue(p.getTotalHospitalizedDays());             // POD(일)
                row.createCell(6).setCellValue(p.getDiagnosis().name());                 // 진단명
                row.createCell(7).setCellValue(sb.toString());                          // 수술명
                row.createCell(8).setCellValue(p.getLocation().name());                // Location
                row.createCell(9).setCellValue(op.getOperationApproach().name());       // 적용한 CP

                // CheckList 처리 (Before, During, After)
                CheckListItem checkListItem = checkListItemRepository.findCheckListItemByOperation(op);
                CheckListBefore checkListBefore = checkListBeforeRepository.findCheckListBeforeByCheckListItem(checkListItem);
                CheckListDuring checkListDuring = checkListDuringRepository.findCheckListDuringByCheckListItem(checkListItem);
                CheckListAfter checkListAfter = checkListAfterRepository.findCheckListAfterByCheckListItem(checkListItem);

                // 수술 전 정보 처리
                setCellValueSafe(row, 10, () -> checkListBefore.getExplainedPreOp().getOption().name());  // ERAS 설명
                setCellValueSafe(row, 11, () -> checkListBefore.getOnsPreOp2hr().getOption().name());     // 수술 전 ONS
                setCellValueSafe(row, 12, () -> checkListBefore.getOnsPostBowelPrep().getOption().name()); // 엔커버 복용
                setCellValueSafe(row, 13, () -> checkListBefore.getDvtPrevention().getOption().name());  // DVT 예방
                setCellValueSafe(row, 14, () -> checkListBefore.getAntibioticPreIncision().getOption().name());  // 예방적 항생제
                setCellValueSafe(row, 15, () -> checkListBefore.getPainMedPreOp().getOption().name());    // 수술 전 통증 조절약

                // 수술 중 정보 처리
                setCellValueSafe(row, 16, () -> checkListDuring.getMaintainTemp().getOption().name());    // Hypothermia 예방
                setCellValueSafe(row, 17, () -> checkListDuring.getFluidRestriction().getOption().name()); // 수술 중 Volume 제한
                setCellValueSafe(row, 18, () -> checkListDuring.getAntiNausea().getOption().name());      // 수술 중 PONV 예방
                setCellValueSafe(row, 19, () -> checkListDuring.getPainControl().getOption().name());     // 수술 중 통증 조절
                setCellValueSafe(row, 20, () -> checkListDuring.getPainControl().getRemarks());           // 수술 중 통증 조절 종류 (서술)

                // 수술 후 정보 처리
                setCellValueSafe(row, 21, () -> checkListAfter.getGiStimulant().getOption().name());     // Laxatives
                setCellValueSafe(row, 22, () -> checkListAfter.getGumChewing().getOption().name());      // Chewing gum
                setCellValueSafe(row, 23, () -> checkListAfter.getAntiNauseaPostOp().getOption().name()); // PONV 예방
                setCellValueSafe(row, 24, () -> checkListAfter.getIvFluidRestrictionPostOp().getOption().name()); // IV Fluid 제한
                setCellValueSafe(row, 25, () -> checkListAfter.getNonOpioidPainControl().getOption().name());  // Pain control
                setCellValueSafe(row, 26, () -> checkListAfter.getJpDrainRemoval().getOption().name());  // JP 제거
                setCellValueSafe(row, 27, () -> checkListAfter.getJpDrainRemoval().getRemovedDate().toString());    // JP 제거일
                setCellValueSafe(row, 28, () -> checkListAfter.getCatheterRemoval().getOption().name());  // Urinary catheter 제거
                setCellValueSafe(row, 29, () -> checkListAfter.getCatheterRemoval().getRemovedDate().toString());   // Urinary catheter 제거일
                setCellValueSafe(row, 30, () -> checkListAfter.getIvLineRemoval().getOption().name());   // IV 라인 제거
                setCellValueSafe(row, 31, () -> checkListAfter.getIvLineRemoval().getRemovedDate().toString());     // IV 라인 제거일
                setCellValueSafe(row, 32, () -> checkListAfter.getPostExercise().getOption().name());    // OP day 운동

                // CheckList 데이터 처리 (POD1, POD2, POD3)
                List<CheckList> checkList = checkListRepository.findAllByOperationId(op.getId());

                for (CheckList c : checkList) {

                    if (c.getPodOneExercise() != null) {
                        setCellValueSafe(row, 33, () -> c.getPodOneExercise().getOption().name());
                    }

                    if (c.getPodTwoExercise() != null) {
                        setCellValueSafe(row, 34, () -> c.getPodTwoExercise().getOption().name());
                    }

                    if (c.getPodThreeExercise() != null) {
                        setCellValueSafe(row, 35, () -> c.getPodThreeExercise().getOption().name());
                    }

                    if (c.getPodOneMeal() != null) {
                        setCellValueSafe(row, 37, () -> c.getPodOneMeal().getOption().name());
                    }

                    if (c.getPodTwoMeal() != null) {
                        setCellValueSafe(row, 38, () -> c.getPodTwoMeal().getOption().name());
                    }

                    if (c.getPodOnePain() != null) {
                        setCellValueSafe(row, 42, () -> "아침: " + c.getPodOnePain().getDay() + "/점심: "
                                + c.getPodOnePain().getEvening() + "/저녁: "
                                + c.getPodOnePain().getNight());
                    }

                    if (c.getPodTwoPain() != null) {
                        setCellValueSafe(row, 43, () -> "아침: " + c.getPodTwoPain().getDay() + "/점심: "
                                + c.getPodTwoPain().getEvening() + "/저녁: "
                                + c.getPodTwoPain().getNight());
                    }

                    if (c.getPodThreePain() != null) {
                        setCellValueSafe(row, 44, () -> "아침: " + c.getPodThreePain().getDay() + "/점심: "
                                + c.getPodThreePain().getEvening() + "/저녁: "
                                + c.getPodThreePain().getNight());
                    }
                }

                // 합병증 정보 처리 (Complication)
                complicationRepository.findByOperationId(op.getId()).ifPresent(complication -> {
                    row.createCell(41).setCellValue(complication.getComplicationScore()); // Compliance rate
                });

                // 기타 정보
                row.createCell(45).setCellValue(op.getBloodLoss());                           // blood loss
                row.createCell(47).setCellValue(op.getTotalOperationTime());                 // op time

                row.createCell(36).setCellValue("모름");//36 OP day Diet
                row.createCell(39).setCellValue("모름");//39 ERAS 성공 항목수
                row.createCell(40).setCellValue("모름");//40 ERAS 적용한 항목수
                row.createCell(46).setCellValue("모름");//46 urine output


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

        return new

                ByteArrayInputStream(out.toByteArray());
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