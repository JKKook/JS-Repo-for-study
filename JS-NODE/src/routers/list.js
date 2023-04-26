const router = require('express').Router();
// List 경로로 접근하면 post에 있는 데이터 정보 뿌려줘
router.get('/', (req, res) => {
    req.app.db
        .collection('post')
        .find()
        .toArray((err, result) => {
            console.log(result);
            if (err) return console.log(err);

            res.render('list.ejs', { posts: result });
        });
});

module.exports = router;
