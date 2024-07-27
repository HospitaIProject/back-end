import { useSearchParams } from 'react-router-dom';
import { ComplicationFormType } from '../../../models/ComplicationType';
import { useComplicationQuery } from '../../_lib/complicationService';

export const useComplicationInitialValues = () => {
    const [searchParams] = useSearchParams();
    const operationId = searchParams.get('id');
    const complicationQuery = useComplicationQuery({
        operationId: Number(operationId),
    });
    const { data, isPending, error } = complicationQuery;

    let initialValues: ComplicationFormType = {
        // [문합부 관련]
        anastomosisBleeding: '', // Anastomosis bleeding
        anastomosisLeakage: '', // Anastomosis leakage
        anastomosisStenosis: '', // Anastomosis stenosis
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
        nervousSystem: {
            complicationName: '',
            cdClassification: '',
        },
        customComplications: [
            {
                complicationName: '',
                cdClassification: '',
            },
        ],
        remarks: '',
    };
    if (error) {
        console.log('error', error);
    }
    if (data) {
        console.log('data', data);
        initialValues = data;
        if (!data.nervousSystem) {
            initialValues.nervousSystem = {
                complicationName: '',
                cdClassification: '',
            };
        }
        if (data.customComplications.length === 0) {
            initialValues.customComplications = [
                {
                    complicationName: '',
                    cdClassification: '',
                },
            ];
        } // customComplications가 없을 경우 초기값 설정(신경계는 customComplications[0] 세팅 필요 )
    }

    return { initialValues, isPending, hasData: Boolean(data), score: data?.score };
};
