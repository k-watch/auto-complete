# Auto Complete

> 검색창 구현 및 검색어 추천 기능 구현
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
  - map 을 class 모듈화해서 검색 결과값 캐싱
  - 결과값이 캐싱되지 않으면 api 호출
  - 캐싱값은 만료시간을 가지고 있고, 오래된 데이터라 판단시 api호출
- 검색창
  - 검색어 입력
- 검색 결과 화면
  - 검색결과 중 검색어와 동일한 단어 하이라이트 처리
  - Key Down을 통해 검색어 위아래 이동 가능
  - 검색 Element 크기에 상관 없이 자연스러운 스크롤 이동

</br>

## ✏ 기술 스택 
 JavaScript / React / Redux Toolkit / Axios / styled-components
 
## 구현 방법
 - 검색결과 캐싱
 
 https://github.com/k-watch/auto-complete/blob/main/src/components/SearchBar.tsx#L27-L56
 
 - 검색결과 중 검색어와 동일한 단어 하이라이트 처리
 - Key Down을 통해 검색어 위아래 이동 가능 및 크기에 상관 없이 자연스러운 스크롤 이동

## 📚 폴더 구조

```jsx
📂 src
├── 📂 api
│   ├── 📂 search
├── 📂 component
│   ├── 📂 common
├── 📂 modules
│   ├── 📂 hooks
│   ├── 📂 search
├── 📂 pages
├── 📂 routes
├── 📂 styles
├── 📂 types
├── 📄 App
└── 📄 index
```

## 컨벤션
| 커밋명      | 내용                                             |
| ----------- | ------------------------------------------------ |
| ✨ feat     | 파일, 폴더, 새로운 기능 추가                     |
| 🐛 fix      | 버그 수정                                        |
| 💄 style    | 코드 스타일 변경                                 |
| 🛠 refactor | 코드 리팩토링                                    |
| 📝 docs     | 문서 생성, 추가, 수정(README.md)                 |


## 프로젝트 설치 및 실행
```
1. cmd 창에 아래 command 입력해주세요.
```command
$ npm install
$ npm start
```
