package com.team.hospital.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.team.hospital.api.account.CustomAccountDetailsService;
import com.team.hospital.jwt.jwt.JwtFilter;
import com.team.hospital.jwt.jwt.JwtUtil;
import com.team.hospital.jwt.jwt.LoginFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity // 스프링 시큐리티 필터가 스프링 필터체인에 등록되도록 하는 어노테이션
@RequiredArgsConstructor
public class SecurityConfig {

    private final ObjectMapper objectMapper;
    private final AuthenticationConfiguration authenticationConfiguration;
    private final JwtUtil jwtUtil;
    private final CustomAccountDetailsService customAccountDetailsService;

    //AuthenticationManager Bean 등록
    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        LoginFilter loginFilter = new LoginFilter(objectMapper, authenticationManager(), jwtUtil);
        loginFilter.setFilterProcessesUrl("/api/signIn");

        //csrf disable -> session State Less 이기 때문
        http
                .csrf(AbstractHttpConfigurer::disable);

        //Form 로그인 방식 disable
        http
                .formLogin(AbstractHttpConfigurer::disable);

        //http basic 인증 방식 disable
        http
                .httpBasic(AbstractHttpConfigurer::disable);

        //경로별 인가 작업
        http
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/webjars/**", "/swagger-resources/**").permitAll() //swagger
                        .requestMatchers("/api/account", "/api/signIn").permitAll()  //다른 권한은 로그인한 유저만 추후 바꿔야함
                        .requestMatchers("/api/**").authenticated()
                        .anyRequest().permitAll()); //authenticated



        // 필터 순서 JwtFilter -> 로그인 필터
        http
                .addFilterBefore(new JwtFilter(objectMapper, jwtUtil, customAccountDetailsService), LoginFilter.class);


        // UsernamePasswordAuthenticationFilter 필터 대신 커스텀 한 LoginFilter
        http
                .addFilterAt(loginFilter, UsernamePasswordAuthenticationFilter.class);

        //세선 설정
        http
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}
