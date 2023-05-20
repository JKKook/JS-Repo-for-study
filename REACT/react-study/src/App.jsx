import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayout from './components/Templates/DefaultLayout';
import Navbar from './components/Oraginisms/Navbar';
import Main from './pages/Main';
import Cart from './pages/Cart';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route element={<DefaultLayout />}>
                    <Route path='/' element={<Main />} />
                    <Route path='/cart' element={<Cart />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
