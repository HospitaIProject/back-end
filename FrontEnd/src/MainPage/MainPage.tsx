// import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import Loading from '../components/common/Loading';
import ResponsivePagination from '../components/common/ResponsivePagination';
import { usePatientListQuery } from './_lib/patientService';
import PatientSummaryCard from './components/PatientSummaryCard';
import DisplayEmptyData from '../components/common/DisplayEmptyData';
import { useSearchParams } from 'react-router-dom';
// import PWAInatallPrompt from '../components/PWA/PWAInatallPrompt';

function MainPage() {
    const [searchParams] = useSearchParams();
    const patientListQuery = usePatientListQuery(searchParams);
    const { data: patientListData, isPending, isSuccess, error } = patientListQuery;

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
            <div className="flex flex-col justify-center w-full">
                <div className="flex flex-col flex-grow w-full my-2 bg-white">
                    <DisplayEmptyData label="환자 데이터가 없습니다." isRender={isNoneData} />
                    <ul className="grid grid-cols-1 gap-x-8 mobile:grid-cols-2 mobile:px-2">
                        {isSuccess &&
                            patientListQuery.data.patients.map((data) => (
                                <div key={data.patientDTO.patientId} className="flex flex-col w-full">
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
