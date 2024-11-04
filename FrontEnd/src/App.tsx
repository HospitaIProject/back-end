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

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ExcelListPage from './ExcelListPage/ExcelListPage';
import MainDateSelectionPage from './MainPage/MainDateSelectionPage';

const router = createBrowserRouter([
    //
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
    return <RouterProvider router={router} />;
}

export default App;
