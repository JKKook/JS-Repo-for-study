// 서버를 띄우기 위한 기본 셋팅
const express = require('express'); // 라이브러리 사용
const app = express(); // 라이브러리를 사용해서 서버 생성
// bodyParser란? input 데이터(POST) 해석을 도와주는 내장 라이브러리
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

// 로그인을 관리할 미들웨어
app.use(
    session({ secret: '비밀코드', resave: true, saveUninitialized: false }),
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new LocalStrategy(
        {
            usernameField: 'id',
            passwordField: 'pw',
            session: true,
            passReqToCallback: false,
        },
        function (입력한아이디, 입력한비번, done) {
            //console.log(입력한아이디, 입력한비번);
            db.collection('login').findOne(
                { id: 입력한아이디 },
                function (에러, 결과) {
                    if (에러) return done(에러);

                    if (!결과)
                        return done(null, false, {
                            message: '존재하지않는 아이디요',
                        });
                    if (입력한비번 == 결과.pw) {
                        return done(null, 결과);
                    } else {
                        return done(null, false, { message: '비번틀렸어요' });
                    }
                },
            );
        },
    ),
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (아이디, done) {
    done(null, {});
});

app.use('/login', require('./src/routers/login'));
app.use('/mypage', require('./src/routers/mypage'));
app.use('/write', require('./src/routers/write'));
app.use('/addition', require('./src/routers/addition'));
app.use('/list', require('./src/routers/list'));
app.use('/detail', require('./src/routers/detail'));

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
        app.db = db; // express 라우팅 데이터베이스 연결

        // 생성한 서버를 지정 포트에 열어 줌
        app.listen(4003, () => {
            console.log('node listening on 4003'); // 지정 포트를 열면 보여 줄 부분
        });
    },
);

// ROOT 경로, index.html 파싱
app.get('/', (req, res) => {
    res.render('index.ejs');
});

// delete 경로로 데이터베이스 날리기!
app.delete('/delete', (req, res) => {
    // 삭제는 고유한 데이터값(id)를 찾아서 해당 데이터를 삭제
    db.collection('post').deleteOne(
        { _id: parseInt(req.body._id) },
        (err, result) => {
            if (err) return res.status(400).send({ message: '서버 실패 했다' });
        },
    );
});

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// 데이터 수정하기
//1. params에 접근해서 해당 id값 랜더링
app.get('/edit/:id', (req, res) => {
    db.collection('post').findOne(
        {
            _id: parseInt(req.params.id),
        },
        (err, result) => {
            res.render('edit.ejs', { posts: result });
        },
    );
});
//2. 받아온 id값 데이터베이스 수정 PUT요청
//updateOne(업데이트할 게시물찾기, 수정할 내용, 콜백함수)
// 이제 프론트에서 put 요청만 하게 하면 됨! => method-override 라이브러리 사용!
// 라이브러리 사용 요청 코드

app.put('/edit', (req, res) => {
    db.collection('post').updateOne(
        {
            _id: parseInt(req.params.id),
        },
        { $set: { title: req.body.title, date: req.body.date } },
    );
});
