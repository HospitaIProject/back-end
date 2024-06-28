import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import LoginPage from './LoginPage/LoginPage';
import Layout from './Layout/Layout';
import HeaderLayout from './Layout/HeaderLayout';

function App() {
    return (
        <Router>
            <Routes>
                {/* 전체 레이아웃 */}
                <Route element={<Layout />}>
                    {/* 헤더 레이아웃 */}
                    <Route element={<HeaderLayout />}>
                        <Route path="/" element={<MainPage />} />
                    </Route>
                    <Route path="/login" element={<LoginPage />} />
                </Route>
                {/* 추가 페이지 라우트 */}
            </Routes>
        </Router>
    );
}

export default App;
