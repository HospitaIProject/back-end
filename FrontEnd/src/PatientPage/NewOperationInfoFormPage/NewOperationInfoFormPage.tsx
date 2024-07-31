import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { OperationInfoFormType } from '../../models/OperationType';
import { CheckListSetupType } from '../../models/CheckListsType';
import NumberInput from '../../components/common/form/input/NumberInput';
import SingleSelector from '../../components/common/form/input/SingleSelector';
import YesOrNoButton from '../../components/common/form/input/YesOrNoButton';
import ConfirmNewOperationInfoModal from './components/ConfirmNewOperationInfoModal';
import { useNewOperationInfoFormMutation, useUpdateOperationInfoFormMutation } from '../_lib/operationService';
import PatientChecklistSetupModal from './components/PatientChecklistSetupModal';
import SubmitButton from '../../components/common/form/SubmitButton';
import { useParams, useSearchParams } from 'react-router-dom';
import { pushNotification } from '../../utils/pushNotification';
import MultiSelector from '../../components/common/form/input/MultiSelector';
import TimeInput from '../../components/common/form/input/TimeInput';
import TotalOperationInput from '../../components/common/form/input/TotalOperationInput';
import { validateCheckListSetup } from './components/utils/validateCheckListSetup';
import { useOperationInfoInitialValues } from './utils/useOperationInfoInitialValues';
import Loading from '../../components/common/Loading';
import { useDefaultCheckListSettingQuery } from '../../DefaultCheckListSettingPage/_lib/defaultCheckListSettingService';
function NewOperationInfoFormPage() {
    const [isConfirmPage, setIsConfirmPage] = useState(false);
    const [selectFirstOperationMethod, setSelectFirstOperationMethod] = useState<string>('');
    const newOperationInfoFormMutation = useNewOperationInfoFormMutation();
    const updateOperationInfoFormMutation = useUpdateOperationInfoFormMutation();
    const defaultCheckListSettingQuery = useDefaultCheckListSettingQuery({
        enabled: selectFirstOperationMethod !== '',
        operationMethod: selectFirstOperationMethod,
    }); //체크리스트 셋업
    const {
        data: checkListDefaultItems,
        error: checkListDefaultItemsError,
        isSuccess: isCheckListDefaultItemsSuccess,
    } = defaultCheckListSettingQuery;

    const [searchParams] = useSearchParams();
    const patientName = searchParams.get('name');
    const patientId = searchParams.get('id');

    const { operationId } = useParams(); //수술 정보 id
    const isEditPage = Boolean(operationId); //수정페이지 인지 여부
    const [isCheckListSetupModal, setIsCheckListSetupModal] = useState(false);

    const { initialValues, checkListSetup, setCheckListSetup, resetCheckListSetup, isPending } =
        useOperationInfoInitialValues();

    const formik = useFormik({
        initialValues, // 초기값
        validateOnChange: false, // change 이벤트 발생시 validate 실행 여부
        enableReinitialize: true,
        onSubmit: (values) => {
            console.log('제출', values);
            if (isEditPage) {
                if (confirm('수정하시겠습니까?')) {
                    if (values.operationMethod === '') {
                        values.operationMethod = [];
                    } else if (values.customOperationMethod === '') {
                        values.customOperationMethod = [];
                    }
                    updateOperationInfoFormMutation.mutate({
                        operationData: values, // 환자수술 정보
                        setupData: checkListSetup, //해당 수술의 체크리스트 설정
                        operationId: Number(operationId),
                    });
                } else {
                    return;
                }
            } else {
                if (confirm('등록하시겠습니까?')) {
                    if (values.operationMethod === '') {
                        values.operationMethod = [];
                    } else if (values.customOperationMethod === '') {
                        values.customOperationMethod = [];
                    }
                    newOperationInfoFormMutation.mutate({
                        operationData: values, // 환자수술 정보
                        setupData: checkListSetup, //해당 수술의 체크리스트 설정
                        patientId: Number(patientId),
                    });
                } else {
                    return;
                }
            }
        },
    });
    const onSubmitCheckListSetup = (newCheckListSetup: CheckListSetupType) => {
        let isValid = validateCheckListSetup({ values: newCheckListSetup });
        console.log('newCheckListSetup', newCheckListSetup);
        if (!isValid) {
            pushNotification({
                msg: '수술전, 수술당일, 수술후 각 섹션을 하나 이상 선택해주세요.',
                type: 'error',
                theme: 'dark',
                position: 'top-center',
            });
            return;
        } else {
            pushNotification({
                msg: '체크리스트 설정이 완료되었습니다.',
                type: 'success',
                theme: 'dark',
                position: 'top-center',
            });
        }
        setCheckListSetup({ ...newCheckListSetup });
        handleCloseCheckListSetup();
    };
    const specialFields = ['customOperationMethod', 'operationMethod'];
    const handleOpenConfirm = (values: OperationInfoFormType) => {
        let isError = false;
        for (const key in values) {
            if (specialFields.includes(key)) {
                if (formik.values['customOperationMethod'] !== '' || formik.values['operationMethod'] !== '') continue;
            }

            if (values[key] === '') {
                formik.setFieldError(key, '필수 입력 항목입니다.');
                isError = true;
                console.log('error', key, values[key]);
            }
        }
        if (isError) {
            pushNotification({
                msg: '입력되지 않은 항목이 있습니다.',
                type: 'error',
                theme: 'dark',
                position: 'top-center',
            });
            return;
        } else {
            setIsConfirmPage(true);
            isError = false;
        }
        // setIsConfirmPage(true);
    };
    const handleCloseConfirm = () => {
        setIsConfirmPage(false);
    }; // 확인 모달 닫기
    const handleOpenCheckListSetup = () => {
        setIsCheckListSetupModal(true);
    }; // 체크리스트 설정 모달 열기
    const handleCloseCheckListSetup = () => {
        setIsCheckListSetupModal(false);
    }; // 체크리스트 설정 모달 닫기

    useEffect(() => {
        console.log('formik.values.operationMethod', formik.values.operationMethod);
        if (formik.values.operationMethod === '') {
            setSelectFirstOperationMethod('');
            resetCheckListSetup();
            return;
        }
        if (formik.values.operationMethod.length > 0) {
            setSelectFirstOperationMethod(formik.values.operationMethod[0]);
        }
    }, [formik.values.operationMethod]);

    useEffect(() => {
        if (checkListDefaultItems && isCheckListDefaultItemsSuccess) {
            setCheckListSetup(checkListDefaultItems);
            pushNotification({
                msg: `${checkListDefaultItems.operationMethod}의 체크리스트 설정을 불러왔습니다.`,
                type: 'success',
                theme: 'dark',
                position: 'top-center',
            });
        }
    }, [checkListDefaultItems]);
    useEffect(() => {
        if (checkListDefaultItemsError) {
            pushNotification({
                msg:
                    checkListDefaultItemsError.response?.data.message ||
                    '에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                type: 'error',
                theme: 'dark',
                position: 'top-center',
            });
        }
    }, [checkListDefaultItemsError]);

    if (isPending) return <Loading />;
    return (
        <>
            <div className={`flex w-full flex-col ${isConfirmPage ? 'hidden' : ''}`}>
                <form className="flex flex-col w-full gap-4 p-4 mx-auto bg-white" onSubmit={formik.handleSubmit}>
                    <h1 className="w-full px-2 py-3 mx-auto mb-4 text-gray-600 border-b max-w-screen-mobile text-start">
                        <span>환자명:&nbsp;{patientName}</span>
                    </h1>

                    {/* 수술방법 수정 필요 */}
                    <MultiSelector
                        label="수술방법"
                        htmlFor="operationMethod"
                        formik={formik}
                        customFor="customOperationMethod"
                        values={[
                            { value: 'RHC_ERHC', name: 'RHC, ERHC' },
                            { value: 'T_COLECTOMY', name: 'T-colectomy' },
                            { value: 'LHC_ELHC', name: 'LHC, ELHC' },
                            { value: 'AR', name: 'AR' },
                            { value: 'LAR', name: 'LAR' },
                            { value: 'ISR', name: 'ISR' },
                            { value: 'APR', name: 'APR' },
                            { value: 'SUBTOTAL_TOTAL_COLECTOMY', name: 'Subtotal, Total colectomy' },
                            { value: 'TOTAL_PROCTOCOLECTOMY', name: 'Total proctocolectomy' },
                        ]}
                    />
                    <SingleSelector
                        label="수술approach"
                        htmlFor="operationApproach"
                        formik={formik}
                        values={[
                            { value: 'OPEN', name: 'Open' },
                            { value: 'LAPAROSCOPIC_MULTIPORT', name: 'Laparoscopic_multiport' },
                            { value: 'LAPAROSCOPIC_SINGLEPORT', name: 'Laparoscopic_Singleport' },
                            { value: 'ROBOTIC_MULTIPORT', name: 'Robotic_multiport' },
                            { value: 'ROBOTIC_SINGLEPORT', name: 'Robotic_Singleport' },
                            { value: 'OPEN_CONVERSION', name: 'open conversion' },
                        ]}
                    />
                    <YesOrNoButton label="장루 조성술 여부" htmlFor="stomaFormation" formik={formik} />
                    <TimeInput label="수술 시작 시간" htmlFor="operationStartTime" formik={formik} />
                    <TimeInput label="수술 종료 시간" htmlFor="operationEndTime" formik={formik} />
                    <TotalOperationInput
                        unit="분"
                        label="전체 수술 시간 (분)"
                        htmlFor="totalOperationTime"
                        formik={formik}
                    />
                    <NumberInput
                        unit="cc"
                        label="수술 중 총 들어간 수액 양 (cc)"
                        htmlFor="totalFluidsAmount"
                        formik={formik}
                    />
                    <NumberInput unit="cc" label="수술 중 실혈량 (cc)" htmlFor="bloodLoss" formik={formik} />

                    <div className="flex flex-col items-center w-full mt-4">
                        <button
                            type="button"
                            onClick={handleOpenCheckListSetup}
                            className="w-full px-8 py-3 text-white bg-gray-400 rounded-md hover:bg-gray-500 mobile:max-w-screen-mobile"
                        >
                            <span>체크리스트 설정</span>
                        </button>
                        <span className="mt-2 text-sm text-green-600">
                            *첫 번째 수술 방법의 체크리스트 설정을 가져옵니다.
                        </span>

                        <span className="mt-2 text-sm text-green-600">
                            *직접 입력한 수술 방법의 기본값은 모두 True입니다.
                        </span>
                    </div>
                </form>
                <SubmitButton
                    onClick={() => handleOpenConfirm(formik.values)}
                    label={isEditPage ? '수정하기' : '등록하기'}
                />
            </div>
            {isConfirmPage && (
                <ConfirmNewOperationInfoModal
                    values={formik.values}
                    onSubmit={formik.handleSubmit}
                    onClose={handleCloseConfirm}
                    checkListSetup={checkListSetup}
                />
            )}
            {isCheckListSetupModal && (
                <PatientChecklistSetupModal
                    handleSubmit={onSubmitCheckListSetup}
                    onClose={handleCloseCheckListSetup}
                    values={checkListSetup}
                />
            )}
        </>
    );
}

export default NewOperationInfoFormPage;
