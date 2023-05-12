import './App.css';
import Profile from './components/Molecules/Profile';
import ProfileImage from '../src/components/Atoms/ProfileImage';
import Counter from './components/Molecules/Counter';

function App() {
    const handleClick = (e) => {
        // event는 SyntheticBaseEvent으로 감싸서 이벤트리스너의 역할을 리액트에서 처리해줌
        // e : React.MouseEvent<HTMLButtonElement> , 이벤트리스너 중 마우스이벤트를 나타낸 타입
        console.log(e);
    };
    return (
        // 재사용성을 위해 사용하는 곳에서 props의 구체적인 데이터 입력
        <>
            {/* handleClick()은 자바스크립트 함수의 특정 값을 도출할 때고, 함수를 연결하고자한다면 handleClick만 넣어주면 된다. */}
            <Counter />
            <ProfileImage image='https://cdn.pixabay.com/photo/2017/03/30/18/17/girl-2189247_1280.jpg' />
            <Profile
                image='https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_1280.jpg'
                name='jonna Kim'
                title='DEV'
                newOne={true}
            />
            <Profile
                image='https://cdn.pixabay.com/photo/2017/09/01/21/53/sunglasses-2705642_1280.jpg'
                name='britune'
                title='DEV'
            />
            <Profile
                image='https://cdn.pixabay.com/photo/2015/03/03/08/55/portrait-657116_1280.jpg'
                name='cesellin'
                title='DEV'
            />
        </>
    );
}

export default App;
