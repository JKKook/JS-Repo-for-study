import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayout from './components/Templates/DefaultLayout';
import Navbar from './components/Oraginisms/Navbar';
import Main from './pages/Main';
import Cart from './pages/Cart';
import { useSelector } from 'react-redux';

function AppTwo() {
    const 꺼내온거 = useSelector((state) => state);
    return (
        <div>
            <p>리덕스 상태: {꺼내온거}</p>
        </div>
    );
}

export default AppTwo;
