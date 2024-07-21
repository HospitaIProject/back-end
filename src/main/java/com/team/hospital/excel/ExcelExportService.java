package com.team.hospital.excel;

import com.team.hospital.api.checkList.CheckList;
import com.team.hospital.api.checkList.CheckListService;
import com.team.hospital.api.checkListBefore.CheckListBeforeDTO;
import com.team.hospital.api.checkListBefore.CheckListBeforeService;
import com.team.hospital.api.checkListBefore.exception.CheckListBeforeNotFoundException;
import com.team.hospital.api.operation.Operation;
import com.team.hospital.api.operation.OperationService;
import com.team.hospital.api.operation.enumType.Diagnosis;
import com.team.hospital.api.operation.enumType.OperationMethod;
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
import java.util.StringJoiner;

@Service
@RequiredArgsConstructor
public class ExcelExportService {

    private final PatientService patientService;
    private final OperationService operationService;
    private final CheckListBeforeService checkListBeforeService;
    private final CheckListService checkListService;

    public ByteArrayInputStream exportToExcel() throws IOException {
        List<Patient> patients = patientService.findAll();

        XSSFWorkbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("hospital_data");

        // Create a cell style with center alignment
        CellStyle cellStyle = workbook.createCellStyle();
        cellStyle.setAlignment(HorizontalAlignment.CENTER);
        cellStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("이름");
        headerRow.createCell(1).setCellValue("등록번호");
        headerRow.createCell(2).setCellValue("수술일");
        headerRow.createCell(3).setCellValue("진단명");
        headerRow.createCell(4).setCellValue("수술명");
        headerRow.createCell(5).setCellValue("POD");
        headerRow.createCell(6).setCellValue("Location");
        headerRow.createCell(7).setCellValue("CP");
        headerRow.createCell(8).setCellValue("ERAS설명");
        headerRow.createCell(9).setCellValue("수술전 ONS");
        headerRow.createCell(10).setCellValue("엔커버 복용");
        headerRow.createCell(11).setCellValue("DVT 예방");
        headerRow.createCell(12).setCellValue("Laxatives");
        headerRow.createCell(13).setCellValue("chewing gum");
        headerRow.createCell(14).setCellValue("JP drain 제거일");
        headerRow.createCell(15).setCellValue("POD#3 이후 JP 제거했는지");
        headerRow.createCell(16).setCellValue("Urinary catheter 수술실에서 제거");
        headerRow.createCell(17).setCellValue("POD#1 이후 urinary catheter 제거");
        headerRow.createCell(18).setCellValue("fluid 제한\n" + "(C:500, R:2000)");
        headerRow.createCell(19).setCellValue("IV line 제거일");
        headerRow.createCell(20).setCellValue("POD#3 이후 라인제거");
        headerRow.createCell(21).setCellValue("PONV예방");
        headerRow.createCell(22).setCellValue("OP day 운동");
        headerRow.createCell(23).setCellValue("POD#1 운동");
        headerRow.createCell(24).setCellValue("POD#2 운동");
        headerRow.createCell(25).setCellValue("POD#3 운동");
        headerRow.createCell(26).setCellValue("OP day Diet\n" + "(Colon)");
        headerRow.createCell(27).setCellValue("POD#1 Diet\n" + "(colon)");
        headerRow.createCell(28).setCellValue("POD#2 Diet\n" + "(rectum)");
        headerRow.createCell(29).setCellValue("수술전 통증 조절약");
        headerRow.createCell(30).setCellValue("수술중 SILT or ITM");
        headerRow.createCell(31).setCellValue("postop pain control");
        headerRow.createCell(32).setCellValue("POD#1 VAS score(아침/점심/저녁)");
        headerRow.createCell(33).setCellValue("POD#2 VAS score(아침/점심/저녁)");
        headerRow.createCell(34).setCellValue("POD#3 VAS score(아침/점심/저녁)");
        headerRow.createCell(35).setCellValue("예방적 항생제");
        headerRow.createCell(36).setCellValue("Hypothermia 예방(Air-warmer)");
        headerRow.createCell(37).setCellValue("수술중 volume");
        headerRow.createCell(38).setCellValue("blood loss");
        headerRow.createCell(39).setCellValue("urine output");
        headerRow.createCell(40).setCellValue("op time");
        headerRow.createCell(41).setCellValue("수술중PONV");
        headerRow.createCell(42).setCellValue("비고");
        headerRow.createCell(43).setCellValue("성공 수");
        headerRow.createCell(44).setCellValue("적용 수");
        headerRow.createCell(45).setCellValue("Compliance rate\n" + "(성공수/적용수)");
        headerRow.createCell(46).setCellValue("pre WBC");
        headerRow.createCell(47).setCellValue("pre Neu");
        headerRow.createCell(48).setCellValue("pre Lym");
        headerRow.createCell(49).setCellValue("pre CRP");
        headerRow.createCell(50).setCellValue("pre Alb");
        headerRow.createCell(51).setCellValue("D0 WBC");
        headerRow.createCell(52).setCellValue("D0 Neu");
        headerRow.createCell(53).setCellValue("D0 Lym");
        headerRow.createCell(54).setCellValue("D0 CRP");
        headerRow.createCell(55).setCellValue("D0 Alb");
        headerRow.createCell(56).setCellValue("D1 WBC");
        headerRow.createCell(57).setCellValue("D1 Neu");
        headerRow.createCell(58).setCellValue("D1 Lym");
        headerRow.createCell(59).setCellValue("D1 CRP");
        headerRow.createCell(60).setCellValue("D1 Alb");
        headerRow.createCell(61).setCellValue("D2 WBC");
        headerRow.createCell(62).setCellValue("D2 Neu");
        headerRow.createCell(63).setCellValue("D2 Lym");
        headerRow.createCell(64).setCellValue("D2 CRP");
        headerRow.createCell(65).setCellValue("D2 Alb");
        headerRow.createCell(66).setCellValue("D3 WBC");
        headerRow.createCell(67).setCellValue("D3 Neu");
        headerRow.createCell(68).setCellValue("D3 Lym");
        headerRow.createCell(69).setCellValue("D3 CRP");
        headerRow.createCell(70).setCellValue("D3 Alb");
        headerRow.createCell(71).setCellValue("D4 WBC");
        headerRow.createCell(72).setCellValue("D4 Neu");
        headerRow.createCell(73).setCellValue("D4 Lym");
        headerRow.createCell(74).setCellValue("D4 CRP");
        headerRow.createCell(75).setCellValue("D4 Alb");

        // Apply the cell style to the header row cells
        for (int i = 0; i < headerRow.getPhysicalNumberOfCells(); i++) {
            headerRow.getCell(i).setCellStyle(cellStyle);
        }

        int rowIndex = 1;
        for (Patient patient : patients) {
            List<Operation> operations = operationService.findAllByPatient(patient.getId());
            if (operations.isEmpty()) {
                continue; // 다음 환자 처리
            }

            Operation operation = operations.get(0);

            // CheckListBefore
            CheckListBeforeDTO checkListBeforeDTO;
            try {
                checkListBeforeDTO = checkListBeforeService.findCheckListBeforeByOperationId(operation.getId());
            } catch (CheckListBeforeNotFoundException e) {
                continue;
            }
            // CheckListBefore

            // CheckList
            List<CheckList> checkLists = checkListService.findAllByOperationId(operation.getId());
            CheckList checkList;
            checkList = checkLists.get(0);
            // CheckList

            Row row = sheet.createRow(rowIndex++);

            // 0st Column
            Cell nameCell = row.createCell(0);
            nameCell.setCellValue(patient.getName());
            nameCell.setCellStyle(cellStyle);
            // 0st Column

            // 1st Column
            Cell patientNumberCell = row.createCell(1);
            patientNumberCell.setCellValue(patient.getPatientNumber());
            patientNumberCell.setCellStyle(cellStyle);
            // 1st Column

            // 2nd Column
            Cell operationDateCell = row.createCell(2);
            LocalDate operationDate = patient.getOperationDate();
            operationDateCell.setCellValue(convertDateToString(operationDate));
            operationDateCell.setCellStyle(cellStyle);
            // 2nd Column

            // 3rd Column
            Cell diagnosisCell = row.createCell(3);
            Diagnosis diagnosis = patient.getDiagnosis();
            diagnosisCell.setCellValue(diagnosis.name());
            diagnosisCell.setCellStyle(cellStyle);
            // 3rd Column

            // 4th Column
            List<OperationMethod> operationMethod = operations.get(0).getOperationMethod();
            StringJoiner operationMethods = new StringJoiner("\n");
            for (OperationMethod method : operationMethod) {
                operationMethods.add(method.name());
            }
            Cell operationMethodCell = row.createCell(4);
            operationMethodCell.setCellValue(operationMethods.toString());
            operationMethodCell.setCellStyle(cellStyle);
            // 4th Column

            // 5th Column
            Cell podCell = row.createCell(5);
            int totalDays = patient.getTotalHospitalizedDays();
            podCell.setCellValue(totalDays);
            podCell.setCellStyle(cellStyle);
            // 5th Column

            // 6th Column
            Cell locationCell = row.createCell(6);
            locationCell.setCellValue("Location(임시)");
            locationCell.setCellStyle(cellStyle);
            // 6th Column

            // 7th Column
            Cell cpCell = row.createCell(7);
            cpCell.setCellValue("CP(임시)");
            cpCell.setCellStyle(cellStyle);
            // 7th Column

            // 8th Column
            Cell erasCell = row.createCell(8);
            erasCell.setCellValue(checkListBeforeDTO.getExplainedPreOp().name());
            erasCell.setCellStyle(cellStyle);
            // 8th Column

            // 9th Column
            Cell onsCell = row.createCell(9);
            onsCell.setCellValue(checkListBeforeDTO.getOnsPreOp2hr().name());
            onsCell.setCellStyle(cellStyle);
            // 9th Column

            // 10th Column
            Cell nCoverCell = row.createCell(10);
            nCoverCell.setCellValue(checkListBeforeDTO.getOnsPostBowelPrep().name());
            nCoverCell.setCellStyle(cellStyle);
            // 10th Column

            // 11th Column
            Cell dvtCell = row.createCell(11);
            dvtCell.setCellValue(checkListBeforeDTO.getDvtPrevention().name());
            dvtCell.setCellStyle(cellStyle);
            // 11th Column

            // 12th Column Laxatives
            Cell laxCell = row.createCell(12);
            laxCell.setCellValue("Laxatives(임시)");
            laxCell.setCellStyle(cellStyle);
//            checkListBeforeDTO.getAntibioticPreIncision().name()
            // 12th Column

            // 13th Column chewing gum
            Cell chewingGumCell = row.createCell(13);
            chewingGumCell.setCellValue("Chewing gum(임시)");
            chewingGumCell.setCellStyle(cellStyle);
            // 13th Column

            // 14th Col
            Cell jpDateCell = row.createCell(14);
            LocalDate jpRemovalDate = checkList.getJpDrainRemoval().getRemovedDate();
            jpDateCell.setCellValue(convertDateToString(jpRemovalDate));
            jpDateCell.setCellStyle(cellStyle);
            // 14th Col

            // 15th Col
            Cell jpAfterPod3 = row.createCell(15);
            jpAfterPod3.setCellValue("POD#3 이후 제거 여부(임시)");
            jpAfterPod3.setCellStyle(cellStyle);
            // 15th Col

            // 16th Col
            Cell urinCathCell = row.createCell(16);
            urinCathCell.setCellValue(checkList.getCatheterRemoval().getOption().name());
            urinCathCell.setCellStyle(cellStyle);
            // 16th Col

            // 17th col
            Cell urinCathAfterPod1 = row.createCell(17);
            urinCathAfterPod1.setCellValue("POD#1 이후 urin cath 제거(임시)");
            urinCathAfterPod1.setCellStyle(cellStyle);
            // 17th col

            // 18th Col
            Cell fluidCell = row.createCell(18);
            fluidCell.setCellValue(checkList.getIvFluidRestrictionPostOp().getOption().name());
            fluidCell.setCellStyle(cellStyle);
            // 18th Col

            // 19th Col
            Cell ivRmvDateCell = row.createCell(19);
            LocalDate ivRmvDate = checkList.getIvLineRemoval().getRemovedDate();
            ivRmvDateCell.setCellValue(convertDateToString(ivRmvDate));
            ivRmvDateCell.setCellStyle(cellStyle);
            // 19th Col
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

    private static String convertDateToString(LocalDate localDate) {
        Month month = localDate.getMonth();
        int day = localDate.getDayOfMonth();
        return month.getValue() + "월 " + day + "일";
    }
}