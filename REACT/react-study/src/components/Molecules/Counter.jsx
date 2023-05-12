import React from 'react';
import { useState } from 'react';

export default function Counter() {
    const [number, setNumber] = useState(0);

    const handleCounter = () => {
        setNumber(number + 1); // number : 1

        // * JS closuer와 연관, 콜백함수가 전달 될 때 snapshot => 내부 number값은 0으로 수렴,
        // ** 콜백함수를 호출할 때 setNumber()은 계속 number가 0으로 고정되었기 때문에 1로 고정 됨

        // setNumber(number + 1); state 대량으로 찍어도 1개밖에 안 찍힌다.
        // setNumber(number + 1);

        // *** 클로저에 따라서 아래와 같이 변경할 시 prev값이 변경되어 snapShot이 찍히기 때문에 값이 증가된다
        setNumber((prev) => prev + 1); // number prev : 1  => prev + 1 : 🌟 2
        setNumber((prev) => prev + 1); // number prev : 2 => prev + 1 : 🌟 3
    };

    return (
        <div>
            <button onClick={handleCounter}>Increase Number{number}</button>
        </div>
    );
}

// 클로저란?
// 클로저는 함수가 자신을 포함하고 있는 스코프의 변수에 접근할 수 있는 능력을 가진 것
// 클로저를 사용하면 함수가 생성될 당시의 상태를 유지
