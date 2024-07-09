// import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import Loading from '../components/common/Loading';
import ResponsivePagination from '../components/common/ResponsivePagination';
import { usePatientListQuery } from './_lib/patientService';
import PatientSummaryCard from './components/PatientSummaryCard';
import DisplayEmptyData from '../components/common/DisplayEmptyData';
import RefreshIcon from '../icons/RefreshIcon';

function MainPage() {
    // const [searchParams] = useSearchParams();
    // const page = Number(searchParams.get('page')) || 1;
    const patientListQuery = usePatientListQuery();
    const { data: patientListData, isPending, isSuccess } = patientListQuery;

    useEffect(() => {
        console.log(patientListData);
    }, [isSuccess]);
    const isNoneData = isSuccess && patientListData.length === 0; // data가 없을때

    if (isPending) return <Loading />;
    if (!isSuccess) {
        return (
            <div className="fixed top-0 left-0 z-40 flex items-center justify-center w-screen h-screen bg-black bg-opacity-40">
                <div className="flex flex-col items-center justify-center w-full h-full gap-2 font-semibold text-red-600 rounded-lg max-h-24 max-w-44">
                    <span>서버 오류가 발생했습니다.</span>
                    <button
                        onClick={() => {
                            window.location.reload();
                        }}
                        className="flex flex-row items-center justify-center w-full gap-2 py-2 mx-5 text-base font-normal text-gray-600 bg-gray-200 border border-gray-500 rounded-lg"
                    >
                        새로고침
                        <RefreshIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col justify-center w-full">
                <DisplayEmptyData label="환자 데이터가 없습니다." isRender={isNoneData} />
                <ul className="grid grid-cols-1 gap-2 py-2 mobile:grid-cols-2 mobile:px-2">
                    {patientListQuery.data.map((data) => (
                        <PatientSummaryCard userData={data} />
                    ))}
                </ul>
                <ResponsivePagination />
            </div>
            {/* <RouteModal onClose={() => {}} patientId={1} /> */}
        </>
    );
}

export default MainPage;
