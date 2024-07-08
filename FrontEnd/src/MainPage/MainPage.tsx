// import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import Loading from '../components/common/Loading';
import ResponsivePagination from '../components/common/ResponsivePagination';
import { usePatientListQuery } from './_lib/patientService';
import PatientSummaryCard from './components/PatientSummaryCard';
import DisplayEmptyData from '../components/common/DisplayEmptyData';

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
    if (!patientListData) {
        return <div className="flex w-vw h-hw"></div>;
    }
    if (isPending) {
        return <div className="absolute top-0 left-0 w-vw h-hw bg-slate-100">d</div>;
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
