package com.team.hospital.patient;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootTest
class PatientServiceTest {

    @Autowired PatientService patientService;
    @Autowired JdbcTemplate jdbcTemplate;

    @AfterEach
    void tearDown2() {
        // H2 데이터베이스 연결 닫기
        jdbcTemplate.execute("SHUTDOWN");
    }

    @Test
    void findUserById() {
    }

    @Test
    void join() {
        patientService.join();
    }
}