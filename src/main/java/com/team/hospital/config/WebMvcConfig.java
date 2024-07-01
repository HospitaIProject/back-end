package com.team.hospital.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // 모든 경로에 대해 CORS 설정을 적용합니다.
                .allowedOrigins("*")  // 모든 origin을 허용합니다. 필요에 따라 특정 origin만 허용할 수도 있습니다.
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // 허용할 HTTP 메소드를 지정합니다.
                .allowedHeaders("*");  // 모든 헤더를 허용합니다.
    }
}