import { Provider } from 'react-redux';
import './App.css';
import Counter from './components/redux-toolkit/Counter';
import store from './components/redux-toolkit/store';

function App() {
    return (
        <div>
            <Provider store={store}>
                <Counter />
            </Provider>
        </div>
    );
}

export default App;

// 리덕스 툴킷은 store안에 slice들을 나눠서 저장한다
// 과거 리덕스는 store에 모든 정보들이 다 담겨있었음
