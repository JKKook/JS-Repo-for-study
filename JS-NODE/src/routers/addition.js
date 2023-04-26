const router = require('express').Router();

router.post('/', (req, res) => {
    // 게시물 번호 발행 - 1.count관리 데이터베이스 생성, 2.서버에서 코드 추가
    // 하나의 데이터를 명을 찾고(쿼리문), 해당 개수에서 totalPost 값을 + 1
    req.app.db
        .collection('counter')
        .findOne({ name: '게시물 개수' }, (err, result) => {
            console.log(result.totalPost); // db에 저장되어 있는 totalPost

            let 총게시물개수 = result.totalPost;
            req.app.db.collection('post').insertOne(
                {
                    _id: 총게시물개수 + 1,
                    title: req.body.title,
                    date: req.body.date,
                },
                (err, result) => {
                    console.log(
                        'result : post 데이터의 insert한 결과 값',
                        result,
                    );
                    //'counter' 컬렉션의 totalPost + 1 증가
                    // updateOne('찾을 게시물 쿼리', '업데이트할 데이터', '디비에 저장될 결과 및 에러')
                    req.app.db
                        .collection('counter')
                        .updateOne(
                            { name: '게시물 개수' },
                            { $int: { totalPost: 1 } },
                            (err, result) => {
                                console.log(
                                    'result : counter 컬렉션에서 update한 결과값',
                                    result,
                                );
                            },
                        );
                },
            );
        });
    res.redirect('/');
});

module.exports = router;
