import { useState } from 'react';
import { useOperationMethodsQuery } from './_lib/defaultCheckListSettingService';
import Loading from '../components/common/Loading';
import InfoIcons from '../icons/InfoIcons';
import OperationMethodSubmitModal from './components/OperationMethodSubmitModal';
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
                <div className="flex flex-col w-full h-full p-4 mx-auto mt-2 bg-white">
                    <div className="relative flex flex-col items-center p-4 mb-4 text-sm text-gray-800 border border-gray-300 border-dotted rounded-md">
                        <div className="flex flex-col w-fit">
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
                        <InfoIcons className="absolute text-yellow-400 -left-2 -top-2 h-7 w-7" />{' '}
                    </div>

                    {operationMethodsData.map((item, index) => {
                        return <DefaultCheckListSettingCard key={index} operationMethod={item.name} />;
                    })}
                    {/*수술명 목록*/}
                </div>
                <FixedSubmitButton
                    className="p-3"
                    buttonColorClassName="bg-gray-400"
                    onClick={() => handleToggleOperationMethodModal(true)}
                    label="수술명&nbsp;&nbsp;+"
                />
                {/*수술명 추가 버튼*/}
            </div>

            {isOperationMethodModal && (
                <OperationMethodSubmitModal onClose={() => handleToggleOperationMethodModal(false)} /> //수술명 추가 모달
            )}
        </>
    );
}

export default DefaultCheckListSettingPage;
