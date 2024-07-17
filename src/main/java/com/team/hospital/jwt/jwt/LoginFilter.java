package com.team.hospital.jwt.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.team.hospital.api.account.dto.CustomAccountDetails;
import com.team.hospital.api.account.dto.LoginRequest;
import com.team.hospital.api.account.dto.LoginResponse;
import com.team.hospital.api.account.dto.TokenDTO;
import com.team.hospital.api.apiResponse.ErrorResponse;
import com.team.hospital.api.apiResponse.SuccessResponse;
import com.team.hospital.exception.ErrorCode;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

// 이 필터는 /login 에 접근할 때만 동작
@RequiredArgsConstructor
@Slf4j
public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final ObjectMapper objectMapper;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Override
    protected String obtainUsername(HttpServletRequest request) {
        return request.getParameter("adminID");
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        try {
            LoginRequest loginRequest = objectMapper.readValue(request.getInputStream(), LoginRequest.class);

            //스프링 시큐리티에서 email 과 password 를 검증하기 위해서는 token 에 담아야 한다.
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(loginRequest.getAdminID(), loginRequest.getAdminPW(), null);

            //token 에 담은 검증을 위한 AuthenticationManger 로 전달 ,
            // 이 부분에서 AuthenticationManager 의 구성요소인 CustomUserDetailsService loadUserByUsername 메소드 실행
            return authenticationManager.authenticate(authToken);
        } catch (IOException e) {
            throw new RuntimeException("잘못된 요청 형식입니다.", e);
        }
    }

    //로그인 성공 시 실행하는 메소드 (여기서 JWT 발급)
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException{

        //Spring Security 가 사용자 인증 후 Authentication 객체에 저장된 사용자 정보를 getPrincipal 로 가져옴
        CustomAccountDetails customAccountDetails = (CustomAccountDetails) authentication.getPrincipal();

        String email = customAccountDetails.getAdminId();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();

        String role = auth.getAuthority();

        String accessToken = jwtUtil.createAccessToken(email, role, 1000L * 60 * 60 * 60);

        LoginResponse loginResponse = LoginResponse.toEntity(TokenDTO.toEntity(accessToken));

        response.setContentType(APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(objectMapper.writeValueAsString(SuccessResponse.createSuccess(loginResponse)));
    }

    //로그인 실패 시
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed)  {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        ErrorResponse commonApiResponse = ErrorResponse.createError(ErrorCode.LOGIN_FAILED);
        try {
            response.getWriter().write(new ObjectMapper().writeValueAsString(commonApiResponse));
        } catch (IOException e){
            throw new RuntimeException("잘못된 응답 형식입니다.", e);
        }

    }
}
