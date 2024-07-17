// import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import Loading from '../../components/common/Loading';
import ResponsivePagination from '../../components/common/ResponsivePagination';
import OperationSummaryCard from './components/OperationSummaryCard';
import { useOperationListQuery } from '../_lib/operationService';
import { Link, useSearchParams } from 'react-router-dom';
import DisplayEmptyData from '../../components/common/DisplayEmptyData';
import PlusIcon from '../../icons/PlusIcon';

function OperationListPage() {
    // const [searchParams] = useSearchParams();
    // const page = Number(searchParams.get('page')) || 1;
    const [searchParams] = useSearchParams();
    const patientId = searchParams.get('id');
    const patientName = searchParams.get('name');

    const operationListQuery = useOperationListQuery({
        patientId: Number(patientId),
    });

    useEffect(() => {
        console.log(operationListQuery.data);
    }, [operationListQuery.isSuccess]);

    if (operationListQuery.isLoading) return <Loading />;
    if (!operationListQuery.data) {
        return <div>데이터가 없습니다.</div>;
    }

    return (
        <>
            <div className="flex flex-col w-full">
                <div className="flex flex-row items-center justify-between w-full gap-3 px-4 py-3 mobile:col-span-2">
                    <span className="text-gray-600">
                        환자명:&nbsp;<span className="">{patientName}</span>
                    </span>
                    <Link
                        to={`/patient/new/operation?name=${patientName}&id=${patientId}`}
                        className="flex flex-row items-center gap-2 p-2 border rounded-md shadow-sm bg-gray-50"
                    >
                        <span className="text-sm font-semibold text-gray-600">수술 추가</span>
                        <PlusIcon className="w-5 h-5 text-gray-600" />
                    </Link>
                </div>
                <DisplayEmptyData isRender={operationListQuery.data.length === 0} label="수술 이력이 없습니다." />
                <ul className="grid grid-cols-1 gap-2 pb-2 mobile:grid-cols-2 mobile:px-2">
                    {operationListQuery.data.map((data) => (
                        <OperationSummaryCard key={data.operationId} operationData={data} />
                    ))}
                </ul>

                <ResponsivePagination />
            </div>
        </>
    );
}

export default OperationListPage;
