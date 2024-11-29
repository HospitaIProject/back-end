# Base 이미지 설정
FROM openjdk:17 AS build

# 작업 디렉토리 설정
WORKDIR /app

# Gradle 빌드 및 React 빌드 파일 복사
COPY build/libs/*.jar hospital-0.0.2-SNAPSHOT.jar

# Final 실행 레이어
FROM openjdk:17
WORKDIR /app

# JAR 파일 복사
COPY --from=build /app/hospital-0.0.2-SNAPSHOT.jar app.jar

# 포트 노출
EXPOSE 8080

# 애플리케이션 실행
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
