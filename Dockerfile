# Docker 이미지의 베이스로 openjdk 17 사용
FROM openjdk:17

# 애플리케이션의 JAR 파일을 Docker 이미지로 복사
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} hospital-0.0.2-SNAPSHOT.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/hospital-0.0.2-SNAPSHOT.jar"]