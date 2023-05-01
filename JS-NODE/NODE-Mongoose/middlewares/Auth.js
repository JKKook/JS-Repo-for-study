// 로그인 미들웨어
// passport 라이브러리 사용해도 상관 없음

const { User } = require('../models/User');

let 로그인했니 = (req, res, next) => {
    // 인증 처리
    // 1. 클라이언트 쿠키에서 토큰을 가져온다
    let token = req.cookies.x_auth;
    // 2. 토큰을 decoded(복호화)*쿠키파서 한 후, 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true });

        req.token = token; // 서버에서 req.token 사용할 수 있게 전달
        req.user = user; // 서버에서 req.user를 사용할 수 있게 전달
        next();
    });
    // 서버에서 유저가 있다면 인증! , 유저가 없다면 인증 하지 않음!
};

module.exports = { 로그인했니 };
