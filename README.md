# Auto Complete

> 검색창 및 검색어 추천 기능 구현
>
> ### 🌍 [배포링크](https://k-watch.netlify.app/)

<br/>

## 📖 목차

- [구현기능](#-구현-기능)
- [기술스택](#-기술-스택)
- [구현방법](#-구현-방법) 
- [폴더구조](#-폴더-구조)
- [컨벤션](#컨벤션)
- [프로젝트 설치 및 실행](#프로젝트-설치-및-실행)

</br>

## 🚀 구현 기능
![auto-complete](https://user-images.githubusercontent.com/30553624/201363887-ce932d68-c50d-4fb8-9d5f-8e46971f0cb2.gif)
- 공통
  - map 을 class 모듈화해서 검색 결과값 캐싱
  - 결과값이 캐싱되지 않으면 api 호출
  - 캐싱값은 만료시간을 가지고 있고, 오래된 데이터라 판단시 api호출
- 검색창
  - 디바운스를 사용해서 입력의 마지막 값만 호출
- 검색 결과 화면
  - 검색결과 중 검색어와 동일한 단어 하이라이트 처리
  - Key Down을 통해 검색어 위아래 이동 가능
  - 검색 Element 크기에 상관 없이 자연스러운 스크롤 이동

</br>

## ✏ 기술 스택 
 JavaScript / React / Redux Toolkit / Axios / styled-components
 
 </br>
 
## ✔ 구현 방법
 ### 디바운스 사용
 - 검색어를 입력할 때마다 무분별한 api 호출을 막기 위해 디바운스 hook을 추가해 입력시 마지막 값만 호출하도록 최적화했습니다.
 https://github.com/k-watch/auto-complete/blob/9f78eb541adfa97111eb7c2163186947f77275a4/src/modules/hooks/useDebounce.ts#L5-L23
 ### 검색결과 캐싱
 - 검색어를 입력했을 때 과거에 입력했던 결과값을 CacheInstance 에서 만료시간 확인 후 최신화된 값이면 반환합니다.
 https://github.com/k-watch/auto-complete/blob/9f78eb541adfa97111eb7c2163186947f77275a4/src/service/cacheInstance.ts#L17-L30
 - 만약 만료시간이 지나 오래된 데이터라고 판단되면 서버에 API 호출을 통해 새로운 값을 받아옵니다.
 https://github.com/k-watch/auto-complete/blob/9f78eb541adfa97111eb7c2163186947f77275a4/src/components/SearchBar.tsx#L27-L55
 - 새로운 값을 CacheInstance 에 set 할 때 만료시간을 세팅해서 넣어줍니다.
 https://github.com/k-watch/auto-complete/blob/9f78eb541adfa97111eb7c2163186947f77275a4/src/service/cacheInstance.ts#L32-L39
 ### 검색어 하이라이트
 - 검색결과 중 검색어와 동일한 단어 하이라이트 처리를 위해 정규식을 사용해서 검색어를 기준으로 split 했습니다.
 https://github.com/k-watch/auto-complete/blob/0d1d4838fbaca81dc43bac2dcdfabd4e5480f5bb/src/components/SearchItem.tsx#L8-L12
 ### Key Down 으로 검색결과 이동
 - Key Down 이벤트로 검색결과를 이동할 수 있게 구현했습니다. List Element 높이 값들이 달라 높이를 계산해서 Key Down 사용시 자연스럽게 스크롤이 이동하도록 했습니다.
 https://github.com/k-watch/auto-complete/blob/0d1d4838fbaca81dc43bac2dcdfabd4e5480f5bb/src/components/SearchList.tsx#L30-L46

</br>

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

</br>

## 컨벤션
| 커밋명      | 내용                                             |
| ----------- | ------------------------------------------------ |
| ✨ feat     | 파일, 폴더, 새로운 기능 추가                     |
| 🐛 fix      | 버그 수정                                        |
| 💄 style    | 코드 스타일 변경                                 |
| 🛠 refactor | 코드 리팩토링                                    |
| 📝 docs     | 문서 생성, 추가, 수정(README.md)                 |

</br>

## 프로젝트 설치 및 실행
1. cmd 창에 아래 command 입력해주세요.
```
$ npm install
$ npm start
```
