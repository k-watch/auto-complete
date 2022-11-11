# GitHub Repo View

> 특정 깃헙 레파지토리([angular-cli](https://github.com/angular/angular-cli))의 이슈 목록과 상세 내용을 확인
>
> ### 🌍 [배포링크](https://k-watch.netlify.app/)

<br/>

## 📖 목차

- [구현기능](#-구현-기능)
- [폴더구조](#-폴더-구조)
- [프로젝트 설치 및 실행](#-3.프로젝트-설치-및-실행)

</br>

## 🚀 구현 기능
- 공통
  - Context API를 활용한 API 연동
  - 데이터 요청 중 로딩 표시
  - 에러 화면 구현
- 공통 헤더
  - Organization Name / Repository Name이 표시
- 이슈 목록 화면
  - open 상태의 이슈 중 코멘트가 많은 순으로 정렬
  - 각 행에 이슈번호, 이슈제목, 작성자, 작성일
  - 다섯번째 셀에 원티드 광고 출력
  - 화면을 아래로 스크롤 할 시 이슈 목록 추가 로딩 (인피니티 스크롤)
- 이슈 상세 화면
  - 이슈의 상세 내용 표시
  - 이슈번호, 이슈제목, 작성자, 작성일, 코멘트 수, 작성자 프로필 이미지, 본문 표시

</br>

## ✏ 기술 스택 
 JavaScript, React, Axios, styled-components, React-Markdown, React-Icons
 
## 구현 방법
 - Context API 활용
 - 데이터 요청 중 로딩 표시
 - 인피니티 스크롤

## 📚 폴더 구조

```jsx
📂 src
├── 📂 api
│   ├── 📂 common
│   │   └── 📄 url // URL 상수 관리
│   ├── 📂 issue
│   │   └── 📄 issue 
│   └── 📄 index
├── 📂 component
│   ├── 📂 common
│   │   ├── 📄 BannerItem
│   │   └── 📄 Loading
│   ├── 📂 issue
│   │   ├── 📄 IssueContent
│   │   ├── 📄 IssueHeader
│   │   ├── 📄 IssueItem
│   │   └── 📄 IssueList
├── 📂 modules
│   ├── 📂 context
│   │   └── 📄 IssueContext
│   ├── 📂 hooks
│   │   └── 📄 useInfiniteScroll // IntersectionObserver 이용한 무한 스크롤링
│   └── 📄 asyncActionUtils asnyc // 초기화, 로딩, 성공, 실패 관리
├── 📂 pages
│   ├── 📄 IssueContentPage
│   └── 📄 IssueListPage
├── 📂 router
│   └── 📄 Router
├── 📂 styles
│   ├── 📄 GlobalStyle
│   ├── 📄 mixin
│   └── 📄 theme
├── 📄 App
└── 📄 index
```

## 3. 프로젝트 설치 및 실행
1. GitHub Rest API 횟수 제한을 해제하기 위해 개인 토큰 발급 뒤 root 경로에 .env 파일을 생성하고 아래 내용을 추가합니다.
```command
REACT_APP_ACCESS_TOKENS='발급받은 토큰'
```
2. cmd 창에 아래 command 입력해주세요.
```command
$ npm install
$ npm start
```
