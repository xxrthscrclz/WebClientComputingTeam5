# 오늘 뭐 먹지?

> **WebClientComputing Team 5** — 음식 추천 & 미니 게임 웹 프로젝트

매일 고민되는 **「오늘 뭐 먹지?」** 를 해결하기 위한 웹 사이트입니다.  
게임으로 메뉴를 정하거나, 추천 메뉴를 둘러보고, 포춘 쿠키로 오늘의 한마디를 확인할 수 있습니다.

---

## 목차

- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [페이지 설명](#페이지-설명)
- [CSS 구조](#css-구조)
- [JavaScript](#javascript)
- [ID 네이밍 규칙](#id-네이밍-규칙)
- [실행 방법](#실행-방법)
- [팀원](#팀원)

---

## 주요 기능

| 기능 | 설명 |
|------|------|
| **게임 선택** | 음식 맞추기 · 룰렛 · 토너먼트 게임 카드 |
| **메뉴 추천** | 가나다순 8개 대표 메뉴 (클릭 시 상세 입력 페이지 이동) |
| **포춘 쿠키** | 오늘의 운세 / 포춘 쿠키 뽑기 배너 |
| **헤더** | 스크롤 시 반투명·블러 효과 (`main.js` + CSS) |
| **반응형** | `vw` 단위·미디어 쿼리 기반 레이아웃 |

---

## 기술 스택

- **HTML5** — 시맨틱 마크업
- **CSS3** — CSS 변수(`:root`), Flexbox, Grid, `:has()` hover
- **JavaScript (Vanilla)** — `addEventListener` 기반 페이지 이동
- **Google Fonts** — Noto Sans KR

> 별도 빌드 도구·프레임워크 없이 정적 파일로 동작합니다.

---

## 프로젝트 구조

```
WebClientComputingTeam5/
├── index.html              # 메인 페이지
├── game.html               # 게임 통합 페이지 (룰렛 · 토너먼트 · 음식 맞추기)
├── form.html               # 음식 옵션 입력
├── recipe.html             # 레시피 추천
├── team.html               # 팀 소개
├── fortuneCookie.html      # 포춘 쿠키
├── README.md
│
├── css/
│   └── style.css           # 전역 스타일 (헤더 · 게임 · 메뉴 · 포춘쿠키)
│
├── js/
│   ├── main.js             # 메인 페이지 (헤더 스크롤 · 페이지 이동)
│   ├── game.js             # 게임 페이지
│   ├── form.js             # 폼 페이지
│   └── recipe.js           # 레시피 페이지
│
└── assets/
    └── icon/
        └── logoText-icon.svg   # 로고 텍스트 SVG (보조 자산)
```

### 메인 페이지(`index.html`) 구조

```
index.html
├── <header>
│   └── #header
│       ├── #title                 "오늘 뭐 먹지?"
│       └── #nav                   룰렛 · 토너먼트 · 음식 맞추기 · 팀 소개
│
└── <main>
    ├── #gameSelector
    │   ├── #foodGame              음식 맞추기 게임
    │   │   ├── #foodGamePicture
    │   │   └── (라벨)
    │   ├── #rouletteGame          룰렛 게임
    │   │   ├── #rouletteGamePicture
    │   │   └── (라벨)
    │   └── #tournamentGame        토너먼트 게임
    │       ├── #tournamentGamePicture
    │       └── (라벨)
    │
    ├── #representativeMenu
    │   ├── (섹션 제목)             "메뉴 추천"
    │   └── #menuList
    │       ├── #firstMenu  ~ #eighthMenu
    │       │   ├── #firstMenuPicture  ~ #eighthMenuPicture
    │       │   └── #firstMenuText     ~ #eighthMenuText
    │       └── (4열 × 2행 그리드)
    │
    └── #fortuneCookie
        ├── #cookiePicture
        ├── #cookieContent
        │   ├── #cookieLabel
        │   ├── #cookieText
        │   └── #cookieDesc
        └── #cookieArrow
```

### 추천 메뉴 목록 (가나다순)

| ID | 메뉴명 |
|----|--------|
| `firstMenu` | 김치볶음밥 |
| `secondMenu` | 김치찌개 |
| `thirdMenu` | 닭볶음탕 |
| `fourthMenu` | 된장찌개 |
| `fifthMenu` | 떡볶이 |
| `sixthMenu` | 미역국 |
| `seventhMenu` | 샤브샤브 |
| `eighthMenu` | 알리오올리오 파스타 |

---

## 페이지 설명

| 파일 | 역할 | 연결 JS |
|------|------|---------|
| `index.html` | 메인 — 게임 선택 · 메뉴 추천 · 포춘 쿠키 | `js/main.js` |
| `game.html` | 음식 룰렛 · 밸런스(토너먼트) · 음식 맞추기 게임 | `js/game.js` |
| `form.html` | 음식 옵션 입력 폼 | `js/form.js` |
| `recipe.html` | 레시피 추천 | `js/recipe.js` |
| `team.html` | 팀 소개 | — |
| `fortuneCookie.html` | 포춘 쿠키 뽑기 | — |

### 페이지 이동 (`main.js`)

| 클릭 대상 | 이동 경로 |
|-----------|-----------|
| `#foodGame`, `#rouletteGame`, `#tournamentGame` | `game.html` |
| `#nav` 앞 3개 항목 (게임 메뉴) | `game.html` |
| `#menuList` 내 `[id$="Menu"]` (8개 메뉴 카드) | `form.html` |

---

## CSS 구조

`css/style.css` 한 파일에서 전 페이지 스타일을 관리합니다.

### `:root` CSS 변수 (요약)

| 구분 | 변수 예시 | 용도 |
|------|-----------|------|
| 브랜드 컬러 | `--color-primary`, `--color-primary-dark` | 헤더·강조색 |
| 중립 컬러 | `--color-bg`, `--color-surface`, `--color-text` | 배경·카드·본문 |
| 헤더 네비 | `--nav-font-size`, `--nav-color` | `#nav` 메뉴 글자 |
| 헤더 타이틀 | `--title-font-size`, `--title-font-weight` | `#title` |
| 레이아웃 | `--header-height`, `--radius-*`, `--space-main-*` | 간격·둥글기 (`vw`) |
| 스크롤 헤더 | `--header-bg-opacity-scrolled`, `--header-blur` | `.is-scrolled` |
| 그림자 | `--shadow-card`, `--shadow-card-hover` | 카드 elevation |

### 스타일 섹션

```
style.css
├── :root                    디자인 토큰
├── header                   #header, #title, #nav, .is-scrolled
├── main                      
├── game                     #gameSelector, 게임 카드·이미지
├── representative menu      #representativeMenu, #menuList
└── fortune cookie           #fortuneCookie
```

### 반응형 브레이크포인트

| 너비 | 적용 |
|------|------|
| `900px` 이하 | 메뉴 그리드 2열, 패딩·게임 카드 크기 조정 |
| `600px` 이하 | 메인 패딩 축소, 포춘 쿠키 줄바꿈 |
| `520px` 이하 | 메뉴 그리드 1열 |

---

## JavaScript

### `main.js`

```js
// 헤더 스크롤 — 8px 이상 스크롤 시 #header에 .is-scrolled 추가
updateHeaderOnScroll();

// 게임 카드 · 네비(앞 3개) → game.html
goToGamePage();

// 메뉴 추천 카드 → form.html
goToFormPage();
```

- `onclick` 속성 없이 **`addEventListener`** 만 사용
- 메뉴 카드 선택: `#menuList [id$="Menu"]` 속성 선택자

---

## ID 네이밍 규칙

### 메뉴 추천

| 요소 | 패턴 | 예시 |
|------|------|------|
| 카드 | `{순서}Menu` | `firstMenu`, `secondMenu`, … `eighthMenu` |
| 이미지 | `{순서}MenuPicture` | `firstMenuPicture` |
| 텍스트 | `{순서}MenuText` | `firstMenuText` |

### 게임

| 요소 | ID |
|------|-----|
| 카드 | `foodGame`, `rouletteGame`, `tournamentGame` |
| 이미지 | `foodGamePicture`, `rouletteGamePicture`, `tournamentGamePicture` |

---

## 실행 방법

1. 저장소 클론

```bash
git clone https://github.com/xxrthscrclz/WebClientComputingTeam5.git
cd WebClientComputingTeam5
```

2. 로컬 서버 실행 (아래 중 하나)

```bash
# Python
python3 -m http.server 8080

# Node.js (npx)
npx serve .
```

3. 브라우저에서 `http://localhost:8080` 접속

> `index.html`을 파일로 직접 열어도 동작하지만, 로컬 서버 사용을 권장합니다.

---

## 팀원

| 이름 | 역할 |
|------|------|
| (작성 예정) | |

---

## 라이선스

교육용 팀 프로젝트 — **WebClientComputing Team 5**
