# Docker 이미지의 베이스로 openjdk 17 사용
FROM openjdk:17

# 애플리케이션의 JAR 파일을 Docker 이미지로 복사
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} hospital-0.0.1-SNAPSHOT.jar

# 데이터베이스 파일을 Docker 이미지의 /db 디렉터리로 복사
COPY db/hospital.db /db/hospital.db

# 컨테이너 내에서 사용할 포트 설정 (Spring Boot 기본 포트는 8080)
EXPOSE 8080

# 애플리케이션 실행을 위한 명령어 설정
ENTRYPOINT ["java","-jar","/hospital-0.0.1-SNAPSHOT.jar"]