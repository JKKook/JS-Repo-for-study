const express = require('express');
const app = express();
const PORT = 6001;
const mongoose = require('mongoose');

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

app.listen(PORT, () => {
    console.log(`Sever is running on port ${PORT}`);
});
