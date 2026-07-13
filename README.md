# api-server-all

Node.js(Express) 기반의 소형 Web/API 서버입니다. **MySQL 데이터베이스 연결 상태를 확인**하고, 지정한 데이터베이스의 **테이블 목록을 조회**할 수 있습니다. 모든 API 응답 형식은 **JSON**입니다.

React(Vite)로 만든 **관리용 웹 화면**이 선택적으로 포함되어 있으며, 프론트엔드를 빌드한 뒤 같은 포트에서 정적 파일과 `/api` 라우트를 함께 제공할 수 있습니다.

---

## 이 저장소가 하는 일

| 역할 | 설명 |
|------|------|
| **REST API** | DB 연결 검증(`ping`), `information_schema`를 이용한 테이블 목록 조회 |
| **웹 UI** | 연결 상태와 테이블 목록을 브라우저에서 확인 (선택) |
| **배포 형태** | API만 쓰거나, 빌드 후 한 프로세스에서 UI + API 동시 제공 |

백엔드는 **mysql2**로 MySQL에 연결하고, 환경 변수는 프로젝트 루트의 `.env`에서 읽습니다(실행 위치와 무관하게 `src` 기준 상위 디렉터리의 `.env`를 사용합니다).

---

## 주요 기술 스택

- **런타임**: Node.js 18 이상
- **서버**: Express
- **DB**: MySQL (mysql2 connection pool)
- **설정**: dotenv
- **프론트엔드**(선택): React 18, Vite 5

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

---

## API 엔드포인트

| 메서드 | 경로 | 설명 |
|--------|------|------|
| `GET` | `/api/health` | 서비스 기동 여부 확인 |
| `GET` | `/api/db/check` | DB 연결 성공 여부 (`ping`) |
| `GET` | `/api/db/tables` | 현재 `DB_NAME` 스키마의 테이블 이름 목록 |

연결 실패 시 HTTP 상태는 주로 `503`이며, 응답에 `error`, `code`(해당 시)가 포함될 수 있습니다.

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

## 프로젝트 구조 요약

```
api-server-all/
├── src/
│   └── index.js          # Express 앱, API 라우트, 선택적 정적 서빙
├── frontend/             # React + Vite (선택)
├── package.json
├── .env                  # 로컬 설정 (저장소에 커밋하지 않는 것을 권장)
└── .env.example
```

---

## 라이선스 및 유의 사항

이 프로젝트는 내부·진단용으로 DB 연결 정보를 다룹니다. `.env`에 실제 비밀번호를 넣을 경우 저장소에 올리지 말고, 운영 환경에서는 방화벽·MySQL 사용자 권한을 적절히 제한하는 것이 좋습니다.
