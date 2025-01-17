package com.team.hospital.config;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    /**
     * Pointcut for capturing all controller methods
     */
    @Pointcut("within(@org.springframework.stereotype.Controller *) || within(@org.springframework.web.bind.annotation.RestController *)")
    public void restController() {
    }

//    /**
//     * Logs HTTP request details before controller methods execute
//     */
//    @Before("restController() && args(request,..)")
//    public void logBefore(HttpServletRequest request) {
//        logger.info("Incoming request: {} {} from {}", request.getMethod(), request.getRequestURI(), request.getRemoteAddr());
//    }
//
//    /**
//     * Logs HTTP response details after controller methods execute successfully
//     */
//    @AfterReturning(value = "restController()", returning = "response")
//    public void logAfterReturning(Object response) {
//        logger.info("Response: {}", response);
//    }

    /**
     * Logs exceptions thrown in controller methods
     */
    @AfterThrowing(value = "restController()", throwing = "exception")
    public void logAfterThrowing(Exception exception) {
        logger.error("Exception: ", exception);
    }

    /**
     * Example for detailed request/response monitoring (optional)
     */
    @Around("restController()")
    public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
        Object response = null;

        try {
            logger.info("Before method: {}", joinPoint.getSignature().toShortString());
            response = joinPoint.proceed(); // Proceed with method execution
        } catch (Throwable throwable) {
            logger.error("Exception in method: {}", joinPoint.getSignature().toShortString(), throwable);
            throw throwable;
        } finally {
            long elapsedTime = System.currentTimeMillis() - startTime;
            logger.info("After method: {} - execution time: {} ms", joinPoint.getSignature().toShortString(), elapsedTime);
        }

        return response;
    }
}
