package com.team.hospital.webcontroller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ForwardingController {

    // 리다이렉트 메소드
    @RequestMapping(value = "/**/{path:[^\\.]*}")
    public String redirect(HttpServletRequest request) {
        String requestURI = request.getRequestURI();

        if (requestURI.startsWith("/hc") || requestURI.startsWith("/env")) {
            return "forward:" + requestURI;
        }

        // Forward to home page so that route is preserved.
        return "forward:/";
    }
}

//package com.team.hospital.webcontroller;
//
//import com.team.hospital.api.apiResponse.SuccessResponse;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.client.RestTemplate;
//
//import jakarta.servlet.http.HttpServletRequest;
//
//@Controller
//@RequiredArgsConstructor
//@Slf4j
//public class ForwardingController {
//
//    private final RestTemplate restTemplate;
//
//    @RequestMapping(value = "/**/{path:[^\\.]*}")
//    public <T> ResponseEntity<SuccessResponse<T>> forwardRequest(HttpServletRequest request) {
//        String requestURI = request.getRequestURI();
//
//        // 요청 URI를 로그에 출력
//        log.info("Received request URI: {}", requestURI);
//
//        // 내부 API 호출이 필요한 경우
//        if (requestURI.startsWith("/api")) {
//            log.info("Forwarding API request Invoked.");
//
//            String internalApiUrl = "http://localhost:8080" + requestURI;
//
//            // RestTemplate을 사용하여 동기적으로 내부 API 호출
//            ResponseEntity<String> internalResponse = restTemplate.exchange(
//                    internalApiUrl,
//                    HttpMethod.GET,
//                    null,
//                    String.class
//            );
//
//            // 성공 응답: SuccessResponse로 변환하여 반환
//            SuccessResponse<String> successResponse = SuccessResponse.createSuccess(internalResponse.getBody());
//            return ResponseEntity.ok((SuccessResponse<T>) successResponse);
//        }
//
//        // 그 외의 요청은 React의 index.html로 포워딩
//        return ResponseEntity.ok((SuccessResponse<T>) SuccessResponse.createSuccess("forward:/index.html"));
//    }
//}

//package com.team.hospital.webcontroller;
//
//import com.team.hospital.api.apiResponse.ErrorResponse;
//import com.team.hospital.api.apiResponse.SuccessResponse;
//import com.team.hospital.exception.ErrorCode;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.reactive.function.client.WebClient;
//import org.springframework.web.reactive.function.client.WebClientResponseException;
//import reactor.core.publisher.Mono;
//
//import jakarta.servlet.http.HttpServletRequest;
//
//@Controller
//@RequiredArgsConstructor
//public class ForwardingController {
//
//    private final WebClient webClient;
//
//    @RequestMapping(value = "/**/{path:[^\\.]*}")
//    public <T> Mono<ResponseEntity<T>> forwardRequest(HttpServletRequest request) {
//        String requestURI = request.getRequestURI();
//
//        // 내부 API 호출이 필요한 경우
//        if (requestURI.startsWith("/api")) {
//            String internalApiUrl = "http://localhost:8080" + requestURI;
//
//            // WebClient를 사용하여 내부 API 호출 및 응답 반환
//            return webClient
//                    .get()
//                    .uri(internalApiUrl)
//                    .retrieve()
//                    .toEntity(String.class)
//                    .map(internalResponse -> {
//                        // SuccessResponse 형식으로 응답 변환
//                        SuccessResponse<String> successResponse = SuccessResponse.createSuccess(internalResponse.getBody());
//                        return ResponseEntity.ok((T) successResponse);
//                    })
//                    .onErrorResume(WebClientResponseException.class, e -> {
//                        // WebClient에서 발생한 클라이언트 오류를 처리하여 ErrorResponse 반환
//                        ErrorResponse errorResponse = ErrorResponse.createError(
//                                ErrorCode.BAD_REQUEST, "내부 API 호출에서 클라이언트 오류가 발생했습니다: " + e.getMessage());
//                        return Mono.just(ResponseEntity.status(e.getRawStatusCode()).body((T) errorResponse));
//                    })
//                    .onErrorResume(Exception.class, e -> {
//                        // WebClient에서 발생한 서버 오류를 처리하여 ErrorResponse 반환
//                        ErrorResponse errorResponse = ErrorResponse.createError(
//                                ErrorCode.SERVER_ERROR, "내부 API 호출 중 오류가 발생했습니다: " + e.getMessage());
//                        return Mono.just(ResponseEntity.status(500).body((T) errorResponse));
//                    });
//        }
//
//        // 그 외의 요청은 React의 index.html로 포워딩
//        return Mono.just(ResponseEntity.ok((T) "forward:/index.html"));
//    }
//}

