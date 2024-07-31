import { useFormik } from 'formik';
import { useSearchParams } from 'react-router-dom';
import { useDailyInitialValues } from './utils/useDailyInitialValues';
import { useCheckListSetupQuery, useDailyComplianceFormMutation } from '../_lib/complianceFormSevice';
import Loading from '../../components/common/Loading';
import YesOrNoButton from '../../components/common/form/input/YesOrNoButton';
import PainSelector from '../../components/common/form/input/PainSelector';
import { CHECKLIST_ITEMS_NAME } from '../../utils/mappingNames';
import ConfirmDailyComplianceFormModal from './components/ConfirmDailyComplianceFormModal';
import { useState } from 'react';
import SubmitButton from '../../components/common/form/SubmitButton';
import { dailyValidateFields } from './utils/dailyValidateFields';
import { pushNotification } from '../../utils/pushNotification';

function DailyCompliancePage() {
    const [isConfirmPage, setIsConfirmPage] = useState(false);

    const [searchParams] = useSearchParams();
    const patientName = searchParams.get('name'); //환자명
    const operationId = searchParams.get('id'); //수술ID
    // const dateStatus = searchParams.get('dateStatus'); //수술전, 당일, 후인지
    const diffDay = searchParams.get('diffDay'); //몇일차인지
    const dayOfCheckList = searchParams.get('date') || String(new Date()).split('T')[0]; //서버에 전달할 작성일자

    const dailyComplianceFormMutation = useDailyComplianceFormMutation();
    const checkListSetupQuery = useCheckListSetupQuery({ operationId: Number(operationId) }); //체크리스트 세팅 정보 가져오기
    const { data: existFields, isPending: isExistFieldsPending } = checkListSetupQuery; //체크리스트 세팅 정보
    const initialValues = useDailyInitialValues({
        existFields,
    }); //초기값

    const isPod1 = diffDay === '-1'; //POD 1일차인지 여부
    const isPod2 = diffDay === '-2'; //POD 2일차인지 여부
    const isPod3 = diffDay === '-3'; //POD 3일차인지 여부

    const formik = useFormik({
        initialValues, // 초기값
        enableReinitialize: true, // 초기값이 변경되면 다시 렌더링

        validateOnChange: false, // change 이벤트 발생시 validate 실행 여부
        onSubmit: (values) => {
            console.log('제출', values);
            if (confirm('제출하시겠습니까?')) {
                dailyComplianceFormMutation.mutate({
                    operationId: Number(operationId),
                    data: values,
                    dayOfCheckList: dayOfCheckList,
                });
            } else {
                return;
            }
        },
    });

    const handleOpenConfirm = () => {
        const isError = dailyValidateFields({
            formik,
            values: formik.values,
        });
        if (isError) {
            pushNotification({
                msg: '필수 입력 항목이 누락되었습니다.',
                type: 'error',
                theme: 'dark',
            });
            return;
        } else {
            setIsConfirmPage(true);
        }
    }; //제출하기 버튼 클릭시 확인 페이지로 이동
    const handleCloseConfirm = () => {
        setIsConfirmPage(false);
    };

    if (isExistFieldsPending) return <Loading />;
    if (!existFields) return;

    return (
        <>
            <div className={`flex w-full flex-col`}>
                <div className="flex flex-row items-center gap-1 py-3 pr-4 mb-4 border-b rounded-md bg-gray-50 pl-28 text-neutral-700">
                    <span className="mx-auto text-xl font-bold text-center text-blue-500">{patientName}</span>
                    <div className="flex flex-col items-end w-24 gap-1">
                        <span className="p-1 text-sm font-medium text-gray-700 bg-yellow-200 rounded-md">
                            {`D+${Math.abs(Number(diffDay))}`}
                        </span>
                    </div>
                </div>
                <form className="flex flex-col w-full gap-6 p-4 mx-auto rounded">
                    {/* ------Day 운동  ------ */}
                    <YesOrNoButton
                        htmlFor="postExercise"
                        label={CHECKLIST_ITEMS_NAME.postExercise}
                        formik={formik}
                        isRender={existFields.podExercise && isPod1}
                    />
                    <YesOrNoButton
                        htmlFor="podOneExercise"
                        label={CHECKLIST_ITEMS_NAME.podOneExercise}
                        formik={formik}
                        isRender={existFields.podExercise && isPod1}
                    />
                    <YesOrNoButton
                        htmlFor="podTwoExercise"
                        label={CHECKLIST_ITEMS_NAME.podTwoExercise}
                        formik={formik}
                        isRender={existFields.podExercise && isPod2}
                    />
                    <YesOrNoButton
                        htmlFor="podThreeExercise"
                        label={CHECKLIST_ITEMS_NAME.podThreeExercise}
                        formik={formik}
                        isRender={existFields.podExercise && isPod3}
                    />
                    {/* ------Day 식사 ------ */}
                    <YesOrNoButton
                        htmlFor="postMeal"
                        label={CHECKLIST_ITEMS_NAME.postMeal}
                        formik={formik}
                        isRender={existFields.podMeal && isPod1}
                    />
                    <YesOrNoButton
                        htmlFor="podOneMeal"
                        label={CHECKLIST_ITEMS_NAME.podOneMeal}
                        formik={formik}
                        isRender={existFields.podMeal && isPod1}
                    />
                    <YesOrNoButton
                        htmlFor="podTwoMeal"
                        label={CHECKLIST_ITEMS_NAME.podTwoMeal}
                        formik={formik}
                        isRender={existFields.podMeal && isPod2}
                    />
                    {/* ------Day 통증 ------ */}
                    <PainSelector
                        type="number"
                        htmlFor="postPain"
                        label={CHECKLIST_ITEMS_NAME.postPain}
                        formik={formik}
                        isRender={existFields.podPain && isPod1}
                        values={[
                            { value: 'day', label: 'Day' },
                            { value: 'evening', label: 'Evening' },
                            { value: 'night', label: 'Night' },
                        ]}
                    />
                    <PainSelector
                        type="number"
                        htmlFor="podOnePain"
                        label={CHECKLIST_ITEMS_NAME.podOnePain}
                        formik={formik}
                        isRender={existFields.podPain && isPod1}
                        values={[
                            { value: 'day', label: 'Day' },
                            { value: 'evening', label: 'Evening' },
                            { value: 'night', label: 'Night' },
                        ]}
                    />
                    <PainSelector
                        type="number"
                        htmlFor="podTwoPain"
                        label={CHECKLIST_ITEMS_NAME.podTwoPain}
                        isRender={existFields.podPain && isPod2}
                        formik={formik}
                        values={[
                            { value: 'day', label: 'Day' },
                            { value: 'evening', label: 'Evening' },
                            { value: 'night', label: 'Night' },
                        ]}
                    />
                    <PainSelector
                        type="number"
                        htmlFor="podThreePain"
                        label={CHECKLIST_ITEMS_NAME.podThreePain}
                        formik={formik}
                        isRender={existFields.podPain && isPod3}
                        values={[
                            { value: 'day', label: 'Day' },
                            { value: 'evening', label: 'Evening' },
                            { value: 'night', label: 'Night' },
                        ]}
                    />
                </form>
                <div className={`mt-auto`}>
                    <SubmitButton onClick={handleOpenConfirm} label="확인하기" />
                </div>
            </div>
            {isConfirmPage && (
                <ConfirmDailyComplianceFormModal
                    values={formik.values}
                    onSubmit={formik.handleSubmit}
                    onClose={handleCloseConfirm}
                    existFields={existFields}
                />
            )}
        </>
    );
}

export default DailyCompliancePage;