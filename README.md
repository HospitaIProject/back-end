# 가톨릭대학교 성모병원 대장항문외과 환자 관리 시스템

---
[English Version](README.en.md)



- 프로젝트 기간 : 24.06 ~ 24.10
- 개발인원
  - Back-end : 2명
  - Front-end : 1명

---
## 프로젝트 기획의도

> 기존 가톨릭대학교 성모병원 대장항문외과에서 환자에 대한 입원 및 수술에 대한 관리 정보를 수기로 작성하여 불편을 겪고 있던 상황을
> 쉽고 편리하게 관리할 수 있는 환경을 제공하기 위해 기확하게 되었습니다.

---

# 프로젝트 기능
- 허용된 관리자만 애플리케이션에 접근할 수 있습니다.
- 환자를 등록하고, 수술 날짜와 수술 종류를 입력합니다.
- 수술 종류에 따라 체크해야 할 항목을 다르게 할 수 있습니다.
- 환자에 대한 체크 항목을 수술 전/중/후 별로 구분해 퇴원일까지 체크합니다.
- 체크된 목록을 토대로 환자별, 날짜별등 필터를 토대로 정보를 수집 및 관리할 수 있습니다.
- 환자별로 체크한 항목에 대한 기록을 Excel 파일로 추출 할 수 있습니다.

---

## 사용 기술
- Back-End & Infra
  - Spring Boot, Spring Security, JPA, QueryDSL, MySQL  
  - AWS(EC2), Nginx, Docker
  

- Front-End 
  - React, React Query, Tailwind CSS, Zustand
---

## 개발과정
- 계속해서 추가 및 변경되는 요구사항에 맞춘 발빠른 대처 

- 다량의 데이터에 맞춰 적절한 지연로딩 전략을 사용해 불필요한 데이터 로드 감소

- 필요한 Entity의 컬럼만을 조회해 조회 쿼리 성능 개선

- 데이터 삭제에 대한 복구 기능 (소프트 딜리트)

- @Scheduled를 사용해 오래된 데이터 자동 소프트 딜리트

- Apache POI 라이브러리의 XSSFWorkbook를 사용해 저장된 데이터에 대한 엑셀 추출 기능 추가

---

## Architecture
![image](https://github.com/user-attachments/assets/885c6cca-30f3-4e58-bbc4-2256e9695e03)


