# api-server-all

Node.js(Express) 기반의 소형 Web/API 서버입니다. **MySQL 데이터베이스 연결 상태를 확인**하고, 지정한 데이터베이스의 **테이블 목록을 조회**할 수 있습니다. **상품·사용자·주문 테이블 생성**과 **샘플 데이터 삽입**도 웹 UI 또는 API로 실행할 수 있습니다. 모든 API 응답 형식은 **JSON**입니다.

React(Vite)로 만든 **관리용 웹 화면**이 포함되어 있으며, 프론트엔드를 빌드한 뒤 같은 포트에서 정적 파일과 `/api` 라우트를 함께 제공할 수 있습니다.

---

## 이 저장소가 하는 일

| 역할 | 설명 |
|------|------|
| **REST API** | DB 연결 검증(`ping`), 테이블 목록 조회, 테이블 생성, 샘플 데이터 삽입 |
| **웹 UI** | 연결 상태·테이블 목록 확인, 테이블 생성·샘플 데이터 추가 버튼 제공 |
| **배포** | `main` 브랜치 푸시 시 GitHub Actions가 배포 웹훅 호출 |
| **배포 형태** | API만 쓰거나, 빌드 후 한 프로세스에서 UI + API 동시 제공 |

백엔드는 **mysql2**로 MySQL에 연결하고, 환경 변수는 프로젝트 루트의 `.env`에서 읽습니다(실행 위치와 무관하게 `src` 기준 상위 디렉터리의 `.env`를 사용합니다).

---

## 주요 기술 스택

- **런타임**: Node.js 18 이상
- **서버**: Express
- **DB**: MySQL (mysql2 connection pool)
- **설정**: dotenv
- **프론트엔드**: React 18, Vite 5
- **CI/CD**: GitHub Actions

---

## 환경 변수

프로젝트 루트에 `.env`를 두고, 아래 예시를 참고해 설정합니다. `.env.example`을 복사해 사용할 수 있습니다.

| 변수 | 설명 |
|------|------|
| `APP_PORT` | API 서버 HTTP 포트 (기본값: `3000`) |
| `WEB_PORT` | Vite 개발 서버 포트 (기본값: `5173`) |
| `DB_HOST` | MySQL 호스트 |
| `DB_PORT` | MySQL 포트 (기본값: `3306`) |
| `DB_USER` | DB 사용자 |
| `DB_PASSWORD` | DB 비밀번호 |
| `DB_NAME` | 연결할 데이터베이스 이름 |

애플리케이션 코드에서는 `process.env.APP_PORT`, `process.env.WEB_PORT`, `process.env.DB_HOST` 등으로 참조합니다.

---

## API 엔드포인트

| 메서드 | 경로 | 설명 |
|--------|------|------|
| `GET` | `/api/health` | 서비스 기동 여부 확인 |
| `GET` | `/api/db/check` | DB 연결 성공 여부 (`ping`) |
| `GET` | `/api/db/tables` | 현재 `DB_NAME` 스키마의 테이블 이름 목록 |
| `POST` | `/api/db/setup-tables` | `users`, `products`, `orders` 테이블 생성 |
| `POST` | `/api/db/seed-sample-data` | 샘플 데이터 삽입 (사용자·상품·주문 각 10건) |

연결 실패 시 HTTP 상태는 주로 `503`이며, 응답에 `error`, `code`(해당 시)가 포함될 수 있습니다.

### 생성되는 테이블

| 테이블 | 설명 |
|--------|------|
| `users` | 이름, 이메일, 전화번호, 주소, 생년월일 |
| `products` | 상품명, 설명, 가격, 카테고리, 재고 |
| `orders` | 사용자·상품 FK, 수량, 금액, 주문 상태, 배송지, 수령인 정보 |

### 샘플 데이터

`POST /api/db/seed-sample-data` 호출 시 아래 데이터가 각 **10건**씩 삽입됩니다.

- **사용자**: 한국 이름, 이메일, `010-XXXX-XXXX` 형식 전화번호, 실제 주소 형식, 생년월일
- **상품**: 전자기기·의류·식품 등 10종
- **주문**: 사용자·상품 연결, 배송지·수령인·연락처 포함

재실행 시 기존 3개 테이블의 데이터를 비운 뒤 다시 10건씩 넣습니다. **테이블 생성을 먼저 실행**해야 합니다.

---

## 웹 UI 사용 방법

1. DB 연결 상태 확인
2. **테이블 생성** 버튼 클릭 → `users`, `products`, `orders` 생성
3. **샘플 데이터 추가 (각 10건)** 버튼 클릭 → 샘플 데이터 삽입
4. **목록 불러오기**로 테이블 목록 갱신

---

## 실행 방법

### API 서버만

```bash
npm install
npm start
```

개발 시 파일 변경 시 자동 재시작:

```bash
npm run dev
```

### 프론트엔드 개발 (Vite)

터미널 1에서 API 서버를 띄운 뒤, 터미널 2에서:

```bash
cd frontend
npm install
npm run dev
```

Vite는 `/api` 요청을 `APP_PORT`로 프록시합니다. 브라우저는 `WEB_PORT`(기본 `5173`)에서 접속합니다.

### 한 프로세스로 UI + API (프로덕션에 가깝게)

```bash
npm run build
npm start
```

`frontend/dist`가 있으면 Express가 그 정적 파일을 서빙하고, 그 외 경로는 SPA용으로 `index.html`을 반환합니다. API는 그대로 `/api` 아래에 있습니다.

---

## 배포 (GitHub Actions)

`main` 브랜치에 푸시되면 `.github/workflows/deploy-webhook.yml`이 실행되어 배포 웹훅을 호출합니다.

```bash
POST https://awen.3vi.co.kr/api/sys_hosting/deploy-webhook/api-server-all
Authorization: Bearer <AWEN_DEPLOY_TOKEN>
```

### GitHub Secrets 설정 (1회)

저장소 **Settings → Secrets and variables → Actions**에서 아래 시크릿을 등록합니다.

| 시크릿 이름 | 설명 |
|-------------|------|
| `AWEN_DEPLOY_TOKEN` | 배포 웹훅 Bearer 토큰 |

---

## 프로젝트 구조 요약

```
api-server-all/
├── .github/
│   └── workflows/
│       └── deploy-webhook.yml   # main 푸시 시 배포 웹훅
├── src/
│   ├── index.js                 # Express 앱, API 라우트, 정적 서빙
│   └── db/
│       ├── schema.js            # 테이블 DDL
│       └── sampleData.js        # 샘플 데이터 (각 10건)
├── frontend/                    # React + Vite 관리 UI
│   └── src/
│       ├── App.jsx
│       └── api.js
├── package.json
├── .env                         # 로컬 설정 (저장소에 커밋하지 않는 것을 권장)
└── .env.example
```

---

## 라이선스 및 유의 사항

이 프로젝트는 내부·진단용으로 DB 연결 정보와 개인정보 형태의 샘플 데이터를 다룹니다.

- `.env`와 배포 토큰(`AWEN_DEPLOY_TOKEN`)은 저장소에 올리지 마세요.
- 샘플 데이터는 테스트용 가상 정보이지만, 운영 DB에는 사용하지 않는 것을 권장합니다.
- 운영 환경에서는 방화벽·MySQL 사용자 권한을 적절히 제한하는 것이 좋습니다.
