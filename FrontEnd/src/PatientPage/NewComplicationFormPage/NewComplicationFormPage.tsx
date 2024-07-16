import { useFormik } from 'formik';
import SingleSelector from '../../components/common/form/input/SingleSelector';
import { useState } from 'react';
import SubmitButton from '../../components/common/form/SubmitButton';

import { pushNotification } from '../../utils/pushNotification';
import { ComplicationFormType } from '../../models/ComplicationType';
import { COMPLICATION_ITEMS_NAME } from '../../utils/mappingNames';
import { useComplicationMutation } from '../_lib/complicationService';

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

    return (
        <>
            <div className={`flex w-full flex-col ${isConfirmPage ? 'hidden' : ''}`}>
                <form className="mx-auto mt-5 flex w-full flex-col gap-4 bg-white p-4" onSubmit={formik.handleSubmit}>
                    <div></div>
                    {Object.keys(COMPLICATION_ITEMS_NAME).map((key) => (
                        <SingleSelector
                            key={key} // 고유한 key 속성 제공
                            label={COMPLICATION_ITEMS_NAME[key]}
                            htmlFor={key}
                            formik={formik}
                            values={CD_CLASSIFICATION}
                        />
                    ))}
                </form>
                <SubmitButton onClick={() => handleOpenConfirm(formik.values)} label="등록하기" />
            </div>
            {/* {isConfirmPage && (
                <ConfirmNewPatientFormModal
                    values={formik.values}
                    onSubmit={formik.handleSubmit}
                    onClose={handleCloseConfirm}
                />
            )} */}
        </>
    );
}

export default NewComplicationFormPage;
