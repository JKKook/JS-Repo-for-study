const express = require('express');
const app = express();
const PORT = 6001;
const mongoose = require('mongoose');
const userSchemas = require('./Models/UserSchema');

require('dotenv').config(); // env파일에서 환경변수 불러오기

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.listen(PORT, () => {
    console.log(`Sever is running on port ${PORT}`);
});
