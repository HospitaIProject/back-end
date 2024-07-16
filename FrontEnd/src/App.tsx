import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import LoginPage from './LoginPage/LoginPage';
import Layout from './Layout/Layout';
import HeaderLayout from './Layout/HeaderLayout';
import NewOperationInfoFormPage from './PatientPage/NewOperationInfoFormPage/NewOperationInfoFormPage';
import ComplianceFormPage from './PatientPage/ComplianceFormPage/ComplianceFormPage';
import RQProviders from './components/RQProvider';
import NewPatientFormPage from './PatientPage/NewPatientFormPage/NewPatientFormPage';
import OperationListPage from './PatientPage/OperationPage/OperationListPage';
import CheckListsPage from './PatientPage/CheckListsPage/CheckListsPage';
import NewComplicationFormPage from './PatientPage/NewComplicationFormPage/NewComplicationFormPage';

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
                            {/* 수술정보 리스트 페이지 */}
                            <Route path="/patient/operation/list" element={<OperationListPage />} />

                            <Route path="/patient/checkLists" element={<CheckListsPage />} />

                            {/* 환자 정보 등록 페이지 */}
                            <Route path="/patient/new/info" element={<NewPatientFormPage />} />
                            {/* 환자 수술정보 등록 페이지 */}
                            <Route path="/patient/new/operation" element={<NewOperationInfoFormPage />} />
                            {/* compilance 체크리스트 페이지 */}
                            <Route path="/patient/form/compliance" element={<ComplianceFormPage />} />
                            <Route path="/patient/new/complication" element={<NewComplicationFormPage />} />
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
