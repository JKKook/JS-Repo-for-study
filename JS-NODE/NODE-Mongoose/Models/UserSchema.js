const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        trim: true,
        minlength: 5,
    },
    role: {
        type: Number,
        default: 0, // 1은 관리자 지정할 것임
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    },
});

// bcrypt 비밀번호 암호화
// https://www.npmjs.com/package/bcrypt
userSchema.pre('save', function (next) {
    let user = this;

    // 1. 비밀번호 형성 시만 비크립트 형성되도록!
    if (user.isModified('password')) {
        // 2. salt 생성(saltRounds) => 비밀번호 해쉬(스키마 패스워드, 솔트, 콜백함수)
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);

            // 3. Store hash in your password DB.
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

// comparePassword 매서드 생성
userSchema.methods.comparePassword = function (plainPassword, callback) {
    // plainPassword를 암호화 해서, 스키마에 있는 패스워드랑 동일한지 확인해야 함
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
        if (err) return callback(err);
        // 에러는 없고, isMatch이 true
        return callback(null, isMatch);
    });
};

// 토큰 생성
const jwt = require('jsonwebtoken');
userSchema.methods.generateToken = function (callback) {
    let user = this;
    console.log('user_id', user._id);
    // jsonWebToken을 이용해서 토큰 생성하기
    const token = jwt.sign(user._id.toHexString(), 'secretToken');

    user.token = token;
    user.save(function (err, user) {
        if (err) return callback(err);
        callback(null, user);
    });
};

const User = mongoose.model('users', userSchema);
const userSchemas = { User };

module.exports = userSchemas;
