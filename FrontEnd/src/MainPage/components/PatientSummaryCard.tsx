import ArrowIcon from '../../icons/ArrowIcon';
import { useDateFormatted } from '../../Hooks/useDateFormatted';
import { PatientWithOperationDtoType } from '../../models/PatientType';
import { Link, useNavigate } from 'react-router-dom';
import CheckListIcon from '../../icons/CheckListIcon';
import ConfirmNewPatientFormModal from './PatientDetailModal';
import { useState } from 'react';
import { pushNotification } from '../../utils/pushNotification';
import useOperationDayFormat from '../../Hooks/useOperationDateFormatted';
import CheckBoxIcon from '../../icons/CheckBoxIcon';
import { useOperationMethodFormatted } from '../../Hooks/useOperationMethodFormatted';

function addDaysToDate(operationDate: string, daysToAdd: number): string {
    // 서버에서 받은 날짜 문자열을 Date 객체로 파싱
    const date = new Date(operationDate);

    // 일수를 더함
    date.setDate(date.getDate() + daysToAdd);

    // 결과 날짜를 'YYYY-MM-DD' 형식의 문자열로 변환하여 반환
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

type Props = {
    userData: PatientWithOperationDtoType;
};

function PatientSummaryCard({ userData }: Props) {
    const navigation = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isOperationData = userData.operationDateDTOs.length > 0; // 수술정보가 있는지 확인

    let operationMethod: string[] = [];
    let customOperationMethod: string[] = [];
    let operationDate = '';
    let operationId = 0;

    if (isOperationData) {
        operationMethod = userData.operationDateDTOs[0].operationMethod;
        customOperationMethod = userData.operationDateDTOs[0].customOperationMethod;
        operationDate = userData.operationDateDTOs[0].operationDate;
        operationId = userData.operationDateDTOs[0].operationId;
    }

    const { onlyDate: formattedOperationDate, dateComparison } = useDateFormatted(operationDate); // 수술일자 포맷팅
    const { diffDay } = useOperationDayFormat(operationDate); // 수술일자 차이 계산
    const operationMethodFormatted = useOperationMethodFormatted({
        operationMethod: operationMethod,
        customOperationMethod: customOperationMethod,
    });

    const SUGERY_STATUS: { [key: string]: JSX.Element | string } = {
        PREV: '',
        TODAY: '',
        POST: '',
    };

    if (typeof diffDay === 'number') {
        SUGERY_STATUS['PREV'] = <span className="">{`D-${diffDay}`}</span>;
        SUGERY_STATUS['TODAY'] = <span className="">{'D-Day'}</span>;
        SUGERY_STATUS['POST'] = <span className="">{`D+${Math.abs(diffDay)}`}</span>;
    } else {
        SUGERY_STATUS['PREV'] = '';
        SUGERY_STATUS['TODAY'] = '';
        SUGERY_STATUS['POST'] = '';
    }

    const handleRouteCheckList = () => {
        if (userData.checkListCreatedToday) {
            navigation(
                `/patient/checkLists?id=${operationId}&name=${userData.patientDTO.name}&dateStatus=${dateComparison}&diffDay=${diffDay}&openLatest=true`,
            );
        } else {
            navigation(
                `/patient/form/compliance?id=${operationId}&name=${userData.patientDTO.name}&dateStatus=${dateComparison}&diffDay=${diffDay}&date=${addDaysToDate(
                    operationDate,
                    -Number(diffDay),
                )}`,
            );
        }
    };

    return (
        <>
            <li
                className="flex flex-col w-full gap-3 p-4 bg-white cursor-pointer border-y"
                onClick={() => setIsModalOpen(true)} //임시 수정 테스트
            >
                <div className="flex flex-row flex-wrap items-center justify-between gap-4 mb-1">
                    <div className="flex flex-row items-center gap-1">
                        <span className="text-lg font-semibold text-blue-900">{userData.patientDTO.name} </span>
                    </div>
                    <button
                        // onClick={() => setIsModalOpen(true)} 임시수정 테스트
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
                                {operationMethodFormatted ? operationMethodFormatted : '내역없음'}
                            </span>
                        </span>
                    </div>
                    <div className="flex flex-col justify-center gap-1 shrink-0">
                        {isOperationData && (
                            <div className="relative">
                                <button
                                    onClick={handleRouteCheckList}
                                    className={` ${
                                        userData.checkListCreatedToday ? 'opacity-50' : ''
                                    } mx-1 flex flex-row items-center gap-2 rounded-lg border bg-blue-100 p-2 text-blue-700 shadow-sm`}
                                >
                                    <CheckListIcon className={`h-5 w-5 text-inherit`} />
                                    <span className="text-sm font-semibold">
                                        {userData.checkListCreatedToday ? '작성완료' : '작성'}
                                    </span>
                                    <ArrowIcon
                                        className={`h-4 w-4 text-inherit ${userData.checkListCreatedToday ? 'hidden' : ''}`}
                                    />
                                </button>
                                <span
                                    className={`absolute -top-2 rounded-full px-1 text-sm ${
                                        userData.checkListCreatedToday
                                            ? '-right-2 font-medium text-green-500'
                                            : '-right-1 flex h-[18px] w-[18px] items-center justify-center bg-yellow-200 text-center text-red-500'
                                    }`}
                                >
                                    {userData.checkListCreatedToday ? (
                                        <CheckBoxIcon isChecked={true} checkedClassName="w-5 h-5" />
                                    ) : (
                                        <span className="">!</span>
                                    )}
                                </span>
                            </div>
                        )}
                        {!isOperationData && (
                            <Link
                                to={`/patient/operation/list?id=${userData.patientDTO.patientId}&name=${userData.patientDTO.name}`}
                                className={`mx-1 flex flex-row items-center gap-2 rounded-lg border bg-gray-50 p-2 text-gray-400 shadow-sm`}
                            >
                                <span className="text-sm">수술정보 등록이 필요합니다.</span>
                            </Link>
                        )}

                        {/* <span className="text-xs text-red-500">당일 작성안됨</span> */}
                    </div>
                </div>

                <div className="w-full border-t" />

                <div className="flex flex-row items-center justify-between w-full gap-2 text-gray-600">
                    {/* <button className="px-2 text-sm font-medium border rounded-md hover:bg-blue-50">체크리스트</button> */}
                    <span
                        className={`${dateComparison ? '' : 'border-none'} rounded-md border px-2 py-1 text-sm text-gray-400`}
                    >
                        {SUGERY_STATUS[dateComparison]}
                    </span>

                    <Link
                        to={`/patient/operation/list?id=${userData.patientDTO.patientId}&name=${userData.patientDTO.name}`}
                        className="p-2 px-2 text-sm font-medium text-gray-500 border border-gray-500 rounded-md hover:bg-blue-50"
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
