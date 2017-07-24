# 프론트엔드 개발 이슈

## 개발환경 관련

`grunt`
`gulp`
-배포파일을 만들기위한 자동화 도구(매크로 같은 기능) : 배포될때는 필요없음, 개발용으로만 필요.
-gulp는 pipe

`bower`
`npm`
`yarn` (npm을 대체할만한 강력한 녀석)
-js라이브러리 쉽게 추가해주는 기능
-bower는 css까지 관리

`yo(yeoman)`
-boilerplate tool
-html 필수 태그 등 기본세팅을 도와줌

`babel` -ES6 문법을 ES5로 인식하게끔 바꿔주는 녀석. 크로스브라우징!
`browserify`
`webpack` -걸프가 하던 기능들 다 데려감. 웹팩만 잘해도 Good~
-bundler <-> concat
-bundler는 모듈관리 포함 (AMD, COMMON.js) : COMMON.js의 경우 NODE.js에 쓰임 ex)var $ = require(‘js’); -> bundle.js 처럼 결과물이 한개의 파일. 따라서 http 리퀘스트 횟수가 한번으로 줄어들어 훨씬 빨라짐. 파일 용량 크더라도 리퀘스트 횟수 적은게 훨씬 빠르다.
-concat은 단순히 파일관리 형식


## 라이브러리/프레임워크

프레임워크는 틀 안에서 놀아야함. 자유도가 떨어짐. 그러나 여러가지 세팅에 대한 부담은 적다.
라이브러리는 해당 일부 기능만 해결해줌. 다른것들은 알아서.

`react` - 페이스북에서 시작 2012
`angular` - 구글에서 시작 2013 - 프레임워크. 앵귤러1은 사장됨.
`vue` - 완전 최신꺼 2015 - 기능추가되면서 점점 프레임워크화 되고있다.
`jquery`
`lodash`
`underscore`
