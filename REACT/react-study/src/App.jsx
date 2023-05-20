import './App.css';
import Profile from './components/Molecules/Profile';
import ProfileImage from '../src/components/Atoms/ProfileImage';
import Counter from './components/Molecules/Counter';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayout from './components/Templates/DefaultLayout';
import Navbar from './components/Oraginisms/Navbar';
import Main from './pages/Main';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route element={<DefaultLayout />}>
                    <Route path='/' element={<Main />} />
                    {/* <Route path='/cart' element={<Cart />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
