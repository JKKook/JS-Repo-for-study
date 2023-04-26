const router = require('express').Router();
// 상세페이지 만들기 (params)
router.get('/:id', (req, res) => {
    req.app.db.collection('post').findOne(
        {
            _id: parseInt(req.params.id), // detail/뒤에있는숫자
        },
        (req, result) => {
            console.log('params 결과', result);
            res.render('detail.ejs', { posts: result });
        },
    );
});

module.exports = router;
