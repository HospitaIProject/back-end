import { v4 as uuidv4 } from 'uuid';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import SubmitButton from '../../components/common/form/SubmitButton';

import { pushNotification } from '../../utils/pushNotification';
import { COMPLICATION_ITEMS_NAME } from '../../utils/mappingNames';
import { useComplicationMutation, useComplicationUpdateMutation } from '../_lib/complicationService';
import RadioButton from '../../components/common/form/input/RadioButton';
import CustomRadioButton from './components/CustomRadioButton';
import TextInput from '../../components/common/form/input/TextInput';
import ComplicationGuide from './components/ComplicationGuide';
import ConfirmNewComplicationFormModal from './components/ConfirmNewComplicationFormModal';
import { useSearchParams } from 'react-router-dom';
import { useComplicationInitialValues } from './utils/useComplicationInitialValues';
import Loading from '../../components/common/Loading';

const CD_CLASSIFICATION = [
    { value: 'I', name: 'I' },
    { value: 'II', name: 'II' },
    { value: 'IIIa', name: 'IIIa' },
    { value: 'IIIb', name: 'IIIb' },
    { value: 'IVa', name: 'IVa' },
    { value: 'IVb', name: 'IVb' },
];

function NewComplicationFormPage() {
    const [isConfirmPage, setIsConfirmPage] = useState(false);
    const [searchParams] = useSearchParams();
    const operationId = searchParams.get('id');
    const complicationMutation = useComplicationMutation();
    const complicationUpdateMutation = useComplicationUpdateMutation();

    const { initialValues, isPending, hasData, score } = useComplicationInitialValues();
    const formik = useFormik({
        initialValues, // 초기값
        validateOnChange: false, // change 이벤트 발생시 validate 실행 여부
        enableReinitialize: true, // 초기값이 변경되면 다시 렌더링

        onSubmit: (values) => {
            console.log('제출', values);

            if (hasData) {
                if (confirm('수정하시겠습니까?')) {
                    complicationUpdateMutation.mutate({ data: values, operationId: Number(operationId) });
                } else {
                    return;
                }
            } else if (confirm('제출하시겠습니까?')) {
                complicationMutation.mutate({ data: values, operationId: Number(operationId) });
            }

            console.log('제출', values);
        },
    });
    const handleOpenConfirm = () => {
        let isError = false;
        // for (const key in formik.values) {
        //     if (formik.values[key] === '' && key !== 'remarks') {
        //         formik.setFieldError(key, '필수 입력 항목입니다.');

        //         isError = true;

        //         console.log('error', key, formik.values[key]);
        //     }
        // }
        {
            formik.values.customComplications.map((customComplication, index) => {
                if (customComplication.cdClassification !== '' && customComplication.complicationName === '') {
                    formik.setFieldError(`customComplications[${index}].complicationName`, '필수 입력 항목입니다.');
                    isError = true;
                }
                if (customComplication.complicationName !== '' && customComplication.cdClassification === '') {
                    formik.setFieldError(`customComplications[${index}].cdClassification`, '필수 입력 항목입니다.');
                    isError = true;
                }
            });
            if (
                formik.values.nervousSystem.cdClassification === '' &&
                formik.values.nervousSystem.complicationName !== ''
            ) {
                formik.setFieldError('nervousSystem.cdClassification', '필수 입력 항목입니다.');

                isError = true;
            } else if (
                formik.values.nervousSystem.complicationName === '' &&
                formik.values.nervousSystem.cdClassification !== ''
            ) {
                formik.setFieldError('nervousSystem.complicationName', '필수 입력 항목입니다.');

                isError = true;
            }
        }
        if (isError) {
            pushNotification({
                msg: '입력되지 않은 항목이 있습니다.',
                type: 'error',
                theme: 'dark',
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
    // useEffect(() => {
    //     console.log('customComplications', formik.values['']);
    // }, [formik.values.customComplications]);
    useEffect(() => {
        if (formik.errors.customComplications && formik.errors['customComplications[0]']) {
            console.log('customComplications', formik.errors['customComplications[0]']);
        }
    }, [formik.errors]);

    if (isPending) {
        return <Loading />;
    }

    return (
        <>
            <div className={`flex w-full flex-col ${isConfirmPage ? 'hidden' : ''}`}>
                <div
                    className={`mx-auto mt-2 flex w-full max-w-screen-mobile flex-col items-center gap-1 ${hasData ? '' : 'hidden'}`}
                >
                    <div className="flex flex-row gap-2 px-1 font-serif text-gray-700 border-2">
                        <span>CCI score:</span>
                        <span>{score?.toFixed(2)}점</span>
                    </div>
                    <span className="text-xs text-yellow-600">* 해당 CCI score는 수정시 다시 반영 됩니다.</span>
                </div>
                <form className="flex flex-col w-full gap-4 p-4 mx-auto mt-2 bg-white" onSubmit={formik.handleSubmit}>
                    <ComplicationGuide />
                    {Object.keys(COMPLICATION_ITEMS_NAME).map((key: string) => (
                        <React.Fragment key={uuidv4()}>
                            {key === 'anastomosisBleeding' && (
                                <span className="mx-auto font-semibold text-gray-600">[문합부 관련]</span>
                            )}
                            {key === 'ileus' && <span className="mx-auto font-semibold text-gray-600">[소화기계]</span>}
                            {key === 'arrhythemia' && (
                                <span className="mx-auto font-semibold text-gray-600">[심혈관계]</span>
                            )}
                            {key === 'atelectasis' && (
                                <span className="mx-auto font-semibold text-gray-600">[호흡기계]</span>
                            )}
                            {key === 'urinaryDysfunctionRetension' && (
                                <span className="mx-auto font-semibold text-gray-600">[비뇨생식기계]</span>
                            )}
                            {key === 'superficialDeepSsi' && (
                                <span className="mx-auto font-semibold text-gray-600">[피부창상관련]</span>
                            )}
                            <RadioButton
                                label={COMPLICATION_ITEMS_NAME[key]}
                                htmlFor={key}
                                formik={formik}
                                values={CD_CLASSIFICATION}
                            />
                        </React.Fragment>
                    ))}
                    <div className="my-3 border-t" />
                    <CustomRadioButton
                        htmlFor="nervousSystem.cdClassification"
                        nameHtmlFor="nervousSystem.complicationName"
                        formik={formik}
                        values={CD_CLASSIFICATION}
                        label="[신경계]"
                        isRender={true}
                        index={0}
                    />
                    {formik.values.customComplications.map((_, index) => (
                        <CustomRadioButton
                            key={uuidv4()}
                            htmlFor={`customComplications[${index}].cdClassification`}
                            nameHtmlFor={`customComplications[${index}].complicationName`}
                            formik={formik}
                            values={CD_CLASSIFICATION}
                            index={index}
                            label={'[기타]'}
                            isRender={true}
                        />
                    ))}

                    <div className="flex flex-row justify-center w-full mx-auto max-w-screen-mobile px-14">
                        <button
                            type="button"
                            className="w-full py-2 border rounded-md bg-gray-50"
                            onClick={() =>
                                formik.setFieldValue('customComplications', [
                                    ...formik.values.customComplications,
                                    { complicationName: '', cdClassification: '' },
                                ])
                            }
                        >
                            <span className="text-gray-500">기타 추가 +</span>
                        </button>
                    </div>
                    <TextInput label="비고" type="textarea" htmlFor="remarks" formik={formik} />
                </form>
                {hasData && <SubmitButton onClick={handleOpenConfirm} label="수정하기" />}
                {!hasData && <SubmitButton onClick={handleOpenConfirm} label="등록하기" />}
            </div>
            {isConfirmPage && (
                <ConfirmNewComplicationFormModal
                    formValues={formik.values}
                    onSubmit={formik.handleSubmit}
                    onClose={handleCloseConfirm}
                    submitLabel={hasData ? '수정하기' : '제출하기'}
                />
            )}
        </>
    );
}

export default NewComplicationFormPage;
