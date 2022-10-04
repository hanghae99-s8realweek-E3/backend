# 항해 99 8기 3조 실전 프로젝트 - MIMIC!

![%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5-14_1](https://user-images.githubusercontent.com/102751923/192713360-ebe2bb31-ceb3-484e-bf09-9dcb7af2f20f.png)

## 🗂️ **목차**
[1. 프로젝트 소개](#프로젝트-소개)  
[2. 프로젝트 기간](#프로젝트-기간)  
[3. 서비스 링크](#서비스-링크)  
[4. 백엔드 팀원 소개](#백엔드-팀원-소개)   
[5. 서비스 아키텍쳐](#️-서비스-아키텍쳐)  
[6. 기술 스택](#기술-스택)  
[7. 라이브러리](#라이브러리)  
[8. 파일 구조](#파일-구조)  
[9. DB ERD](#db-erd)
[10. 트러블슈팅](#트러블-슈팅)
[11. Git Strategy](#git-strategy)  
[12. Commit Rule](#commit-rule)  

##
## **📖 프로젝트 소개**

> 미믹(MIMIC)이란, ‘흉내쟁이’ 또는 ‘따라쟁이’라는 의미를 가진 단어입니다.
> 
> 
> 요즘 뜨는 MBTI에서 영감을 얻어서 나와 다른 성향을 가진 사람들의 일상을 살아보면 어떨까? 또, 나의 일상이 다른 사람들의 일상이 된다면 어떨까? 라는 취지로 제작된, 타인과 나의 일상을 체험해보도록 하는 조금 특이한 SNS입니다.
> 
##
## **🗓 프로젝트 운영 기간**

- 개발 기간: 2022년 8월 26일 ~ 2022년 10월 7일
- 운영 기간: 2022년 9월 27일 ~ 2022년 10월 7일
- 런칭: 2022년 9월 27일 (Ver.1.0.0)
- 추가 업데이트: 2022년 10월 3일 (Ver.1.1.0)

##
## 🔗 서비스 링크

[MIMIC 사이트 바로가기](https://www.todaysmimic.today/)

##
## **👥 백엔드 팀원 소개**

👨🏻‍💻 [부리더 - ISTP] 장지유: [https://github.com/jangjiyu](https://github.com/jangjiyu)

👨🏻‍💻 [테크리더 -ESTJ] 서우혁: [https://github.com/WHS95](https://github.com/WHS95)
  
##
## **⛑️ 서비스 아키텍쳐**

![아키텍쳐](https://user-images.githubusercontent.com/102751923/193623858-f22ca9cd-9da4-4777-8599-0f4d3a8db797.jpg)


##
## **💿 기술 스택**
기술스택 | 설명
---|:---:
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) | 자바스크립트 런타임
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) | 웹 프레임워크
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white) | RDBMS 클라우드 인스턴스 (RDS)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white) | 인메모리 저장소 (Azure)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white) | ORM
![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=Jenkins&logoColor=white) | CI/CD 툴
![NginX](https://img.shields.io/badge/nginx-green?style=for-the-badge&logo=nginx&logoColor=white) | Proxy 서버
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=Jest&logoColor=white) | 통합테스트 - CI 연계
![S3](https://img.shields.io/badge/S3-569A31?style=for-the-badge&logo=AmazonS3&logoColor=white) | AWS S3 - 이미지 파일 저장
![Lambda](https://img.shields.io/badge/Lambda-FF9900?style=for-the-badge&logo=AWSLambda&logoColor=white) | AWS Lambda - 이미지 리사이징

##
## **📖 라이브러리**

| 라이브러리 | 설명 |
| --- | --- |
![Sequelize](https://img.shields.io/badge/Sequelize-6.21.3-9E9E9E?style=flat&logoColor=white) | MySQL ORM 콘솔 |
![mysql2](https://img.shields.io/badge/mysql2-2.3.3-9E9E9E?style=flat&logoColor=white) | MySQL 연동 |
![cors](https://img.shields.io/badge/cors-2.8.5-9E9E9E?style=flat&logoColor=white) | 리소스 공유 CORS 정책 설정 |
![dotenv](https://img.shields.io/badge/dotenv-16.0.1-9E9E9E?style=flat&logoColor=black) | 환경변수 사용 |
![morgan](https://img.shields.io/badge/morgan-1.10.0-9E9E9E?style=flat&logoColor=white) | http 로그 기록 |
![winston](https://img.shields.io/badge/winston-3.8.1-9E9E9E?style=flat&logoColor=white) | 로그 파일 생성 |
![winston-daily-rotate-file](https://img.shields.io/badge/winston_daily_rotate_file-4.7.1-9E9E9E?style=flat&logoColor=white) | 로그 파일 관리 |
![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-8.5.1-9E9E9E?style=flat&logoColor=white) | 토큰 암호화 |
![passport](https://img.shields.io/badge/passport-0.6.0-9E9E9E?style=flat&logoColor=white) | node.js authentication |
![Passport-kakao](https://img.shields.io/badge/Passport_kakao-1.0.1-9E9E9E?style=flat&logoColor=white) | 카카오 소셜 로그인 |
![bcrypt](https://img.shields.io/badge/bcrypt-5.0.1-9E9E9E?style=flat&logoColor=white) | 유저 비밀번호 암호화 |
![nodemailer](https://img.shields.io/badge/nodemailer-2.1.0-9E9E9E?style=flat&logoColor=white) | 이메일 인증번호 전송 |
![joi](https://img.shields.io/badge/joi-17.6.0-9E9E9E?style=flat&logoColor=white) | 입력 데이터 유효성검사 |
![jest](https://img.shields.io/badge/jest-28.1.3-9E9E9E?style=flat&logoColor=white) | Test Runner + Assertion을 한번에 진행할수 있는 JS 테스트 프레임워크 |
![@hapi/boom](https://img.shields.io/badge/@hapi/boom-10.0.0-9E9E9E?style=flat&logoColor=white) | 에러 관리 |
![helmet](https://img.shields.io/badge/helmet-6.0.0-9E9E9E?style=flat&logoColor=white) | HTTP 헤더 설정을 자동으로 바꾸어주어 잘 알려진 앱의 취약성으로부터 앱 보호  |
![hpp](https://img.shields.io/badge/hpp-0.2.3-9E9E9E?style=flat&logoColor=white) | http 파라미터 오염 공격 방어 |
![node-schedule](https://img.shields.io/badge/node_schedule-2.1.0-9E9E9E?style=flat&logoColor=white) | 스케쥴 업무 자동화 |
![multer](https://img.shields.io/badge/multer-1.4.5-9E9E9E?style=flat&logoColor=white) | multipart/form-data 파일 업로드 |
![multer-s3](https://img.shields.io/badge/multer_s3-2.10.0-9E9E9E?style=flat&logoColor=white) | AWS S3 파일 업로드 |
![redis](https://img.shields.io/badge/redis-4.3.1-9E9E9E?style=flat&logoColor=white) | 방문자IP 카운터 |

##
## **📂 파일 구조**

```
📦src
 ┣ 📂__test__
 ┃ ┣ 📂data
 ┃ ┃  ┗ 📜userData.json
 ┃ ┣ 📂unit 
 ┃ ┃  ┣ 📜comment.service.test.js
 ┃ ┃  ┣ mytodo.service.test.js
 ┃ ┃  ┣ todolist.service.test.js
 ┃ ┃  ┗ user.service.test.js
 ┣ 📂config
 ┃ ┗ 📜config.js
 ┣ 📂controllers
 ┃ ┣ 📜comment.controller.js
 ┃ ┣ 📜follow.controller.js
 ┃ ┣ 📜mytodo.controller.js
 ┃ ┣ 📜socialLogin.controller.js
 ┃ ┣ 📜todolist.controller.js
 ┃ ┗ 📜user.controller.js
 ┣ 📂middlewares
 ┃ ┣ 📜authMiddlewares.js
 ┃ ┣ 📜errorHandler.js
 ┃ ┣ 📜multer.js
 ┃ ┣ 📜nonUserMiddlewares.js
 ┃ ┗ 📜vistorCountMiddleware.js
 ┣ 📂migrations
 ┃ ┗ 📜20220926144114-level.js
 ┣ 📂models
 ┃ ┣ 📜challengedTodo.js
 ┃ ┣ 📜comment.js
 ┃ ┣ 📜count.js
 ┃ ┣ 📜emailAuth.js
 ┃ ┣ 📜follow.js
 ┃ ┣ 📜index.js
 ┃ ┣ 📜mbti.js
 ┃ ┣ 📜mbti.sql
 ┃ ┣ 📜todo.js
 ┃ ┗ 📜user.js
 ┣ 📂passport
 ┃ ┗ 📜index.js
 ┣ 📂routes
 ┃ ┣ 📜comment.js
 ┃ ┣ 📜follow.js
 ┃ ┣ 📜index.js
 ┃ ┣ 📜mytodo.js
 ┃ ┣ 📜social.js
 ┃ ┣ 📜todolist.js
 ┃ ┗ 📜user.js
 ┣ 📂script
 ┃ ┗ 📜deploy
 ┣ 📂services
 ┃ ┣ 📜comment.service.js
 ┃ ┣ 📜follow.service.js
 ┃ ┣ 📜mytodo.service.js
 ┃ ┣ 📜todolist.service.js
 ┃ ┗ 📜user.service.js
 ┣ 📂utils
 ┃ ┣ 📜createToken.js
 ┃ ┣ 📜date.js
 ┃ ┣ 📜joi.js
 ┃ ┣ 📜logger.js
 ┃ ┣ 📜nodeMailer.js
 ┃ ┣ 📜query.js
 ┃ ┣ 📜redisconnect.js
 ┃ ┗ 📜setSchedule.js
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜README.md
 ┣ 📜api_test.http
 ┣ 📜app.js
 ┣ 📜package-lock.json
 ┗ 📜package.json
```
##
## 📂 ****DB ERD****

![Untitled](https://user-images.githubusercontent.com/102751923/192713435-1a6fedef-550f-472c-af89-b7b3a0a7b035.png)

## ⚡️**트러블 슈팅**

## 1️⃣ 비동기 처리(Promise-All)

`도입이유`

API 요청 처리 하기 위해서 요청되는 비동기 함수들이 많아 비 효율적이라 판단

`문제`

![Untitled](https://user-images.githubusercontent.com/96816022/193802866-1c09fdde-6bda-48d5-b2a2-6996029b024e.png)

연속적인 비동기 처리 시,  async-await 함수를 하나하나씩 기다리다보니 소요 시간이 오래 걸렸습니다.

`해결방안`

![Untitled](https://user-images.githubusercontent.com/96816022/193802868-7116c51b-23c4-40c8-999d-a2d380bb9bbc.png)

promise.All을 사용하여 비동기 함수를 병렬처리를 함으로써 효율화 시켰습니다.

`결과`

- async-await 평균응답속도: 50.6ms
    
    ![Untitled](https://user-images.githubusercontent.com/96816022/193802899-d83f120f-8f47-4d9b-842a-0b221dce7295.png)
    
- promise.All 평균응답속도: 23.6ms

    ![Untitled](https://user-images.githubusercontent.com/96816022/193802903-734819d0-5e58-41c9-93ae-728e99af0e07.png)
    
######

## 2️⃣  서버 부하 개선 (Nginx)


######

`문제` 

하나의 EC2 안에서 로드밸런싱 처리
결과:서버가 받는 요청의 총량이 줄어드는 것은 아니었다는 것을 확인.
(서버부하 테스트 에러 발생)

`해결` 

nginx 서버를 프록시 서버로 활용하여 로드 밸런싱 구현
node.js 서버에 분산 처리하도록 설계

`결과`

node 서버 에러 발생 해결


`추가 개선사항` 


직접적인 서버의 존재를 숨 김으로서 보안적 측면 개선 

Ngnix Rate Limiting 무차별 요청방지

`결과`

**적용 전 :** 서버연결 요청에러 발생 

![Untitled](https://user-images.githubusercontent.com/96816022/193804881-856667bf-2b70-49a6-a1a6-8e646813dd97.png)

![Untitled](https://user-images.githubusercontent.com/96816022/193804877-5e871f20-1fdf-430f-ad9e-fdb1cfa3594c.png)

**적용 후 :** 서버연결 요청에러 발생없어짐

![Untitled](https://user-images.githubusercontent.com/96816022/193804882-c8e96999-1fe1-4b03-90e6-944ef950dae0.png)


######

## 3️⃣ 이미지 리사이징(multer,S3, Lamda)

######

`도입과정`

사진 용량이 커짐에 따라 네트워크 통신에 부하를 줄 수 있다고 판단

`1)해결과정` 

업로드 할 수있는 사진용량제한 (사이즈 1024x1024 & 5MB)

`문제` 

대부분의 사진 용량제한 넘어 버려 업로드❌

용량제한 완화 시 브라우저 로딩속도 ⬇️

`2)해결과정`

이미지 용량제한 + 리사이징 작업시  CPU 메모리 차지  문제해결

적용사항:AWS S3+Lambda(sharp)

`결과`

**전/후 비교**

- 리사이징 전 (총 크기 : 15.7MB)
![Untitled](https://user-images.githubusercontent.com/96816022/193822994-7a3a98d1-9c6f-4915-9459-915d49db2c5c.png)

- 리사이징 후 (총 크기 : 323.4KB)
![Untitled](https://user-images.githubusercontent.com/96816022/193822998-fb80a7bf-fc9d-4528-be37-72ca88168d84.png)

######

## 4️⃣ 방문자 수 카운터 (Redis)

`배경`

메인페이지 접속 시 별도의 API를 만들어 요청 수를방문자 수로 카운터 결정

`문제`

- **방문자 수 정보 정확성:** 특정 유저가 지속적으로 요청을 보낼 시 방문자 수 정보 정확성이 떨어진다고 판단   
- **비효율적인 DB 요청:** 단순 방문 수 카운터를 위해 방문 시마다 DB 요청이 생기는 것은 비효율적이라 판단   

**`의사결정 과정`**

ip를 기준으로 할 경우, 동일한 사용자라도 다른 공간에서 접속할 경우 ip 주소가 변동될 수 있으며,   
다른 사용자라도 같은 내부 ip를 사용할 수 있는 등의 예외 사항이 존재해    
정확한 방문자 수를 집계할수 없다는 단점이 있습니다.   
그러나, api 요청 횟수를 기준으로 집계를 하는 것보단 낫다고 판단하여 해당 방향을 채택했습니다.   

`과정`

 Redis를 서브 DB로 사용해 방문자 수 저장후, 스케쥴 함수를  통해 하루 끝  방문자 수  DB에 백업

메인 페이지에서 작동되는 API에 방문자수 카운터를 미들웨어 형식으로 하여 추가 API없이 진행

`추가해결사항`

**중복 데이터  카운터 방지**

Redis의 PFADD명령어를 이용하여 중복되지 않는 경우에만 집계

######

##
## **📈 Git Strategy**
    - Main: 최종 배포를 담당하는 브랜치
    - Develop: 개발된 내용들을 통합하는, 개발 중심점인 브랜치
    - Features_기능: 각자 담당한 기능들을 구현하고 관리하기 위한 브랜치

##
## **✍ Commit Rule**

- 사용 키워드
    - Initial: 초기 설정 내용
    - Add: 파일 생성 내용 작성
    - Fix: 파일 수정 내용 작성
    - Delete: 파일 삭제 내용 작성
    - Use: 라이브러리 설치 시, 라이브러리 설명과 함께 적용한 파일 하나 기록
    - Refactor: 파일의 코드를 전부 정리
    - Move: 파일 내 코드를 다른 파일에 옮길 시 작성
    - Rename: 파일의 이름을 변경 시 작성
    - Test: 파일의 테스트 코드 작성
######
  
##
#### **💻 프론트엔드 깃헙 레포지토리**
MIMIC 프론트엔드 깃헙 [바로가기](https://github.com/hanghae99-s8realweek-E3/frontend)
