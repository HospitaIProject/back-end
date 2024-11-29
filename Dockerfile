# Build 레이어
FROM openjdk:17 AS build
WORKDIR /build

# Gradle 빌드 아티팩트 복사
COPY build/libs/*.jar app.jar

# Final 실행 레이어
FROM openjdk:17
WORKDIR /app

# Final 이미지에 JAR 파일 복사
COPY --from=build /build/app.jar /app/app.jar

# 포트 노출
EXPOSE 8080

# 애플리케이션 실행
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
