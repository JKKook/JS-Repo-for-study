const express = require('express'); // 익스프레스 가져오기
const path = require('path'); // 경로 가져오기

const app = express(); // 서버 열기

app.use(
    '/static',
    express.static(path.resolve(__dirname, 'frontend', 'static')),
);
// 패스가 올바르게 되어 있다면, frontend 폴더의 index.html을 호출
// 루트 경로임
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'));
});

app.listen(process.env.PORT || 3000, () => console.log('Server running...'));
