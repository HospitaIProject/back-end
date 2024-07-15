package com.team.hospital.jwt.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.team.hospital.api.ErrorResponse;
import com.team.hospital.api.account.CustomAccountDetailsService;
import com.team.hospital.api.account.dto.CustomAccountDetails;
import com.team.hospital.exception.ErrorCode;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
@Slf4j
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomAccountDetailsService customAccountDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //request에서 Authorization 헤더를 찾음
        String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);

        //Authorization 헤더 검증
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            //조건이 해당되면 메소드 종료 (필수)
            return;
        }

        try {
            //Bearer 부분 제거 후 순수 토큰만 획득
            String token = authorization.split(" ")[1];


            //토큰에서 email 과 role 획득
            String adminID = jwtUtil.getAdminID(token);

            //UserDetails에 회원 정보 객체 담기
            CustomAccountDetails customAccountDetails = customAccountDetailsService.loadUserByUsername(adminID);

            //스프링 시큐리티 인증 토큰 생성
            Authentication authToken = new UsernamePasswordAuthenticationToken(customAccountDetails, null, customAccountDetails.getAuthorities());

            //세션에 사용자 등록
            SecurityContextHolder.getContext().setAuthentication(authToken);

            filterChain.doFilter(request, response);

        }catch (ExpiredJwtException e){
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");

            ErrorResponse commonApiResponse = ErrorResponse.createError(ErrorCode.EXPIRED_TOKEN);
            response.getWriter().write(new ObjectMapper().writeValueAsString(commonApiResponse));
        }
    }
}
