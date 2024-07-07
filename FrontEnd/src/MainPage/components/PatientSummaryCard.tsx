import ArrowIcon from '../../icons/ArrowIcon';
import { useDateFormatted } from '../../Hooks/useDateFormatted';
import { PatientWithOperationDtoType } from '../../models/PatientType';
import { Link, useNavigate } from 'react-router-dom';
import CheckListIcon from '../../icons/CheckListIcon';
import ConfirmNewPatientFormModal from './PatientDetailModal';
import { useState } from 'react';

const SUGERY_STATUS = {
    PREV: '수술전',
    TODAY: '수술당일',
    POST: '수술1차',
};

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

    const { allDate: formattedOperationDate, dateComparison } = useDateFormatted(operationDate); // 수술일자 포맷팅

    const handleRouteCheckList = () => {
        if (!isOperationData) {
            alert('등록된 수술정보가 없습니다.');
            return;
        }
        navigation(
            `patient/form/compliance?id=${operationId}&name=${userData.patientDTO.name}&dateStatus=${dateComparison}`,
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
                        <span className="inline-block text-sm text-gray-700 break-words">
                            등록번호:&nbsp;
                            <span className="font-medium text-gray-900">{userData.patientDTO.patientNumber}</span>
                        </span>
                        <span className="inline-block text-sm text-gray-700 break-words">
                            수술일:&nbsp;
                            <span className="font-medium text-gray-900">
                                {formattedOperationDate ? formattedOperationDate : '내역없음'}
                            </span>
                        </span>
                        <span className="inline-block text-sm text-gray-600 break-words">
                            수술명:&nbsp;
                            <span className="font-medium text-gray-900">
                                {operationMethod ? operationMethod : '내역없음'}
                            </span>
                        </span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <button
                            onClick={handleRouteCheckList}
                            className={`mx-1 flex flex-row items-center gap-2 rounded-lg border bg-blue-100 p-2 text-blue-700 shadow-sm`}
                        >
                            <CheckListIcon className="w-5 h-5 text-inherit" />
                            <span className="text-sm font-semibold">작성</span>
                            <ArrowIcon className="w-4 h-4 text-inherit" />
                        </button>
                        {/* <span className="text-xs text-red-500">당일 작성안됨</span> */}
                    </div>
                </div>

                <div className="w-full my-1 border-t" />

                <div className="flex flex-row items-center justify-between w-full gap-2 text-gray-600">
                    {/* <button className="px-2 text-sm font-medium border rounded-md hover:bg-blue-50">체크리스트</button> */}
                    <span className="text-sm text-yellow-600">
                        {SUGERY_STATUS[dateComparison as keyof typeof SUGERY_STATUS]}
                    </span>
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
