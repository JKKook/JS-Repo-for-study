// 서버를 띄우기 위한 기본 셋팅
const express = require('express'); // 라이브러리 사용
const app = express(); // 라이브러리를 사용해서 서버 생성

// bodyParser란? input 데이터(POST) 해석을 도와주는 내장 라이브러리
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// 생성한 서버를 지정 포트에 열어 줌
app.listen(8080, () => {
    console.log('listening on 8080'); // 지정 포트를 열면 보여 줄 부분
});

// 누군가가 /pet으로 방문 시,
// pet 관련 된 안내문을 띄워주자
// app.get('경로', (요청, 응답)=>{응답.send("해당 경로입니다")})
app.get('/pet', (req, res) => {
    res.send('pet 관련 용품입니다');
});

app.get('/beauty', (req, res) => {
    res.send('beauty 용품 사이트입니다');
});

// /어쩌구로 접속 시 HTML 파일 보내기
// server.js랑 같은 경로에 있는 index.html이라는 파일을 보내 줍니다.
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/write', (req, res) => {
    res.sendFile(__dirname + '/write.html');
});

// POST - Create
// 어떤 사람이 /add 경로로 POST 요청을 하면...
// ??를 해주세요~  ** input의 정보는 require에 저장 됨!
app.post('/add', (req, res) => {
    res.send('전송 완료');
    // 터미널에 input value가 찍히는 걸 확인할 수 있다
    // title은 html에서 name으로 구분했던 녀석 임
    console.log(req.body.title);
});

// 서버 재실행 귀찮음 => 자동화
// npm install -g nodemon (무조건 글로벌로 설치해야 작동, 에러 메시지 뜨면 sudo로!)
