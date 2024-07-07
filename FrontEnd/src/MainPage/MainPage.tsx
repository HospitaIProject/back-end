// import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import Loading from '../components/common/Loading';
import ResponsivePagination from '../components/common/ResponsivePagination';
import { usePatientListQuery } from './_lib/patientService';
import PatientSummaryCard from './components/PatientSummaryCard';

function MainPage() {
    // const [searchParams] = useSearchParams();
    // const page = Number(searchParams.get('page')) || 1;
    const patientListQuery = usePatientListQuery();

    useEffect(() => {
        console.log(patientListQuery.data);
    }, [patientListQuery.isSuccess]);

    if (patientListQuery.isLoading) return <Loading />;
    if (!patientListQuery.data) {
        return <div>데이터가 없습니다.</div>;
    }

    return (
        <>
            <div className="flex flex-col justify-center w-full gap-6">
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
