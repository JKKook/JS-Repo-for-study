import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './counterSlice';

// ** store에는 각각의 slice들이 들어가 있음 **

const store = configureStore({
    // 각각 slice들의 reduce들이 들어가야 함
    reducer: {
        // Naming 주의 : reducers ❌ , reducer 🟢

        // reducers 안에 있는 로직을 자동으로 만들어 줌
        counter: counterSlice.reducer,
    },
});

export default store;
