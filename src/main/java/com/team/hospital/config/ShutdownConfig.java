package com.team.hospital.config;

import jakarta.annotation.PreDestroy;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

@Configuration
@Slf4j
public class ShutdownConfig {

    @Autowired private JdbcTemplate jdbcTemplate;

    @PreDestroy
    public void shutdown() {
        // H2 데이터베이스 연결 닫기
        log.info("TTTTTTTTTTTTTTTTTTTEEEEEEEEEEEEEEEEEEEEEESSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTTT");
        jdbcTemplate.execute("SHUTDOWN");
    }
}