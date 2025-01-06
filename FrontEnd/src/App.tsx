import { lazy, Suspense } from 'react';

import Layout from './Layout/Layout';
import HeaderLayout from './Layout/HeaderLayout';
import RQProviders from './components/RQProvider';

// import MainPage from './MainPage/MainPage';
// import LoginPage from './LoginPage/LoginPage';
// import NewOperationInfoFormPage from './PatientPage/NewOperationInfoFormPage/NewOperationInfoFormPage';
// import ComplianceFormPage from './PatientPage/ComplianceFormPage/ComplianceFormPage';
// import NewPatientFormPage from './PatientPage/NewPatientFormPage/NewPatientFormPage';
// import OperationListPage from './PatientPage/OperationPage/OperationListPage';
// import CheckListsPage from './PatientPage/CheckListsPage/CheckListsPage';
// import NewComplicationFormPage from './PatientPage/NewComplicationFormPage/NewComplicationFormPage';
// import CheckListViewPage from './PatientPage/CheckListsPage/components/CheckListViewPage';
// import DailyCompliancePage from './PatientPage/ComplianceFormPage/DailyCompliancePage';
// import MainDateSelectionPage from './MainPage/MainDateSelectionPage';
// import DefaultCheckListSettingPage from './DefaultCheckListSettingPage/DefaultCheckListSettingPage';

const MainPage = lazy(() => import('./MainPage/MainPage'));
const LoginPage = lazy(() => import('./LoginPage/LoginPage'));
const NewOperationInfoFormPage = lazy(() => import('./PatientPage/NewOperationInfoFormPage/NewOperationInfoFormPage'));
const ComplianceFormPage = lazy(() => import('./PatientPage/ComplianceFormPage/ComplianceFormPage'));
const OperationListPage = lazy(() => import('./PatientPage/OperationPage/OperationListPage'));
const CheckListsPage = lazy(() => import('./PatientPage/CheckListsPage/CheckListsPage'));
const NewComplicationFormPage = lazy(() => import('./PatientPage/NewComplicationFormPage/NewComplicationFormPage'));
const CheckListViewPage = lazy(() => import('./PatientPage/CheckListsPage/components/CheckListViewPage'));
const DailyCompliancePage = lazy(() => import('./PatientPage/ComplianceFormPage/DailyCompliancePage'));
const NewPatientFormPage = lazy(() => import('./PatientPage/NewPatientFormPage/NewPatientFormPage'));
const MainDateSelectionPage = lazy(() => import('./MainPage/MainDateSelectionPage'));
const DefaultCheckListSettingPage = lazy(() => import('./DefaultCheckListSettingPage/DefaultCheckListSettingPage'));

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ExcelListPage from './ExcelListPage/ExcelListPage';
import Loading from './components/common/Loading';
// import Loading from './components/common/Loading';

const router = createBrowserRouter([
    {
        element: <RQProviders />,
        children: [
            {
                element: <Layout />,
                children: [
                    {
                        element: <HeaderLayout />,
                        children: [
                            { path: '/', element: <MainDateSelectionPage /> },
                            { path: '/patient', element: <MainPage /> },
                            { path: '/operation-checkList/default-setting', element: <DefaultCheckListSettingPage /> },
                            {
                                path: '/summary/excel',
                                element: <ExcelListPage />,
                            },
                            { path: '/patient/operation/list', element: <OperationListPage /> },
                            { path: '/patient/checkLists', element: <CheckListsPage /> },
                            { path: '/patient/checkLists/preview', element: <CheckListViewPage /> },
                            { path: '/patient/new/info', element: <NewPatientFormPage /> },
                            { path: '/patient/new/info/:patientId', element: <NewPatientFormPage /> },
                            { path: '/patient/new/operation', element: <NewOperationInfoFormPage /> },
                            { path: '/patient/new/operation/:operationId', element: <NewOperationInfoFormPage /> },
                            { path: '/patient/form/compliance', element: <ComplianceFormPage /> },
                            { path: '/patient/form/compliance/daily', element: <DailyCompliancePage /> },
                            { path: '/patient/form/compliance/edit/:checkListId', element: <ComplianceFormPage /> },
                            {
                                path: '/patient/form/compliance/daily/edit/:checkListId',
                                element: <DailyCompliancePage />,
                            },
                            { path: '/patient/new/complication', element: <NewComplicationFormPage /> },
                        ],
                    },
                    { path: '/login', element: <LoginPage /> },
                ],
            },
        ],
    },
]);

function App() {
    return (
        <Suspense fallback={<Loading />}>
            <RouterProvider router={router} />
        </Suspense>
        // <RouterProvider router={router} />
    );
}

export default App;
