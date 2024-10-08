//package com.team.hospital.api.checkList;
//
//import jakarta.transaction.Transactional;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import java.util.List;
//
//@SpringBootTest
//class CheckListServiceTest {
//
//    @Autowired CheckListService checkListService;
//
//    @Test
//    @Transactional
//    void test() {
//        List<CheckList> checks1 = checkListService.checks(2L);
//        System.out.println("checks1.size() = " + checks1.size());
//        checks1.stream().forEach(checkList -> System.out.println(checkList.getDayOfCheckList()));
//
//
//
//    }
//
//
//}