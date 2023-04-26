// 세션 방식으로 로그인!
const passport = require('passport');

const router = require('express').Router();

// 로그인 기능 서버 요청
router.get('/', (req, res) => {
    res.render('login.ejs');
});
// post 요청, 미들웨어
router.post(
    '/',
    passport.authenticate('local', { failureRedirect: '/fail' }),
    (req, res) => {
        res.redirect('/');
    },
);

// passport.use( new LocalStrategy({
//     usernameField: 'id', (요기는 사용자가 제출한 아이디가 어디 적혔는지)
//     passwordField: 'pw', (요기는 사용자가 제출한 비번이 어디 적혔는지)
//     session: true, (요기는 세션을 만들건지)
//     passReqToCallback: false, (요기는 아이디/비번말고 다른 정보검사가 필요한지)
// });

module.exports = router;
