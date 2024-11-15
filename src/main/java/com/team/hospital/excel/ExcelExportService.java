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
import java.util.ArrayList;
import java.util.List;
import java.util.function.Supplier;
import java.util.stream.Collectors;

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
                "No",                                       //0     A
                "환자이름",                                   //1   B
                "등록번호",                                   //2   C
                "입원일",                                    //3   D
                "수술일",                                    //4   E
                "퇴원일",                                    //5   F
                "POD(일)",                                  //6  G

                "진단명\n" +                                 //7   H
                        "1: Ascending colon\n" +
                        "2:  HF colon cancer \n" +
                        "3: Transverse colon \n" +
                        "4: Splenic flexure colon\n" +
                        "5: Descending colon  \n" +
                        "6: Sigmoid colon \n" +
                        "7: Rectosigmoid colon \n" +
                        "8: Rectum \n" +
                        "9: cecum\n" +
                        "10: Appendiceal\n" +
                        "11: Anus ",

                "수술명\n" +                                //8    I
                        "1: RHC, ERHC\n" +
                        "2: T-colectomy\n" +
                        "3: LHC, ELHC\n" +
                        "4: AR\n" +
                        "5: LAR\n" +
                        "6: ISR\n" +
                        "7: APR\n" +
                        "8: subtotal, total colectomy \n" +
                        "9: Total proctocolectomy\n" +
                        "10: 기타 (서술) ",

                "암 Location\n" +
                        "1: Rt sided colon \n" +
                        "2: Lt sided colon \n" +
                        "3: rectum \n" +
                        "4: multiple",              //9 J

                "수술approah \n" +
                        "1: open\n" +
                        "2: Laparoscopic_multiport\n" +
                        "3: Laparoscopic_singleport\n" +
                        "4: Robotic_multiport\n" +
                        "5: Robotic_singleport\n" +
                        "6: open conversion ",           //10   K

                "적용한 CP\n" +
                        "1: colon\n" +
                        "2: rectum",           //11 L

                "ERAS설명\n" +
                        "1 = YES\n" +
                        "0 = No",            //12   M

                "수술전 ONS\n" +
                        "1 = YES\n" +
                        "0 = No",         //13  N

                "엔커버 복용\n" +
                        "1 = YES\n" +
                        "0 = No",    // 14  O


                "DVT 예방\n" +
                        "1 = YES\n" +
                        "0 = No",      //15 P

                "예방적 항생제\n" +
                        "1 = YES\n" +
                        "0 = No",        //16   Q

                "수술전 통증\n" +
                        "조절약\n" +
                        "1 = YES\n" +
                        "0 = No",                       //17    R

                "Hypothermia 예방\n" +
                        "(Air-warmer)\n" +
                        "1 = YES\n" +
                        "0 = No",                            //18   S

                "수술중 volume 2-4cc/hr였는지\n" +
                        "1 = YES\n" +
                        "0 = No",                           //19    T

                "수술중 PONV\n" +
                        "1 = YES\n" +
                        "0 = No",                       //20    U

                "수술중 \n" +
                        "pain control 유무\n" +
                        "1 = YES\n" +
                        "0 = No",                     //21  V

                "수술중 통증 조절 종류\n" +
                        "1: TAPB\n" +
                        "2: WI\n" +
                        "3: ITM\n" +
                        "4: 기타 ",              //22 W

                "Laxatives\n" +
                        "1 = YES\n" +
                        "0 = No",                      //23 X

                "chewing gum\n" +
                        "1 = YES\n" +
                        "0 = No",   //24    Y

                "수술후 당일 PONV 예방\n" +
                        "1 = YES\n" +
                        "0 = No",           //25    Z

                "fluid 제한\n" +
                        "(C:500, R:2000)\n" +
                        "1 = YES\n" +
                        "0 = No",                           //26

                "postop pain control\n" +
                        "1 = no opioid\n" +
                        "0 = opioid",  //27

                "POD#1 이후 JP 제거했는지\n" +
                        "1 = YES\n" +
                        "0 = No",                //28

                "JP drain 제거일\n" +
                        "(서술)",           //29

                "Urinary catheter\n" +
                        "수술실에서 제거\n" +
                        "1 = YES\n" +
                        "0 = No",                          //30

                "Urinary catheter 제거한 날짜\n" +
                        "(서술)",                  //31

                "POD#3 이후\n" +
                        "IV 라인제거\n" +
                        "1 = YES\n" +
                        "0 = No",                   //32

                "IV 라인제거\n" +
                        "날짜\n" +
                        "(서술)",                   //33

                "OP day\n" +
                        "운동\n" +
                        "1 = YES\n" +
                        "0 = No",                   //34

                "POD#1\n" +
                        "운동\n" +
                        "1 = YES\n" +
                        "0 = No",                 //35

                "POD#2\n" +
                        "운동\n" +
                        "1 = YES\n" +
                        "0 = No",                  //36

                "POD#3\n" +
                        "운동\n" +
                        "1 = YES\n" +
                        "0 = No",                  //37

                "OP day Diet\n" +
                        "1 = YES\n" +
                        "0 = No",                              //38

                "POD#1 Diet\n" +
                        "1 = YES\n" +
                        "0 = No",                             //39

                "POD#2 Diet\n" +
                        "1 = YES\n" +
                        "0 = No",          //40

                "ERAS 성공 항목수",                //41

                "ERAS 적용한 항목수",                //42

                "Compliance\n" +
                        "rate\n" +
                        "(성공수/적용수)*100",                //43

                "OP day\n" +
                        "VAS score\n" +
                        "(점심)",                                  //44

                "OP day\n" +
                        "VAS score\n" +
                        "(저녁)",                                //45

                "POD#1 \n" +
                        "VAS score\n" +
                        "(아침)",                                      //46

                "POD#1 \n" +
                        "VAS score\n" +
                        "(점심)",                          //47

                "POD#1 \n" +
                        "VAS score\n" +
                        "(저녁)",          //48

                "POD#2 \n" +
                        "VAS score\n" +
                        "(아침)",          //49

                "POD#2 \n" +
                        "VAS score\n" +
                        "(점심)",          //50

                "POD#2 \n" +
                        "VAS score\n" +
                        "(저녁)",          //51

                "POD#3 \n" +
                        "VAS score\n" +
                        "(아침)",           //52

                "POD#3 \n" +
                        "VAS score\n" +
                        "(점심)",           //53

                "POD#3 \n" +
                        "VAS score\n" +
                        "(저녁)",             //54

                "blood loss",               //55
                "urine output",                   //56
                "op time",               //57

//                "D1 Neu", "D1 Lym", "D1 CRP", "D1 Alb",
//                "D2 WBC", "D2 Neu", "D2 Lym", "D2 CRP", "D2 Alb",
//                "D3 WBC", "D3 Neu", "D3 Lym", "D3 CRP", "D3 Alb",
//                "D4 WBC", "D4 Neu", "D4 Lym", "D4 CRP", "D4 Alb"
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

                Row row = sheet.createRow(rowIndex); // 각 수술마다 새로운 행 생성

                List<OperationMethod> operationMethods = op.getOperationMethods();

                String result = operationMethods.stream()
                        .map(opm -> opm.getOperationType().getName())//이 부분 숫자 필요
                        .collect(Collectors.joining(", "));

                // CheckList 처리 (Before, During, After)
                CheckListItem checkListItem = checkListItemRepository.findCheckListItemByOperation(op);
                CheckListBefore checkListBefore = checkListBeforeRepository.findCheckListBeforeByCheckListItem(checkListItem);
                CheckListDuring checkListDuring = checkListDuringRepository.findCheckListDuringByCheckListItem(checkListItem);
                CheckListAfter checkListAfter = checkListAfterRepository.findCheckListAfterByCheckListItem(checkListItem);

                if (checkListBefore == null || checkListDuring == null || checkListAfter == null || checkList.size() < 3)
                    continue;


                row.createCell(0).setCellValue(rowIndex);                                                                                  //NO
                row.createCell(1).setCellValue(p.getName());                                                                              //환자이름
                row.createCell(2).setCellValue(p.getPatientNumber());                                                                    //환자번호
                row.createCell(3).setCellValue(convertDateToString(p.getHospitalizedDate()));                                           //입원일
                row.createCell(4).setCellValue(convertDateToString(p.getOperationDate()));                                             //수술일
                setStringCellValueSafe(row, 5, () -> convertDateToString(p.getDischargedDate()));                                     //퇴원일
                row.createCell(6).setCellValue(p.getTotalHospitalizedDays());                                                        //POD(일)

                row.createCell(7).setCellValue(p.getDiagnosis().getNum());                                                          //진단명
                row.createCell(8).setCellValue(result);                                                                     //수술명 -> 숫자 필요

                row.createCell(9).setCellValue(p.getLocation().getNum());                                                         // 암 Location 1: colon 2: rctum
                row.createCell(10).setCellValue(op.getOperationApproach().getNum());                                              //수술 approah CP 1: colon 2: rectum
                row.createCell(11).setCellValue("모름");                                                           //적용한 CP


                // 수술 전 정보 처리
                setIntCellValueSafe(row, 12, () -> checkListBefore.getExplainedPreOp().getOption().getNum());       //ERAS
                setIntCellValueSafe(row, 13, () -> checkListBefore.getOnsPreOp2hr().getOption().getNum());//수술전 ONS
                setIntCellValueSafe(row, 14, () -> checkListBefore.getOnsPostBowelPrep().getOption().getNum());//엔커버
                setIntCellValueSafe(row, 15, () -> checkListBefore.getDvtPrevention().getOption().getNum());   //DVT
                setIntCellValueSafe(row, 16, () -> checkListBefore.getAntibioticPreIncision().getOption().getNum()); //예방적 항생제
                setIntCellValueSafe(row, 17, () -> checkListBefore.getPainMedPreOp().getOption().getNum());//수술전 통증 조절약

                // 수술 중 정보 처리
                setIntCellValueSafe(row, 18, () -> checkListDuring.getMaintainTemp().getOption().getNum());//Hypothermia 예방
                setIntCellValueSafe(row, 19, () -> checkListDuring.getFluidRestriction().getOption().getNum()); //수술중 volume 2~4
                setIntCellValueSafe(row, 20, () -> checkListDuring.getAntiNausea().getOption().getNum()); //수술중 PONV
                setIntCellValueSafe(row, 21, () -> checkListDuring.getPainControl().getOption().getNum()); //수술중 pain control 유무
                setIntCellValueSafe(row, 22, () -> checkListDuring.getPainControlMethod().getPainControlMethod().getNum()); //5. 수술 중 통증 종류도 항목화 해주세요 (서술 아닙니다.)


                // 수술 후 정보 처리
                setIntCellValueSafe(row, 25, () -> checkListAfter.getAntiNauseaPostOp().getOption().getNum());                  //수술 후 당일 PONV 예방


//                setIntCellValueSafe(row, 28, () -> checkListAfter.getJpDrainRemoval().getOption().getNum());
//                setStringCellValueSafe(row, 29, () -> convertDateToString(checkListAfter.getJpDrainRemoval().getRemovedDate()));      //JP drain 제거일
                setIntCellValueSafe(row, 30, () -> checkListAfter.getCatheterRemoval().getOption().getNum());                   //Urinary catheter 수술실에서 제거
                setStringCellValueSafe(row, 31, () -> convertDateToString(checkListAfter.getCatheterRemoval().getRemovedDate()));     //Urinary catheter 제거 날짜

//                setIntCellValueSafe(row, 32, () -> checkListAfter.getIvLineRemoval().getOption().getNum());                     //POD#3 이후 IV 라인제거
//                setStringCellValueSafe(row, 33, () -> convertDateToString(checkListAfter.getIvLineRemoval().getRemovedDate()));        //IV 라인 제거 날짜

                setIntCellValueSafe(row, 34, () -> checkListAfter.getPostExercise().getOption().getNum());                      //OP day 운동
                setIntCellValueSafe(row, 37, () -> checkListAfter.getPostMeal().getOption().getNum()); //OP day Diet

                row.createCell(41).setCellValue("모름"); //ERAS 성공 항목수
                row.createCell(42).setCellValue(checkListItemRepository.countTrueFields(op)); //ERAS 적용한 항목수

                // 합병증 정보 처리 (Complication)
                complicationRepository.findByOperationId(op.getId()).ifPresent(complication -> {
                    row.createCell(43).setCellValue(complication.getComplicationScore());  //Compliance rate (성공수/적용수)*100
                });

                setIntCellValueSafe(row, 44, () -> checkListAfter.getPostPain().getEvening());  //OP day VAS score (점심)
                setIntCellValueSafe(row, 45, () -> checkListAfter.getPostPain().getNight());//OP day VAS score (저녁)

                row.createCell(55).setCellValue(op.getBloodLoss()); //blood loss
                row.createCell(56).setCellValue("모름"); //urine output
                row.createCell(57).setCellValue(op.getTotalOperationTime()); //op time

                List<Integer> gumBooleanList = new ArrayList<>();
                List<Integer> laxativesList = new ArrayList<>();

                List<Integer> fluid_limitList = new ArrayList<>();
                List<Integer> postop_pain_controlList = new ArrayList<>();

                //POD#0 부터 시작 하기 위해
                fluid_limitList.add(checkListAfter.getIvFluidRestrictionPostOp().getOption().getNum());
                postop_pain_controlList.add(checkListAfter.getNonOpioidPainControl().getOption().getNum()); //이 부분은 no opiod = 1, opopod = 0 임 반대

                for (CheckList c : checkList) {

                    if (c.getPodThreeIvLineRemoval() != null){
                        setIntCellValueSafe(row, 32, () -> c.getPodThreeIvLineRemoval().getOption().getNum());                     //POD#3 이후 IV 라인제거
                        setStringCellValueSafe(row, 33, () -> convertDateToString(c.getPodThreeIvLineRemoval().getRemovedDate()));        //IV 라인 제거 날짜
                    }

                    // 32항목이랑 중복 확인부탁
                    //setIntCellValueSafe(row, 28, () -> c.getPodThreeJpDrainRemoval().getOption().getNum());       //POD#3 -> 로 변경 POD#1 이후 JP 제거했는지

                    //첫째날 gum
                    if (c.getPodOneGumChewing() != null) {
                        gumBooleanList.add(c.getPodOneGumChewing().getOption().getNum());
                    }

                    //둘째날 gum
                    if (c.getPodThreeGumChewing() != null) {

                        gumBooleanList.add(c.getPodThreeGumChewing().getOption().getNum());
                    }

                    //셋째날 gum
                    if (c.getPodThreeGumChewing() != null) {
                        gumBooleanList.add(c.getPodThreeGumChewing().getOption().getNum());
                    }

                    //첫째날 laxa
                    if (c.getPodOneGiStimulant() != null) {
                        laxativesList.add(c.getPodOneGiStimulant().getOption().getNum());
                    }

                    //둘째날 laxa
                    if (c.getPodTwoGiStimulant() != null) {
                        laxativesList.add(c.getPodTwoGiStimulant().getOption().getNum());
                    }

                    //셋째날 laxa
                    if (c.getPodThreeGiStimulant() != null) {
                        laxativesList.add(c.getPodThreeGiStimulant().getOption().getNum());
                    }

                    //첫째날 fluid
                    if (c.getPodOneIvFluidRestriction() != null) {
                        fluid_limitList.add(c.getPodOneIvFluidRestriction().getOption().getNum());
                    }

                    //둘째날 fluid
                    if (c.getPodTwoIvFluidRestriction() != null) {
                        fluid_limitList.add(c.getPodTwoIvFluidRestriction().getOption().getNum());
                    }

                    //셋째날 fluid
                    if (c.getPodThreeIvFluidRestriction() != null) {
                        fluid_limitList.add(c.getPodThreeIvFluidRestriction().getOption().getNum());
                    }


                    //첫째날 postop
                    if (c.getPodOneNonOpioidPainControl() != null) {
                        postop_pain_controlList.add(c.getPodOneNonOpioidPainControl().getOption().getNum());
                    }

                    //둘째날 postop
                    if (c.getPodTwoNonOpioidPainControl() != null) {
                        postop_pain_controlList.add(c.getPodTwoNonOpioidPainControl().getOption().getNum());
                    }

                    //셋째날 postop
                    if (c.getPodThreeNonOpioidPainControl() != null) {
                        postop_pain_controlList.add(c.getPodThreeNonOpioidPainControl().getOption().getNum());
                    }


                    if (c.getPodOneExercise() != null) {
                        setIntCellValueSafe(row, 35, () -> c.getPodOneExercise().getOption().getNum());
                    } ///POD#1 운동 1 = YES 0 = No

                    if (c.getPodTwoExercise() != null) {
                        setIntCellValueSafe(row, 36, () -> c.getPodTwoExercise().getOption().getNum());
                    } //POD#2 운동 1 = YES 0 = No

                    if (c.getPodThreeExercise() != null) {
                        setIntCellValueSafe(row, 37, () -> c.getPodThreeExercise().getOption().getNum());
                    } //POD#3 운동 1 = YES 0 = No

                    if (c.getPodOneMeal() != null) {
                        setIntCellValueSafe(row, 38, () -> c.getPodOneMeal().getOption().getNum());
                    } //POD#1 Diet 1 = YES 0 = No

                    if (c.getPodTwoMeal() != null) {
                        setIntCellValueSafe(row, 39, () -> c.getPodTwoMeal().getOption().getNum());
                    } //POD#2 Diet 1 = YES 0 = No


                    if (c.getPodOnePain() != null) {
                        setIntCellValueSafe(row, 46, () -> c.getPodOnePain().getDay());
                        setIntCellValueSafe(row, 47, () -> c.getPodOnePain().getEvening());
                        setIntCellValueSafe(row, 48, () -> c.getPodOnePain().getNight());
                    } //POD#1 VAS score(아침/점심/저녁)

                    if (c.getPodTwoPain() != null) {
                        setIntCellValueSafe(row, 49, () -> c.getPodTwoPain().getDay());
                        setIntCellValueSafe(row, 50, () -> c.getPodTwoPain().getEvening());
                        setIntCellValueSafe(row, 51, () -> c.getPodTwoPain().getNight());
                    } //"POD#2 VAS score(아침/점심/저녁)

                    if (c.getPodThreePain() != null) {
                        setIntCellValueSafe(row, 52, () -> c.getPodThreePain().getDay());
                        setIntCellValueSafe(row, 53, () -> c.getPodThreePain().getEvening());
                        setIntCellValueSafe(row, 54, () -> c.getPodThreePain().getNight());
                    } //"POD#3 VAS score(아침/점심/저녁)
                }

                setIntCellValueSafe(row, 23, () -> laxativesList.stream()   //Laxatives
                        .reduce(1, (a, b) -> a & b));

                setIntCellValueSafe(row, 24, () -> gumBooleanList.stream()
                        .reduce(1, (a, b) -> a & b));               //chewing gum

                setIntCellValueSafe(row, 26, () -> fluid_limitList.stream()
                        .reduce(1, (a, b) -> a & b));          //fluid 제한

                int postop_Result = postop_pain_controlList.stream().reduce(1, (a, b) -> a & b);

                if (postop_Result == 1)
                    setIntCellValueSafe(row, 27, () -> 0);          //postop pain control 1 = noOpioid 0 = opioid -> 이 부분은 반대임
                else setIntCellValueSafe(row, 27, () -> 1);


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

    private void setIntCellValueSafe(Row row, int cellIndex, Supplier<Integer> supplier) {
        try {
            Integer value = supplier.get();
            if (value != null) {
                row.createCell(cellIndex).setCellValue(value);
            }
        } catch (Exception e) {
            row.createCell(cellIndex).setCellValue("-");
        }
    }

    private void setStringCellValueSafe(Row row, int cellIndex, Supplier<String> supplier) {
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