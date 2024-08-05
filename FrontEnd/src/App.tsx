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
import CheckListViewPage from './PatientPage/CheckListsPage/components/CheckListViewPage';
import DailyCompliancePage from './PatientPage/ComplianceFormPage/DailyCompliancePage';
import DefaultCheckListSettingPage from './DefaultCheckListSettingPage/DefaultCheckListSettingPage';

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

                            {/* 수술명에 따른  체크리스트아이템 기본 세팅 */}
                            <Route
                                path="/operation-checkList/default-setting"
                                element={<DefaultCheckListSettingPage />}
                            />

                            {/* 수술정보 리스트 페이지 */}
                            <Route path="/patient/operation/list" element={<OperationListPage />} />

                            {/* 체크리스트목록 페이지 */}
                            <Route path="/patient/checkLists" element={<CheckListsPage />} />
                            {/* 체크리스트 항목 페이지 */}
                            <Route path="/patient/checkLists/preview" element={<CheckListViewPage />} />

                            {/* 환자 정보 등록 페이지 */}
                            <Route path="/patient/new/info" element={<NewPatientFormPage />} />
                            {/* 환자 정보 수정 페이지 */}
                            <Route path="/patient/new/info/:patientId" element={<NewPatientFormPage />} />

                            {/* 환자 수술정보 등록 페이지 */}
                            <Route path="/patient/new/operation" element={<NewOperationInfoFormPage />} />
                            {/* 환자 수술정보 수정 페이지 */}
                            <Route path="/patient/new/operation/:operationId" element={<NewOperationInfoFormPage />} />

                            {/* compilance 체크리스트 등록 페이지 */}
                            <Route path="/patient/form/compliance" element={<ComplianceFormPage />} />
                            <Route path="/patient/form/compliance/daily" element={<DailyCompliancePage />} />
                            {/* compilance 체크리스트 수정 페이지 */}
                            <Route path="/patient/form/compliance/edit/:checkListId" element={<ComplianceFormPage />} />
                            <Route
                                path="/patient/form/compliance/daily/edit/:checkListId"
                                element={<DailyCompliancePage />}
                            />

                            {/* 합병증 등록 페이지 */}
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
