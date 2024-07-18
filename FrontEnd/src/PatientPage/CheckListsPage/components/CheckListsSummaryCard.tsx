import { useState } from 'react';
// import { useDateFormatted } from '../../../Hooks/useDateFormatted';
import {
    CheckListsAfterItemType,
    CheckListsBeforeItemType,
    CheckListsDuringItemType,
} from '../../../models/CheckListsType';
import { CheckListSetupType } from '../../../models/CheckListsType';
import CheckListsDetailModal from './CheckListsDetailModal';
import { useDateFormatted } from '../../../Hooks/useDateFormatted';
import ArrowIcon from '../../../icons/ArrowIcon';
import useOperationDayFormat from '../../../Hooks/useOperationDateFormatted';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import SparklingIcon from '../../../icons/SparklingIcon';
// import { Link } from 'react-router-dom';

type Props = {
    checkListData: CheckListsBeforeItemType | CheckListsDuringItemType | CheckListsAfterItemType;
    setupData: CheckListSetupType;
    operationDateDTO: {
        operationId: number;
        operationMethod: string[];
        customOperationMethod: string[];
        operationDate: string;
        hospitalizedDate: string;
        dischargedDate: string;
    };
    type: 'PREV' | 'TODAY' | 'POST';
    prevValues?: CheckListsBeforeItemType;
    todayValues?: CheckListsDuringItemType;
    postValues?: CheckListsAfterItemType;
};

function CheckListsSummaryCard({
    prevValues,
    todayValues,
    postValues,
    checkListData,
    setupData,
    operationDateDTO,
    type,
}: Props) {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { createAt, updatedAt } = checkListData;

    const { allDate: formattedCreateAt, relativeDate } = useDateFormatted(createAt || ''); //작성일
    const { allDate: formattedUpdatedAte } = useDateFormatted(updatedAt || ''); //수정일
    const { dateComparison: createAtComparison } = useDateFormatted(createAt);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { writeDiffDay } = useOperationDayFormat(operationDateDTO.operationDate, checkListData.createAt);
    let dateComparison = '';
    if (typeof writeDiffDay === 'number') {
        dateComparison = type === 'PREV' ? `수술전` : type === 'TODAY' ? '수술당일' : `D+${Math.abs(writeDiffDay)}`;
    }
    const openModal = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('dateStatus', type);
        params.set('diffDay', writeDiffDay?.toString() || '');

        navigate(pathname + '?' + params.toString(), { replace: true });

        setIsModalOpen(true);
    };
    const closeModal = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('dateStatus');
        params.delete('diffDay');

        navigate(pathname + '?' + params.toString(), { replace: true });

        setIsModalOpen(false);
    };

    return (
        <>
            <li
                className="relative flex w-full cursor-pointer flex-row items-center border-y bg-white p-4 hover:bg-blue-50"
                onClick={() => openModal()}
            >
                <div className="flex w-full flex-row items-center gap-6">
                    <span className="text-lg font-semibold text-sky-800">{dateComparison}</span>
                    <div className="flex flex-col gap-1">
                        <span className="inline-block break-words text-sm text-gray-700">
                            작성일:&nbsp;
                            <span className="font-medium text-gray-900">{formattedCreateAt}</span>
                        </span>
                        <span className="inline-block break-words text-sm text-gray-700">
                            수정일:&nbsp;
                            <span className="font-medium text-gray-900">
                                {formattedCreateAt === formattedUpdatedAte ? '수정일 없음' : formattedUpdatedAte}
                            </span>
                        </span>
                    </div>
                </div>
                <button className="text-sm font-semibold text-blue-600 underline underline-offset-4">
                    <ArrowIcon className="h-5 w-5 text-blue-600" />
                </button>
                {createAtComparison === 'TODAY' && (
                    <div className="absolute left-0 top-0 flex flex-row items-center gap-1 rounded-br-lg bg-yellow-200 p-[3px] font-serif text-xs text-gray-700">
                        <span>Today</span>
                        <SparklingIcon className="h-3 w-3 text-yellow-700" />
                    </div>
                )}
            </li>
            {isModalOpen && (
                <CheckListsDetailModal
                    prevValues={prevValues}
                    todayValues={todayValues}
                    postValues={postValues}
                    setupData={setupData}
                    values={checkListData}
                    onClose={() => closeModal()}
                />
            )}
        </>
    );
}

export default CheckListsSummaryCard;
