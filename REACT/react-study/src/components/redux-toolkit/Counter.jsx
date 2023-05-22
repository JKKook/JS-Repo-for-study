import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { add, substract } from './counterSlice';

export default function Counter() {
    const dispatch = useDispatch();
    console.log('dispatch는 뭐하는 녀석이냐?:', dispatch); // action이 존재하면 state를 불러오는 미들웨어

    // useSelector는 어디서 파생되었나?
    // 바로 reducer에서 return 값을 가져 온다.
    const count = useSelector((state) => {
        console.log('state', state); // {counter: {counter : value : }}}
        return state.counter.value;
    });
    console.log('useSelector(state)는 뭘 받아오냐?:', count);

    const handleDispatchCount = (e) => {
        if (e.target.id === 'addition') {
            dispatch(add(2));
        } else if (e.target.id === 'substraction') {
            dispatch(substract(2));
        }
    };

    return (
        <>
            <CounterButton id='addition' onClick={handleDispatchCount}>
                +
            </CounterButton>
            <Count>{count}</Count>

            <CounterButton id='substraction' onClick={handleDispatchCount}>
                -
            </CounterButton>
            <Count>{count}</Count>
        </>
    );
}

const CounterButton = styled.button`
    font-size: 3rem;
    margin: 5rem;
    width: 200px;
`;

const Count = styled.span`
    font-size: 3rem;
    color: red;
`;
