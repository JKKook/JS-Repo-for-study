// 서버를 띄우기 위한 기본 셋팅
const express = require('express'); // 라이브러리 사용
const app = express(); // 라이브러리를 사용해서 서버 생성

// bodyParser란? input 데이터(POST) 해석을 도와주는 내장 라이브러리
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// ejs 라이브러리
// ejs는 항상 경로가 views/파일.ejs
app.set('view engine', 'ejs');

require('dotenv').config(); // env파일에서 환경변수 불러오기

// MongoDB
const MongoClient = require('mongodb').MongoClient;

// GET
// 변수 하나 필요, todoapp이라는 데이터베이스 폴더에 연결
let db;
MongoClient.connect(
    process.env.MONGO_ATLAS_URL,
    { useUnifiedTopology: true },
    // 연결되면 할 일
    (error, client) => {
        if (error) return console.log(error.message);
        db = client.db('todoapp');

        // 생성한 서버를 지정 포트에 열어 줌
        app.listen(8080, () => {
            console.log('node listening on 8080'); // 지정 포트를 열면 보여 줄 부분
        });
    },
);

// ROOT 경로, index.html 파싱
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
