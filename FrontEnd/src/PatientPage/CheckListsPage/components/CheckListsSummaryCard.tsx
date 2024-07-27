import { useEffect, useState } from 'react';
// import { useDateFormatted } from '../../../Hooks/useDateFormatted';
import {
    CheckListsAfterItemType,
    CheckListsBeforeItemType,
    CheckListsDailyItemType,
    CheckListsDuringItemType,
} from '../../../models/CheckListsType';
import { CheckListSetupType } from '../../../models/CheckListsType';
import CheckListsDetailModal from './CheckListsDetailModal';
import { useDateFormatted } from '../../../Hooks/useDateFormatted';
import ArrowIcon from '../../../icons/ArrowIcon';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import SparklingIcon from '../../../icons/SparklingIcon';
import CheckListsDailyDetailModal from './CheckListsDailyDetailModal';

type Props = {
    checkListData:
        | CheckListsBeforeItemType
        | CheckListsDuringItemType
        | CheckListsAfterItemType
        | CheckListsDailyItemType;
    setupData: CheckListSetupType;
    operationDateDTO: {
        operationId: number;
        operationMethod: string[];
        customOperationMethod: string[];
        operationDate: string;
        hospitalizedDate: string;
        dischargedDate: string;
    };
    type: 'PREV' | 'TODAY' | 'POST' | 'DAILY';
    prevValues?: CheckListsBeforeItemType;
    todayValues?: CheckListsDuringItemType;
    postValues?: CheckListsAfterItemType;
    dailyValues?: CheckListsDailyItemType;
    order?: number;
    day: number;
};

function CheckListsSummaryCard({
    prevValues,
    todayValues,
    postValues,
    dailyValues,

    checkListData,
    setupData,
    type,
    order,
    day,
}: Props) {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { createAt, updatedAt } = checkListData;
    const openLatest = searchParams.get('openLatest'); // 최신 데이터 열기
    const diffDay = searchParams.get('diffDay'); // 날짜 차이

    const { allDate: formattedCreateAt } = useDateFormatted(createAt || ''); //작성일
    const { allDate: formattedUpdatedAte } = useDateFormatted(updatedAt || ''); //수정일
    const { dateComparison: createAtComparison } = useDateFormatted(createAt);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDailyModalOpen, setIsDailyModalOpen] = useState(false);

    let dateComparison = '';

    if (type === 'PREV') {
        dateComparison = `수술 전`;
    } else if (type === 'TODAY') {
        dateComparison = '수술 중';
    } else if (type === 'POST') {
        dateComparison = '수술 후';
    } else {
        dateComparison = `D+${Math.abs(day)}`;
    }

    const openModal = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (type === 'DAILY') {
            params.set('dateStatus', type);
            params.set('diffDay', String(day));
            navigate(pathname + '?' + params.toString(), { replace: true });
            setIsDailyModalOpen(true);
            return;
        } else {
            params.set('dateStatus', type);

            navigate(pathname + '?' + params.toString(), { replace: true });

            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        if (openLatest === 'true') {
            return navigate(-1);
        } // 뒤로가기

        const params = new URLSearchParams(searchParams.toString());
        params.delete('dateStatus');
        params.delete('diffDay');

        navigate(pathname + '?' + params.toString(), { replace: true });
        if (type === 'DAILY') {
            setIsDailyModalOpen(false);
        } else {
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        // console.log(openLatest, diffDay);
        if (openLatest === 'true' && day === Number(diffDay)) {
            console.log(day, Math.abs(Number(diffDay)));

            setIsModalOpen(true);
        }
    }, [openLatest, diffDay]);

    return (
        <>
            <li
                className={`relative flex w-full cursor-pointer flex-row items-center border-y bg-white p-4 hover:bg-blue-50`}
                style={{ order: order }}
                onClick={() => openModal()}
            >
                <div className="flex flex-row items-center w-full gap-6 font-sm">
                    <span className="w-12 font-semibold text-sky-800">{dateComparison}</span>
                    <div className="flex flex-col gap-1">
                        <span className="inline-block text-sm text-gray-700 break-words">
                            작성일:&nbsp;
                            <span className="font-medium text-gray-900">{formattedCreateAt}</span>
                        </span>
                        <span className="inline-block text-sm text-gray-700 break-words">
                            수정일:&nbsp;
                            <span className="font-medium text-gray-900">
                                {formattedCreateAt === formattedUpdatedAte ? '수정일 없음' : formattedUpdatedAte}
                            </span>
                        </span>
                    </div>
                </div>
                <button className="text-sm font-semibold text-blue-600 underline underline-offset-4">
                    <ArrowIcon className="w-5 h-5 text-blue-600" />
                </button>
                {createAtComparison === 'TODAY' && (
                    <div className="absolute left-0 top-0 flex flex-row items-center gap-1 rounded-br-lg bg-yellow-200 p-[3px] font-serif text-xs text-gray-700">
                        <span>Today</span>
                        <SparklingIcon className="w-3 h-3 text-yellow-700" />
                    </div>
                )}
            </li>
            {isModalOpen && (
                <CheckListsDetailModal
                    prevValues={prevValues}
                    todayValues={todayValues}
                    postValues={postValues}
                    setupData={setupData}
                    onClose={() => closeModal()}
                />
            )}
            {isDailyModalOpen && dailyValues && (
                <CheckListsDailyDetailModal values={dailyValues} onClose={closeModal} existFields={setupData} />
            )}
        </>
    );
}

export default CheckListsSummaryCard;
