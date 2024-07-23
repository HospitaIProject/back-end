# Docker 이미지의 베이스로 openjdk 17 사용
FROM openjdk:17

# 애플리케이션의 JAR 파일을 Docker 이미지로 복사
ARG JAR_FILE=build/libs/*.jar
ARG PROFILES
ARG ENV

COPY ${JAR_FILE} hospital-0.0.1-SNAPSHOT.jar

# 애플리케이션 실행을 위한 명령어 설정
ENTRYPOINT ["java", "-Dspring.profiles.active=${PROFILES}", "-Dserver.env=${ENV}", "-jar","hospital-0.0.1-SNAPSHOT.jar"]