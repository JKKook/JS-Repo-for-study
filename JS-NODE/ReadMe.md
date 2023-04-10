## Node.js란?

노드란, 기존의 크롬 엔진인 'V8'을 자바스크립트 실행에 맞게 만들어진 일종의 런타임 환경이다.
즉, 자바스크립트 실행창 및 실행 환경이라고 여길 수 있다.

## Node.js의 특징

#### 1. Non-brocking I/O (Event-driven)

Sever에 여러 개의 데이터를 요청를 했을 때, 막힘 없이 서비스를 전달하는 기능을 의미한다.

Ex) 영화 예매 사이트에서 1 ~ 5번의 고객이 예매 요청을 할 때, 1번은 1표 2번은 3표 3번은 200표 4번은 1표 5번은 1표를 발행해야한다고 가정해보자, 다른 서버 같은 경우는 순차적으로 진행되기 때문에 1~5번까지 순차적으로 처리를 하게 된다. 하지만 노드의 경우는 처리 과정을 전체적으로 파악하고 빠르게 처리되는 부분들을 처리하고 늦게 처리되는 과정을 늦게 처리하는 특징을 갖고 있다. 즉 3번은 Node 환경에서는 맨 마지막에 처리되는 것을 의미한다.

#### 2. 비교적 코드가 매우 짧고, 쉬워서 빠른 개발이 가능하다.

## Set-up (Node.js + express)

```js
npm init
```

```js
npm install express
```

```js
npm install -g nodemon
```

## Express 문법

#### Basic

```js
// 서버를 띄우기 위한 기본 셋팅
const express = require('express'); // 라이브러리 사용
const app = express(); // 라이브러리를 사용해서 서버 생성
// 생성한 서버를 지정 포트에 열어 줌
app.listen(8080, () => {
    console.log('listening on 8080'); // 지정 포트를 열면 보여 줄 부분
});
```

#### GET

```js
// 누군가가 /pet으로 방문 시,
// pet 관련 된 안내문을 띄워주자
// app.get('경로', (요청, 응답)=>{응답.send("해당 경로입니다")})
app.get('/pet', (req, res) => {
    res.send('pet 관련 용품입니다');
});

// /어쩌구로 접속 시 HTML 파일 보내기
// server.js랑 같은 경로에 있는 index.html이라는 파일을 보내 줍니다.
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
```

#### POST

post 기능을 사용하기 위해서는 전제조건 필요하다.
바로 서버로 전달할 데이터를 구분해주는 것인데,
가령 index.html 안의 2번째 input의 값을 전달받고자 한다면 input name="서버로 전송할 이름" 을 기입해줘야 한다.

```js
// POST - Create
// 어떤 사람이 /add 경로로 POST 요청을 하면...
// ??를 해주세요~  ** input의 정보는 require에 저장 됨!
app.post('/add', (req, res) => {
    res.send('전송 완료');
    // 터미널에 input value가 찍히는 걸 확인할 수 있다
    // title은 html에서 name으로 구분했던 녀석 임
    console.log(req.body.title);
});
```

## REST 원칙 6가지

1. Uniform interface

-   API 제작 시, 하나의 자료는 하나의 URL로
-   URL 하나를 알면 둘을 알 수 있어야 한다.
-   요청과 응답은 정보가 충분히 들어있어야 한다.

2. Client와 Server의 역할 구분

-   브라우저는 요청만 할 뿐
-   서버는 응답만 할 뿐

3. Stateless

-   각각의 요청들은 독립적이어야 한다.(각 요청은 의존성이 없어야 함)

###### (4 ~ 6번은 중요도가 상대적으로 덜함)

4. Cacheable

-   요청을 통해 보내는 이미지와 같은 자료들은 캐싱이 가능해야 한다 (요즘 브라우저가 알아서 하기 때문에 크게 신경 쓸 필요 없다)

5. Layered System

-   여러 개의 레이어를 거쳐서 요청을 처리하게 만드는 것

6. Code on Demand

-   서버는 고객에게 실제 실행가능한 코드를 전송해줄 수 있다

## 좋은 REST API 예시

##### 이름 짓기 원칙

1. 동사가 아닌 명사로 URL을 작성
2. 하위 문서를 나타낼 땐 '/' 기호로
3. 파일 확장자 쓰지 말기
4. 띄어쓰기는 '-' 기호로 사용
5. 자료 하나 당 하나의 URL

```js
// 잘 쓰여진 API 공통 규칙을 찾아보자
1. www.example.com/products/66342
2. instagram.com/explore/tags/kpop
3. facebook.com/natgeo/photos/
4. codingapple.com/course-status/
5. github.com/JKKook/music-player/commit/46/
```
