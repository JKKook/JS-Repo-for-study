import React from 'react';

// 여기는 props 데이터를 전달하는 곳
// 사용하는 곳에서 props 구체적인 데이터를 주입
export default function ProfileImage({ image }) {
    return (
        <>
            {/* 여기서 전달해도 되지만 재사용성이 떨어짐! */}
            <img
                src={image}
                alt='img'
                style={{ width: '200px', height: '200px', borderRadius: '50%' }}
            />
        </>
    );
}
