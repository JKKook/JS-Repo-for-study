const express = require('express');
const app = express();
const PORT = 6001;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

require('dotenv').config(); // env파일에서 환경변수 불러오기

const { userSchemas } = require('./models/User');
const { 로그인했니 } = require('./middlewares/Auth');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// DB connect
mongoose
    .connect(process.env.MONGO_ATLAS_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => {
        console.log('DB connected');
    })
    .catch((err) => {
        console.log(err);
    });

app.get('/', (req, res) => {
    res.send('sever Open');
});

app.post('/register', async (req, res) => {
    //회원 가입 시 필요 정보를 client에서 가져오면 데이터베이스에 삽입한다
    //req.body는  : body parser를 통해 body에 담긴 정보를 가져온다
    //인스턴스를 만들어서 mongoDB 메서드, user모델에 저장
    const user = new userSchemas(req.body);

    try {
        const userStatus = await user.save();

        if (!userStatus) {
            const error = new Error('POST 요청이 잘못되었다');
            return res.status(400).json({ success: fail, error });
        }
        return res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
});

// // sign-In
app.post('/login', async (req, res) => {
    console.log('req.body', req.body);
    // 1. 요청 된 이메일을 데이터베이스에서 찾아야 함.
    const userEmail = await User.findOne({ email: req.body.email });

    try {
        const isEmail = await userEmail.save();

        if (!isEmail) {
            const error = new Error('이메일이 존재하지 않는데요?');
            return res.json({ loginSuccess: false, error });
        } else {
            // 2. 이메일을 데이터베이스에서 찾았다면 비밀번호 비교
            // User.js에서 comparePassword 메소드를 만들어서 사용하면 됨.
            userEmail.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch) {
                    return res.json({
                        loginSuccess: false,
                        message: '비밀번호가 틀렸는데요?',
                    });
                } else {
                    // 3. 비밀번호까지 맞는다면 Token 형성
                    userEmail.generateToken((err, user) => {
                        //JSONWEBTOKEN 라이브러리
                        if (err) return res.status(400).send(err);
                        // 토큰 저장 : 쿠키 || 로컬스토리지
                        res.cookie('x_auth', user.token)
                            .status(200)
                            .json({ loginSuccess: true, userId: user._id });
                    });
                }
            });
        }
    } catch (error) {
        console.log(error.message);
    }
});

// Authentication
app.get('/api/users/auth', 로그인했니, (req, res) => {
    res.status(200).json({
        // middleware 통과 되면 user정보 반환
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
    });
});

app.listen(PORT, () => {
    console.log(`Sever is running on port ${PORT}`);
});
