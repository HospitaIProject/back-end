import { useEffect, useState } from 'react';
import PatientChecklistSetupModal from '../PatientPage/NewOperationInfoFormPage/components/PatientChecklistSetupModal';
import {
    useDefaultCheckListSettingQuery,
    useUpdateDefaultCheckListSettingMutation,
} from './_lib/defaultCheckListSettingService';
import Loading from '../components/common/Loading';
import { CheckListSetupType } from '../models/CheckListsType';
import { pushNotification } from '../utils/pushNotification';
type OperationValuesType =
    | 'RHC_ERHC'
    | 'T_COLECTOMY'
    | 'LHC_ELHC'
    | 'AR'
    | 'LAR'
    | 'ISR'
    | 'APR'
    | 'SUBTOTAL_TOTAL_COLECTOMY'
    | 'TOTAL_PROCTOCOLECTOMY'
    | '';

const OPERATION_METHOD: {
    value: OperationValuesType;
    name: string;
}[] = [
    { value: 'RHC_ERHC', name: 'RHC, ERHC' },
    { value: 'T_COLECTOMY', name: 'T-colectomy' },
    { value: 'LHC_ELHC', name: 'LHC, ELHC' },
    { value: 'AR', name: 'AR' },
    { value: 'LAR', name: 'LAR' },
    { value: 'ISR', name: 'ISR' },
    { value: 'APR', name: 'APR' },
    { value: 'SUBTOTAL_TOTAL_COLECTOMY', name: 'Subtotal, Total colectomy' },
    { value: 'TOTAL_PROCTOCOLECTOMY', name: 'Total proctocolectomy' },
];

function DefaultCheckListSettingPage() {
    const [isCheckListSetupModal, setIsCheckListSetupModal] = useState<OperationValuesType>('');
    const defaultCheckListSettingQuery = useDefaultCheckListSettingQuery({
        enabled: isCheckListSetupModal !== '',
        operationMethod: isCheckListSetupModal,
    });
    const { data: checkListSetup, isPending, error } = defaultCheckListSettingQuery;
    const updateDefaultCheckListSettingMutation = useUpdateDefaultCheckListSettingMutation();

    const onSubmitCheckListSetup = (values: CheckListSetupType) => {
        updateDefaultCheckListSettingMutation.mutate({
            data: values,
            operationMethod: isCheckListSetupModal,
        });
        updateDefaultCheckListSettingMutation.isSuccess;
    };
    const handleOpenCheckListSetting = (value: OperationValuesType) => {
        setIsCheckListSetupModal(value);
    };

    const handleCloseCheckListSetup = () => {
        setIsCheckListSetupModal('');
    };

    useEffect(() => {
        if (error) {
            pushNotification({
                msg: error.response?.data.message || '에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                type: 'error',
                theme: 'dark',
            });
        }
    }, [error]);

    useEffect(() => {
        if (updateDefaultCheckListSettingMutation.isSuccess) {
            setIsCheckListSetupModal('');
            updateDefaultCheckListSettingMutation.reset();
        }
    }, [updateDefaultCheckListSettingMutation.isSuccess]);

    if (isPending && isCheckListSetupModal !== '') {
        return <Loading />;
    }

    return (
        <>
            <div className={`flex w-full flex-col`}>
                <div className="flex flex-col w-full p-4 mx-auto mt-2 bg-white">
                    {OPERATION_METHOD.map((item, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => handleOpenCheckListSetting(item.value)}
                                className="flex flex-row items-center justify-between gap-1 p-3 border-b cursor-pointer hover:bg-gray-50"
                            >
                                <span className="text-sm font-medium">{item.name}</span>
                                <button className="px-4 py-1 text-sm text-white bg-blue-500 rounded-md">관리</button>
                            </div>
                        );
                    })}
                </div>
            </div>
            {isCheckListSetupModal && checkListSetup && (
                <PatientChecklistSetupModal
                    handleSubmit={onSubmitCheckListSetup}
                    onClose={handleCloseCheckListSetup}
                    values={checkListSetup}
                />
            )}
        </>
    );
}

export default DefaultCheckListSettingPage;
