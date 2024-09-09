import { useState } from 'react';
import { useOperationMethodsQuery } from './_lib/defaultCheckListSettingService';
import Loading from '../components/common/Loading';
import InfoIcons from '../icons/InfoIcons';
import MethodSubmitModal from './components/MethodSubmitModal';
import FixedSubmitButton from '../components/common/form/FixedSubmitButton';
import DefaultCheckListSettingCard from './components/DefaultCheckListSettingCard';

function DefaultCheckListSettingPage() {
    const [isOperationMethodModal, setIsOperationMethodModal] = useState<boolean>(false);
    const operationMethodsQuery = useOperationMethodsQuery(); //수술명 목록

    const {
        data: operationMethodsData,
        isPending: isOperationMethodsPending,
        error: operationMethodsError,
    } = operationMethodsQuery;

    const handleToggleOperationMethodModal = (isOpen: boolean) => {
        setIsOperationMethodModal(isOpen);
    };

    if (isOperationMethodsPending) {
        return <Loading />;
    }
    if (operationMethodsError) {
        return <div>에러가 발생했습니다. 잠시후에 다시 시도해주세요.</div>;
    }

    return (
        <>
            <div className={`flex w-full flex-grow flex-col`}>
                <div className="mx-auto mt-2 flex h-full w-full flex-col bg-white p-4">
                    <div className="relative mb-4 flex flex-col items-center rounded-md border border-dotted border-gray-300 p-4 text-sm text-gray-800">
                        <div className="flex w-fit flex-col">
                            <span>
                                - <span className="font-semibold text-green-600">등록 된 수술명</span>을 선택하여&nbsp;
                                <span className="font-semibold text-green-600">체크리스트를 설정</span>할 수 있습니다.
                            </span>
                            <span>
                                - 체크리스트 설정은&nbsp;
                                <span className="font-semibold text-green-600">수술명 별로 설정</span>할 수 있습니다.
                            </span>
                            <span>
                                - 설정된 체크리스트는 수술 등록 시&nbsp;
                                <span className="font-semibold text-green-600">초기값으로 사용</span>됩니다.
                            </span>
                        </div>
                        <InfoIcons className="absolute -left-2 -top-2 h-7 w-7 text-yellow-400" />
                    </div>

                    {operationMethodsData.map((item, index) => {
                        return <DefaultCheckListSettingCard index={index} key={index} operationMethod={item} />;
                    })}
                    {/*수술명 목록*/}
                </div>
                <FixedSubmitButton
                    className="p-3"
                    onClick={() => handleToggleOperationMethodModal(true)}
                    label="새로운 수술 추가 +"
                />
                {/*수술명 추가 버튼*/}
            </div>

            {isOperationMethodModal && (
                <MethodSubmitModal type="post" onClose={() => handleToggleOperationMethodModal(false)} /> //수술명 추가 모달
            )}
        </>
    );
}

export default DefaultCheckListSettingPage;
