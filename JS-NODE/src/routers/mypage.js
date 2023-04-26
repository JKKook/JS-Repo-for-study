const router = require('express').Router();

router.get('/', isLoggedIn, function (요청, 응답) {
    console.log(요청.user);
    응답.render('mypage.ejs', { userData: 요청.user });
});

// 로그인 유무 미들웨어
function isLoggedIn(요청, 응답, next) {
    if (요청.user) {
        next(); // 통과
    } else {
        응답.send('로그인 안 하셨는데요?');
    }
}

module.exports = router;
