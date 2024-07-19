import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import SubmitButton from '../../components/common/form/SubmitButton';

import { pushNotification } from '../../utils/pushNotification';
import { ComplicationFormType } from '../../models/ComplicationType';
import { COMPLICATION_ITEMS_NAME } from '../../utils/mappingNames';
import { useComplicationMutation } from '../_lib/complicationService';
import RadioButton from '../../components/common/form/input/RadioButton';
import CustomRadioButton from './components/CustomRadioButton';
import TextInput from '../../components/common/form/input/TextInput';
import ComplicationGuide from './components/ComplicationGuide';
import ConfirmNewPatientFormModal from '../NewPatientFormPage/components/ConfirmNewPatientFormModal';
import ConfirmNewComplicationFormModal from './components/ConfirmNewComplicationFormModal';

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
    const complicationMutation = useComplicationMutation();

    const initialValues: ComplicationFormType = {
        // [문합부 관련]
        anastomosisBleeding: '', // Anastomosis bleeding
        anastomosisLeakage: '', // Anastomosis leakage
        anstomosisStenosis: '', // Anastomosis stenosis
        organSpaceSsi: '', // Organ/ Space SSI

        // [소화기계]
        ileus: '', // Ileus
        giBleeding: '', // GI bleeding
        bowelIschemia: '', // Bowel ischemia
        chyleAscites: '', // Chyle ascites
        additionalEnteritis: '', // 그 외 enteritis

        // [심혈관계]
        arrhythemia: '', // Arrhythemia
        coronaryIschemia: '', // Coronary ischemia
        dvt: '', // DVT
        pulmonaryEmbolism: '', // Pulmonary embolism
        phlebitis: '', // Phlebitis
        dic: '', // DIC

        // [호흡기계]
        atelectasis: '', // Atelectasis
        pneumothorax: '', // Pneumothorax
        pneumonia: '', // Pneumonia
        ards: '', // ARDS
        pleuralEffusion: '', // Pleural effusion

        // [비뇨생식기계]
        urinaryDysfunctionRetension: '', // Urinary dysfunction/retension
        arf: '', // ARF
        bladderLeakage: '', // Bladder leakage

        // [피부창상관련]
        superficialDeepSsi: '', // Superficial/ Deep SSI
        seroma: '', // Seroma
        stomaCx: '', // Stoma CX
        incisionalHernia: '', // Incisional hernia
        customComplications: [
            {
                complicationName: '',
                cdClassification: '',
            },
        ],
        remarks: '',
    };
    const formik = useFormik({
        initialValues, // 초기값
        validateOnChange: false, // change 이벤트 발생시 validate 실행 여부
        onSubmit: (values) => {
            console.log('제출', values);
            if (confirm('제출하시겠습니까?')) {
                complicationMutation.mutate({ data: values, operationId: 1 });
            } else {
                return;
            }
            console.log('제출', values);
        },
    });
    const handleOpenConfirm = (values: ComplicationFormType) => {
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
    useEffect(() => {
        console.log('customComplications', formik.values.customComplications);
    }, [formik.values.customComplications]);

    return (
        <>
            <div className={`flex w-full flex-col ${isConfirmPage ? 'hidden' : ''}`}>
                <form className="flex flex-col w-full gap-4 p-4 mx-auto mt-5 bg-white" onSubmit={formik.handleSubmit}>
                    <ComplicationGuide />
                    {Object.keys(COMPLICATION_ITEMS_NAME).map((key: string) => (
                        <>
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
                                key={key} // 고유한 key 속성 제공
                                label={COMPLICATION_ITEMS_NAME[key]}
                                htmlFor={key}
                                formik={formik}
                                values={CD_CLASSIFICATION}
                            />
                        </>
                    ))}
                    <div className="my-3 border-t" />
                    {formik.values.customComplications.map((customComplication, index) => (
                        <CustomRadioButton
                            key={index}
                            htmlFor={`customComplications[${index}].cdClassification`}
                            nameHtmlFor={`customComplications[${index}].complicationName`}
                            formik={formik}
                            values={CD_CLASSIFICATION}
                            index={index}
                            label={index === 0 ? '[신경계]' : '[기타]'}
                            isRender={true}
                        />
                    ))}

                    <div className="flex flex-row justify-center w-full mx-auto max-w-screen-mobile px-14">
                        <button
                            type="button"
                            className="w-full py-2 border rounded-md"
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
                    <TextInput label="비고" htmlFor="remarks" formik={formik} />
                </form>
                <SubmitButton onClick={() => handleOpenConfirm(formik.values)} label="등록하기" />
            </div>
            {isConfirmPage && (
                <ConfirmNewComplicationFormModal
                    formValues={formik.values}
                    onSubmit={formik.handleSubmit}
                    onClose={handleCloseConfirm}
                />
            )}
        </>
    );
}

export default NewComplicationFormPage;
