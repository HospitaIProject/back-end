import { useEffect } from 'react';
import Loading from '../../components/common/Loading';
import ResponsivePagination from '../../components/common/ResponsivePagination';
import CheckListsSummaryCard from './components/CheckListsSummaryCard';
import { useCheckListsQuery } from '../_lib/checkListsService';
import { Link, useSearchParams } from 'react-router-dom';
import DisplayEmptyData from '../../components/common/DisplayEmptyData';
import PlusIcon from '../../icons/PlusIcon';
import { useCheckListSetupQuery } from '../_lib/complianceFormSevice';

function CheckListsPage() {
    // const [searchParams] = useSearchParams();
    // const page = Number(searchParams.get('page')) || 1;
    const [searchParams] = useSearchParams();
    const surgeryId = searchParams.get('id');
    const patientName = searchParams.get('name');
    const dateComparison = searchParams.get('dateStatus');
    const patientListQuery = useCheckListsQuery({ surgeryId: Number(surgeryId) });
    const checkListSetupQuery = useCheckListSetupQuery({ surgeryId: Number(surgeryId) });

    const { data: patientListData, isPending } = patientListQuery;
    const { data: setupData } = checkListSetupQuery;

    useEffect(() => {
        console.log(patientListData);
    }, [patientListQuery.isSuccess]); //

    const isNoneData = patientListQuery.isSuccess && patientListQuery.data.length === 0; // data가 없을때
    const isNoneSeupData = checkListSetupQuery.isSuccess && !checkListSetupQuery.data; // setupData가 없을때

    if (isPending) return <Loading />;

    if (!patientListData || !setupData) {
        return <div>서버오류</div>;
    }

    return (
        <>
            <div className="flex flex-col justify-center w-full">
                <div className="flex flex-row items-center justify-between w-full gap-3 px-4 py-3 mobile:col-span-2">
                    <span className="text-gray-600">
                        환자명:&nbsp;<span className="">{patientName}</span>
                    </span>
                    <Link
                        to={`/patient/form/compliance?id=${surgeryId}&name=${patientName}&dateStatus=${dateComparison}`}
                        className="flex flex-row items-center gap-2 p-2 border rounded-md shadow-sm bg-gray-50"
                    >
                        <span className="text-sm font-semibold text-gray-600">체크리스트</span>
                        <PlusIcon className="w-5 h-5 text-gray-600" />
                    </Link>
                </div>
                <DisplayEmptyData label="작성된 체크리스트가 없습니다." isRender={isNoneData} />
                <DisplayEmptyData label="세팅된 체크리스트가 존재하지 않습니다." isRender={isNoneSeupData} />
                <ul className="grid grid-cols-1 gap-2 pb-2 mobile:grid-cols-2 mobile:px-2">
                    {patientListData.map((data) => (
                        <CheckListsSummaryCard surgeryData={data} setupData={setupData} />
                    ))}
                </ul>
                <ResponsivePagination />
            </div>
        </>
    );
}

export default CheckListsPage;
