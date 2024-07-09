import ArrowIcon from '../../icons/ArrowIcon';
import { useDateFormatted } from '../../Hooks/useDateFormatted';
import { PatientWithOperationDtoType } from '../../models/PatientType';
import { Link, useNavigate } from 'react-router-dom';
import CheckListIcon from '../../icons/CheckListIcon';
import ConfirmNewPatientFormModal from './PatientDetailModal';
import { useState } from 'react';
import { pushNotification } from '../../utils/pushNotification';
import useSurgeryDayFormat from '../../Hooks/useSergeryDateFormatted';

type Props = {
    userData: PatientWithOperationDtoType;
};

function PatientSummaryCard({ userData }: Props) {
    const navigation = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isOperationData = userData.operationDateDTOs.length > 0; // 수술정보가 있는지 확인

    let operationMethod = '';
    let operationDate = '';
    let operationId = 0;

    if (isOperationData) {
        operationMethod = userData.operationDateDTOs[0].operationMethod;
        operationDate = userData.operationDateDTOs[0].operationDate;
        operationId = userData.operationDateDTOs[0].operationId;
    }

    const { onlyDate: formattedOperationDate, dateComparison } = useDateFormatted(operationDate); // 수술일자 포맷팅
    const { diffDay } = useSurgeryDayFormat(operationDate);

    const SUGERY_STATUS: { [key: string]: JSX.Element | string } = {
        PREV: '',
        TODAY: '',
        POST: '',
    };

    if (typeof diffDay === 'number') {
        SUGERY_STATUS['PREV'] = <span className="">{`D-${diffDay}`}</span>;
        SUGERY_STATUS['TODAY'] = <span className="">{'D-Day'}</span>;
        SUGERY_STATUS['POST'] = <span className="">{`D+${diffDay}`}</span>;
    } else {
        SUGERY_STATUS['PREV'] = '';
        SUGERY_STATUS['TODAY'] = '';
        SUGERY_STATUS['POST'] = '';
    }

    const handleRouteCheckList = () => {
        if (userData.checkListCreatedToday) {
            pushNotification({
                msg: '오늘 작성된 체크리스트가 있습니다.',
                type: 'error',
                theme: 'light',
            });
            return;
        }
        navigation(
            `patient/form/compliance?id=${operationId}&name=${userData.patientDTO.name}&dateStatus=${dateComparison}&diffDay=${diffDay}`,
        );
    };

    return (
        <>
            <li
                key={userData.patientDTO.patientNumber}
                className="flex flex-col w-full gap-3 p-4 bg-white border-y"
                // onClick={handleOpenModal}
            >
                <div className="flex flex-row flex-wrap items-center justify-between gap-4 mb-1">
                    <div className="flex flex-row items-center gap-1">
                        <span className="text-lg font-semibold text-sky-800">{userData.patientDTO.name} </span>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-sm font-semibold text-blue-600 underline underline-offset-4"
                    >
                        상세정보
                    </button>
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex flex-col gap-1">
                        <span className="flex flex-wrap text-sm text-gray-700 break-words">
                            <span className="shrink-0">등록번호:&nbsp;</span>
                            <span className="font-medium text-gray-900">{userData.patientDTO.patientNumber}</span>
                        </span>
                        <span className="inline-block text-sm text-gray-700 break-words">
                            <span className="shrink-0">수술일:&nbsp;</span>
                            <span className="font-medium text-gray-900">
                                {formattedOperationDate ? formattedOperationDate : '내역없음'}
                            </span>
                        </span>
                        <span className="inline-block text-sm text-gray-600 break-words">
                            <span className="shrink-0">수술명:&nbsp;</span>
                            <span className="font-medium text-gray-900">
                                {operationMethod ? operationMethod : '내역없음'}
                            </span>
                        </span>
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                        {isOperationData && (
                            <div className="relative">
                                <button
                                    onClick={handleRouteCheckList}
                                    disabled={userData.checkListCreatedToday}
                                    className={` ${
                                        userData.checkListCreatedToday ? '' : ''
                                    } mx-1 flex flex-row items-center gap-2 rounded-lg border bg-blue-100 p-2 text-blue-700 shadow-sm disabled:cursor-not-allowed disabled:opacity-50`}
                                >
                                    <CheckListIcon className="w-5 h-5 text-inherit" />
                                    <span className="text-sm font-semibold">작성</span>
                                    <ArrowIcon className="w-4 h-4 text-inherit" />
                                </button>
                                <span
                                    className={`absolute -top-2 right-0 inline-block rounded-md px-1 text-sm ${
                                        userData.checkListCreatedToday
                                            ? 'font-medium text-red-300'
                                            : 'h-5 w-5 bg-yellow-200 text-center text-red-500'
                                    }`}
                                >
                                    {userData.checkListCreatedToday ? '작성완료 ✔' : '!'}
                                </span>
                            </div>
                        )}
                        {!isOperationData && (
                            <Link
                                to={`/patient/surgery/list?id=${userData.patientDTO.patientId}&name=${userData.patientDTO.name}`}
                                className={`mx-1 flex flex-row items-center gap-2 rounded-lg border bg-gray-50 p-2 text-gray-400 shadow-sm`}
                            >
                                <span className="text-sm">수술정보 등록이 필요합니다.</span>
                                <ArrowIcon className="w-4 h-4 text-inherit" />
                            </Link>
                        )}

                        {/* <span className="text-xs text-red-500">당일 작성안됨</span> */}
                    </div>
                </div>

                <div className="w-full my-1 border-t" />

                <div className="flex flex-row items-center justify-between w-full gap-2 text-gray-600">
                    {/* <button className="px-2 text-sm font-medium border rounded-md hover:bg-blue-50">체크리스트</button> */}
                    <span>{SUGERY_STATUS[dateComparison]}</span>

                    <Link
                        to={`/patient/surgery/list?id=${userData.patientDTO.patientId}&name=${userData.patientDTO.name}`}
                        className="p-2 px-2 text-sm font-medium border rounded-md hover:bg-blue-50"
                    >
                        수술정보관리
                    </Link>
                </div>
            </li>
            {isModalOpen && <ConfirmNewPatientFormModal values={userData} onClose={() => setIsModalOpen(false)} />}
        </>
    );
}

export default PatientSummaryCard;
