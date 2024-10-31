import { useFormik } from 'formik';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDailyInitialValues } from './utils/useDailyInitialValues';
import {
    useCheckListSetupQuery,
    useDailyComplianceFormMutation,
    useDailyComplianceFormUpdateMutation,
} from '../_lib/complianceFormSevice';
import Loading from '../../components/common/Loading';
import YesOrNoButton from '../../components/common/form/input/YesOrNoButton';
import PainSelector from '../../components/common/form/input/PainSelector';
import { CHECKLIST_ITEMS_NAME } from '../../utils/mappingNames';
import ConfirmDailyComplianceFormModal from './components/ConfirmDailyComplianceFormModal';
import { useState } from 'react';
import SubmitButton from '../../components/common/form/SubmitButton';
import { dailyValidateFields } from './utils/dailyValidateFields';
import { pushNotification } from '../../utils/pushNotification';
import CheckListViewGuide from '../CheckListsPage/components/CheckListViewGuide';
import usePrompt from '../../Hooks/usePrompt';
import { DailyCheckListFormType } from '../../models/CheckListsType';

const podLabel = ({ isPod1, isPod2, isPod3 }: { isPod1?: boolean; isPod2?: boolean; isPod3?: boolean }) => {
    let podLabel = '';
    if (isPod1) {
        podLabel = ' (POD#1)';
    } else if (isPod2) {
        podLabel = ' (POD#2) ';
    } else if (isPod3) {
        podLabel = ' (POD#3) ';
    }
    return podLabel;
};

function DailyCompliancePage() {
    const [isConfirmPage, setIsConfirmPage] = useState(false); // 확인 페이지 모달 여부
    const [isSubmitting, setIsSubmitting] = useState(false); //제출 중인지 여부

    const [searchParams] = useSearchParams();
    const patientName = searchParams.get('name'); //환자명
    const operationId = searchParams.get('id'); //수술ID
    const diffDay = searchParams.get('diffDay'); //몇일차인지

    const { checkListId } = useParams(); //체크리스트 id *수정 페이지일때만 존재
    const isEditPage = Boolean(checkListId); //수정 페이지인지 여부
    const dayOfCheckList = searchParams.get('date') || String(new Date()).split('T')[0]; //서버에 전달할 작성일자

    const dailyComplianceFormMutation = useDailyComplianceFormMutation();
    const dailyComplianceFormUpdateMutation = useDailyComplianceFormUpdateMutation();
    const checkListSetupQuery = useCheckListSetupQuery({ operationId: Number(operationId) }); //체크리스트 세팅 정보 가져오기
    const { data: existFields, isPending: isExistFieldsPending } = checkListSetupQuery; //체크리스트 세팅 정보
    const { initialValues, isPending: isCheckListDailyPending } = useDailyInitialValues({
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
            if (isEditPage) {
                if (confirm('수정하시겠습니까?')) {
                    setIsSubmitting(true);

                    dailyComplianceFormUpdateMutation.mutate({
                        checkListId: Number(checkListId),
                        data: values,
                    });
                } else {
                    return;
                }
            } else {
                if (confirm('제출하시겠습니까?')) {
                    setIsSubmitting(true);
                    dailyComplianceFormMutation.mutate({
                        operationId: Number(operationId),
                        data: values,
                        dayOfCheckList: dayOfCheckList,
                    });
                } else {
                    return;
                }
            }
        },
    });
    usePrompt(!isSubmitting); // 이동시 경고창

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

    if (isExistFieldsPending || isCheckListDailyPending) return <Loading />;
    if (!existFields) return;

    return (
        <>
            <div className={`flex w-full flex-col`}>
                <CheckListViewGuide
                    dateStatus={`D+${Math.abs(Number(diffDay))}`}
                    patientName={patientName || ''}
                    existFields={existFields}
                />
                <form className="mx-auto flex w-full flex-col gap-6 rounded p-4">
                    {/* ------Day 운동  ------ */}

                    <YesOrNoButton<DailyCheckListFormType>
                        htmlFor={isPod1 ? 'podOneExercise' : isPod2 ? 'podTwoExercise' : 'podThreeExercise'}
                        label={
                            isPod1
                                ? CHECKLIST_ITEMS_NAME.podOneExercise
                                : isPod2
                                  ? CHECKLIST_ITEMS_NAME.podTwoExercise
                                  : CHECKLIST_ITEMS_NAME.podThreeExercise
                        }
                        formik={formik}
                        isRender={existFields.podExercise && (isPod1 || isPod2 || isPod3)}
                    />

                    {/* ------Day 식사 ------ */}

                    <YesOrNoButton<DailyCheckListFormType>
                        htmlFor={isPod1 ? 'podOneMeal' : 'podTwoMeal'}
                        label={isPod1 ? CHECKLIST_ITEMS_NAME.podOneMeal : CHECKLIST_ITEMS_NAME.podTwoMeal}
                        formik={formik}
                        isRender={existFields.podMeal && (isPod1 || isPod2)}
                    />

                    {/* ------Day 통증 ------ */}

                    <PainSelector<DailyCheckListFormType>
                        type="number"
                        htmlFor={isPod1 ? 'podOnePain' : isPod2 ? 'podTwoPain' : 'podThreePain'}
                        label={
                            isPod1
                                ? CHECKLIST_ITEMS_NAME.podOnePain
                                : isPod2
                                  ? CHECKLIST_ITEMS_NAME.podTwoPain
                                  : CHECKLIST_ITEMS_NAME.podThreePain
                        }
                        formik={formik}
                        isRender={existFields.podPain && (isPod1 || isPod2 || isPod3)}
                        values={[
                            { value: 'day', label: 'Day' },
                            { value: 'evening', label: 'Evening' },
                            { value: 'night', label: 'Night' },
                        ]}
                    />

                    {/* ------추가필드(전날 yes,no 체크 여부에 따라 렌더링 결정) ------ */}
                    {/* ------ 기존 수술후 체크리스트에 no로 체크된경우 데일리 체크리스트 한번더 보여주는 경우 이기때문에 label은 수술후 label과 동일 ------ */}
                    <YesOrNoButton<DailyCheckListFormType>
                        htmlFor={isPod1 ? 'podOneGumChewing' : isPod2 ? 'podTwoGumChewing' : 'podThreeGumChewing'}
                        label={
                            CHECKLIST_ITEMS_NAME.gumChewing +
                            podLabel({
                                isPod1,
                                isPod2,
                                isPod3,
                            })
                        }
                        formik={formik}
                        isRender={existFields.gumChewing && (isPod1 || isPod2 || isPod3)}
                    />
                    <YesOrNoButton<DailyCheckListFormType>
                        htmlFor={
                            isPod1
                                ? 'podOneIvFluidRestriction'
                                : isPod2
                                  ? 'podTwoIvFluidRestriction'
                                  : 'podThreeIvFluidRestriction'
                        }
                        label={
                            CHECKLIST_ITEMS_NAME.ivFluidRestrictionPostOp +
                            podLabel({
                                isPod1,
                                isPod2,
                                isPod3,
                            })
                        }
                        formik={formik}
                        isRender={existFields.ivFluidRestrictionPostOp && (isPod1 || isPod2 || isPod3)}
                    />
                    <YesOrNoButton<DailyCheckListFormType>
                        htmlFor={
                            isPod1
                                ? 'podOneNonOpioidPainControl'
                                : isPod2
                                  ? 'podTwoNonOpioidPainControl'
                                  : 'podThreeNonOpioidPainControl'
                        }
                        label={
                            CHECKLIST_ITEMS_NAME.nonOpioidPainControl +
                            podLabel({
                                isPod1,
                                isPod2,
                                isPod3,
                            })
                        }
                        formik={formik}
                        isRender={existFields.nonOpioidPainControl && (isPod1 || isPod2 || isPod3)}
                    />
                    <YesOrNoButton<DailyCheckListFormType>
                        htmlFor={
                            isPod1 ? 'podOneJpDrainRemoval' : isPod2 ? 'podTwoJpDrainRemoval' : 'podThreeJpDrainRemoval'
                        }
                        label={
                            CHECKLIST_ITEMS_NAME.jpDrainRemoval +
                            podLabel({
                                isPod1,
                                isPod2,
                                isPod3,
                            })
                        }
                        formik={formik}
                        isRender={existFields.jpDrainRemoval && (isPod1 || isPod2 || isPod3)}
                    />
                    <YesOrNoButton<DailyCheckListFormType>
                        htmlFor={
                            isPod1 ? 'podOneIvLineRemoval' : isPod2 ? 'podTwoIvLineRemoval' : 'podThreeIvLineRemoval'
                        }
                        label={
                            CHECKLIST_ITEMS_NAME.ivLineRemoval +
                            podLabel({
                                isPod1,
                                isPod2,
                                isPod3,
                            })
                        }
                        formik={formik}
                        // isRender={existFields.ivLineRemoval && (isPod1 || isPod2 || isPod3)} //일단은 pod3만 렌더링 되도록 변경
                        isRender={existFields.ivLineRemoval && isPod3}
                    />
                </form>
                <div className={`mt-auto`}>
                    <SubmitButton onClick={handleOpenConfirm} label={isEditPage ? '수정하기' : '제출하기'} />
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
