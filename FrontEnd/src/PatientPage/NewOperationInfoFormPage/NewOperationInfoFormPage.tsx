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
import {
    useDefaultCheckListSettingQuery,
    useOperationMethodsQuery,
} from '../../DefaultCheckListSettingPage/_lib/defaultCheckListSettingService';
import usePrompt from '../../Hooks/usePrompt';

function NewOperationInfoFormPage() {
    const [isConfirmPage, setIsConfirmPage] = useState(false);
    const [selectFirstOperationMethod, setSelectFirstOperationMethod] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const newOperationInfoFormMutation = useNewOperationInfoFormMutation(); //수술 정보 등록
    const updateOperationInfoFormMutation = useUpdateOperationInfoFormMutation(); //수술 정보 수정

    const operationMethodsQuery = useOperationMethodsQuery(); //수술명 목록 불러오기
    const defaultCheckListSettingQuery = useDefaultCheckListSettingQuery({
        enabled: selectFirstOperationMethod !== '',
        operationMethod: selectFirstOperationMethod,
    }); //각 수술명에대한 체크리스트 기본값 불러오기

    const {
        data: operationMethods,
        error: operationMethodsError,
        isPending: isOperationMethodsPending,
    } = operationMethodsQuery;
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
                    setIsSubmitting(true); //제출중
                    if (values.operationMethod === '') {
                        values.operationMethod = [];
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
                    setIsSubmitting(true); //제출중
                    if (values.operationMethod === '') {
                        values.operationMethod = [];
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
    usePrompt(!isSubmitting); // 이동시 경고창

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

    const handleOpenConfirm = (values: OperationInfoFormType) => {
        let isError = false;
        for (const key in values) {
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
        console.log('formik.values.operationTypeNames', formik.values.operationTypeNames);
        if (formik.values.operationTypeNames === '') {
            setSelectFirstOperationMethod('');
            resetCheckListSetup();
            return;
        }
        if (formik.values.operationTypeNames.length > 0) {
            setSelectFirstOperationMethod(formik.values.operationTypeNames[0]);
        }
    }, [formik.values.operationTypeNames]);

    useEffect(() => {
        if (checkListDefaultItems && isCheckListDefaultItemsSuccess) {
            setCheckListSetup(checkListDefaultItems);
            pushNotification({
                msg: `${formik.values.operationTypeNames[0]}의 설정된 체크리스트 항목 기본값을 불러왔습니다.`,
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

    useEffect(() => {
        if (operationMethods) console.log('수술명 목록 데이터', operationMethods);
    }, [operationMethods]); //수술명 목록 불러오기 성공시
    useEffect(() => {
        if (checkListSetup) console.log('체크리스트 셋업 데이터', checkListSetup);
    }, [checkListSetup]); //체크리스트 설정 불러오기 성공시

    useEffect(() => {
        if (operationMethodsError) {
            console.log('operationMethodsError', operationMethodsError);
            pushNotification({
                msg: operationMethodsError.response?.data.message || '에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                type: 'error',
                theme: 'dark',
            });
        }
    }, [operationMethodsError]); //수술명 목록 불러오기 에러 발생시

    if (isPending || isOperationMethodsPending) return <Loading />;
    if (operationMethodsError) {
        return <div>{operationMethodsError?.response?.data.message || '오류가 발생 했습니다.'}</div>;
    }
    return (
        <>
            <div className={`flex w-full flex-col ${isConfirmPage ? 'hidden' : ''}`}>
                <form className="mx-auto flex w-full flex-col gap-4 bg-white p-4" onSubmit={formik.handleSubmit}>
                    <h1 className="mx-auto mb-4 w-full max-w-screen-mobile border-b px-2 py-3 text-start text-gray-600">
                        <span>환자명:&nbsp;{patientName}</span>
                    </h1>

                    {/* 수술방법 수정 필요 */}
                    <div
                        className={`flex w-full flex-col ${isEditPage ? 'pointer-events-none rounded-lg bg-gray-50' : ' '}`}
                    >
                        <MultiSelector
                            label="수술방법"
                            htmlFor="operationTypeNames"
                            formik={formik}
                            values={operationMethods.map((method) => ({
                                value: method,
                                name: method,
                            }))}
                        />
                        <span
                            className={`mx-4 text-sm text-green-600 ${isEditPage ? '' : 'hidden'}`}
                        >{`*수술방법은 수정이 불가능합니다. 수정을 원하시면 새로운 수술을 등록해주세요.`}</span>
                    </div>
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

                    <div className="mt-4 flex w-full flex-col items-center">
                        <button
                            type="button"
                            onClick={handleOpenCheckListSetup}
                            className="w-full rounded-md bg-gray-400 px-8 py-3 text-white hover:bg-gray-500 mobile:max-w-screen-mobile"
                        >
                            <span>체크리스트 설정</span>
                        </button>
                        <span className="mt-2 text-sm text-green-600">
                            *첫 번째 수술 방법의 체크리스트 설정을 가져옵니다.
                        </span>

                        <span className="mt-2 text-sm text-green-600">
                            *세팅값이 없을 경우 기본값은 true로 설정됩니다.
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
