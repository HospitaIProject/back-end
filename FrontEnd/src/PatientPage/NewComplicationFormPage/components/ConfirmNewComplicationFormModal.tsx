import ModalFullScreenContainer from '../../../components/common/ModalFullScreenContainer';
import FixedSubmitButton from '../../../components/common/form/FixedSubmitButton';
import ViewInput from '../../../components/common/form/viewInput/ViewInput';
import { ComplicationFormType } from '../../../models/ComplicationType';
import { COMPLICATION_ITEMS_NAME } from '../../../utils/mappingNames';

const checkAllEmptyOrNullValues = (values: ComplicationFormType, startKey: string, endKey: string) => {
    const keys = Object.keys(values);
    const startIndex = keys.indexOf(startKey);
    const endIndex = keys.indexOf(endKey);

    // startIndex와 endIndex 사이의 키에 대해 검사
    return keys.slice(startIndex, endIndex + 1).every((key) => values[key] === '' || values[key] === null);
};

type Props = {
    values: ComplicationFormType;
    onSubmit: () => void;
    onClose: () => void;
    submitLabel?: string;
};

function ConfirmNewComplicationFormModal({ values, submitLabel, onSubmit, onClose }: Props) {
    return (
        <ModalFullScreenContainer title="확인" onClose={onClose}>
            <div className="flex flex-col w-full h-full gap-4 px-4 pt-4">
                {Object.keys(COMPLICATION_ITEMS_NAME).map((key) => (
                    <>
                        {key === 'anastomosisBleeding' &&
                            !checkAllEmptyOrNullValues(values, 'anastomosisBleeding', 'organSpaceSsi') && (
                                <span className="mx-auto font-semibold text-gray-600">[문합부 관련]</span>
                            )}
                        {key === 'ileus' && !checkAllEmptyOrNullValues(values, 'ileus', 'additionalEnteritis') && (
                            <span className="mx-auto font-semibold text-gray-600">[소화기계]</span>
                        )}
                        {key === 'arrhythemia' && !checkAllEmptyOrNullValues(values, 'arrhythemia', 'dic') && (
                            <span className="mx-auto font-semibold text-gray-600">[심혈관계]</span>
                        )}
                        {key === 'atelectasis' &&
                            !checkAllEmptyOrNullValues(values, 'atelectasis', 'pleuralEffusion') && (
                                <span className="mx-auto font-semibold text-gray-600">[호흡기계]</span>
                            )}
                        {key === 'urinaryDysfunctionRetension' &&
                            !checkAllEmptyOrNullValues(values, 'urinaryDysfunctionRetension', 'bladderLeakage') && (
                                <span className="mx-auto font-semibold text-gray-600">[비뇨생식기계]</span>
                            )}
                        {key === 'superficialDeepSsi' &&
                            !checkAllEmptyOrNullValues(values, 'superficialDeepSsi', 'incisionalHernia') && (
                                <span className="mx-auto font-semibold text-gray-600">[피부창상관련]</span>
                            )}
                        <ViewInput
                            key={key} // 고유한 key 속성 제공
                            label={COMPLICATION_ITEMS_NAME[key]}
                            value={values[key] as string}
                            isRender={Boolean(values[key] !== '' && values[key])}
                        />
                    </>
                ))}
                <div className="my-3" />
                <ViewInput
                    label={`[신경계] ${values.nervousSystem?.complicationName}`}
                    value={values.nervousSystem?.cdClassification}
                    isRender={Boolean(
                        values.nervousSystem?.complicationName !== '' && values.nervousSystem?.complicationName,
                    )}
                />

                {values.customComplications?.map((customComplication, index) => (
                    <ViewInput
                        key={index}
                        label={`[기타] ${customComplication.complicationName}`}
                        value={customComplication.cdClassification}
                        isRender={Boolean(
                            customComplication.complicationName !== '' && customComplication.complicationName,
                        )}
                    />
                ))}
                <ViewInput
                    label="비고"
                    value={values.remarks}
                    isRender={Boolean(values.remarks !== '' && values.remarks)}
                />
                {Boolean(onSubmit) && (
                    <FixedSubmitButton onClick={onSubmit} label={submitLabel ? submitLabel : '등록'} />
                )}
            </div>
        </ModalFullScreenContainer>
    );
}

export default ConfirmNewComplicationFormModal;
