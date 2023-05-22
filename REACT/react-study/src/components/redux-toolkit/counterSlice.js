import { createSlice } from '@reduxjs/toolkit';

// ** slice 생성(createSlice)
export const counterSlice = createSlice({
    name: 'counter',
    initialState: { value: 0 },
    reducers: {
        // actions 이름
        add: (state, action) => {
            console.log('state는 뭐냐?', state); // Proxy(object)
            console.log('state.value는 뭘 받냐?', state.value); // initialState 받음
            console.log(typeof initialState);

            // ...state, action 뭐시기 안 해도 됨!
            // 기존의 상태 값 = 기존의 상태 값 + 취할 액션

            // payload은 리덕스 툴킷에서는 actionCreator 생성
            state.value = state.value + action.payload;
            console.log('actionPayLoad:', action.payload);
        },
        substract: (state, action) => {
            // 기존의 상태 값 = 기존의 상태 값 - 취할 액션
            state.value = state.value - action.payload;
        },
    },
});
console.log('initialState :', counterSlice.initialState); // undefined
// state reducers에 대한 값은 reducer에서 처리

// actions export 시키기
export const { add, substract } = counterSlice.actions;
