// import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import Loading from '../components/common/Loading';
import ResponsivePagination from '../components/common/ResponsivePagination';
import { usePatientListQuery } from './_lib/patientService';
import PatientSummaryCard from './components/PatientSummaryCard';
import DisplayEmptyData from '../components/common/DisplayEmptyData';
import { useSearchParams } from 'react-router-dom';
import { useRefreshAtSpecificTime } from '../Hooks/useRefreshAtSpecificTime';
// import PWAInatallPrompt from '../components/PWA/PWAInatallPrompt';

function MainPage() {
    const [searchParams] = useSearchParams();
    const patientListQuery = usePatientListQuery(searchParams);
    const { data: patientListData, isPending, isSuccess, error, refetch } = patientListQuery;

    useRefreshAtSpecificTime({
        refetch,
        targetHour: 0,
        targetMinute: 0,
        text: '자정이 되어 데이터를 새로 요청합니다.',
    }); // 자정에 데이터를 새로 요청

    useEffect(() => {
        console.log(patientListData);
    }, [isSuccess]);
    useEffect(() => {
        console.log(searchParams);
    }, [searchParams]);
    const isNoneData = isSuccess && patientListData.patients.length === 0; // data가 없을때

    useEffect(() => {
        console.log(error?.message);
    }, [error]);

    if (isPending) return <Loading />;

    return (
        <>
            <div className="flex w-full flex-col justify-center">
                <div className="my-2 flex w-full flex-grow flex-col bg-white">
                    <DisplayEmptyData label="환자 데이터가 없습니다." isRender={isNoneData} />
                    <ul className="grid grid-cols-1 gap-x-8 mobile:grid-cols-2 mobile:px-2">
                        {isSuccess &&
                            patientListQuery.data.patients.map((data) => (
                                <div key={data.patientDTO.patientId} className="flex w-full flex-col">
                                    <PatientSummaryCard userData={data} />
                                    <div className={`w-full border-t border-gray-200`} />
                                </div>
                            ))}
                    </ul>
                </div>

                <ResponsivePagination pageSize={patientListQuery.data?.pageInfo.totalPages} />
            </div>
        </>
    );
}

export default MainPage;
