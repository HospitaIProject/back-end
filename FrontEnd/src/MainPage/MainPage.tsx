// import { useSearchParams } from 'react-router-dom';
import Loading from '../components/common/Loading';
import ResponsivePagination from '../components/common/ResponsivePagination';
import { usePatientListQuery } from './_lib/patientService';
import PatientSummaryCard from './components/PatientSummaryCard';

function MainPage() {
    // const [searchParams] = useSearchParams();
    // const page = Number(searchParams.get('page')) || 1;
    const patientListQuery = usePatientListQuery();
    if (patientListQuery.isLoading) return <Loading />;
    if (!patientListQuery.data) {
        return <div>데이터가 없습니다.</div>;
    }

    return (
        <div className="flex w-full flex-col justify-center gap-6 p-7">
            <div className="mt-4 grid grid-cols-1 gap-4 mobile:grid-cols-2">
                {patientListQuery.data.map((data) => (
                    <PatientSummaryCard key={data.id} userData={data} />
                ))}
            </div>
            <ResponsivePagination />
        </div>
    );
}

export default MainPage;
