import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import LoginPage from './LoginPage/LoginPage';
import Layout from './Layout/Layout';
import HeaderLayout from './Layout/HeaderLayout';
import NewPatientFormPage from './PatientPage/NewPatientFormPage/NewPatientFormPage';
import ComplianceFormPage from './PatientPage/ComplianceFormPage/ComplianceFormPage';
import RQProviders from './components/RQProvider';

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<RQProviders />}>
                    {/* 전체 레이아웃 */}

                    <Route element={<Layout />}>
                        {/* 헤더 레이아웃 */}
                        <Route element={<HeaderLayout />}>
                            {/* 메인 페이지 */}
                            <Route path="/" element={<MainPage />} />
                            {/* 뒤로가기 */}
                            {/* 환자 등록 페이지 */}
                            <Route path="/patient/new" element={<NewPatientFormPage />} />
                            {/* compilance 체크리스트 페이지 */}
                            <Route path="/patient/form/compilance/:id" element={<ComplianceFormPage />} />
                        </Route>
                        <Route path="/login" element={<LoginPage />} />
                    </Route>
                    {/* 추가 페이지 라우트 */}
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
