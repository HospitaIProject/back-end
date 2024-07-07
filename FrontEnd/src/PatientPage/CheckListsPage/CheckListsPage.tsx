import { useEffect } from 'react';
import Loading from '../../components/common/Loading';
import ResponsivePagination from '../../components/common/ResponsivePagination';
import CheckListsSummaryCard from './components/CheckListsSummaryCard';
import { useCheckListsQuery } from '../_lib/checkListsService';
import { Link, useSearchParams } from 'react-router-dom';
import DisplayEmptyData from '../../components/common/DisplayEmptyData';
import PlusIcon from '../../icons/PlusIcon';

function CheckListsPage() {
    // const [searchParams] = useSearchParams();
    // const page = Number(searchParams.get('page')) || 1;
    const [searchParams] = useSearchParams();
    const surgeryId = searchParams.get('id');
    const patientName = searchParams.get('name');
    const patientListQuery = useCheckListsQuery({ surgeryId: Number(surgeryId) });

    useEffect(() => {
        console.log(patientListQuery.data);
    }, [patientListQuery.isSuccess]);
    const isNoneData = patientListQuery.isSuccess && patientListQuery.data.length === 0;

    if (patientListQuery.isLoading) return <Loading />;
    if (!patientListQuery.data) {
        return <div>데이터가 없습니다.</div>;
    }

    return (
        <>
            <div className="flex flex-col justify-center w-full gap-6">
                <ul className="grid grid-cols-1 gap-2 py-2 mobile:grid-cols-2 mobile:px-2">
                    <div className="flex flex-row items-center justify-end w-full gap-3 px-4 py-1 mobile:col-span-2">
                        {/* <span className="text-gray-600">
                            환자명:&nbsp;<span className="">{patientName}</span>
                        </span> */}
                        <Link
                            to={`/patient/form/compliance?id=${surgeryId}&name=${patientName}`}
                            className="flex flex-row items-center gap-2 p-2 border rounded-md shadow-sm bg-gray-50"
                        >
                            <span className="text-sm font-semibold text-gray-600">체크리스트</span>
                            <PlusIcon className="w-5 h-5 text-gray-600" />
                        </Link>
                    </div>
                    <DisplayEmptyData label="작성된 체크리스트가 없습니다." isRender={isNoneData} />

                    {patientListQuery.data.map((data) => (
                        <CheckListsSummaryCard surgeryData={data} />
                    ))}
                </ul>
                <ResponsivePagination />
            </div>
            {/* <RouteModal onClose={() => {}} patientId={1} /> */}
        </>
    );
}

export default CheckListsPage;
