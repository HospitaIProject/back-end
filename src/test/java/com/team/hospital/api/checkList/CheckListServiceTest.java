//package com.team.hospital.api.checkList;
//
//import com.team.hospital.api.operation.Operation;
//import com.team.hospital.api.operation.OperationService;
//import jakarta.transaction.Transactional;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import java.time.LocalDate;
//import java.time.temporal.ChronoUnit;
//import java.util.ArrayList;
//import java.util.Collections;
//import java.util.List;
//
//@SpringBootTest
//class CheckListServiceTest {
//
//    @Autowired CheckListService checkListService;
//    @Autowired
//    OperationService operationService;
//
//    @Test
//    @Transactional
//    void test() {
//        Operation operation = operationService.findOperationById(1L);
//        List<CheckList> checkLists = checkListService.findAllByOperationId(1L);
//        LocalDate operationDate = operation.getPatient().getOperationDate();    // 수술날짜
//        LocalDate dayOfCheckList = checkLists.get(checkLists.size() - 1).getDayOfCheckList(); // 마지막 등록된 체크리스트 날짜
//        int daysBetween = (int) ChronoUnit.DAYS.between(operationDate, dayOfCheckList);
//
//        List<CheckList> checks = new ArrayList<>(Collections.nCopies(daysBetween, null)); // daysBetween + 1로 변경
//
//        for (CheckList checkList : checkLists) {
//            LocalDate dayOfCheckList1 = checkList.getDayOfCheckList();
//            int betweenDay = (int) ChronoUnit.DAYS.between(operationDate, dayOfCheckList1);
//            checks.set(betweenDay - 1, checkList); // set 메서드로 변경
//        }
//
//        for (CheckList check : checks) {
//            try {
//                System.out.println(check.getDayOfCheckList());
//            } catch (NullPointerException e) {
//                System.out.println("null");
//            }
//        }
//    }
//
//    @Test
//    @Transactional
//    void temp() {
//        boolean b = checkListService.checkCreatedToday(1L);
//        System.out.println(b);
//    }
//}