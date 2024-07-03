package com.team.hospital.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        Server server = new Server();
        server.setUrl("http://localhost:8080");

        return new OpenAPI()
                .components(new Components())
                .info(apiInfo())
                .servers(List.of(server));
    }

    private Info apiInfo() {
        return new Info()
                .title("성모병원")
                .description("성모 병원 환자 관리 어플리케이션")
                .version("1.0.0");
    }
}